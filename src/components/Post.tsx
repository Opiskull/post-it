import produce from 'immer';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

export interface PostProps {
    width: number;
    height: number;
    x: number;
    y: number;
    children?: ReactNode;
    backgroundColor?: string;
    editableNode?: ReactNode;
    type: string;
}

export const Post = (props: PostProps) => {
    const [state, setState] = useState<PostProps>(props);

    const { height, width, x, y } = state;

    const [editable, setEditable] = useState(false);

    const self = useRef<Rnd>(null);
    const stopEdit = (e: MouseEvent) => {
        if (
            self?.current
                ?.getSelfElement()
                ?.contains(e.target as HTMLDivElement)
        ) {
            return;
        }
        setEditable(false);
    };

    useEffect(() => {
        document.addEventListener('click', stopEdit);
        return () => {
            document.removeEventListener('click', stopEdit);
        };
    }, []);

    return (
        <Rnd
            ref={self}
            bounds="window"
            size={{ height, width }}
            position={{ x, y }}
            onDragStop={(e, d) => {
                setState(
                    produce(state, (_) => {
                        _.x = d.x;
                        _.y = d.y;
                    })
                );
            }}
            minHeight={50}
            minWidth={100}
            style={{
                border: '1px black solid',
                backgroundColor: state.backgroundColor || 'white'
            }}
            onResize={(e, direction, ref, delta, pos) => {
                setState(
                    produce(state, (_) => {
                        _.x = pos.x;
                        _.y = pos.y;
                        _.width = ref.offsetWidth;
                        _.height = ref.offsetHeight;
                    })
                );
            }}
            disableDragging={editable}
            onDoubleClick={() => {
                setEditable(true);
            }}
        >
            {props.editableNode && editable
                ? props.editableNode
                : props.children}
        </Rnd>
    );
};
