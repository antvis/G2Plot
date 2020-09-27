/**
 * get the element's bounding size
 * @param ele dom element
 * @returns the element width and height
 */
export function getPercentTooltipTemplate(value: string, items: any[]): HTMLElement {
  const container = document.createElement('div');
  container.className = 'g2-tooltip';
  const title = `<h4>${value}</h4>`;
  let listItem = '';
  items.forEach((item) => {
    listItem += `<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;display:flex;">
        <span style="background-color:${item.mappingData?.color};" class="g2-tooltip-marker"></span>
        <span style="display:inline-flex;flex:1;justify-content:space-between">
        <span style="margin-right: 16px;">${item.name}:</span><span>${(item.value * 100).toFixed(2)}%</span>
        </span>
    </li>`;
  });
  container.innerHTML = title + listItem;
  return container;
}
