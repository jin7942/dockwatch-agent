// interface 정의
import {
    SysInfoVo,
    CpuInfoVo,
    MemoryInfoVo,
    DiskInfoVo,
    SysNetworkInfoVo,
    DiskUsageByMountVo,
    DiskUsageByContainerVo,
} from '../dto/server-http.vo';

// 라이브러리
import si from 'systeminformation';
import { exec } from 'child_process';
import util from 'util';

// 직접 구현한 유틸 모듈
import { parseSize } from '../../common/utils/parser-util';
import { execDockerCommand } from '../../common/utils/docker-util';

// systeminformation networkInterfaces() 결과를 위한 내부 타입
interface SiNetworkInterfaceData {
    iface: string;
    ip4: string;
    ip4subnet: string;
    mac: string;
    speed: number;
}

/**
 * 서버 서비스 클래스
 */
export class ServerService {
    /**
     * 서버 기본 정보 조회 함수
     * @returns 서버 기본 정보(cpu, memory, disk)를 담은 SysInfoVo 객체
     */
    public getSysInfo = async (): Promise<SysInfoVo> => {
        const [cpu, memory, disk] = await Promise.all([
            this.getCpuInfo(),
            this.getMemoryInfo(),
            this.getDiskInfo(),
        ]);
        const sysInfoVo: SysInfoVo = { cpu, memory, disk };

        return sysInfoVo;
    };

    /**
     * CPU 기본 정보 조회 함수
     * @returns  CPU 기본 정보를 담은 CpuInfoVo 객체
     */
    private getCpuInfo = async (): Promise<CpuInfoVo> => {
        const cpuData = await si.cpu();
        const cpuInfoVo: CpuInfoVo = {
            model: `${cpuData.manufacturer} ${cpuData.brand}`, // 제조사 + 브랜드 조합
            speedGHz: cpuData.speed, // 문자열이 아니라 숫자로 변환
            cores: cpuData.physicalCores, // 물리 코어 수
            thread: cpuData.cores, // 논리 프로세서 수
        };

        return cpuInfoVo;
    };

    /**
     * 메모리 사이즈 조회 함수
     * @returns  메모리 사이즈, 사용량
     */
    private getMemoryInfo = async (): Promise<MemoryInfoVo> => {
        const memoryData = await si.mem();
        const memoryInfoVo: MemoryInfoVo = {
            total: memoryData.total,
            used: memoryData.used,
        };

        return memoryInfoVo;
    };

    /**
     * 디스크 사이즈 조회 함수
     * @returns 디스크 총 용량, 사용량
     */
    private getDiskInfo = async (): Promise<DiskInfoVo> => {
        const fsData = await si.fsSize();

        const total = fsData.reduce((acc, disk) => acc + disk.size, 0);
        const used = fsData.reduce((acc, disk) => acc + disk.used, 0);

        const diskInfoVo: DiskInfoVo = {
            total: total,
            used: used,
        };

        return diskInfoVo;
    };

    /**
     * 서버 네트워크 인터페이스 정보
     * @returns  네트워크 정보가 담긴 배열
     */
    public getSysNetworkInfo = async (): Promise<SysNetworkInfoVo[]> => {
        const netDataArray = (await si.networkInterfaces()) as SiNetworkInterfaceData[];
        const networkList: SysNetworkInfoVo[] = netDataArray.map((net) => ({
            interface: net.iface,
            ip4: net.ip4,
            ip4Subnet: net.ip4subnet,
            mac: net.mac,
            speed: net.speed,
        }));

        return networkList;
    };

    /**
     * 마운트별 디스크 사용량
     * @returns  마운트별 디스크 사용량 배열
     */
    public getDiskUsageByMount = async (): Promise<DiskUsageByMountVo[]> => {
        const fsData = await si.fsSize();
        const diskList: DiskUsageByMountVo[] = fsData.map((disk) => ({
            mountPath: disk.fs,
            total: disk.size,
            used: disk.used,
            use: disk.use,
        }));

        return diskList;
    };

    /**
     * 컨테이너별 디스크 사용량 조회
     * @returns  컨테이너별 디스크 사용량 배열
     */
    public getDiskUsageByContainer = async (): Promise<DiskUsageByContainerVo[]> => {
        // 1. 실행 중인 컨테이너 ID 목록
        const psResult = await execDockerCommand(['ps', '--format', '{{.ID}}']);
        const runningContainerIds = psResult.split('\n').filter((id) => id);

        // 2. 디스크 사용량 조회
        const dfResult = await execDockerCommand(['system', 'df', '-v']);
        const lines = dfResult.split('\n');

        // 3. 해당 컨테이너만 필터링
        const containerLines = lines.filter((line) =>
            runningContainerIds.some((id) => line.startsWith(id)),
        );

        // 4. 파싱 및 반환
        const containerUsageList: DiskUsageByContainerVo[] = containerLines.map((line) => {
            const parts = line.split(/\s+/);
            return {
                name: parts[1],
                used: parseSize(parts[2]),
                isActive: true,
            };
        });

        return containerUsageList;
    };
}

// 테스트용 코드
// (async () => {
//     const foo = new ServerService();
//     const result = await foo.getSysInfo();
//     console.log(result);
// })();
