import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';

import { SpherePath } from './SpherePath';
import { PATHS_DRAW_COMMANDS } from './constants';

const backgroundColor = '#171717';

const pathCount = PATHS_DRAW_COMMANDS.length;

export function Sphere() {
  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 440 440" fill={backgroundColor}>
        {PATHS_DRAW_COMMANDS.map((d, index) => {
          return <SpherePath key={index} d={d} index={index} pathCount={pathCount} />;
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
