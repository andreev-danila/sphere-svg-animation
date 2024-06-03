import { useEffect } from 'react';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const easing = Easing.bezier(0.25, 0.1, 0.25, 1);

interface SpherePathProps {
  d: string;
  index: number;
  pathCount: number;
}

export function SpherePath({ d, index, pathCount }: SpherePathProps) {
  const transition = useSharedValue(0);

  useEffect(() => {
    const duration = 500;
    const delay = (pathCount - 1 - index) * (duration * 0.1);

    transition.value = withDelay(
      delay,
      withRepeat(
        withSequence(withTiming(1, { duration, easing }), withTiming(0, { duration, easing })),
        -1,
        true
      )
    );
  }, []);

  const animatedProps = useAnimatedProps<PathProps>(() => {
    const inputRange = [0, 1];

    const stroke = interpolateColor(transition.value, inputRange, [
      'rgba(80,80,80,0.35)',
      '#3754ED',
    ]);

    const translate = interpolate(transition.value, inputRange, [0, -10]);

    return {
      stroke,
      transform: [{ translateX: translate }, { translateY: translate }],
    };
  });

  return <AnimatedPath animatedProps={animatedProps} />;
}
