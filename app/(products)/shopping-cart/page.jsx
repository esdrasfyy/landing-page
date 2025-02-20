import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Header2 from "@/components/headers/Header2";
import Topbar6 from "@/components/headers/Topbar6";
import RecentProducts from "@/components/otherPages/RecentProducts";
import ShopCart from "@/components/otherPages/ShopCart";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Shopping Cart || Lari Buquês - Multipurpose React Nextjs eCommerce Template",
  description: "Lari Buquês - Multipurpose React Nextjs eCommerce Template",
};

export default function page() {
  return (
    <>
      <Header2 />
      <ShopCart />
      <RecentProducts />
      <Footer1 />
    </>
  );
}
