export enum LabelColorName {
  green = "green",
  red = "red",
  orange = "orange",
  default = "default"
}

enum LabelColorMode {
  light = "light",
  dark = "dark"
}

type Color = {
  color: string,
  bgColor: string
}

type LabelColor = {
  light: Color,
  dark: Color
}

// TODO further tweak colours for better style and contrast in light and dark modes
const labelColors: Record<LabelColorName, LabelColor> = {
  [LabelColorName.default]: {
    light: {
      color: "#000",
      bgColor: "#e1e4e8"
    },
    dark: {
      color: "#e1e4e8",
      bgColor: "#24292e"
    }
  },
  [LabelColorName.green]: {
    light: {
      color: "#062d10",
      bgColor: "#6fde75"
    },
    dark: {
      color: "#0a3d18",
      bgColor: "#1a993c"
    }
  },
  [LabelColorName.red]: {
    light: {
      color: "#e72525",
      bgColor: "#750707"
    },
    dark: {
      color: "#3d0a0a",
      bgColor: "#750707"
    }
  },
  [LabelColorName.orange]: {
    light: {
      color: "#ce4a11",
      bgColor: "#622409"
    },
    dark: {
      color: "#59290e",
      bgColor: "#c25c22"
    }
  }
}

export const isValidColor = (color: string): color is LabelColorName => Object.values(LabelColorName).includes(color as LabelColorName)

/**
 * Get the label color for a given color name
 * @param colorName
 * @param mode
 */
export const getLabelColor = (colorName: string, mode = 'dark'): Color => {
  // Check if this color is available, show default if not
  const colorMode = mode === LabelColorMode.dark ? LabelColorMode.dark : LabelColorMode.light

  if (isValidColor(colorName)) {
    return labelColors[colorName][colorMode]
  }

  return labelColors[LabelColorName.default][colorMode]
}
