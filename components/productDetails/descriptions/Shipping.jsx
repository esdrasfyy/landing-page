import React from "react";

export default function Shipping() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fourDaysLater = new Date(tomorrow);
  fourDaysLater.setDate(tomorrow.getDate() + 4);

  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
  };

  return (
    <>
      {" "}
      <div className="w-100">
        <div className="text-btn-uppercase mb_12">Estamos do seu lado</div>
        <p className="mb_12">Uma única taxa de entrega para a maioria dos locais (confira nossa página de Pedidos &amp; Entrega)</p>
        <p className="">Devoluções gratuitas em até 14 dias (exceto itens de venda final e feitos sob encomenda, máscaras faciais e certos produtos que contêm materiais perigosos ou inflamáveis, como fragrâncias e aerossóis)</p>
      </div>
      <div className="w-100">
        <div className="text-btn-uppercase mb_12">Entrega estimada</div>
        <p className="mb_6 font-2">
          Expresso: {formatDate(tomorrow)} - {formatDate(fourDaysLater)}
        </p>
        <p className="font-2">Enviando do Brasil</p>
      </div>
      <div className="w-100">
        <div className="text-btn-uppercase mb_12">Precisa de mais informações?</div>
        <div>
          <a href="#" className="link text-secondary text-decoration-underline mb_6 font-2">
            Pedidos &amp; entrega
          </a>
        </div>
        <div>
          <a href="#" className="link text-secondary text-decoration-underline mb_6 font-2">
            Devoluções &amp; reembolsos
          </a>
        </div>
        <div>
          <a href="#" className="link text-secondary text-decoration-underline font-2">
            Taxas &amp; impostos
          </a>
        </div>
      </div>
    </>
  );
}
