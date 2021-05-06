import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import useWebSocket, { Options } from 'react-use-websocket';
import { AppDispatch, RootState } from './store';
import { useDebouncedCallback } from 'use-debounce';
import { AnyAction } from 'redux';

export const useDebounce = (func: (...args: any[]) => any) =>
    useDebouncedCallback(func, 300);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppWebSocket = (options?: Options) =>
    useWebSocket('wss://cf-post-it.opi.workers.dev/testing1/ws', {
        ...options,
        ...{
            share: true
        }
    });

export const useDebouncedPublisher = () => {
    const publisher = usePublisher();
    const debounced = useDebounce((msg: any) => {
        publisher(msg);
    });

    return debounced;
};

export const usePublisher = () => {
    const { sendJsonMessage } = useAppWebSocket();
    return sendJsonMessage;
};

export const useDispatchAndDebouncedPublish = () => {
    const dispatch = useAppDispatch();
    const publish = useDebouncedPublisher();
    return (action: AnyAction) => {
        dispatch(action);
        publish(action);
    };
};

type AnyEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = (
    ref: () => HTMLElement | undefined | null,
    handler: (event: AnyEvent) => void
) => {
    useEffect(() => {
        const listener = (event: AnyEvent) => {
            const el = ref();

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener(`mousedown`, listener);
        document.addEventListener(`touchstart`, listener);

        return () => {
            document.removeEventListener(`mousedown`, listener);
            document.removeEventListener(`touchstart`, listener);
        };

        // Reload only if ref or handler changes
    }, [ref, handler]);
};
