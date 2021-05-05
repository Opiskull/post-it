import useWebSocket from 'react-use-websocket';
import { useAppDispatch } from './hooks';
import {
    addPost,
    addPosts,
    deletePost,
    Post,
    postsSlice,
    updatePost
} from './slices/postsSlice';

const handleMessages = (dispatch: any) => {
    return (e: MessageEvent<any>) => {
        const handlers = new Map<string, (payload?: any) => void>();

        console.log(e.data);

        const data = JSON.parse(e.data);

        handlers.set('error', (error: { message: string }) => {
            console.log(JSON.stringify(error));
        });
        handlers.set('post/addPost', (post: Post) => dispatch(addPost(post)));
        handlers.set('post/updatePost', (post: Post) => {
            console.log(post);

            dispatch(updatePost(post));
        });
        handlers.set('post/deletePost', (postId: string) =>
            dispatch(deletePost(postId))
        );
        handlers.set('newSession', (payload: { board: { posts: Post[] } }) => {
            dispatch(addPosts(payload.board.posts));
        });

        const handler = handlers.get(data.type);
        if (handler) {
            handler(data.payload);
        }
    };
};

export const WebSocketHandler = (props: { url: string }) => {
    const dispatch = useAppDispatch();

    const { sendJsonMessage } = useWebSocket(props.url, {
        share: true,
        onMessage: handleMessages(dispatch)
    });

    return <></>;
};

// switch (data.type) {
//     case 'set':
//       let post: Post = data.post;
//       if (!post.id) {
//         let id: string = `${Date.now()}`;
//         post.id = id;
//       }
//       this.posts.set(`post.${post.id}`, post);
//       await this.state.storage.put(`post.${post.id}`, post);
//       this.broadcast({ type: 'set', post });
//       break;
//     case 'delete':
//       const postId = data.post.id;
//       this.posts.delete(`post.${postId}`);
//       await this.state.storage.delete(`post.${postId}`);
//       this.broadcast({ type: 'delete', postId });
//       break;
//     case 'config':
//       const board = {
//         posts: Array.from(this.posts?.values()),
//         config: this.config,
//         users: [this.sessions.map(_ => _.name)]
//       };
//       session.sendMessage({ type: 'config', board });
//       break;
//     case 'setName':
//       let name: string = data.name;
//       if (this.sessions.find(_ => _.name === name)) {
//         session.sendError(`name ${name} already in use`);
//       } else {
//         const oldName = session.name;
//         const newName = name;
//         session.name = newName;
//         this.broadcast({ type: 'nameChanged', oldName, newName });
//       }
//       break;
//     case 'users':
//       session.sendMessage({
//         type: 'users',
//         users: [this.sessions.map(_ => _.name)]
//       });
//       break;
//     case 'setOwner':
//       if (this.config?.owner) {
//         session.sendError(`can only be owner when no owner exists`);
//       } else {
//         let oldOwner = this.config?.owner;
//         let newOwner = data.owner;
//         if (this.config) {
//           this.config.owner = newOwner;
//         }
//         await this.state.storage.put('config', this.config);

//         this.broadcast({ type: 'ownerChanged', oldOwner, newOwner });
//       }
//       break;
