import { extendTheme } from "@chakra-ui/react";

const fonts = {
  kanit: `var(--font-kanit)`,
};

const colors = {
  primary: "#2F5CAF",
  primaryLight: "#F4F7FC",
  blackOne: "#171725",
  blackTwo: "#131523",
  blackThree: "#000",
  blackFour: "#404040",
  greyOne: "#5A607F",
  greyTwo: "#D0CACA",
  greyThree: "#E0E0E0",
  redOne: "#FF002A",
  orangeOne: "#FCE9CF",
  orangeTwo: "#F5AE51",
  whiteOne: "#ffffff",
  pageBG: "#F4F7FC",
  primaryScheme: {
    50: "#2F5CAF",
    100: "#2F5CAF",
    200: "#2F5CAF",
    300: "#2F5CAF",
    400: "#2F5CAF",
    500: "#2F5CAF",
    600: "#2F5CAF",
    700: "#2F5CAF",
    800: "#2F5CAF",
    900: "#2F5CAF",
  },
};

const components = {
  Text: {
    baseStyle: {
      fontFamily: "kanit",
      fontWeight: "400",
      fontSize: "1rem",
      color: "#000",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "kanit",
      fontSize: "1.6rem",
      color: "#000",
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
});

export default theme;
