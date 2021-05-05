import React from 'react';
import { Board } from './components/Board';
import { WebSocketHandler } from './WebSocketHandler';

function App() {
    return (
        <div>
            <Board></Board>
            <WebSocketHandler url="wss://cf-post-it.opi.workers.dev/testing1/ws"></WebSocketHandler>
        </div>
    );
}

export default App;
