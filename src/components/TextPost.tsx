import produce from 'immer';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector, usePublished } from '../hooks';
import { updatePost } from '../slices/postsSlice';
import { Post, PostProps } from './Post';

export interface TextPostProps extends PostProps {}

const textToParagraph = (text: string) =>
    text.split(/(?:\r\n|\r|\n)/g).map((_, i) => (
        <span key={i}>
            {_} <br />
        </span>
    ));

export const TextPost = (props: TextPostProps) => {
    const post = useAppSelector((_) =>
        _.posts.posts.find((_) => _.id === props.id)
    ) as any;
    const dispatch = useAppDispatch();
    const publishUpdate = usePublished();
    const editable = (
        <textarea
            style={{
                height: '100%',
                width: '100%',
                resize: 'none'
            }}
            value={post.text}
            onChange={(e) => {
                dispatch(updatePost({ ...post, text: e.target.value }));
                publishUpdate(updatePost({ ...post, text: e.target.value }))();
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
