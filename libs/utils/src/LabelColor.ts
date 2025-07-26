export enum LabelColorName {
  default = "default",
  green = "green",
  red = "red",
  orange = "orange",
  yellow = "yellow",
  blue = "blue",
  teal = "teal",
  purple = "purple",
  pink = "pink",
  gray = "gray",
  brown = "brown",
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
      bgColor: "#B6C2CF"
    },
    dark: {
      color: "#B6C2CF",
      bgColor: "#24292e"
    }
  },
  [LabelColorName.green]: {
    light: {
      color: "#1D2125",
      bgColor: "#4BCE97"
    },
    dark: {
      color: "#BAF3DB",
      bgColor: "#216E4E"
    }
  },
  [LabelColorName.red]: {
    light: {
      color: "#1D2125",
      bgColor: "#c63b2f"
    },
    dark: {
      color: "#FFD5D2",
      bgColor: "#AE2E24"
    }
  },
  [LabelColorName.orange]: {
    light: {
      color: "#1D2125",
      bgColor: "#FEA362"
    },
    dark: {
      color: "#FEDEC8",
      bgColor: "#A54800"
    }
  },
  [LabelColorName.yellow]: {
    light: {
      color: "#1D2125",
      bgColor: "#E2B203"
    },
    dark: {
      color: "#F8E6A0",
      bgColor: "#7F5F01"
    }
  },
  [LabelColorName.blue]: {
    light: {
      color: "#1D2125",
      bgColor: "#579DFF"
    },
    dark: {
      color: "#CCE0FF",
      bgColor: "#0055CC"
    }
  },
  [LabelColorName.purple]: {
    light: {
      color: "#1D2125",
      bgColor: "#9F8FEF"
    },
    dark: {
      color: "#DFD8FD",
      bgColor: "#5E4DB2"
    }
  },
  [LabelColorName.gray]: {
    light: {
      color: "#1D2125",
      bgColor: "#8C9BAB"
    },
    dark: {
      color: "#DEE4EA",
      bgColor: "#596773"
    }
  },
  [LabelColorName.brown]: {
    light: {
      bgColor: "#e48528",
      color: "#1D2125"
    },
    dark: {
      bgColor: "#6a3a0c",
      color: "#ddbc9d"
    }
  },
  [LabelColorName.teal]: {
    light: {
      color: "#1D2125",
      bgColor: "#6CC3E0"
    },
    dark: {
      color: "#C6EDFB",
      bgColor: "#206A83"
    }
  },
  [LabelColorName.pink]: {
    light: {
      color: "#1D2125",
      bgColor: "#FF7EB9"
    },
    dark: {
      color: "#FFD6EB",
      bgColor: "#A4006B"
    }
  },
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
