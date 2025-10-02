'use client'; 

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, changeQuantity, removeItem, clearBasket } from 'store/features/basketReducer';
import ConfirmModal from '@/components/ConfirmModal';
import Link from 'next/link';
import BasketItem from '@/components/BasketItem';


export default function Checkout() {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.currentUser.user);
  const basket = useSelector((state) => state.basket.basket);

  const total = basket.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const dispatch = useDispatch();

  function addQuantity(product) {
    dispatch(addItem(product));
  }

  function deductQuantity(product) {
    dispatch(changeQuantity(product));
  }

  function removeProduct(product) {
    dispatch(removeItem(product));
  }

  function handleCheckout() {
    setShowModal(true);
  }

  function confirmCheckout() {
    setShowModal(false);
    checkout();
  }

  function checkout() {
    console.table(basket);
    //clearBasket();
  }
  
  return (<>
    <h1 className="mb-10">Checkout</h1>
    { basket.length > 0 ? (
      <>
        <h3 className="mb-10 text-center md:text-start">Bellow you can see the items in your basket:</h3>
        { basket.map((item, index) => (
          <BasketItem 
            key={index} 
            product={item} 
            add={() => addQuantity(item)} 
            deduct={() => deductQuantity(item)} 
            remove={() => removeProduct(item)} 
          />
        ))}
        <h3 className="w-full pe-7 text-center md:text-end">Total: ${total}</h3>
      </>
    ) : (
      <>
        <h3>Your Basket is empty</h3>
        <Link 
          href="/products"
          className="mt-15 btn-lg"
        >
          Go to Shop
        </Link>
      </>
    )}
    { basket.length > 0 && 
      <>
        <button 
          className="btn-lg mt-10 md:mt-20 mx-auto"
          disabled={!(basket.length > 0 && user != null)}
          onClick={handleCheckout}
        >
          Checkout
        </button>
        { user == null && 
          <p className="mt-5 text-red-500 text-center">You need to be logged in to checkout. Go to <Link className="text-red-500 underline underline-offset-5 non-hover" href="/login">Log In</Link>.</p> 
        }
        <ConfirmModal
          isOpen={showModal}
          title="Confirm Checkout"
          message="Are you sure you want to proceed with the checkout?"
          onConfirm={confirmCheckout}
          onCancel={() => setShowModal(false)}
        />
      </>
    }
  </>);
}