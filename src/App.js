import React, { Suspense, useState, useEffect, createContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/SharedComponents/Loaders/Loader";
import Layout from "./components/SharedComponents/Layout";
import { Get } from "./components/Utilities/AxiosHandler";
import {getTheme,getBackground} from './components/Utilities/themeHandler';
import {ThemeProvider } from "@mui/material/styles";
import Swiper from "./components/SharedComponents/NavBarComponents/Swiper";
import SettingsBtn from "./components/SharedComponents/SettingsComponents/SettingsBtn";
import Screen from "./components/InventoryCount/Screen.js";
export const UserContext = createContext();
// Lazy importing the components
const Home = React.lazy(() => import("./components/Home/Home.js"));
const CycleCount = React.lazy(() => import("./components/InventoryCount/Screen.js"))
const Maintenance = React.lazy(() =>
  import("./components/Home/Maintenance.js")
);
const CycleCountItem = React.lazy(()=>
import("./components/ItemCycleCount/CycleCount"));

const InventoryAdjustments = React.lazy(()=>
import("./components/InventoryAdjustments/InventoryAdjustments"));

const CycleCountHistory = React.lazy(() =>
import("./components/CycleCountHistory/CycleCountHistory"))
function App() {
  
  const [title, setTitle] = useState("Homee");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = getTheme();
  const background = getBackground();
  

  useEffect(async () => {
    const authUrl = "/Common/Authentication/Login?returnUrl=";
    let response = {};
    try {
      response = await Get("/common/getUserInfo","prssvl");

      // if the App deployed then only re-directing works
      if (!process.env.REACT_APP_OFFLINE) {
        if (!response.data.Id)
          window.location =
            process.env.REACT_APP_LOGIN +
            authUrl +
            encodeURIComponent(window.location.href);
      }
      //https://qa-ind-svlbe.systempr.com/api/BreadCrumbsAPI/GetBreadCrumbs?id=221&pid=0&referrer=none&IsReffered=false
      // setting user object in the offline
      if (process.env.REACT_APP_OFFLINE) {
        const curUser = JSON.parse(process.env.REACT_APP_OFFLINE_USER);
        setUser(curUser);
      } else setUser(response.data);
    } catch (err) {
      // if any error occurs while fetching user data then go to auth page
      if (!process.env.REACT_APP_OFFLINE)
        window.location =
          process.env.REACT_APP_LOGIN +
          authUrl +
          encodeURIComponent(window.location.href);
    }
    if(!localStorage.getItem("language"))
    localStorage.setItem('language', user.LanguagePreference?user.LanguagePreference:"en-US");

    setLoading(false);
    
  }, []);

  if (loading) return <Loader />;
  
  return (
    <div className="App" style={background}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          
            <Suspense fallback={<Loader />}>
              <HashRouter>
                <Layout/>
                {/* <Screen/> */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="/" element={<Home1 />} /> */}

                  <Route
                    path="/Maintenance/:functionId"
                    element={<Maintenance />}
                  />
                  <Route
                    path="/InventoryCount/:functionid"
                    element={<CycleCount />}
                  />
                  <Route
                    path="/ItemCycleCount/:functionid"
                    element={<CycleCountItem />}
                  />

                  <Route
                    path="/InventoryAdjustments/:functionid"
                    element={<InventoryAdjustments/>}
                  />
                  <Route
                    path="/CycleCountHistory/:functionid"
                    element={<CycleCountHistory/>}
                  />
                </Routes>
                <Swiper user={user}/>
                <SettingsBtn user={user}/>
              </HashRouter>
            </Suspense>
          
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;

