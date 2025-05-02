import { execDockerCommand } from '../../common/utils/docker-util';
import { ContainerResourceStreamVo } from '../dto/container-ws.vo';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';

export class ContainerWsService {
    /**
     * 컨테이너별 사용 리소스 조회
     *
     * @param containerId 컨테이너 ID
     * @returns cpu, memory 사용율을 포함한 Vo 객체
     */
    public getUsageByContainer = async (
        containerId: string,
    ): Promise<ContainerResourceStreamVo> => {
        const result = await execDockerCommand(
            ['stats', containerId, '--no-stream', '--format', '{{.CPUPerc}} {{.MemPerc}}'],
            '컨테이너 조회 실패',
        );

        const [cpuStr, memStr] = result.split(' ');
        const cpu = parseFloat(cpuStr.replace('%', ''));
        const memory = parseFloat(memStr.replace('%', ''));

        if (isNaN(cpu) || isNaN(memory)) {
            throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, '리소스 파싱 실패');
        }

        const container: ContainerResourceStreamVo = {
            cpu: { percent: cpu },
            memory: { percent: memory },
        };

        return container;
    };
}
