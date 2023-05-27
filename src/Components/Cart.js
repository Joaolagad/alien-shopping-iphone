import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
    const {cartItems, clearCart, cartIsEmpty} = useContext(CartContext);

    
    return (
        <div className='cart-container'>
            <h2 className='cart-title'>Shopping Cart</h2>
            {cartIsEmpty ? (
                <p className='empty-cart-message'>Your cart is empty.</p>
            ) : (
                <div className='cart-items'>
                    {cartItems.map((item) => (
                        <div key={item.id} className='cart-item'>
                            <h4 className='item-name'>{item.name}</h4>
                            
                        </div>
                    ))}
                    <button onClick={clearCart} className='clear-button'>Clear Cart</button>
                </div>
            )}

        </div>
    )
}
export default Cart