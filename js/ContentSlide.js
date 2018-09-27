import { h } from './h.js';
import { Frame } from './Frame.js';

export const ContentSlide = ({ title, main, aside }) => h('article', { className: 'contentSlide' }, [
  h(Frame, [h('h1', title)]),
  h('main', [main()]),
  h('aside', [aside()]),
]);

export const LargeContentSlide = ({ title, main }) => h('article', { className: 'largeContentSlide' }, [
  h(Frame, [h('h1', title)]),
  h('main', [main()]),
]);
