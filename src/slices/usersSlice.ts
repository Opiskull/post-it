import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface User {
    name: string;
}

// Define a type for the slice state
interface UsersState {
    users: User[];
}

// Define the initial state using that type
const initialState: UsersState = {
    users: []
};

export const usersSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            const user = action.payload;
            state.users.push(user);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            const userName = action.payload;
            state.users = state.users.filter((p) => p.name !== userName);
        },
        changeUsername: (
            state,
            action: PayloadAction<{ newName: string; oldName: string }>
        ) => {
            const user = state.users.find(
                (_) => _.name === action.payload.oldName
            );
            if (user) {
                user.name = action.payload.newName;
            }
        }
    }
});

export const { addUser, removeUser, changeUsername } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts;

export default usersSlice.reducer;
