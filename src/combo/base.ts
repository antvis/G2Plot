import { deepMix, each, mix } from '@antv/util';
import TextDescription from '../components/description';
import BBox from '../util/bbox';
import Layer, { LayerConfig } from '../base/layer';
import { isTextUsable } from '../util/common';
import ThemeController from '../base/controller/theme';

export interface ComboViewConfig {
  title?: ITitle;
  description?: IDescription;
}

import { IDescription, ITitle } from '../interface/config';

export interface IComboViewLayer extends ComboViewConfig, LayerConfig {}

export default abstract class ComboViewLayer<T extends IComboViewLayer = IComboViewLayer> extends Layer<T> {
  public static getDefaultOptions(): Partial<ComboViewConfig> {
    return {};
  }

  public initialOptions: T;
  public title: TextDescription;
  public description: TextDescription;
  public viewRange: BBox;
  public theme: any;
  public type: string;
  protected themeController: ThemeController;

  constructor(props: T) {
    super(props);
    this.options = this.getOptions(props);
    this.initialOptions = deepMix({}, this.options);
    this.themeController = new ThemeController();
  }

  public getOptions(props: Partial<T>): T {
    const curOptions = this.options || {};
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions(props);
    return deepMix({}, options, defaultOptions, curOptions, props);
  }

  public init() {
    super.init();
    this.theme = this.themeController.getTheme(this.options, this.type);
    this.drawTitle();
    this.drawDescription();
  }

  protected drawTitle(): void {
    const props = this.options;
    const range = this.layerBBox;
    if (this.title) {
      this.title.destroy();
      this.title = null;
    }

    if (isTextUsable(props.title)) {
      const width = this.width;
      const theme = this.theme;
      const title = new TextDescription({
        leftMargin: range.minX + theme.title.padding[3],
        rightMargin: range.maxX - theme.title.padding[1],
        topMargin: range.minY + theme.title.padding[0],
        text: props.title.text,
        style: mix(theme.title, props.title.style),
        wrapperWidth: width - theme.title.padding[3] - theme.title.padding[1],
        container: this.container.addGroup() as any,
        theme,
        index: isTextUsable(props.description) ? 0 : 1,
        plot: this as any,
        alignTo: props.title.alignTo,
        name: 'title',
      });
      this.title = title;
    }
  }

  protected drawDescription(): void {
    const props = this.options;
    const range = this.layerBBox;
    if (this.description) {
      this.description.destroy();
      this.description = null;
    }

    if (isTextUsable(props.description)) {
      const width = this.width;
      const theme = this.theme;
      let topMargin = 0;

      if (this.title) {
        const titleBBox = this.title.getBBox();
        topMargin += titleBBox.minY + titleBBox.height;
        topMargin += theme.description.padding[0];
      } else {
        // 无title的情况下使用title的上padding
        topMargin += range.minY + theme.title.padding[0];
      }

      const description = new TextDescription({
        leftMargin: range.minX + theme.description.padding[3],
        topMargin,
        rightMargin: range.maxX - theme.title.padding[1],
        text: props.description.text,
        style: mix(theme.description, props.description.style),
        wrapperWidth: width - theme.description.padding[3] - theme.description.padding[1],
        container: this.container.addGroup() as any,
        theme,
        index: 1,
        plot: this as any,
        alignTo: props.description.alignTo,
        name: 'description',
      });
      this.description = description;
    }
  }

  protected getViewRange() {
    if (!this.layerBBox) {
      this.layerBBox = new BBox(this.x, this.y, this.width, this.height);
    }
    let viewMinX = this.layerBBox.minX;
    let viewMaxX = this.layerBBox.maxX;
    let viewMinY = this.layerBBox.minY;
    let viewMaxY = this.layerBBox.maxY;
    const components = [this.title, this.description];

    each(components, (component) => {
      const { position } = component;
      const { minX, maxX, minY, maxY } = component.getBBox();
      if (maxY >= viewMinY && maxY <= viewMaxY && position === 'top') {
        viewMinY = maxY;
      }
      if (minY >= viewMinY && minY <= viewMaxY && position === 'bottom') {
        viewMaxY = minY;
      }
      if (maxX > viewMinX && maxX <= viewMaxX && position === 'left') {
        viewMinX = maxX;
      }
      if (minX >= viewMinX && maxX <= viewMaxX && position === 'right') {
        viewMaxX = minX;
      }
    });
    return new BBox(viewMinX, viewMinY, viewMaxX - viewMinX, viewMaxY - viewMinY);
  }
}
