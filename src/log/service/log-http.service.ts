import { ContainerVo, LogFileContentVo, TreeNodeVo } from '../dto/log-http.vo';
import { execDockerCommand } from '../../common/utils/docker-util';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';
import fs from 'fs/promises';
import path from 'path';

export class LogService {
    /**
     * 실행 중인 컨테이너 리스트 조회
     * - 중지된 컨테이너 제외
     * - docker ps 명령 사용
     *
     * @returns 실행 중인 컨테이너 배열
     */
    public getRunningContainers = async (): Promise<ContainerVo[]> => {
        const result = await execDockerCommand(
            ['ps', '--format', '{{.ID}} {{.Names}}'],
            '실행 중인 컨테이너 리스트 조회 실패',
        );

        const containerList: ContainerVo[] = result
            .split('\n')
            .filter((line) => line)
            .map((line) => {
                const [id, name] = line.split(/\s+/);
                return { id, name };
            });

        return containerList;
    };

    /**
     * 컨테이너 내 디렉터리 탐색 함수
     * - 1단계 깊이만 조회함
     * - /var/log 하위 경로만 허용
     * - 심볼릭 링크는 조회 불가
     *
     * @param dirPath 조회할 경로
     * @returns 디렉터리 객체 배열
     */
    public getDirectoryTree = async (dirPath: string): Promise<TreeNodeVo[]> => {
        await fs.access(dirPath);
        const stats = await fs.stat(dirPath);
        const normalizedPath = path.resolve(dirPath);
        // /var/log/../home 등 우회 경로 차단, 디렉터리만 허용
        if (!stats.isDirectory() || !normalizedPath.startsWith('/var/log')) {
            throw new CustomError(HttpStatus.BAD_REQUEST, '잘못된 요청 입니다.');
        }

        const entries = await fs.readdir(normalizedPath, { withFileTypes: true }); // 1단계 깊이만 조회
        const nodes: TreeNodeVo[] = entries
            .filter((entry) => !entry.isSymbolicLink()) // 심볼릭 링크는 제외
            .map((entry) => {
                const fullPath = path.join(normalizedPath, entry.name);

                return {
                    name: entry.name,
                    path: fullPath,
                    isDirectory: entry.isDirectory(),
                    loaded: false,
                };
            });

        return nodes;
    };

    /**
     * 파일 조회 함수
     *
     * @param filePath 파일 경로
     * @returns 전체 파일 내용
     */
    public getLogFile = async (filePath: string): Promise<LogFileContentVo> => {
        const normalizedPath = path.resolve(filePath);

        // /var/log/../home 등 우회 경로 차단
        if (!normalizedPath.startsWith('/var/log')) {
            throw new CustomError(HttpStatus.FORBIDDEN, '허용되지 않은 경로입니다.');
        }
        // 파일만 허용
        const stats = await fs.stat(normalizedPath);
        if (!stats.isFile()) {
            throw new CustomError(HttpStatus.BAD_REQUEST, '파일이 아닙니다.');
        }

        const content = await fs.readFile(normalizedPath, 'utf-8');
        const vo: LogFileContentVo = {
            filename: path.basename(normalizedPath),
            path: normalizedPath,
            size: stats.size,
            modified: stats.mtime.toISOString(),
            content: content,
        };

        return vo;
    };
}
