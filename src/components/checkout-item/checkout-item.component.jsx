import { useDispatch } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={cartItem.imageUrl} />
            </div>
            <span className='name'>{cartItem.name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => dispatch(removeItem(cartItem))}>
                    &#10094;
                </div>
                    <span className='value'>{cartItem.quantity}</span>
                <div className='arrow' onClick={() => dispatch(addItem(cartItem))}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{cartItem.price}</span>
            <span className='remove-button' onClick={() => dispatch(clearItemFromCart(cartItem))}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;