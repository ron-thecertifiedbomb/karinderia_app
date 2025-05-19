import React from "react";
import { View, StyleSheet, ViewProps, ViewStyle } from "react-native";

export type ContainerProps = ViewProps & {
  backgroundColor?: string;
  padding?: number;
  customStyle?: ViewStyle;
  noFlex?: boolean; 
};

const Container: React.FC<ContainerProps> = ({
  customStyle,
  backgroundColor = 'transparent',
  padding = 16,
  noFlex = false, 
  ...rest
}) => {
 
  const containerStyle = [
    styles.defaultContainer,
    !noFlex && styles.flexStyle,
    { backgroundColor, padding },
    customStyle,
  ];

  return (
    <View style={containerStyle} {...rest}>
      {rest.children}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexStyle: {
    flex: 1,
  },
});

export default Container;
