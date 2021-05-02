import produce from 'immer';
import React, { useState } from 'react';
import { Post, PostProps } from './Post';

export interface TextPostProps extends PostProps {
    text: string;
}

const textToParagraph = (text: string) =>
    text.split(/(?:\r\n|\r|\n)/g).map((_, i) => (
        <span key={i}>
            {_} <br />
        </span>
    ));

export const TextPost = (props: TextPostProps) => {
    const [state, setState] = useState(props);
    const editable = (
        <textarea
            style={{
                height: '100%',
                width: '100%',
                resize: 'none'
            }}
            value={state.text}
            onChange={(e) =>
                setState(
                    produce(state, (_) => {
                        _.text = e.target.value;
                    })
                )
            }
            autoFocus={true}
        ></textarea>
    );
    return (
        <Post {...props} editableNode={editable}>
            {textToParagraph(state.text)}
        </Post>
    );
};
