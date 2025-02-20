import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { allProducts } from "@/data/products";
import React from "react";

export const metadata = {
  title: "Product Detail || Lari Buquês - Multipurpose React Nextjs eCommerce Template",
  description: "Lari Buquês - Multipurpose React Nextjs eCommerce Template",
};

export default async function page({ params }) {
  const { id } = await params;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <Header2 />
      <Breadcumb product={product} />
      <Details1 product={product} />
      <Descriptions1 description={product.description} />
      <RelatedProducts />
      <Footer1 hasPaddingBottom />
    </>
  );
}
