function createTextElement(child) {
    return child
}
export function createElement(type, props, ...children) {
    props = Object.assign({}, props);
    props.children = [].concat(...children)
        .filter(child => child != null && child !== false)
        .map(child => child instanceof Object ? child : createTextElement(child));
    return {type, props};
}

