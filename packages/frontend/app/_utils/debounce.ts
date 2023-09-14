export function debounce<T extends any[]>(func: (...args: T) => void, wait: number): (...args: T) => void {
    let timeout: NodeJS.Timeout | null;
    return function(...args: T): void {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
