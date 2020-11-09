/**
 * 创建一个 div 节点，并放到 container，默认放到 body 上
 * @param title
 * @param container
 * @param id  容器 id
 */
export function createDiv(title: string = '', container: HTMLElement = document.body, id?: string): HTMLElement {
  const div = document.createElement('div');
  if (id) {
    div.id = id;
  }
  if (title) {
    const titleDiv = document.createElement('div').appendChild(document.createTextNode(title));
    container.appendChild(titleDiv);
  }

  container.appendChild(div);

  return div;
}

/**
 * 移除 dom 元素
 * @param dom
 */
export function removeDom(dom: HTMLElement) {
  const parent = dom.parentNode;

  if (parent) {
    parent.removeChild(dom);
  }
}
