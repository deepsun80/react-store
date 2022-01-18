import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const headerArray = [
    {
        id: 0,
        title: 'SHOP',
        link: '/shop'    
    },
    {
        id: 1,
        title: 'CONTACT',
        link: '/contact'    
    }
];

const Header = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const hidden = useSelector(state => state.cart.hidden);

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                {headerArray.map(({ id, title, link }) => (
                    <Link className='option' key={id} to={link}>
                        {title}
                    </Link>
                ))}
                {
                    currentUser ? 
                    <div className='option' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                    : <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                }
                <CartIcon />
            </div>
           {
                hidden ? null : 
                <CartDropdown />
            }
        </div>
    )
}

export default Header;
