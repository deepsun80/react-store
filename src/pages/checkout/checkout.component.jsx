import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import checkoutMenu from './checkout-menu';
import './checkout.styles.scss';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);

    const total = cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0);

    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                {checkoutMenu.map((menu, index) => (
                    <div className='header-block' key={index}>
                        <span>{menu}</span>
                    </div>
                ))}
            </div>
            {
                cartItems.map(cartItem => 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
            }
            <div className='total'>
                TOTAL: ${total}
            </div>
            <StripeCheckoutButton price={total} />
        </div>
    );
}

export default CheckoutPage;