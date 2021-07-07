function createTextElement(child) {
    return child;
}
export function createElement(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    props = Object.assign({}, props);
    props.children = [].concat.apply([], children).filter(function (child) { return child != null && child !== false; })
        .map(function (child) { return child instanceof Object ? child : createTextElement(child); });
    return { type: type, props: props };
}
