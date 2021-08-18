import React, {useEffect, useState} from 'react';
import FallbackComponentExample from "./Example/FallbackComponentExample";
import FallbackExample from "./Example/FallbackExample";
import FallbackRenderExample from "./Example/FallbackRenderExample";
import ResetKeysExample from "./Example/ResetKeysExample";
import UseErrorHandlerExample from "./Example/UseErrorHandlerExample";
import WithErrorBoundaryExample from "./Example/WithErrorBoundaryExample";

function ErrorPage1() {
    const style = {
        li: {
            padding: '20px', border: '1px solid #666'
        }
    }
    const examples = [FallbackComponentExample, FallbackExample, FallbackRenderExample, ResetKeysExample, UseErrorHandlerExample, WithErrorBoundaryExample]
    return (
        <ul>
            {
                examples.map((Item, index) => {
                    return <li style={style.li} key={index}>
                        <Item name={'组件'+Item.name}/>
                    </li>
                })
            }

        </ul>
    );
}

export default ErrorPage1;
