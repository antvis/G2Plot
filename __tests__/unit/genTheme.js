
function genShapeStyle(DEFAULT_COLOR) {
  const SHAPE_STYLE = {
    area: {
      fill: DEFAULT_COLOR,
    },
    hollowArea: {
      stroke: DEFAULT_COLOR,
    },
    box: {
      stroke: DEFAULT_COLOR,
    },
    edge: {
      stroke: DEFAULT_COLOR,
    },
    interval: {
      fill: DEFAULT_COLOR,
      fillOpacity: 1,
    },
    hollowInterval: {
      stroke: DEFAULT_COLOR,
    },
    kline: {
      fill: DEFAULT_COLOR,
      stroke: DEFAULT_COLOR,
    },
    line: {
      stroke: DEFAULT_COLOR,
    },
    polygon: {
      fill: DEFAULT_COLOR,
      fillOpacity: 1,
    },
    hollowPolygon: {
      stroke: DEFAULT_COLOR,
    },
    point: {
      fill: DEFAULT_COLOR,
      fillOpacity: 1,
    },
    hollowPoint: {
      stroke: DEFAULT_COLOR,
    },
    text: {
      fill: DEFAULT_COLOR,
    },
  };

  return {
    area: {
      area: {
        default: SHAPE_STYLE.area,
      },
      smooth: {
        default: SHAPE_STYLE.area,
      },
      line: {
        default: SHAPE_STYLE.hollowArea,
      },
      smoothLine: {
        default: SHAPE_STYLE.hollowArea,
      },
    },
    box: {
      box: {
        default: SHAPE_STYLE.box,
      },
    },
    edge: {
      line: {
        default: SHAPE_STYLE.edge,
      },
      vhv: {
        default: SHAPE_STYLE.edge,
      },
      smooth: {
        default: SHAPE_STYLE.edge,
      },
      arc: {
        default: SHAPE_STYLE.edge,
      },
    },
    interval: {
      rect: {
        default: SHAPE_STYLE.interval,
      },
      hollowInterval: {
        default: SHAPE_STYLE.hollowInterval,
      },
      line: {
        default: SHAPE_STYLE.hollowInterval,
      },
      tick: {
        default: SHAPE_STYLE.hollowInterval,
      },
      funnel: {
        default: SHAPE_STYLE.interval,
      },
      pyramid: {
        default: SHAPE_STYLE.interval,
      },
      'top-line': {
        default: SHAPE_STYLE.interval,
      },
    },
    kline: {
      kline: {
        default: SHAPE_STYLE.kline,
      },
    },
    line: {
      line: {
        default: SHAPE_STYLE.line,
      },
      dot: {
        default: SHAPE_STYLE.line,
      },
      dash: {
        default: SHAPE_STYLE.line,
      },
      smooth: {
        default: SHAPE_STYLE.line,
      },
      hv: {
        default: SHAPE_STYLE.line,
      },
      vh: {
        default: SHAPE_STYLE.line,
      },
      hvh: {
        default: SHAPE_STYLE.line,
      },
      vhv: {
        default: SHAPE_STYLE.line,
      },
    },
    polygon: {
      polygon: {
        default: SHAPE_STYLE.polygon,
      },
      hollow: {
        default: SHAPE_STYLE.hollowPolygon,
      },
    },
    point: {
      circle: {
        default: SHAPE_STYLE.point,
      },
      square: {
        default: SHAPE_STYLE.point,
      },
      bowtie: {
        default: SHAPE_STYLE.point,
      },
      diamond: {
        default: SHAPE_STYLE.point,
      },
      hexagon: {
        default: SHAPE_STYLE.point,
      },
      triangle: {
        default: SHAPE_STYLE.point,
      },
      triangleDown: {
        default: SHAPE_STYLE.point,
      },
      hollowCircle: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowSquare: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowBowtie: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowDiamond: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowHexagon: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowTriangle: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hollowTriangleDown: {
        default: SHAPE_STYLE.hollowPoint,
      },
      cross: {
        default: SHAPE_STYLE.hollowPoint,
      },
      tick: {
        default: SHAPE_STYLE.hollowPoint,
      },
      plus: {
        default: SHAPE_STYLE.hollowPoint,
      },
      hyphen: {
        default: SHAPE_STYLE.hollowPoint,
      },
      line: {
        default: SHAPE_STYLE.hollowPoint,
      },
      rect: {
        default: SHAPE_STYLE.point,
      },
      image: {
        default: SHAPE_STYLE.point,
      },
      path: {
        default: SHAPE_STYLE.point,
      },
    },
    text: {
      text: {
        default: SHAPE_STYLE.text,
      },
    },
  };
}

