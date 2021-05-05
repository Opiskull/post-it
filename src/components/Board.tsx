import useWebSocket from 'react-use-websocket';
import { useAppSelector } from '../hooks';
import { addPost, deletePost, selectPosts } from '../slices/postsSlice';
import { TextPost } from './TextPost';

export const Board = () => {
    const posts = useAppSelector(selectPosts);
    const { sendJsonMessage } = useWebSocket(
        'wss://cf-post-it.opi.workers.dev/testing1/ws',
        {
            share: true
        }
    );
    const dispatch = (data: any) => {
        sendJsonMessage(data);
        // appDispatch(data);
    };

    return (
        <div
            className="board"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
            onDoubleClick={(e) => {
                dispatch(
                    addPost({
                        x: e.pageX,
                        y: e.pageY,
                        text: '',
                        width: 150,
                        height: 100
                    } as any)
                );
                e.stopPropagation();
            }}
        >
            <div className="posts">
                {posts.map((_) => (
                    <TextPost
                        id={_.id}
                        key={_.id}
                        onDelete={() => dispatch(deletePost(_.id))}
                    ></TextPost>
                ))}
            </div>
            <div className="actions">
                <button
                    onClick={(e) => {
                        dispatch(
                            addPost({
                                x: 500,
                                y: 500,
                                text: '',
                                width: 150,
                                height: 100
                            } as any)
                        );
                    }}
                >
                    add
                </button>
            </div>
        </div>
    );
};
