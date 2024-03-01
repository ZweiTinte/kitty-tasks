import React from "react";
import { GatsbyBrowser } from "gatsby";

const WrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return <>{element}</>;
};

export default WrapRootElement;
