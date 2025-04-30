// common/utils/docker-util.ts

import { spawn } from 'child_process';
import { CustomError } from '../error/custom-error';
import { HttpStatus } from '../types/http-status.enum';

/**
 * 도커 명령어 실행 유틸
 * @param args - docker 명령어 인자 배열 (예: ['ps', '-a'])
 * @param errorMessage - 실패 시 보여줄 메시지
 * @returns stdout 출력 결과 (string)
 */
export const execDockerCommand = async (
    args: string[],
    errorMessage = '도커 명령어 실행 실패',
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const child = spawn('docker', args);

        let stdoutData = '';
        let stderrData = '';

        child.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        child.on('error', (err) => {
            reject(
                new CustomError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    `${errorMessage}: ${err.message}`,
                ),
            );
        });

        child.on('close', (code) => {
            if (code === 0) {
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
