import { each, isArray, deepMix } from '@antv/util';
import { Group, BBox, Shape } from '@antv/g';
import { View } from '@antv/g2';

export interface RangedBarLabelConfig {
    visible: boolean;
    position: 'outer' | 'inner';
    formatter?: () => string;
    offsetX?: number;
    offsetY?: number;
    leftStyle?: any;
    rightStyle?: any;
    adjustColor?: boolean;
    adjustPosition?: boolean;
}

export interface IRangedBarLabel extends RangedBarLabelConfig {
    plot: any;
}

