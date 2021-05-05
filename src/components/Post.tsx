import { ReactNode, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import useWebSocket from 'react-use-websocket';
import { useAppDispatch, useAppSelector, usePublished } from '../hooks';
import { selectPosts, updatePost } from '../slices/postsSlice';

export interface PostProps {
    children?: ReactNode;
    editableNode?: ReactNode;
    onDelete: () => void;
    editable?: boolean;
    id: string;
}

export const Post = (props: PostProps) => {
    const posts = useAppSelector(selectPosts);
    const dispatch = useAppDispatch();
    const post = posts.find((_) => _.id === props.id) as any;

    const { sendJsonMessage } = useWebSocket(
        'wss://cf-post-it.opi.workers.dev/testing1/ws',
        {
            share: true
        }
    );

    const { height, width, x, y } = post;

    const [editable, setEditable] = useState(props.editable || false);

    const self = useRef<Rnd>(null);
    const stopEdit = (e: MouseEvent) => {
        if (
            self?.current
                ?.getSelfElement()
                ?.contains(e.target as HTMLDivElement)
        ) {
            return;
        }
        setEditable(false);
    };

    const publishUpdate = usePublished();

    useEffect(() => {
        document.addEventListener('click', stopEdit);
        return () => {
            document.removeEventListener('click', stopEdit);
        };
    }, []);

    return (
        <Rnd
            ref={self}
            bounds="window"
            size={{ height, width }}
            position={{ x, y }}
            onDragStop={(e, d) => {
                dispatch(updatePost({ ...post, x: d.x, y: d.y }));
                publishUpdate(updatePost({ ...post, x: d.x, y: d.y }))();
            }}
            minHeight={100}
            minWidth={150}
            style={{
                backgroundColor: post.backgroundColor || 'white',
                boxShadow:
                    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                display: 'flex',
                flexDirection: 'column'
            }}
            onResize={(e, direction, ref, delta, pos) => {
                dispatch(
                    updatePost({
                        ...post,
                        x: pos.x,
                        y: pos.y,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight
                    })
                );
                publishUpdate(
                    updatePost({
                        ...post,
                        x: pos.x,
                        y: pos.y,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight
                    })
                )();
            }}
            disableDragging={editable}
            onDoubleClick={(e: MouseEvent) => {
                setEditable(true);
                e.stopPropagation();
            }}
        >
            <div
                className="action"
                style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <span>{post?.creator}</span>
                <button
                    onClick={() => {
                        props.onDelete();
                    }}
                >
                    delete
                </button>
            </div>
            <div className="content" style={{ overflow: 'auto', flex: '1' }}>
                {props.editableNode && editable
                    ? props.editableNode
                    : props.children}
            </div>
        </Rnd>
    );
};
