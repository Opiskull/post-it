import React from 'react';
import { TextPost } from './TextPost';

export const Board = () => {
    const posts = [
        {
            x: 0,
            y: 0,
            height: 10,
            width: 50,
            text: 'test',
            id: 1,
            type: 'text'
        },
        {
            x: 34,
            y: 0,
            height: 23,
            width: 666,
            text: 'tedsdst',
            id: 2,
            type: 'text'
        },
        {
            x: 0,
            y: 100,
            height: 343,
            width: 233,
            text: 'tesdst',
            id: 3,
            type: 'text'
        },
        {
            x: 23,
            y: 400,
            height: 34,
            width: 545,
            text: 'tdsest',
            id: 4,
            type: 'text'
        }
    ];
    return (
        <div className="board">
            <div className="posts">
                {posts.map((_) => (
                    <TextPost {..._} key={_.id}></TextPost>
                ))}
            </div>
            <div className="actions"></div>
        </div>
    );
};
