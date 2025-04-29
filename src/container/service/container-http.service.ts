import { Container } from '../dto/container-http.vo';
import { ContainerDto } from '../dto/container-http.dto';
import { exec } from 'child_process';
import util from 'util';

export class ContainerService {
    private execAsync = util.promisify(exec);

    /**
     * 컨테이너 리스트 조회
     * @returns  컨테이너 리스트
     */
    public getContainerList = async (): Promise<Container[]> => {
        // 'docker ps -a --format' 명령어 실행하여 컨테이너 목록 가져오기
        const { stdout }: { stdout: string } = await this.execAsync(
            'docker ps -a --format "{{.ID}} {{.Names}} {{.Image}} {{.Status}} {{.Ports}} {{.Network}}"',
        );

        const containerList: Container[] = stdout
            .split('\n')
            .filter((line) => line) // 빈 줄은 걸러냄
            .map((line) => {
                const [id, name, image, status, ports, network] = line.split(/\s+/); // 정규식을 사용해 공백을 하나로 처리
                return {
                    id,
                    name,
                    image,
                    status,
                    ports,
                    network,
                };
            });

        return containerList;
    };

    /**
     * 실행 중인 컨테이너 존재 여부 확인
     * @param containerId 확인할 컨테이너 ID
     * @returns 컨테이너가 존재하는지 여부 true / false
     */
    public getContainerStatus = async (containerId: string): Promise<boolean> => {
        // 실행 중인 컨테이너 ID 목록 가져오기
        const { stdout }: { stdout: string } = await this.execAsync(
            'docker ps -a --format "{{.ID}}"',
        );

        // ID 목록 필터링
        const containerIds: string[] = stdout.split('\n').filter((id) => id);

        // 해당 ID가 목록에 있는지 확인
        const exists: boolean = containerIds.includes(containerId);

        return exists;
    };

    public startContainer = async (dto: ContainerDto): Promise<void> => {};
    public stopContainer = async (dto: ContainerDto): Promise<void> => {};
    public reStartContainer = async (dto: ContainerDto): Promise<void> => {};
}
