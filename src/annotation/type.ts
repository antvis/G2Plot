import type { IAnimation } from '@antv/g';

export type GenericAnimation = false | KeyframeAnimationOptions;

export type StandardAnimationOption = {
  enter: GenericAnimation;
  update: GenericAnimation;
  exit: GenericAnimation;
};

export type AnimationOption = GenericAnimation | StandardAnimationOption;

export type AnimationResult = IAnimation | null;
