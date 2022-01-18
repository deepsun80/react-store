import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ history }) => {
    const cartItems = useSelector(state => state.cart.cartItems);

    const dispatch = useDispatch();
    
    return ( 
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length ? 
                    (cartItems.map((cartItem) => (
                            <CartItem key={cartItem.id} item={cartItem} />
                    ))) : (
                        <span className='empty-message'>Your Cart is Empty</span>
                    )
                }
            </div>
            <CustomButton onClick={() => {
                    dispatch(toggleCartHidden());
                    history.push('/checkout');
                }}>Go To Checkout</CustomButton>
        </div>
    )
}

export default withRouter(CartDropdown);