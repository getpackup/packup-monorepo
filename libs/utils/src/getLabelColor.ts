type LabelColor = {
  color: string,
  bgColor: string
}

type LabelColorTheme = {
  dark:   { [index: string]: LabelColor }
  light:  { [index: string]: LabelColor }
}

const labelColours: LabelColorTheme = {
  dark: {
    green: {
      color: "#0a3d18",
      bgColor: "#1a993c"
    },
    red: {
      color: "#3d0a0a",
      bgColor: "#CE1D1D00"
    },
    orange: {
      color: "#59290e",
      bgColor: "#c25c22"
    }
  },
  light: {
    green: {
      color: "#3ae676",
      bgColor: "#0c3b16"
    },
    red: {
      color: "#e72525",
      bgColor: "#750707"
    },
    orange: {
      color: "#ce4a11",
      bgColor: "#622409"
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export const getLabelColor = (colorName: string, mode: "light" | "dark"): LabelColor => {
  return labelColours[mode][colorName]
}
