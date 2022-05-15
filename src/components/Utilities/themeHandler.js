import { createTheme, ThemeProvider } from "@mui/material/styles";
import stagingImg from "./../../images/background-staging.png";
import qa_indImg from "./../../images/background-qa-ind.png";
import qa_ukrImg from "./../../images/background-qa-ukr.png";
export const getTheme = () => {
  // Theme for the qa-ind mode and qa-ukr
  const theme1 = createTheme({
    palette: {
      primary: {
        main: "#e1ad01",
        contrastText: "black",
      },
      secondary: {
        main: "#e1ad01",
        contrastText: "black",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  // Theme for the staging
  const theme2 = createTheme({
    palette: {
      primary: {
        main: "#CCC",
        contrastText: "black",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  // theme for the actual production
  let theme = createTheme({
    palette: {
      primary: {
        main: "#b0c3f4",
        contrastText: "black",
      },
      secondary: {
        main: "#42a5f5",
        contrastText: "black",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  if (
    process.env.REACT_APP_MODE === "qa-ind" ||
    process.env.REACT_APP_MODE === "qa-ukr"
  )
    theme = theme1;

  if (process.env.REACT_APP_MODE === "staging") theme = theme2;

  if (process.env.REACT_APP_MODE === "staging") theme = theme2;

  return theme;
};


export const getBackground = ()=>{
  // qa-ind background
  const qa_ind = {
    backgroundImage: `url(${qa_indImg})`,
    height: "100vh",
    zIndex: -2,
  };

  // staging background
  const staging = { backgroundImage: `url(${stagingImg})`, height: "100vh" };

  // qa-ukr background
  const qa_ukr = { backgroundImage: `url(${qa_ukrImg})`, height: "100vh" };
  let background = {};

  // to change background based on env variable MODE
  if (/staging/i.test(process.env.REACT_APP_MODE)) background = staging;
  else if (/qa-ind/i.test(process.env.REACT_APP_MODE)) background = qa_ind;
  else if (/qa-ukr/i.test(process.env.REACT_APP_MODE)) background = qa_ukr;

  return background;
}