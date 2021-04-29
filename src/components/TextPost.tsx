import produce from 'immer';
import React, { useState } from 'react';
import { Post, PostProps } from './Post';

export interface TextPostProps extends PostProps {
    text: string;
}

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
        ></textarea>
    );
    return (
        <Post {...props} editableNode={editable}>
            {state.text}
        </Post>
    );
};
