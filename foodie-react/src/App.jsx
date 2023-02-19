import { Box, Link, Tooltip, IconButton } from "@chakra-ui/react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import Index from "./pages/Index";
import Bookmarks from "./pages/Bookmarks";
import Favourites from "./pages/Favourites";

import Restaurant from "./pages/Restaurant";
import CookiePolicy from "./pages/misc/Cookie-Policy";
import TOS from "./pages/misc/TOS";
import PrivacyPolicy from "./pages/misc/Privacy-Policy";
import Register from "./pages/account/Register";
import Profile from "./pages/account/Profile";
import EditProfile from "./pages/account/EditProfile";
import ResetPassword from "./pages/account/ResetPassword";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CookieConsent from "react-cookie-consent";

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";
import OnBoarding from "./components/OnBoarding";

function App() {
  const [path, setPath] = useState("");
  const location = useLocation().pathname;
  const history = useHistory();

  const setTitle = () => {
    let p = location.slice(1) ? `${location.slice(1).split("/")[0]}` : "";
    document.title = "Foodie" + (p ? ` | ${p}` : "");
    setPath(p);
  };

  useEffect(() => {
    setTitle();

    // rerun to update title again
    const unlisten = history.listen(() => {
      setTitle();
    });

    window.scrollTo(0, 0);
    return unlisten;
  }, [location]); // on route change


  useEffect(() => {
    let timer;
    const handleScroll = () => {

      clearTimeout(timer);
      timer = setTimeout(() => {

        window.scrollY > 100
          ? (document.querySelector(".scroll-top").style.display = "flex")
          : (document.querySelector(".scroll-top").style.display = "none");

      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    // unmount when not in use
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <OnBoarding />

      <Navbar page={path} />

      <Box minHeight="100vh">
        <Switch>
          <Route path="/" exact>
            <Index />
          </Route>

          <Route path="/Bookmarks">
            <Bookmarks />
          </Route>

          <Route path="/Favourites">
            <Favourites />
          </Route>

          <Route path="/Restaurant">
            <Restaurant />
          </Route>

          <Route path="/Cookie-Policy">
            <CookiePolicy />
          </Route>

          <Route path="/TOS">
            <TOS />
          </Route>

          <Route path="/Privacy-Policy">
            <PrivacyPolicy />
          </Route>

          <Route path="/Register">
            <Register />
          </Route>

          <Route path="/Profile">
            <Profile />
          </Route>

          <Route path="/Edit-Profile">
            <EditProfile />
          </Route>

          <Route path="/Reset-Password">
            <ResetPassword />
          </Route>
        </Switch>
      </Box>

      <Footer />

      <CookieConsent
        buttonText=" Accept"
        buttonStyle={{ backgroundColor: "var(--chakra-colors-brand-100)" }}
      >
        Cookies are used to enhance your experience, by using this service you
        consent to the use of cookies.
        <Link
          href="/Cookie-Policy"
          color="var(--chakra-colors-brand-100)"
          ml="0.5rem"
        >
          Learn more
        </Link>
      </CookieConsent>

      <Tooltip
        label="Scroll to top"
        aria-label="Scroll to top"
        placement="left"
      >
        <IconButton
          className="scroll-top"
          variant="ghost"
          position="fixed"
          bottom="1rem"
          right="1rem"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          display="none"
          zIndex="100"
          icon={<HiArrowUp size="22px" />}
        />
      </Tooltip>
    </>
  );
}

export default App;
