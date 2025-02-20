"use client";
import React from "react";

import ScrollTop from "../common/ScrollTop";
export default function Footer1({ dark = false, hasPaddingBottom = false }) {
  return (
    <>
      <footer id="footer" className={`footer ${dark ? "bg-main" : ""} ${hasPaddingBottom ? "has-pb" : ""} `}></footer>
      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
    </>
  );
}
