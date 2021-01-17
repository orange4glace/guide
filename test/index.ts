import './style.scss';

import { Guide } from '../lib/guide';
import { BiScrollbar } from '@orange4glace/biscrollbar'

const rulerContainer = document.getElementById('ruler-container');
const scrollContainer = document.getElementById('scroll-container');
const pivotEl = document.getElementById('pivot-indicator');

function format(index: number): string {
  const ss = index % 60;
  const mm = Math.floor(index / 60);
  const hh = Math.floor(index / 3600);
  return `${`0${hh}`.slice(-2)}:${`0${mm}`.slice(-2)}:${`0${ss}`.slice(-2)}`;
}

const guide = new Guide(rulerContainer, {
  textProvider: format
}, rulerContainer.offsetWidth, rulerContainer.offsetHeight);

const scrollbar = new BiScrollbar(scrollContainer);
scrollbar.layout(scrollContainer.offsetWidth, scrollContainer.offsetHeight);
scrollbar.setSize(1500);
scrollbar.setRagne(850, 1000);
scrollbar.pivot = 975;


function updateGuide() {
  guide.setRange(scrollbar.start, scrollbar.end);
  console.log(scrollbar.start, scrollbar.end, (scrollbar.start + scrollbar.end) / 2, pivot);
}

let pivot: number;
function updatePivotPosition() {
  const position = guide.calculatePositionFromValue(pivot);
  pivotEl.style.left = `${position}px`;
}

function setPivot(e: MouseEvent) {
  const rect = rulerContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const value = guide.calculateValueFromOffset(x, y);
  console.log(value);
  pivot = value;
  scrollbar.pivot = value;
  updatePivotPosition();
}

rulerContainer.addEventListener('mousedown', e => {
  setPivot(e);
  document.addEventListener('mousemove', setPivot);
  const mouseup = () => {
    document.removeEventListener('mousemove', setPivot);
    document.removeEventListener('mouseup', mouseup);
  }
  document.addEventListener('mouseup', mouseup);
});

guide.layout(rulerContainer.offsetWidth, 30);
updateGuide();
scrollbar.onChange(() => {
  updateGuide();
});
guide.onUpdate(() => {
  updatePivotPosition();
})