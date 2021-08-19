import * as React from 'react';
import { Component, ReactNode } from 'react';
interface EventListenerOptions {
    useCapture: boolean;
    passive: boolean;
}
interface Props {
    loadMore: (pageLoaded: number) => void;
    loader: ReactNode;
    initialLoad?: boolean;
    element?: string;
    ref?: (node: HTMLElement | null) => void;
    threshold?: number;
    isReverse?: boolean;
    hasMore?: boolean;
    pageStart?: number;
    getScrollParent?: () => HTMLElement;
    useWindow?: boolean;
    useCapture?: boolean;
}
declare class InfiniteScroll extends Component<Props, any> {
    private scrollComponent;
    private loadingMore;
    private pageLoaded;
    private eventOptions;
    private beforeScrollTop;
    private beforeScrollHeight;
    static defaultProps: {
        initialLoad: boolean;
        element: string;
        threshold: number;
        isReverse: boolean;
        hasMore: boolean;
        pageStart: number;
        getScrollParent: null;
        useWindow: boolean;
        useCapture: boolean;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    isPassiveSupported(): boolean;
    getEventListenerOptions(): EventListenerOptions;
    scrollListener(): void;
    mousewheelListener(e: Event): void;
    calculateOffset(el: HTMLElement | null, scrollTop: number): number;
    calculateTopPosition(el: HTMLElement | null): number;
    getParentElement(el: HTMLElement | null): HTMLElement | null;
    attachListeners(): void;
    detachMousewheelListener(): void;
    detachListeners(): void;
    render(): React.DOMElement<React.DOMAttributes<HTMLElement>, HTMLElement>;
}
export default InfiniteScroll;
