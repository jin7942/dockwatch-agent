# 1. API 명세

## 1.1. 목차

- [1. API 명세](#1-api-명세)
  - [1.1. 목차](#11-목차)
  - [1.2. 공통 응답 형식](#12-공통-응답-형식)
- [2. container](#2-container)
  - [2.1. GET /api/container/list](#21-get-apicontainerlist)
    - [2.1.1. 요청 파라미터](#211-요청-파라미터)
    - [2.1.2. 응답 예시](#212-응답-예시)
    - [2.1.3. 인터페이스 정의](#213-인터페이스-정의)
  - [2.2. GET /api/container/info](#22-getapicontainerinfo)
    - [2.2.1. 요청 파라미터](#221-요청-파라미터)
    - [2.2.2. 응답 예시](#222-응답-예시)
    - [2.2.3. 인터페이스 정의](#223-인터페이스-정의)
  - [2.3. GET /api/container/status](#23-getapicontainerstatus)
    - [2.3.1. 요청 파라미터](#231-요청-파라미터)
    - [2.3.2. 응답 예시](#232-응답-예시)
  - [2.4. POST /api/container/start](#24-postapicontainerstart)
  - [2.5. 요청 바디](#25-요청-바디)
    - [2.5.1. 응답 예시](#251-응답-예시)
  - [2.6. POST /api/container/stop](#26-postapicontainerstop)
  - [2.7. 요청 바디](#27-요청-바디)
    - [2.7.1. 응답 예시](#271-응답-예시)
  - [2.8. POST /api/container/restart](#28-postapicontainerrestart)
  - [2.9. 요청 바디](#29-요청-바디)
    - [2.9.1. 응답 예시](#291-응답-예시)
  - [2.10. WS /ws/container/resource](#210-ws-wscontainerresource)
    - [2.10.1. 요청 파라미터](#2101-요청-파라미터)
    - [2.10.2. 응답 예시](#2102-응답-예시)
    - [2.10.3. 인터페이스 정의](#2103-인터페이스-정의)
- [3. dashboard](#3-dashboard)
  - [3.1. GET /api/dashboard/info](#31-get-apidashboardinfo)
    - [3.1.1. 요청 파라미터](#311-요청-파라미터)
    - [3.1.2. 응답 예시](#312-응답-예시)
    - [3.1.3. 인터페이스 정의](#313-인터페이스-정의)
  - [3.2. WS /ws/dashboard/info](#32-ws-wsdashboardinfo)
    - [3.2.1. 요청 파라미터](#321-요청-파라미터)
    - [3.2.2. 응답 예시](#322-응답-예시)
    - [3.2.3. 인터페이스 정의](#323-인터페이스-정의)
- [4. log](#4-log)
  - [4.1. GET /api/log/active](#41-get-apilogactive)
    - [4.1.1. 요청 파라미터](#411-요청-파라미터)
    - [4.1.2. 응답 예시](#412-응답-예시)
    - [4.1.3. 인터페이스 정의](#413-인터페이스-정의)
  - [4.2. POST /api/log/directory](#42-post-apilogdirectory)
    - [4.2.1. 요청 바디](#421-요청-바디)
    - [4.2.2. 응답 예시](#422-응답-예시)
    - [4.2.3. 인터페이스 정의](#423-인터페이스-정의)
  - [4.3. POST /api/log/file](#43-post-apilogfile)
    - [4.3.1. 요청 바디](#431-요청-바디)
    - [4.3.2. 응답 예시](#432-응답-예시)
    - [4.3.3. 인터페이스 정의](#433-인터페이스-정의)
  - [4.4. WS /ws/log/stream?containerId=xxxxxxx](#44-ws-wslogstreamcontaineridxxxxxxx)
    - [4.4.1. 요청 파라미터](#441-요청-파라미터)
    - [4.4.2. 응답 예시](#442-응답-예시)
    - [4.4.3. 에러 발생시 응답](#443-에러-발생시-응답)
- [5. server](#5-server)
  - [5.1. GET /api/server/info](#51-get-apiserverinfo)
    - [5.1.1. 요청 파라미터](#511-요청-파라미터)
    - [5.1.2. 응답 예시](#512-응답-예시)
    - [5.1.3. 인터페이스 정의](#513-인터페이스-정의)
  - [5.2. GET /api/server/network-interfaces](#52-get-apiservernetwork-interfaces)
    - [5.2.1. 요청 파라미터](#521-요청-파라미터)
    - [5.2.2. 응답 예시](#522-응답-예시)
    - [5.2.3. 인터페이스 정의](#523-인터페이스-정의)
  - [5.3. GET /api/server/mount-disk](#53-get-apiservermount-disk)
    - [5.3.1. 요청 파라미터](#531-요청-파라미터)
    - [5.3.2. 응답 예시](#532-응답-예시)
    - [5.3.3. 인터페이스 정의](#533-인터페이스-정의)
  - [5.4. GET /api/server/container-disk](#54-get-apiservercontainer-disk)
    - [5.4.1. 요청 파라미터](#541-요청-파라미터)
    - [5.4.2. 응답 예시](#542-응답-예시)
    - [5.4.3. 인터페이스 정의](#543-인터페이스-정의)
  - [5.5. WS /ws/server/usage](#55-ws-wsserverusage)
    - [5.5.1. 요청 파라미터](#551-요청-파라미터)
    - [5.5.2. 응답 예시](#552-응답-예시)
    - [5.5.3. 인터페이스 정의](#553-인터페이스-정의)
  - [5.6. WS /ws/server/network](#56-ws-wsservernetwork)
    - [5.6.1. 요청 파라미터](#561-요청-파라미터)
    - [5.6.2. 응답 예시](#562-응답-예시)
    - [5.6.3. 인터페이스 정의](#563-인터페이스-정의)

## 1.2. 공통 응답 형식

**HTTP일 경우**

```typescript
// 성공 시
{
    "success": true,
    "message": "message",
    "data": <T>
}
// 실패시
{
    "success": false,
    "message": "message",
    "data": {
        "code": // Http status code ex)400,401,500 등
    }
}
```

**WebSocket 일 경우**

```typescript
{
    "type": string,
    "hostname": "hostname",
    "timestamp": ISO 8601,
    "data": <T>
}
```

# 2. container

<details>
<summary>API 상세 보기</summary>

## 2.1. GET /api/container/list

컨테이너 리스트 조회

### 2.1.1. 요청 파라미터

없음

### 2.1.2. 응답 예시

```json
{
    "success": true,
    "message": "컨테이너 리스트 조회 성공",
    "data": [
        {
            "id": "123abcd",
            "name": "ray-server",
            "image": "mysql:8.0",
            "status": "Up 12 days",
            "ports": "0.0.0.0:1234->5678/tcp",
            "network": "jin-network"
        }
    ]
}
```

### 2.1.3. 인터페이스 정의

```typescript
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
```

## 2.2. GET /api/container/info

컨테이너 **상세 정보** 조회

### 2.2.1. 요청 파라미터

| 이름        | 위치  | 타입   | 필수 | 설명                     |
| ----------- | ----- | ------ | ---- | ------------------------ |
| containerId | Query | string | O    | 12 ~ 64 hex, 컨테이너 ID |

### 2.2.2. 응답 예시

```json
{
    "success": true,
    "message": "컨테이너 상태 조회 성공",
    "data": {
        "id": "123abcd",
        "name": "ray-server",
        "image": "mysql:8.0",
        "status": "Up 12 days",
        "ports": "0.0.0.0:1234->5678/tcp",
        "network": "jin-network",
        "diskUsage": 104857600
    }
}
```

### 2.2.3. 인터페이스 정의

```typescript
/** 컨테이너 정보 */
export interface ContainerVo {
    {/* 위와 동일 */}
}
```

## 2.3. GET /api/container/status

컨테이너 실행 상태(Running / Stopped) 조회

### 2.3.1. 요청 파라미터

| 이름        | 위치  | 타입   | 필수  | 설명                     |
| ----------- | ----- | ------ | ----- | ------------------------ |
| containerId | Query | string | **O** | 12 ~ 64 hex, 컨테이너 ID |

### 2.3.2. 응답 예시

```json
{
    "success": true,
    "message": "컨테이너 상태 조회 성공",
    "data": true // or false
}
```

## 2.4. POST /api/container/start

특정 컨테이너 실행

## 2.5. 요청 바디

| 필드 | 타입   | 필수 | 설명        |
| ---- | ------ | ---- | ----------- |
| id   | string | O    | 컨테이너 ID |

### 2.5.1. 응답 예시

```json
{
    "success": true,
    "message": "컨테이너 시작 성공",
    "data": null
}
```

## 2.6. POST /api/container/stop

특정 컨테이너 중지

## 2.7. 요청 바디

| 필드 | 타입   | 필수 | 설명        |
| ---- | ------ | ---- | ----------- |
| id   | string | O    | 컨테이너 ID |

### 2.7.1. 응답 예시

```json
{
    "success": true,
    "message": "컨테이너 중지 성공",
    "data": null
}
```

## 2.8. POST /api/container/restart

특정 컨테이너 재시작

## 2.9. 요청 바디

| 필드 | 타입   | 필수 | 설명        |
| ---- | ------ | ---- | ----------- |
| id   | string | O    | 컨테이너 ID |

### 2.9.1. 응답 예시

```json
{
    "success": true,
    "message": "컨테이너 재시작 성공",
    "data": null
}
```

## 2.10. WS /ws/container/resource

컨테이너별 리소스 사용량 제공

### 2.10.1. 요청 파라미터

| 이름        | 위치  | 타입   | 필수  | 설명                     |
| ----------- | ----- | ------ | ----- | ------------------------ |
| containerId | Query | string | **O** | 12 ~ 64 hex, 컨테이너 ID |

### 2.10.2. 응답 예시

```json
{
    "type": "containerResource",
    "hostname": "agent-01",
    "timestamp": "2025-05-06T12:00:00Z",
    "data": {
        "cpu": {
            "percent": 34.7
        },
        "memory": {
            "percent": 58.2
        }
    }
}
```

### 2.10.3. 인터페이스 정의

```typescript
/** 컨테이너별 실시간 사용량 */
export interface ContainerResourceStreamVo {
    cpu: {
        percent: number;
    };
    memory: {
        percent: number;
    };
}
```

</details>

# 3. dashboard

<details>
<summary>API 상세 보기</summary>

## 3.1. GET /api/dashboard/info

대시보드 조회

-   서버 디스크 사용율
-   서버 가동시간 제공(반올림)

### 3.1.1. 요청 파라미터

없음

### 3.1.2. 응답 예시

```json
{
    "success": true,
    "message": "대시보드 조회 성공",
    "data": {
        "diskUsage": 35,
        "uptimeHours": 30
    }
}
```

### 3.1.3. 인터페이스 정의

```typescript
/** 대시보드용 시스템 사용 요약 */
export interface SysUsageVo {
    /** 디스크 사용량(%) */
    diskUsage: number;
    /** 서버 가동시간(1시간 단위로 반올림) */
    uptimeHours: number;
}
```

## 3.2. WS /ws/dashboard/info

대시보드용 실시간 자원 조회

### 3.2.1. 요청 파라미터

없음

### 3.2.2. 응답 예시

```json
{
    "type": "server-usage",
    "hostname": "agent-01",
    "timestamp": "2025-05-06T12:00:00Z",
    "data": {
        "cpuPercent": 34.7,
        "memoryPercent": 58.2,
        "networkUsage": 32,
        "runningContainer": {
            "id": "123XXX123",
            "name": "ray-server",
            "image": "nginx",
            "status": "Up12Days",
            "ports": "0.0.0.0:1234 -> 5678/tcp",
            "network": "jin-network",
            "usage": {
                "cpu": {
                    "percent": 34.7
                },
                "memory": {
                    "percent": 58.2
                }
            }
        }
    }
}
```

### 3.2.3. 인터페이스 정의

```typescript
/** 대시보드용 실시간 서버 사용량 */
export interface SysUsageStreamVo {
    /** CPU 사용률 (%) */
    cpuPercent: number;

    /** 메모리 사용률 (%) */
    memoryPercent: number;

    /** 네트워크 사용량 (수신 + 송신 합산, 단위: bps) */
    networkUsage: number;

    /** 실행중인 컨테이너 */
    runningContainer: RunningContainer[];
}

export interface RunningContainer extends ContainerVo {
    /** 사용율(cpu, mem) */
    usage: ContainerResourceStreamVo;
}
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
```

</details>

# 4. log

<details>
<summary>API 상세 보기</summary>

## 4.1. GET /api/log/active

실행중인 컨테이너 리스트 조회

### 4.1.1. 요청 파라미터

없음

### 4.1.2. 응답 예시

```json
{
    "success": true,
    "message": "실행중인 컨테이너 조회 성공",
    "data": {
        "id": "123abcd",
        "name": "ray-server"
    }
}
```

### 4.1.3. 인터페이스 정의

```typescript
export interface ContainerVo {
    /** 컨테이너 ID */
    id: string;

    /** 컨테이너 이름 */
    name: string;
}
```

## 4.2. POST /api/log/directory

     * 로그 디렉터리 조회 API
     * - 파라미터로 디렉터리 경로를 요청
     * - 경로노출 최소화를 위해 POST로 처리
     * - 1단계 깊이의 노드만 반환, 하위 노드 조회시 재호출 필요

### 4.2.1. 요청 바디

| 필드 | 타입   | 필수 | 설명                                           |
| ---- | ------ | ---- | ---------------------------------------------- |
| path | string | O    | 12 ~ 64 hex, 디렉터리 or 파일 경로 ex /var/log |

### 4.2.2. 응답 예시

```json
{
    "type": "containerResource",
    "hostname": "agent-01",
    "timestamp": "2025-05-06T12:00:00Z",
    "data": [
        {
            "name": "logs",
            "path": "/var/logs",
            "isDirectory": true,
            "loaded": true,
            "children": [
                {
                    "name": "app.log",
                    "path": "/var/logs/app.log",
                    "isDirectory": false
                },
                {
                    "name": "nginx",
                    "path": "/var/logs/nginx",
                    "isDirectory": true,
                    "loaded": true,
                    "children": [
                        {
                            "name": "access.log",
                            "path": "/var/logs/nginx/access.log",
                            "isDirectory": false
                        },
                        {
                            "name": "error.log",
                            "path": "/var/logs/nginx/error.log",
                            "isDirectory": false
                        }
                    ]
                }
            ]
        }
    ]
}
```

### 4.2.3. 인터페이스 정의

```typescript
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
```

## 4.3. POST /api/log/file

     * 로그 파일 조회 API
     * - 파라미터로 파일 전체 경로를 요청
     * - 경로노출 최소화를 위해 POST로 처리

### 4.3.1. 요청 바디

| 필드 | 타입   | 필수 | 설명                                                     |
| ---- | ------ | ---- | -------------------------------------------------------- |
| path | string | O    | 12 ~ 64 hex, 디렉터리 or 파일 경로 ex /var/log/12312.log |

### 4.3.2. 응답 예시

```json
{
    "success": true,
    "message": "message",
    "data": {
        "filename": "access.log",
        "path": "/var/log/nginx/access.log",
        "size": 34820,
        "modified": "2025-05-06T12:34:56Z",
        "content": "127.0.0.1 - - [06/May/2025:12:34:01 +0000] \"GET /api/log HTTP/1.1\" 200 123\n127.0.0.1 - - [06/May/2025:12:34:03 +0000] \"POST /api/login HTTP/1.1\" 401 98"
    }
}
```

### 4.3.3. 인터페이스 정의

```typescript
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
```

## 4.4. WS /ws/log/stream?containerId=xxxxxxx

     * 컨테이너별 실시간 로그 스트림

### 4.4.1. 요청 파라미터

| 이름        | 위치  | 타입   | 필수 | 설명                    |
| ----------- | ----- | ------ | ---- | ----------------------- |
| containerId | query | string | O    | 12 ~ 64 hex, 컨테이너ID |

### 4.4.2. 응답 예시

```json
{
    "type": "container-log",
    "hostname": "agent-01",
    "timestamp": "2025-05-06T13:10:00Z",
    "data": {
        "value": "127.0.0.1 - - [06/May/2025:13:10:00 +0000] \"GET /api/log HTTP/1.1\" 200 123"
    }
}
```

### 4.4.3. 에러 발생시 응답

```json
{
    "type": "container-log",
    "hostname": "agent-01",
    "timestamp": "2025-05-06T13:11:00Z",
    "data": {
        "value": "[ERROR] spawn docker ENOENT"
    }
}
```

</details>

# 5. server

<details>
<summary>API 상세 보기</summary>

## 5.1. GET /api/server/info

     * 서버 기본 정보 조회 API

### 5.1.1. 요청 파라미터

없음

### 5.1.2. 응답 예시

```json
{
    "success": true,
    "message": "서버 기본 정보 조회 성공",
    "data": {
        "cpu": {
            "model": "Intel Core i7-12700K",
            "speedGHz": 3.6,
            "cores": 8,
            "thread": 16
        },
        "memory": {
            "total": 34359738368,
            "used": 18253611008
        },
        "disk": {
            "total": 512110190592,
            "used": 187904819200
        }
    }
}
```

### 5.1.3. 인터페이스 정의

```typescript
/**
 * 서버 기본 정보
 */
export interface SysInfoVo {
    cpu: CpuInfoVo;
    memory: MemoryInfoVo;
    disk: DiskInfoVo;
}
/**
 * CPU 정보
 */
export interface CpuInfoVo {
    /** CPU 모델명 (ex: 'Intel Core i5-5000') */
    model: string;

    /** CPU 기본 클럭 속도 (GHz 단위) */
    speedGHz: number;

    /** 물리 CPU 코어 수 */
    cores: number;

    /** 스레드 수 */
    thread: number;
}
/**
 * 메모리 정보
 */
export interface MemoryInfoVo {
    /** 총 메모리 용량 (bytes) */
    total: number;

    /** 사용 중인 메모리 용량 (bytes) */
    used: number;
}
/**
 * 디스크 정보
 */
export interface DiskInfoVo {
    /** 총 디스크 용량 (bytes) */
    total: number;

    /** 사용 중인 디스크 용량 (bytes) */
    used: number;
}
```

## 5.2. GET /api/server/network-interfaces

     * 네트워크 인터페이스 조회 API

### 5.2.1. 요청 파라미터

없음

### 5.2.2. 응답 예시

```json
{
    "success": true,
    "message": "네트워크 인터페이스 조회 성공",
    "data": [
        {
            "interface": "eth0",
            "ip4": "192.168.0.10",
            "ip4Subnet": "255.255.255.0",
            "mac": "00:1B:44:11:3A:B7",
            "speed": 1000000000
        },
        {
            "interface": "wlan0",
            "ip4": "192.168.0.15",
            "ip4Subnet": "255.255.255.0",
            "mac": "00:1B:44:11:3A:B8",
            "speed": 300000000
        }
    ]
}
```

### 5.2.3. 인터페이스 정의

```typescript
/**
 * 서버 네트워크 인터페이스 정보
 */
export interface SysNetworkInfoVo {
    /** 네트워크 인터페이스 이름 (ex: 'eth0') */
    interface: string;

    /** IPv4 주소 (ex: '192.168.0.10') */
    ip4: string;

    /** IPv4 서브넷 (ex: '255.255.255.0') */
    ip4Subnet: string;

    /** MAC 주소 (ex: '00:1B:44:11:3A:B7') */
    mac: string;

    /** 링크 속도 (bps) */
    speed: number;
}
```

## 5.3. GET /api/server/mount-disk

     * 마운트별 디스크 사용량 조회 API

### 5.3.1. 요청 파라미터

없음

### 5.3.2. 응답 예시

```json
{
    "success": true,
    "message": "message",
    "data": [
        {
            "mountPath": "/",
            "total": 100000000000,
            "used": 60000000000,
            "use": 60
        },
        {
            "mountPath": "/mnt/data",
            "total": 500000000000,
            "used": 320000000000,
            "use": 64
        },
        {
            "mountPath": "/mnt/backup",
            "total": 200000000000,
            "used": 50000000000,
            "use": 25
        }
    ]
}
```

### 5.3.3. 인터페이스 정의

```typescript
/**
 * 마운트별 디스크 사용량
 */
export interface DiskUsageByMountVo {
    /** 마운트 경로 (ex: '/mnt/data') */
    mountPath: string;

    /** 총 용량 (bytes) */
    total: number;

    /** 사용량 (bytes) */
    used: number;

    /** 사용률 (%) */
    use: number;
}
```

## 5.4. GET /api/server/container-disk

     * 컨테이너별 디스크 사용량 조회 API

### 5.4.1. 요청 파라미터

없음

### 5.4.2. 응답 예시

```json
{
    "success": true,
    "message": "message",
    "data": [
        {
            "name": "ray-server",
            "used": 157286400,
            "isActive": true
        },
        {
            "name": "db-container",
            "used": 524288000,
            "isActive": false
        },
        {
            "name": "nextuse-frontend",
            "used": 104857600,
            "isActive": true
        }
    ]
}
```

### 5.4.3. 인터페이스 정의

```typescript
/**
 * 컨테이너별 디스크 사용량
 */
export interface DiskUsageByContainerVo {
    /** 컨테이너 이름 (ex: 'ray-server') */
    name: string;

    /** 사용량 (bytes) */
    used: number;

    /** 컨테이너 실행 상태 (ex: true / false) */
    isActive: boolean;
}
```

## 5.5. WS /ws/server/usage

     * 서버 사용량 통합 실시간 스트림

### 5.5.1. 요청 파라미터

없음

### 5.5.2. 응답 예시

```json
{
    "type": "containerResource",
    "hostname": "agent-01",
    "timestamp": "2025-05-06T12:00:00Z",
    "data": {
        "cpu": {
            "usagePercent": 45,
            "topTable": [
                {
                    "idx": 1,
                    "pid": 1234,
                    "user": "root",
                    "s": "running",
                    "mem": 1.2,
                    "command": "node"
                },
                {
                    "idx": 2,
                    "pid": 5678,
                    "user": "mysql",
                    "s": "sleep",
                    "mem": 0.8,
                    "command": "mysqld"
                }
            ]
        },
        "memory": {
            "usagePercent": 68,
            "topTable": [
                {
                    "idx": 1,
                    "pid": 4321,
                    "user": "ubuntu",
                    "s": "running",
                    "mem": 3.4,
                    "command": "chrome"
                },
                {
                    "idx": 2,
                    "pid": 8765,
                    "user": "root",
                    "s": "sleep",
                    "mem": 1.9,
                    "command": "java"
                }
            ]
        },
        "disk": {
            "activity": 43000
        }
    }
}
```

### 5.5.3. 인터페이스 정의

```typescript
/**
 * 서버 실시간 사용량 제공
 */
export interface UsageStreamVo {
    cpu: CpuUsageStreamVo;
    memory: MemoryUsageStreamVo;
    disk: DiskUsageStreamVo;
}

/**
 * 실시간 CPU 사용량
 */
export interface CpuUsageStreamVo {
    /**  사용율 (ex: 30) */
    usagePercent: number;

    /** CPU 사용 top table */
    topTable: TopTableStreamVo[];
}

/**
 * 실시간 메모리 사용량
 */
export interface MemoryUsageStreamVo {
    /** 사용율 (ex: 30) */
    usagePercent: number;

    /** 메모리 사용 top table */
    topTable: TopTableStreamVo[];
}

/**
 * 실시간 디스크 I/O 속도(평균)
 */
export interface DiskUsageStreamVo {
    /** 초당 I/O 평균 (ex: 30000)(bps) */
    activity: number;
}
/**
 * WebSocket용 toptable 전역 인터페이스 정의
 */
export interface TopTableStreamVo {
    /** 정렬 순서 */
    idx: number;

    /** 프로세스 ID (ex: 1234) */
    pid: number;

    /** 실행 유저 (ex: 'user') */
    user: string;

    /** 상태 (ex: 'running', 'sleep' 등) */
    s: string;

    /** 메모리 사용 비율 (ex: 2.3) */
    mem: number;

    /** 실행 명령어 (ex: 'mysqld'등) */
    command: string;
}
```

## 5.6. WS /ws/server/network

     * 네트워크 송수신량(bps) 실시간 스트림

### 5.6.1. 요청 파라미터

없음

### 5.6.2. 응답 예시

```json
{
    "type": "containerResource",
    "hostname": "agent-01",
    "timestamp": "2025-05-06T12:00:00Z",
    "data": [
        {
            "interface": "eth0",
            "rx": 125000,
            "tx": 98000
        },
        {
            "interface": "wlan0",
            "rx": 87000,
            "tx": 65000
        }
    ]
}
```

### 5.6.3. 인터페이스 정의

```typescript
/**
 * 실시간 네트워크 사용량
 */
export interface NetworkUsageStreamVo {
    /** 네트워크 인터 페이스 (ex: eth0) */
    interface: string;

    /** 초당 수신 바이트(bps) */
    rx: number;

    /** 초당 송신 바이트(bps) */
    tx: number;
}
```

</details>
