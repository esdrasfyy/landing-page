"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import Cep from "../common/Cep";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaWhatsapp } from "react-icons/fa";

const discounts = [
  {
    discount: "R$20 OFF",
    details: "Para todos pedidos",
    code: "Mo234231",
  },
];

export default function ShopCart() {
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();
  const [choice, setChoice] = useState();
  const [showToast, setShowToast] = useState(false);

  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };
  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  useEffect(() => {
    document.querySelector(".progress-cart .value").style.width = "100%";
  }, []);

  function redirecionarParaWhatsApp() {
    if (!choice) {
      setShowToast({ show: true, message: "Por favor, selecione um CEP!", type: "danger" });
      return;
    }

    const telefone = "5511997140122";
    let mensagem = "Olá, gostaria desses produtos:\n\n";
    let total = 0;
    const desconto = 20.0;

    cartProducts.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      mensagem += `${item.quantity}x - *${item.title}*\n`;
      mensagem += `*Preço:* R$${item.price.toFixed(2)}\n`;
      mensagem += `*Subtotal:* R$${subtotal.toFixed(2)}\n\n`;
    });

    mensagem += `*Desconto:* R$${desconto.toFixed(2)}\n\n`;
    total -= desconto;

    if (choice) {
      mensagem += `*Frete:* R$${choice.frete.price.toFixed(2)}\n\n`;
      mensagem += `*Entrega:*\n📅 Data - ${format(choice.selected, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}\n`;
      mensagem += `🚚 Período - ${choice.frete.label}\n\n`;
      total += choice.frete.price;
    }

    mensagem += `*Total:*\n💰 R$${total.toFixed(2)}\n\nObrigado!`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const url = `https://wa.me/${telefone}?text=${mensagemCodificada}`;

    window.open(url, "_blank");
  }

  const handleChoiceCep = ({ selected, frete }) => {
    setChoice({ selected, frete });
  };
  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="tf-cart-sold">
                <div className="notification-progress">
                  <div className="text">
                    Compre <span className="fw-semibold text-primary"> R$40.00</span> em produtos e ganhe <span className="fw-semibold">Frete Grátis</span>
                  </div>
                  <div className="progress-cart">
                    <div className="value" style={{ width: "0%" }} data-progress={50}>
                      <span className="round" />
                    </div>
                  </div>
                </div>
              </div>
              {cartProducts.length ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <table className="tf-table-page-cart">
                    <thead>
                      <tr>
                        <th>Produtos</th>
                        <th>Preços</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((elm, i) => (
                        <tr key={i} className="tf-cart-item file-delete">
                          <td className="tf-cart-item_product">
                            <Link href={`/product-detail/${elm.id}`} className="img-box">
                              <Image alt="product" src={elm.imgSrc} width={600} height={800} />
                            </Link>
                            <div className="cart-info">
                              <Link href={`/product-detail/${elm.id}`} className="cart-title link">
                                {elm.title}
                              </Link>
                              <div className="variant-box">
                                {/* <div className="tf-select">
                                  <select>
                                    <option>Blue</option>
                                    <option>Black</option>
                                    <option>White</option>
                                    <option>Red</option>
                                    <option>Beige</option>
                                    <option>Pink</option>
                                  </select>
                                </div> */}
                                {/* <div className="tf-select">
                                  <select>
                                    <option>XL</option>
                                    <option>XS</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                    <option>2XL</option>
                                  </select>
                                </div> */}
                              </div>
                            </div>
                          </td>
                          <td data-cart-title="Preço" className="tf-cart-item_price text-center">
                            <div className="cart-price text-button price-on-sale">R${elm.price.toFixed(2)}</div>
                          </td>
                          <td data-cart-title="Quantidade" className="tf-cart-item_quantity">
                            <div className="wg-quantity mx-md-auto">
                              <span className="btn-quantity btn-decrease" onClick={() => setQuantity(elm.id, elm.quantity - 1)}>
                                -
                              </span>
                              <input type="text" className="quantity-product" name="number" value={elm.quantity} readOnly />
                              <span className="btn-quantity btn-increase" onClick={() => setQuantity(elm.id, elm.quantity + 1)}>
                                +
                              </span>
                            </div>
                          </td>
                          <td data-cart-title="Total" className="tf-cart-item_total text-center">
                            <div className="cart-total text-button total-price">R${(elm.price * elm.quantity).toFixed(2)}</div>
                          </td>
                          <td data-cart-title="Remove" className="remove-cart" onClick={() => removeItem(elm.id)}>
                            <span className="remove icon icon-close" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="ip-discount-code">
                    <input type="text" placeholder="Adicionar desconto" />
                    <button className="tf-btn">
                      <span className="text">Aplicar Código</span>
                    </button>
                  </div>
                  <div className="group-discount">
                    {discounts.map((item, index) => (
                      <div key={index} className={`box-discount ${activeDiscountIndex === index ? "active" : ""}`} onClick={() => setActiveDiscountIndex(index)}>
                        <div className="discount-top">
                          <div className="discount-off">
                            <div className="text-caption-1">Desconto</div>
                            <span className="sale-off text-btn-uppercase">{item.discount}</span>
                          </div>
                          <div className="discount-from"></div>
                        </div>
                        <div className="discount-bot">
                          <span className="text-btn-uppercase">{item.code}</span>
                          <button className="tf-btn">
                            <span className="text">Aplicado</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              ) : (
                <div>
                  Your wishlist is empty. Start adding your favorite products to save them for later!{" "}
                  <Link className="btn-line" href="/shop-default-grid">
                    Explore Products
                  </Link>
                </div>
              )}
            </div>
            <div className="col-xl-4">
              <div className="fl-sidebar-cart">
                <div className="box-order bg-surface">
                  <h5 className="title">Resumo do Pedido</h5>
                  <div className="subtotal text-button d-flex justify-content-between align-items-center">
                    <span>Subtotal</span>
                    <span className="total">R${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="discount text-button d-flex justify-content-between align-items-center">
                    <span>Descontos</span>
                    <span className="total">R${totalPrice ? "20" : 0}</span>
                  </div>
                  <div className="">
                    <Cep handleChoiceCep={handleChoiceCep} />
                  </div>
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Total</span>
                    <span className="total">
                      R$
                      {totalPrice ? (totalPrice - 20 + (choice?.frete?.price ?? 0)).toFixed(2) : "0.00"}
                    </span>
                  </h5>

                  <div className="box-progress-checkout">
                    <fieldset className="check-agree">
                      <input type="checkbox" id="check-agree" className="tf-check-rounded" />
                      <label htmlFor="check-agree">
                        Concordo com os <Link href={`/term-of-use`}>Termos e Condições</Link>
                      </label>
                    </fieldset>
                    <button onClick={redirecionarParaWhatsApp} className="tf-btn btn-reset">
                      <FaWhatsapp size={25} className="me-2" />
                      Finalizar Pedido
                    </button>
                    <p className="text-button text-center">Ou continue comprando</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`toast-container position-fixed top-0 end-0 p-3`} style={{ zIndex: 1050 }}>
        <div className={`toast ${showToast.show ? "show" : "hide"} bg-${showToast.type} text-white`} role="alert">
          <div className="toast-header">
            <strong className="me-auto">Aviso</strong>
            <button type="button" className="btn-close" onClick={() => setShowToast({ ...showToast, show: false })}></button>
          </div>
          <div className="toast-body">{showToast.message}</div>
        </div>
      </div>
    </>
  );
}
