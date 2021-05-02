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
    onDelete: () => void;
    editable?: boolean;
    creator: string;
}

export const Post = (props: PostProps) => {
    const [state, setState] = useState<PostProps>(props);

    const { height, width, x, y } = state;

    const [editable, setEditable] = useState(props.editable || false);

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
            minHeight={100}
            minWidth={150}
            style={{
                backgroundColor: state.backgroundColor || 'white',
                boxShadow:
                    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                display: 'flex',
                flexDirection: 'column'
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
            onDoubleClick={(e: MouseEvent) => {
                setEditable(true);
                e.stopPropagation();
            }}
        >
            <div
                className="action"
                style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <span>{props.creator}</span>
                <button
                    onClick={() => {
                        props.onDelete();
                    }}
                >
                    delete
                </button>
            </div>
            <div className="content" style={{ overflow: 'auto', flex: '1' }}>
                {props.editableNode && editable
                    ? props.editableNode
                    : props.children}
            </div>
        </Rnd>
    );
};
