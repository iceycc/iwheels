import React, {useEffect, useState} from 'react';
import {useErrorHandler} from "@iwheels/react-error-boundary"

const AsyncError = ({name = ''}) => {
    const handleError = useErrorHandler();

    const [number, setNumber] = useState<number>(0);

    const randomlyFetchData = async () => {
        return Math.random();
    }

    useEffect(() => {
        randomlyFetchData().then(number => {
            if (number > 0.5) {
                throw new Error('async 大于 0.5');
            } else {
                setNumber(number);
            }
        }).catch(handleError);
    }, []);

    return <div>组件{name}{number}</div>
}

export default AsyncError;
