export const createDiv = (cls?: string): HTMLDivElement => {
  const canvasDiv = document.createElement('div');
  document.body.style.fontFamily = "roboto-regular";
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.margin = '10px auto';
  canvasDiv.style.border = '0.5px solid #ddd';
  canvasDiv.className = cls;
  document.body.appendChild(canvasDiv);
  return canvasDiv;
};

export const createTitle = (div: HTMLDivElement, title: string): void => {
  const titleDiv = document.createElement('div');
  titleDiv.innerHTML = title;
  titleDiv.className = "title-div";
  titleDiv.style.padding = '0 12px';
  div.appendChild(titleDiv);
}

export const createDiscription = (div: HTMLDivElement, description: string): void => {
  const descriptionDiv = document.createElement('div');
  descriptionDiv.innerHTML = description;
  descriptionDiv.className = "description-div";
  descriptionDiv.style.padding = '0 12px';
  descriptionDiv.style.color = '#999';
  descriptionDiv.style.fontSize = '12px';
  div.appendChild(descriptionDiv);
}