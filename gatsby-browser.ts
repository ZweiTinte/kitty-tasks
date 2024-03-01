import "./src/styles/main.scss";

import WrapRootElement from "./src/wrapRootElement";

Date.prototype.toDateString = function (): string {
  return this.toISOString().split("T")[0];
};

export const wrapRootElement = WrapRootElement;
