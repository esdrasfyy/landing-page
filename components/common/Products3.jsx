"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { productMain } from "@/data/products";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const tabItems = ["Cestas", "Novidades", "Promoção"];
export default function Products3({ parentClass = "flat-spacing-3" }) {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    document.getElementById("newArrivals").classList.remove("filtered");
    setTimeout(() => {
      console.log(activeItem);

      setSelectedItems(productMain.filter((elm) => elm.tabFilterOptions2.includes(activeItem)));
      document.getElementById("newArrivals").classList.add("filtered");
    }, 300);
  }, [activeItem]);

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="flat-animate-tab" style={{ justifyContent: "center" }}>
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {tabItems.map((item) => (
              <li key={item} className="nav-tab-item">
                <a
                  href={`#`} // Generate href dynamically
                  className={activeItem === item ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    setActiveItem(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div className="tab-pane active show tabFilter filtered" id="newArrivals" role="tabpanel">
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {selectedItems.map((product, i) => (
                  <ProductCard1 key={i} product={product} />
                ))}
              </div>
              <div className="sec-btn text-center">
                <Link href={`/shop-default-grid`} className="btn-line">
                  Ver Todos Produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
