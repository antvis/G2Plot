import { render } from '@antv/g2';
import * as plots from './plots';

const cases = {
  ...plots,
};

const app = document.getElementById('app') as HTMLElement;
// Create a plot container.
const container = document.createElement('div');
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
  history.pushState(
    { value, renderer },
    '',
    `?name=${value}&renderer=${renderer}`,
  );
  plot();
}

async function plot() {
  const generate = cases[caseSelect.value];
  const options = generate();

  // @todo: G2 should support pass a renderer instance, not a G Cavnas instance to the API signature.
  container.replaceChildren(render(options));
}

app.append(caseSelect, rendererSelect, container);
plot();
