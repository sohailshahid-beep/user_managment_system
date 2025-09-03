const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#007AFF', // blue buttons
  },
  dark: {
    text: '#000', // force black even in dark mode
    background: '#fff', // force white
    tint: '#007AFF',
  },
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light
) {
  const theme = 'light'; // 🔹 force light mode OR detect with useColorScheme()
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
