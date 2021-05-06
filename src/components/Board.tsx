import { useAppSelector, usePublisher } from '../hooks';
import { addPost, deletePost, Post, selectPosts } from '../slices/postsSlice';
import { TextPost } from './TextPost';

const defaultPost = {
    y: 400,
    x: 400,
    text: '',
    width: 150,
    height: 100
} as Post;

export const Board = () => {
    const posts = useAppSelector(selectPosts);
    const publish = usePublisher();

    const createPost = (post: any) => {
        publish(addPost({ ...defaultPost, ...post }));
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
                createPost({ x: e.pageX, y: e.pageY });
                e.stopPropagation();
            }}
        >
            <div className="posts">
                {posts.map((_) => (
                    <TextPost
                        id={_.id}
                        key={_.id}
                        onDelete={() => publish(deletePost(_.id))}
                    ></TextPost>
                ))}
            </div>
            <div className="actions">
                <button
                    onClick={(e) => {
                        createPost({});
                    }}
                >
                    add
                </button>
            </div>
        </div>
    );
};
