import React from 'react';

const Cart = () => {
  return (
    <div className="container-main py-12">
      <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
        <a href="/shop" className="btn-primary inline-block mt-6">
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default Cart;
