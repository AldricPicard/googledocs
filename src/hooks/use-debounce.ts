import { useCallback, useRef } from "react";

export function useDebounce<
    T extends (...args: Parameters<T>) => ReturnType<T>,
>(callBack: T, delay: number = 500) {
    const timeoutRef = useRef<NodeJS.Timeout>();

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callBack(...args);
            }, delay);
        },
        [callBack, delay],
    );
};