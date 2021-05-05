import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Post {
    x: number;
    y: number;
    height: number;
    width: number;
    text: string;
    id: string;
    type: string;
    creator: string;
    backgroundColor?: string;
}

// Define a type for the slice state
interface PostsState {
    posts: Post[];
}

// Define the initial state using that type
const initialState: PostsState = {
    posts: []
};

export const postsSlice = createSlice({
    name: 'post',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            const post = action.payload;
            state.posts.push(post);
        },
        updatePost: (state, action: PayloadAction<Post>) => {
            const post = action.payload;
            const index = state.posts.findIndex((p) => p.id === post.id);
            if (index !== -1) {
                state.posts.splice(index, 1, post);
            }
        },
        deletePost: (state, action: PayloadAction<string>) => {
            const postId = action.payload;
            state.posts = state.posts.filter((p) => p.id !== postId);
        },
        addPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        }
    }
});

export const { addPost, deletePost, updatePost, addPosts } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, id: string) =>
    state.posts.posts.find((_) => _.id === id);

export default postsSlice.reducer;
