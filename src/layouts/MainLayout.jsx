import { Fragment } from "react";

// react components.
import Navbar from "../components/navbar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="container relative">{children}</div>
    </Fragment>
  );
};

export default MainLayout;
