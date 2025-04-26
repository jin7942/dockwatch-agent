import { SysInfoVo, CpuInfoVo, MemoryInfoVo, DiskInfoVo } from '../dto/server.vo';
import si from 'systeminformation';

/**
 * 서버 서비스 클래스
 */
export class ServerService {
    /**
     * 서버 기본 정보 조회 함수
     * @returns 서버 기본 정보(cpu, memory, disk)를 담은 SysInfoVo 객체
     */
    public async getSysInfo(): Promise<SysInfoVo> {
        const [cpu, memory, disk] = await Promise.all([
            this.getCpuInfo(),
            this.getMemoryInfo(),
            this.getDiskInfo(),
        ]);
        const sysInfoVo: SysInfoVo = { cpu, memory, disk };

        return sysInfoVo;
    }

    /**
     * CPU 기본 정보 조회 함수
     * @returns CPU 기본 정보를 담은 CpuInfo 객체
     */
    public async getCpuInfo(): Promise<CpuInfoVo> {
        const cpuData = await si.cpu();
        const cpuInfoVo: CpuInfoVo = {
            model: `${cpuData.manufacturer} ${cpuData.brand}`, // 제조사 + 브랜드 조합
            speedGHz: cpuData.speed, // 문자열이 아니라 숫자로 변환
            cores: cpuData.physicalCores, // 물리 코어 수
            thread: cpuData.cores, // 논리 프로세서 수
        };

        return cpuInfoVo;
    }

    /**
     * 메모리 사이즈 조회 함수
     * @returns 메모리 사이즈, 사용량
     */
    public async getMemoryInfo(): Promise<MemoryInfoVo> {
        const memoryData = await si.mem();
        const memoryInfoVo: MemoryInfoVo = {
            total: memoryData.total,
            used: memoryData.used,
        };

        return memoryInfoVo;
    }

    /**
     * 디스크 사이즈 조회 함수
     * @returns 디스크 총 용량, 사용량
     */
    public async getDiskInfo(): Promise<DiskInfoVo> {
        const fsData = await si.fsSize();

        const total = fsData.reduce((acc, disk) => acc + disk.size, 0);
        const used = fsData.reduce((acc, disk) => acc + disk.used, 0);

        const diskInfoVo: DiskInfoVo = {
            total: total,
            used: used,
        };

        return diskInfoVo;
    }
}

// 테스트용 코드
// (async () => {
//     const foo = new ServerService();
//     const result = await foo.getSysInfo();
//     console.log(result);
// })();
