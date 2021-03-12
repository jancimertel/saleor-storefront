import { useAuth } from "@saleor/sdk";
import { useRouter } from "next/router";
import React from "react";

import { Loader } from "@components/atoms";

import {
  Footer,
  MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import Notifications from "./Notifications";

import "../globalStyles/scss/index.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const App: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <ShopProvider>
      <OverlayProvider pathname={pathname}>
        <MetaConsumer />
        <MainMenu />
        {children}
        <Footer />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
