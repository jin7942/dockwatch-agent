// common/utils/docker-util.ts

import { spawn } from 'child_process';
import { CustomError } from '../error/custom-error';
import { HttpStatus } from '../types/http-status.enum';

/**
 * 도커 명령어 실행 유틸
 * - 기본 타임아웃 시간 10초
 *
 * @param args - docker 명령어 인자 배열 (예: ['ps', '-a'])
 * @param errorMessage - 실패 시 보여줄 메시지
 * @returns stdout 출력 결과 (string)
 */
export const execDockerCommand = async (
    args: string[],
    errorMessage = '도커 명령어 실행 실패',
    timeoutMs = 10000,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const { signal } = controller;

        let aborted = false;

        const child = spawn('docker', args, { signal });

        let stdoutData = '';
        let stderrData = '';

        const timeout = setTimeout(() => {
            aborted = true;
            controller.abort();
        }, timeoutMs);

        child.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        child.on('error', (err) => {
            clearTimeout(timeout);
            reject(
                new CustomError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    `${errorMessage}: ${err.message}`,
                ),
            );
        });

        child.on('close', (code) => {
            clearTimeout(timeout);

            if (aborted) {
                reject(
                    new CustomError(HttpStatus.REQUEST_TIMEOUT, `${errorMessage} (타임아웃 초과)`),
                );
            } else if (code === 0) {
                resolve(stdoutData.trim());
            } else {
                reject(
                    new CustomError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        `${errorMessage} (코드 ${code}): ${stderrData.trim()}`,
                    ),
                );
            }
        });
    });
};
