import { forwardRef } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export const Text = forwardRef((props: TextProps, ref: React.Ref<any>) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText ref={ref} style={[{ color }, style]} {...otherProps} />;
});

export const View = forwardRef((props: ViewProps, ref: React.Ref<any>) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultView
      ref={ref}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
});
