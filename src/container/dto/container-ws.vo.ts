/** 컨테이너별 실시간 사용량 */
export interface ContainerResourceStreamVo {
    cpu: {
        percent: number;
    };
    memory: {
        percent: number;
    };
}
