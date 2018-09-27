import { h } from './h.js';
import { ContentSlide } from './ContentSlide.js';

export const VideoSlide = ({ title, main, videoStream }) => h(ContentSlide, {
  title,
  main: main,
  aside: () => h('video', { style: { width: '100%', height: '100%', objectFit: 'cover', overflow: 'hidden' }, ref: (element) => { if (element) { element.srcObject = videoStream; element.onloadedmetadata = () => element.play(); } } }),
});


