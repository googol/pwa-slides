import { h } from './h.js';

export const TitleSlide = () => h('article', { className: 'titleSlide' }, [
  h('img', { className: 'titleImage', src: '/pwa.svg' }),
  h('h1', 'Introduction to Progressive web apps'),
  h('div', { className: 'credits' },  [
    h('p', [h('strong', 'Miika Hänninen')]),
    h('p', 'Reaktor'),
  ]),
]);
