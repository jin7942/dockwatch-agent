/** 컨테이너 정보 */
export interface ContainerVo {
    /** 컨테이너 ID (ex: '123abcd') */
    id: string;

    /** 컨테이너 이름 (ex: 'ray-server') */
    name: string;

    /** 도커 이미지 (ex: 'mysql:8.0') */
    image: string;

    /** 컨테이너 실행 시간 (ex: Up 12 days) */
    status: string;

    /** 바인딩된 포트 (ex: '0.0.0.0:1234 -> 5678/tcp') */
    ports: string;

    /** 사용중인 네트워크 (ex: 'jin-network') */
    network: string;

    /** 사용중인 디스크 용량(byte) */
    diskUsage?: number;
}
