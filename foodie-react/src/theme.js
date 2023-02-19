import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const colors = {
  brand: {
    50: "#f5e6ff",
    100: "#d9b7fc",
    200: "#bb88f6",
    300: "#aa59f2e0",
    400: "#9f2bed",
    500: "#9313d4",
    600: "#7d0da5",
    700: "#610977",
    800: "#3f0449",
    900: "#1b001c",
  },
};

const fonts = {
  heading: "Recursive",
};

const theme = extendTheme({ config, colors, breakpoints, fonts });

export default theme;
