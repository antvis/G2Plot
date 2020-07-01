export const createDiv = (id?: string): HTMLDivElement => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = id;
  document.body.appendChild(canvasDiv);
  return canvasDiv;
};
