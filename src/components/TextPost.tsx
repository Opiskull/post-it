import React from 'react';
import { useAppSelector, useDispatchAndDebouncedPublish } from '../hooks';
import { selectPostById, updatePost } from '../slices/postsSlice';
import { Post, PostProps } from './Post';

export interface TextPostProps extends PostProps {}

const textToParagraph = (text: string) =>
    text.split(/(?:\r\n|\r|\n)/g).map((_, i) => (
        <span key={i}>
            {_} <br />
        </span>
    ));

export const TextPost = (props: TextPostProps) => {
    const post = useAppSelector(selectPostById(props.id));
    const dispatch = useDispatchAndDebouncedPublish();
    const editable = (
        <textarea
            style={{
                flex: 1,
                resize: 'none'
            }}
            value={post.text}
            onChange={(e) => {
                dispatch(updatePost({ ...post, text: e.target.value }));
            }}
            autoFocus={true}
        ></textarea>
    );
    return (
        <Post {...props} editableNode={editable}>
            {textToParagraph(post.text || '')}
        </Post>
    );
};