export default function genTheme(config) {
  const colors = config.colors;
  const defaultColor = colors[0];
  const backgroundColor = config.backgroundColor;
  const fontFamily = config.fontFamily;
  const fontSizeTitle = config.fontSizeTitle;
  const fontColorTitle = config.fontColorTitle;

  const fontSizeSubTitle = config.fontSizeSubTitle;
  const fontColorSubTitle = config.fontColorSubTitle;
  const lineColor = config.lineColor;

  const fontColorLabel = config.fontColorLabel;
  const fontSizeLabel = config.fontSizeLabel;

  return {
    defaultColor,
    colors,
    backgroundStyle: {
      // fill: '#47495a'
      fill: backgroundColor
    },
    title: {
      fontFamily,
      fontSize: fontSizeTitle,
      fill: fontColorTitle,
      // lineHeight: 20,
    },
    description: {
      fontFamily,
      fontSize: fontSizeSubTitle,
      fill: fontColorSubTitle,
    },
    axis: {
      y: {
        grid: {
          style: {
            stroke: lineColor,
          },
        },
        line: {
          style: {
            stroke: lineColor,
          },
        },
        tickLine: {
          style: {
            stroke: lineColor,
          },
        },
        label: {
          style: {
            fill: fontColorLabel,
            fontSize: fontSizeLabel,
          },
        },
        title: {
          style: {
            fill: fontColorLabel,
            fontSize: fontSizeLabel,
          },
        },
      },
      x: {
        grid: {
          visible: false,
          style: {
            stroke: lineColor,
          },
        },
        line: {
          visible: false,
          style: {
            stroke: lineColor,
          },
        },
        tickLine: {
          visible: true,
          style: {
            stroke: lineColor
          },
        },
        label: {
          visible: true,
          style: {
            fill: fontColorLabel,
            fontSize: fontSizeLabel,
          }
        },
        title: {
          visible: false,
          style: { fill: fontColorLabel, fontSize: fontSizeLabel },
        },
      },
      circle: {
        grid: {
          style: {
            stroke: lineColor,
          },
        },
        line: {
          style: {
            stroke: lineColor,
          },
        },
        tickLine: {
          style: {
            stroke: lineColor,
          },
        },
        label: {
          style: {
            fill: fontColorLabel,
            fontSize: fontSizeLabel,
          },
        },
        title: {
          style: { fill: fontColorLabel, fontSize: fontSizeLabel },
        },
      },
    },
    defaultLegendPosition: 'top-left',
    shape: genShapeStyle(defaultColor),
    label: {
      textStyle: {
        fontSize: fontSizeLabel,
        fill: fontColorLabel,
        fontFamily
      }
    },
    treemapLabels: {
      textStyle: {
        fill: fontColorLabel,
        fontSize: fontSizeLabel,
        fontFamily,
      },
    },
    innerLabels: {
      textStyle: {
        fill: fontColorLabel,
        fontSize: fontSizeLabel,
        fontFamily,
      },
    },
    legend: {
      right: {
        textStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        },
        titleStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        }
      },
      left: {
        textStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        },
        titleStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        }
      },
      top: {
        textStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        },
        titleStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        }
      },
      bottom: {
        textStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        },
        titleStyle: {
          fill: fontColorLabel,
          fontSize: fontSizeLabel,
          fontFamily,
        }
      },
      // 定义 html 渲染图例的样式
      html: {
        backgroundStyle: {
          fontSize: fontSizeLabel,
          fontFamily,
          color: fontColorLabel,
        }
      },
    },
    tooltip: {
      useHtml: true,
      // css style for tooltip
      'g2-tooltip': {
        color: fontColorLabel,
        fontSize: fontSizeLabel + 'px',
        fontFamily,
      }
    }
  };
}
