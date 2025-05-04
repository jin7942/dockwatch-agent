/** 컨테이너 리스트 */
export interface ContainerVo {
    /** 컨테이너 ID */
    id: string;

    /** 컨테이너 이름 */
    name: string;
}

/** 트리뷰어 */
export interface TreeNodeVo {
    /** 이름 */
    name: string;

    /** 전체경로 */
    path: string;

    /** 디렉터리 여부 */
    isDirectory: boolean;

    /** 자식 노드(디렉터일 경우만 존재) */
    children?: TreeNodeVo[];

    /** 자식 노드 로딩되었는지 여부 */
    loaded?: boolean;
}

/** 로그 파일 제공 */
export interface LogFileContentVo {
    /** 파일 이름(ex: 'access.log') */
    filename: string;

    /** 전체 경로(ex: '/var/log/nginx/access.log') */
    path: string;

    /** byte */
    size: number;

    /** 최종 수정일 */
    modified: string;

    /** 전체 파일 내용 */
    content: string;
}
