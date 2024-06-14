import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
  const cartCtx=useContext(CartContext)
  const UserProgressCtx=useContext(UserProgressContext)
  const totalCartItems=cartCtx.items.reduce((totalNumber , item)=>{return totalNumber+item.quantity },0)
  function handleShowCart(){
    UserProgressCtx.showCart()
  }
  return (
    <header id='main-header'>
      <div id="title">
        <img src={logoImg} alt="logo img" />
        <h1>Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart} >Cart {totalCartItems} </Button>
      </nav>
    </header>
  );
}
