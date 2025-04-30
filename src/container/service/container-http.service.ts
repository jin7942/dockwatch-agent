import { Container } from '../dto/container-http.vo';
import { ContainerDto } from '../dto/container-http.dto';
import { execDockerCommand } from '../../common/utils/docker-util';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';

export class ContainerService {
    /**
     * 컨테이너 리스트 조회
     * @returns  컨테이너 리스트
     */
    public getContainerList = async (): Promise<Container[]> => {
        const result = await execDockerCommand(
            [
                'ps',
                '-a',
                '--format',
                '{{.ID}} {{.Names}} {{.Image}} {{.Status}} {{.Ports}} {{.Network}}',
            ],
            '컨테이너 리스트 조회 실패',
        );

        const containerList: Container[] = result
            .split('\n')
            .filter((line) => line)
            .map((line) => {
                const [id, name, image, status, ports, network] = line.split(/\s+/);
                return { id, name, image, status, ports, network };
            });

        return containerList;
    };

    /**
     * 실행 중인 컨테이너 존재 여부 확인
     * @param containerId 확인할 컨테이너 ID
     * @returns 컨테이너가 실행중인지 여부 true / false
     */
    public getContainerStatus = async (containerId: string): Promise<boolean> => {
        const result = await execDockerCommand(
            ['ps', '-a', '--format', '{{.ID}}'],
            '컨테이너 상태 조회 실패',
        );

        const containerIds: string[] = result.split('\n').filter((id) => id);
        return containerIds.includes(containerId);
    };

    /**
     * 컨테이너 시작 함수
     * - 해당 컨테이너가 실행중인지 확인
     * - 실행중이면 에러 발생, 실행중이 아니면 컨테이너 실행 명령
     *
     * @param dto containerId를 포함한 dto 객체
     */
    public startContainer = async (dto: ContainerDto): Promise<void> => {
        const status: boolean = await this.getContainerStatus(dto.id);

        if (!status) {
            throw new CustomError(HttpStatus.CONFLICT, '이미 실행중인 컨테이너입니다.');
        }

        await execDockerCommand(['start', dto.id], '컨테이너 시작 실패');
    };

    /**
     * 컨테이너 중지 함수
     * - 해당 컨테이너가 중지된 컨테이너 인지 확인
     * - 중지된 컨테이너면 에러 발생, 실행중이면 정지 명령
     *
     * @param dto containerId를 포함한 dto 객체
     */
    public stopContainer = async (dto: ContainerDto): Promise<void> => {
        const status: boolean = await this.getContainerStatus(dto.id);

        if (!status) {
            throw new CustomError(HttpStatus.CONFLICT, '이미 중지된 컨테이너입니다.');
        }

        await execDockerCommand(['stop', dto.id], '컨테이너 중지 실패');
    };

    /**
     * 컨테이너 재시작 함수
     * - 해당 컨테이너가 실행중인지 확인
     * - 중지된 컨테이너라면 에러 발생, 실행중이면 재시작 명령
     *
     * @param dto containerId를 포함한 dto 객체
     */
    public reStartContainer = async (dto: ContainerDto): Promise<void> => {
        const status: boolean = await this.getContainerStatus(dto.id);

        if (!status) {
            throw new CustomError(HttpStatus.CONFLICT, '재시작할 컨테이너가 실행 중이 아닙니다.');
        }

        await execDockerCommand(['restart', dto.id], '컨테이너 재시작 실패');
    };
}
