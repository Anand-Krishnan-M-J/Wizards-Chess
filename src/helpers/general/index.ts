export const joinClass = (...classNames: string[]): string =>
    classNames
        .filter((className: string) => !!className)
        .map((className: string) => className)
        .join(' ')
export const isMobileDevice = () => {
    const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined')
        return mobileRegex.test(navigator?.userAgent)
    else return false
}
