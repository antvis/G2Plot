export interface Style {
  lineWidth?: number;
  stroke?: string;
  fill?: string;
  [styleKey: string]: any;
}

// example
export interface G2PlotTheme {
  [geometryStyle: string]: {
    normal: Style | Function;
    active: Style | Function;
    selected: Style | Function;
    disable: Style | Function;
  };
}



// 通过 convertThemeToG2Theme 转换为 G2Theme
export interface G2Theme {
  [geometryType: string]: {
    [shapeType: string]: {
      default: { style: Style };
      active: { style: Style };
      selected: { style: Style };
      inactive: { style: Style };
    };
  };
}
