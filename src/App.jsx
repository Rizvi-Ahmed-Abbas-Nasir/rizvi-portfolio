import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useContextProvider } from "./utils/GlobleContextProvider";
import gsap from "gsap";

// Pages
import Home from "./pages/Home";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cursor from "./components/CustomCursor";

// CSS
import "./App.scss";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const { locoScroll, setLocoScroll, setCursorSettings } = useContextProvider();
  const location = useLocation();
  const AppRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        smoothTouch: false,
        autoResize: true,
      },
      scrollCallback: ScrollTrigger.update,
    });

    setLocoScroll(locomotiveScroll);

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    const observer = new ResizeObserver(refreshScrollTrigger);
    observer.observe(AppRef.current);

    return () => {
      observer.disconnect();
      locomotiveScroll.destroy();
    };
  }, []);

  const scrollTo = (target) => {
    if (locoScroll)
      locoScroll.scrollTo(target, {
        options: {
          immediate: true,
        },
      });
  };

  useEffect(() => {
    setCursorSettings({
      size: 1,
      isSticky: false,
      color: "transparent",
      isBlending: true,
      text: "",
      border: "rgba(255,255,255,0.2)",
    });

    setTimeout(() => {
      scrollTo("top");
    }, 600);
  }, [location.pathname]);

  return (
    <div ref={AppRef}>
      <Cursor />
      <Navbar />
      <Preloader />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
