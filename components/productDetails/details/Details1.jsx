"use client";
import React, { useState } from "react";
import Slider1 from "../sliders/Slider1";
import QuantitySelect from "../QuantitySelect";
import { useContextElement } from "@/context/Context";
import ProductStikyBottom from "../ProductStikyBottom";
import Cep from "@/components/common/Cep";
export default function Details1({ product }) {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, isAddedToCartProducts, addToWishlist, isAddedtoWishlist, isAddedtoCompareItem, addToCompareItem, cartProducts, updateQuantity } = useContextElement();

  function redirecionarParaWhatsApp() {
    const telefone = "5511997140122";
    let mensagem = "Olá, gostaria desses produtos:\n\n";
    let total = 0;
    const desconto = 20.0;

    const subtotal = product.price;
    total += subtotal;
    mensagem += `1x - *${product.title}*\n`;
    mensagem += `*Preço:* R$${product.price.toFixed(2)}\n`;
    mensagem += `*Subtotal:* R$${subtotal.toFixed(2)}\n\n`;

    mensagem += `*Desconto:* R$20,00`;
    total -= desconto;

    mensagem += `*Frete:* R$0,00`;

    mensagem += `*Total:*\n💰 R$${total.toFixed(2)}\n\nObrigado!`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const url = `https://wa.me/${telefone}?text=${mensagemCodificada}`;

    window.open(url, "_blank");
  }
  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product default */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <Slider1 setActiveColor={setActiveColor} activeColor={activeColor} firstItem={product.imgSrc} secondItem={product.imgHover} />
              </div>
            </div>
            {/* /Product default */}
            {/* tf-product-info-list */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative mw-100p-hidden ">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">Produto</div>
                      <h3 className="name">{product.title}</h3>
                      <div className="sub">
                        <div className="tf-product-info-rate">
                          <div className="list-star">
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                          </div>
                          <div className="text text-caption-1">(134 reviews)</div>
                        </div>
                        <div className="tf-product-info-sold">
                          <i className="icon icon-lightning" />
                          <div className="text text-caption-1">18&nbsp;vendidos nas últimas 32h</div>
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2"> R${product.price.toFixed(2)}</h5>
                        {product.oldPrice ? (
                          <>
                            <div className="compare-at-price font-2"> R${product.oldPrice.toFixed(2)}</div>
                            <div className="badges-on-sale text-btn-uppercase">-25%</div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <p>{product.summary}</p>
                      <div className="tf-product-info-liveview">
                        <i className="icon icon-eye" />
                        <p className="text-caption-1">
                          <span className="liveview-count">28</span> pessoas estão vendo isso agora
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option">
                    {/* <ColorSelect
                      setActiveColor={setActiveColor}
                      activeColor={activeColor}
                    />
                    <SizeSelect /> */}
                    <Cep />
                    <div className="tf-product-info-quantity pb-4 border-bottom">
                      <div className="title mb_12">Quantidade:</div>
                      <QuantitySelect
                        quantity={isAddedToCartProducts(product.id) ? cartProducts.filter((elm) => elm.id == product.id)[0].quantity : quantity}
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(product.id)) {
                            updateQuantity(product.id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <div className="tf-product-info-by-btn mb_10">
                        <a onClick={() => addProductToCart(product.id, quantity)} className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart">
                          <span>{isAddedToCartProducts(product.id) ? "Já Adicionado" : "Adicionar ao carrinho -"}</span>
                          <span className="tf-qty-price total-price">${isAddedToCartProducts(product.id) ? (product.price * cartProducts.filter((elm) => elm.id == product.id)[0].quantity).toFixed(2) : (product.price * quantity).toFixed(2)} </span>
                        </a>
                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="compare" onClick={() => addToCompareItem(product.id)} className="box-icon hover-tooltip compare btn-icon-action">
                          <span className="icon icon-gitDiff" />
                          <span className="tooltip text-caption-2">{isAddedtoCompareItem(product.id) ? "Já comparado" : "Comparar"}</span>
                        </a>
                        <a onClick={() => addToWishlist(product.id)} className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action">
                          <span className="icon icon-heart" />
                          <span className="tooltip text-caption-2">{isAddedtoWishlist(product.id) ? "Já na lista de desejos" : "Lista de desejos"}</span>
                        </a>
                      </div>
                      <a href="#" onClick={redirecionarParaWhatsApp} className="btn-style-3 text-btn-uppercase">
                        Comprar agora
                      </a>
                    </div>
                    <div className="tf-product-info-help">
                      <div className="tf-product-info-extra-link">
                        <a href="#delivery_return" data-bs-toggle="modal" className="tf-product-extra-icon">
                          <div className="icon">
                            <i className="icon-shipping" />
                          </div>
                          <p className="text-caption-1">Entrega e Devolução</p>
                        </a>
                        <a href="#ask_question" data-bs-toggle="modal" className="tf-product-extra-icon">
                          <div className="icon">
                            <i className="icon-question" />
                          </div>
                          <p className="text-caption-1">Faça Uma Pergunta</p>
                        </a>
                        <a href="#share_social" data-bs-toggle="modal" className="tf-product-extra-icon">
                          <div className="icon">
                            <i className="icon-share" />
                          </div>
                          <p className="text-caption-1">Compartilhar</p>
                        </a>
                      </div>
                      <div className="tf-product-info-time">
                        <div className="icon">
                          <i className="icon-timer" />
                        </div>
                        <p className="text-caption-1">
                          Entrega estimada:&nbsp;&nbsp;<span>1-4 dias</span>
                          (Brasil)
                        </p>
                      </div>
                      <div className="tf-product-info-return">
                        <div className="icon">
                          <i className="icon-arrowClockwise" />
                        </div>
                        <p className="text-caption-1">
                          Reembolso em <span>45 dias</span> de compra.
                        </p>
                      </div>
                      <div className="dropdown dropdown-store-location">
                        <div className="dropdown-title dropdown-backdrop" data-bs-toggle="dropdown" aria-haspopup="true">
                          <div className="tf-product-info-view link">
                            <div className="icon">
                              <i className="icon-map-pin" />
                            </div>
                            <span>Ver detalhes da loja</span>
                          </div>
                        </div>
                        <div className="dropdown-menu dropdown-menu-end">
                          <div className="dropdown-content">
                            <div className="dropdown-content-heading">
                              <h5>Localização da Loja</h5>
                              <i className="icon icon-close" />
                            </div>
                            <div className="line-bt" />
                            <div>
                              <h6>Lari Buquês</h6>
                              <p>Geralmente fica pronto em 24 horas</p>
                            </div>
                            <div>
                              <p>Rosalinda Forges 044</p>
                              <p>São Paulo, Brasil</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <ul className="tf-product-info-sku">
                      <li>
                        <p className="text-caption-1">SKU:</p>
                        <p className="text-caption-1 text-1">53453412</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Vendor:</p>
                        <p className="text-caption-1 text-1">Lari Buquês</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Available:</p>
                        <p className="text-caption-1 text-1">Instock</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Categories:</p>
                        <p className="text-caption-1">
                          <a href="#" className="text-1 link">
                            Clothes
                          </a>
                          ,
                          <a href="#" className="text-1 link">
                            women
                          </a>
                          ,
                          <a href="#" className="text-1 link">
                            T-shirt
                          </a>
                        </p>
                      </li>
                    </ul> */}
                    {/* <div className="tf-product-info-guranteed">
                      <div className="text-title">Guranteed safe checkout:</div>
                      <div className="tf-payment">
                        <a href="#">
                          <Image alt="" src="/images/payment/img-1.png" width={100} height={64} />
                        </a>
                        <a href="#">
                          <Image alt="" src="/images/payment/img-2.png" width={100} height={64} />
                        </a>
                        <a href="#">
                          <Image alt="" src="/images/payment/img-3.png" width={100} height={64} />
                        </a>
                        <a href="#">
                          <Image alt="" src="/images/payment/img-4.png" width={98} height={64} />
                        </a>
                        <a href="#">
                          <Image alt="" src="/images/payment/img-5.png" width={102} height={64} />
                        </a>
                        <a href="#">
                          <Image alt="" src="/images/payment/img-6.png" width={98} height={64} />
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* /tf-product-info-list */}
          </div>
        </div>
      </div>
      <ProductStikyBottom />
    </section>
  );
}
