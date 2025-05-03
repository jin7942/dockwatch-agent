import { LogStreamVo } from '../dto/log-ws.vo';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';
import { Readable } from 'stream';

export class LogWsService {
    /**
     * docker logs -f <containerId> 실행
     * - stdout 스트림을 반환
     * - WebSocket 스트림 유틸에서 전달 처리
     * - 이벤트 기반 로그 출력이기에 도커 유틸 사용 안했음
     */
    public getLogStream = (containerId: string): Readable => {
        try {
            const process: ChildProcessWithoutNullStreams = spawn('docker', [
                'logs',
                '-f',
                containerId,
            ]);

            return process.stdout; // stdout 스트림 반환
        } catch (err) {
            throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, '로그 스트림 실행 실패');
        }
    };
}
