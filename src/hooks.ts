import { useCallback, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useDebounce = (callback: () => void, delay: number = 500) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [delay, callback]);
};

export const usePublished = () => {
    const { sendJsonMessage } = useWebSocket(
        'wss://cf-post-it.opi.workers.dev/testing1/ws',
        {
            share: true
        }
    );

    const publishUpdate = useCallback(
        (message) =>
            debounce(() => {
                sendJsonMessage(message);
            }, 500),
        []
    );

    return publishUpdate;
};

export const debounce = (callback: (...args: any[]) => void, delay = 350) => {
    let timeoutId: any;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = null;
            callback(...args);
        }, delay);
    };
};
