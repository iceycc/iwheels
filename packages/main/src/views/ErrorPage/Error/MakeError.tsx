import React, {useEffect} from 'react';

const MakeError = ({name = ''}) => {
    useEffect(() => {
        const number = Math.random();
        if (number > 0.5) {
            throw new Error('大于0.5');
        }
    }, []);

    return <div>组件{name}</div>
}

export default MakeError;
