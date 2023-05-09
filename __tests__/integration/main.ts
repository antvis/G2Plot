import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import * as plots from './plots';

const cases = {
  ...plots,
};

const renderers = {
  canvas: CanvasRenderer,
  svg: SVGRenderer,
};

const app = document.getElementById('app') as HTMLElement;
// Create a plot container.
const container = document.createElement('div');
container.className = 'container';
container.style.width = '800px';
container.style.height = '500px';
// Create a case select.
const caseSelect = document.createElement('select') as HTMLSelectElement;
caseSelect.style.margin = '12px';
caseSelect.append(...Object.keys(cases).map(createOptions));
caseSelect.onchange = onchange;

addEventListener('popstate', () => {
  const { value } = history.state;
  caseSelect.value = value;
  plot();
});
// Create a renderer select.
const rendererSelect = document.createElement('select') as HTMLSelectElement;
rendererSelect.style.margin = '12px 0';
rendererSelect.append(...['canvas', 'svg'].map(createOptions));
rendererSelect.onchange = onchange;

// @ts-ignore
const initialValue = new URL(location).searchParams.get('name') as string;
if (cases[initialValue]) caseSelect.value = initialValue;

function createOptions(key) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = key;
  return option;
}

function onchange() {
  const { value } = caseSelect;
  const { value: renderer } = rendererSelect;
  history.pushState({ value, renderer }, '', `?name=${value}&renderer=${renderer}`);
  plot();
}

async function plot() {
  container.innerHTML = '';
  const generate = cases[caseSelect.value];
  generate(container, new renderers[rendererSelect.value]());
}

app.append(caseSelect, rendererSelect, container);
plot();
