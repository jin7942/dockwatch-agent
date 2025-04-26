// 파서 관련 유틸 모음

/**
 * 디스크 사이즈 문자열을 bytes 단위로 변환하는 함수
 *
 * @param size "15.2MB" 같은 문자열
 * @returns 변환된 bytes 수
 */
export const parseSize = (size: string): number => {
    if (!size) return 0;

    const regex = /^([\d.]+)\s*(KB|MB|GB|TB)?$/i;
    const match = size.trim().match(regex);

    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[2]?.toUpperCase() || 'B'; // 없으면 바이트로 가정

    switch (unit) {
        case 'KB':
            return Math.round(value * 1024);
        case 'MB':
            return Math.round(value * 1024 ** 2);
        case 'GB':
            return Math.round(value * 1024 ** 3);
        case 'TB':
            return Math.round(value * 1024 ** 4);
        default:
            return Math.round(value); // 단위 없으면 그냥 숫자 리턴
    }
};
