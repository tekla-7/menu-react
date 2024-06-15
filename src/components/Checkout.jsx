import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig={
method:'POST',
headers:{'Content-Type':'applicaion/json'}
}
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const {data,isLoading , error ,isSending , sendRequest}=useHttp('http://localhost:3000/orders' ,requestConfig);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  const userProgressCtx = useContext(UserProgressContext);
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleSubmit(event) {
    event.preventDefault();
   const fd= new FormData(event.target)
   const customerData=Object.fromEntries(fd.entries())
sendRequest(JSON.stringify({
  order:{
      items:cartCtx.items,
      customer:customerData 
  }
}))
  }
  let actions=(
    <>
    <Button type="button" textOnly onClick={handleClose}>
            Close{" "}
          </Button>
          <Button>Submit Order </Button>
          </>
  )
  if(isSending){
    actions=<span>Sending order data ...</span>
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkput</h2>
        <p>Total Amount: {currencyFormatter.form(cartTotal)}</p>
        <Input label="Full Name" type="text" id="dull-name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title='failed to submit' message={error} />}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
}
