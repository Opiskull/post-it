import produce from 'immer';
import React, { useState } from 'react';
import { PostData } from './post-data';
import { TextPost } from './TextPost';

export const Board = () => {
    const [posts, setPosts] = useState<PostData[]>([
        {
            x: 0,
            y: 0,
            height: 10,
            width: 50,
            text: 'test',
            id: 1,
            type: 'text',
            creator: 'carl'
        },
        {
            x: 34,
            y: 0,
            height: 23,
            width: 666,
            text: 'tedsdst',
            id: 2,
            type: 'text',
            creator: 'carl'
        },
        {
            x: 0,
            y: 100,
            height: 343,
            width: 233,
            text: 'tesdst',
            id: 3,
            type: 'text',
            creator: 'carl'
        },
        {
            x: 23,
            y: 400,
            height: 34,
            width: 545,
            text: 'tdsest',
            id: 4,
            type: 'text',
            creator: 'carl'
        }
    ]);

    const [postId, setPostId] = useState(5);

    const deletePost = (postId: Number) => {
        setPosts(
            produce(posts, (draft) => {
                const postIndex = draft.findIndex((p) => p.id === postId);
                if (postIndex !== -1) {
                    draft.splice(postIndex, 1);
                }
            })
        );
    };

    const addPost = (post: any) => {
        setPosts(
            produce(posts, (draft) => {
                setPostId(postId + 1);
                draft.push({
                    x: 44,
                    y: 44,
                    height: 50,
                    width: 100,
                    text: '',
                    type: 'text',
                    ...post,
                    id: postId,
                    editable: true
                });
            })
        );
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
                addPost({ x: e.pageX, y: e.pageY });
                e.stopPropagation();
            }}
        >
            <div className="posts">
                {posts.map((_) => (
                    <TextPost
                        {..._}
                        key={_.id}
                        onDelete={() => deletePost(_.id)}
                    ></TextPost>
                ))}
            </div>
            <div className="actions">
                <button
                    onClick={(e) => {
                        addPost({ x: 500, y: 500 });
                    }}
                >
                    add
                </button>
            </div>
        </div>
    );
};
