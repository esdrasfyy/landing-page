"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const shippingOptions = [
  {
    id: "comercial",
    label: "Comercial (08:00 às 19:00)",
    price: 0.0,
  },
  {
    id: "monging",
    label: "Manhã (08:00 as 13:00)",
    price: 0.0,
  },
  {
    id: "afternoon",
    label: "Tarde (13:00 as 18:00)",
    price: 0.0,
  },
];

export default function Cep({ handleChoiceCep }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [frete, setFrete] = useState(shippingOptions[0]);
  const [choice, setChoice] = useState();
  const handleOptionChange = (elm) => {
    setFrete(elm);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        window.scrollTo(0, 20);
      }, 0);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const onChangeCep = (e) => {
    let cep = e.target.value.replace(/\D/g, "").slice(0, 8);

    if (cep.length > 5) {
      cep = cep.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
    }

    e.target.value = cep;
  };

  const validarCEP = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (!/^\d{8}$/.test(cepLimpo)) {
      return { valido: false, erro: "Formato de CEP inválido" };
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        return { valido: false, erro: "CEP não encontrado" };
      }

      return { valido: true, dados: data };
    } catch (error) {
      return { valido: false, erro: "Erro na consulta do CEP" };
    }
  };

  const onSubmitCep = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cep = formData.get("cep");

    if (await validarCEP(cep)) {
      setIsOpen(true);
    } else {
      alert("CEP inválido!");
    }
  };

  const handleChoice = () => {
    if (!selected || !frete) {
      alert("Por favor, selecione uma data e um método de entrega.");
      return;
    }
    if (handleChoiceCep) {
      handleChoiceCep({ selected, frete });
    }

    setChoice({ selected, frete });
    setIsOpen(false);
  };

  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() - 1));
  return (
    <>
      <form onSubmit={onSubmitCep} className="tf-product-info-quantity pb-4 border-bottom mb-3">
        <div className="title mb_12">
          <b>Cep</b>
        </div>
        <div className="d-flex gap-16">
          <input type="text" placeholder="00000-000" name="cep" onChange={onChangeCep} />
          <button type="submit" className="tf-btn p-3 btn-reset radius-5 btn-add-to-cart" style={{ maxHeight: "48px" }}>
            OK
          </button>
        </div>
        {choice && (
          <div className="mt-3">
            <p className="mb-2">
              <b>Data escolhida:</b> {format(choice.selected, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
            <p className="mb-2">
              <b>Período:</b> {choice.frete.label}
            </p>
            <p>
              <b>Frete:</b> R${choice.frete.price.toFixed(2)}
            </p>
          </div>
        )}
      </form>
      <div className={`modal-overlay mt-4 ${isOpen ? "show" : ""}`} onClick={() => setIsOpen(false)}>
        <div className="modal mx-2" style={{ zIndex: 9999 }} onClick={(e) => e.stopPropagation()}>
          <div style={{ width: "100%" }}>
            <div style={{ background: "#000", padding: "9px", color: "#fff", textAlign: "center" }}>SELECIONE A DATA E O PERÍODO DE ENTREGA</div>
            <div style={{ display: "flex", padding: "30px", width: "100%", justifyContent: "space-between" }} className="flex-column flex-md-row">
              <div style={{ width: "100%" }}>
                <h5 style={{ padding: "9px", marginBottom: "20px", background: "#f8f8f8" }}>Data Escolhida</h5>
                <div>
                  <DayPicker style={{ margin: "0 auto", width: "fit-content" }} locale={ptBR} disabled={(date) => date.getDay() === 0 || date.getDay() === 6 || date < minDate} mode="single" selected={selected} onSelect={setSelected} />{" "}
                </div>
              </div>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h5 className="mt-4 mt-md-0" style={{ padding: "9px", marginBottom: "20px", background: "#f8f8f8" }}>
                    {" "}
                    Período Escolhido
                  </h5>
                  <div className="">
                    {shippingOptions.map((option) => (
                      <fieldset key={option.id} style={{ display: "flex", alignItems: "center" }} className="ship-item h-fit-content mt-3">
                        <input type="radio" name="ship-check" className="tf-check-rounded me-2" id={option.id} checked={frete === option} onChange={() => handleOptionChange(option)} />
                        <label htmlFor={option.id} style={{ width: "100%" }} className="d-flex justify-content-between">
                          <span>{option.label}</span>
                          <span className="price ms-2">R${option.price.toFixed(2)}</span>
                        </label>
                      </fieldset>
                    ))}
                  </div>
                </div>
                <button onClick={handleChoice} className="tf-btn btn-reset mt-4">
                  Concluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos com Transições */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .modal-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .modal {
          background: white;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
          width: 900px;
          height: fit-content;
          position: relative;
          transform: scale(0.95);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: unset;
        }

        .modal-overlay.show .modal {
          transform: scale(1);
        }

        h1 {
          font-size: 18px;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .close-btn {
          margin-top: 15px;
          padding: 10px 20px;
          background: red;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          font-size: 16px;
        }

        .close-btn:hover {
          background: darkred;
        }
FV
      `}</style>
    </>
  );
}
