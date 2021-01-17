import './style.scss';

import { Guide } from '../lib/guide';
import { BiScrollbar } from '@orange4glace/biscrollbar'

const container = document.getElementById('ruler-container');
const scrollContainer = document.getElementById('scroll-container');

function format(index: number): string {
  const ss = index % 60;
  const mm = Math.floor(index / 60);
  const hh = Math.floor(index / 3600);
  return `${`0${hh}`.slice(-2)}:${`0${mm}`.slice(-2)}:${`0${ss}`.slice(-2)}`;
}

const guide = new Guide(container, {
  textProvider: format
}, container.offsetWidth, container.offsetHeight);

const scrollbar = new BiScrollbar(scrollContainer);
scrollbar.layout(scrollContainer.offsetWidth, scrollContainer.offsetHeight);
scrollbar.setSize(1500);
scrollbar.setRagne(850, 1000);
scrollbar.pivot = 975;


function updateGuide() {
  guide.setRange(scrollbar.start, scrollbar.end);
}

guide.layout(container.offsetWidth, 30);
updateGuide();
scrollbar.onChange(() => {
  updateGuide();
});