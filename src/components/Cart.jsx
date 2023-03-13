import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setItem } from "../utils/localStorage";

import OffCanvasCart from "./OffCanvasCart";
import BillCart from "./BillCart";
import Signup from "./Signup";
import { emptyCart, removeFromCart } from "../reducer";

const BACK = process.env.REACT_APP_BACK

export default function Cart() {
  const dispatch = useDispatch();

  // Panel de pagos (agregar)
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertLogin, setShowAlertLogin] = useState(false);
  const [fromCart, setFromCart] = useState(false);

  const handleShow = () => setShow(true);

  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.token);
  const [products, setProducts] = useState([])

  useEffect(() => setItem("cart", cart), [cart]);

  useEffect(() => {
    Promise.all(cart.map(c => fetch(`${BACK}/tests/${c}`)
      .then(res => res.json())))
      .then(products => setProducts(products))
  }, [cart])

  function handleClickDelete(e) {
    dispatch(removeFromCart(e.target.id))
  }

  function handleSubmit() {
    if (cart.length === 0) {
      alert("No tiene productos en el carrito de compras.");
    } else { handleShow() }
  }

  return (
    <div
      style={{
        margin: "auto",
        paddingTop: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{ width: "90%", position: "relative" }}>
        <Button
          variant="secondary"
          onClick={() => dispatch(emptyCart())}
          style={{ position: "absolute", right: "0px" }}
        >
          Vaciar carrito
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingTop: "5%",
          }}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>PRODUCTO</th>
                <th style={{ width: "20%" }}>PRECIO</th>
                <th style={{ width: "10%" }}>QUITAR</th>
              </tr>
            </thead>
            <tbody>
              {products.map((test, key) => {
                return (
                  <tr key={key}>
                    <td>{test.name}</td>
                    <td>${test.price}.00</td>
                    <td>
                      <Button variant="danger" id={test.id} onClick={(e) => handleClickDelete(e)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th>TOTAL: </th>
                <th>
                  $
                  {products.map((e) => e.price || 0).reduce((a, b) => a + b, 0)}
                  .00
                </th>
              </tr>
            </tbody>
          </Table>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "2%",
            }}
          >
            <Button variant="success" as={Link} to="/search">
              SEGUIR COMPRANDO
            </Button>
            {token ? (
              <Button variant="primary" onClick={handleSubmit}>
                PROCESAR COMPRA
              </Button>
            ) : null}
          </div>

          {token ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              <h5>Debe iniciar sesión antes de continuar con la compra</h5>
              <Button
                variant="primary"
                style={{
                  marginTop: "2%",
                  padding: "1%",
                  paddingRight: "3%",
                  paddingLeft: "3%",
                  width: "30%",
                }}
                onClick={() => {
                  console.log(showAlertLogin);
                  setShowAlertLogin(true);
                  setFromCart(true);
                }}
              >
                INICIAR SESIÓN
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <OffCanvasCart
          show={show}
          setShow={setShow}
          setShowAlert={setShowAlert}
          cart={cart}
        />
      </div>
      <div style={{ position: "absolute", width: "100%" }}>
        {" "}
        <BillCart
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          products={products}
        />
      </div>

      <div style={{ position: "relative" }}>
        <Modal
          size="lg"
          show={showAlertLogin}
          onHide={() => {
            console.log(showAlertLogin);
            setShowAlertLogin(false);
          }}
          backdrop="static"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body>
            <CloseButton
              onClick={() => setShowAlertLogin(false)}
              style={{ position: "absolute", top: "15px", right: "15px", zIndex: "1" }}
            ></CloseButton>
            <div style={{ width: "100%" }}>
              <Signup setShowAlertLogin={setShowAlertLogin} fromCart={fromCart} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
