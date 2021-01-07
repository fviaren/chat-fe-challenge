import { animateScroll } from 'react-scroll';

export const scrollToBottom =() => {
    animateScroll.scrollToBottom({
    containerId: 'chat'
});
};