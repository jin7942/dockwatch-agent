import { Container } from '../dto/log-http.vo';
import { execDockerCommand } from '../../common/utils/docker-util';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';

export class LogService {
    /**
     * 실행 중인 컨테이너 리스트 조회
     * - 중지된 컨테이너 제외
     * - docker ps 명령 사용
     *
     * @returns 실행 중인 컨테이너 배열
     */
    public getRunningContainers = async (): Promise<Container[]> => {
        const result = await execDockerCommand(
            ['ps', '--format', '{{.ID}} {{.Names}}'],
            '실행 중인 컨테이너 리스트 조회 실패',
        );

        const containerList: Container[] = result
            .split('\n')
            .filter((line) => line)
            .map((line) => {
                const [id, name] = line.split(/\s+/);
                return { id, name };
            });

        return containerList;
    };
}
