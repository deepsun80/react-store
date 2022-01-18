import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import Auth from './pages/auth/auth.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import setCurrentUser from './redux/user/user.actions';

import './App.scss';

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  // Used to create initial collections in Firebase
  // const collections = useSelector((state) => state.shop.collections);
  // const collection = Object.keys(collections)
  // .map(key => collections[key])
  // .map(({ title, items}) => ({ title, items }));

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }));
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });

    // Used to create initial collections in Firebase
    // const dispatchCollection = async () => {
    //   await addCollectionAndDocuments('collections', collection);
    // }

    // dispatchCollection();

    return () => {
      unsubscribeFromAuth();
    };
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path='/signin' render={() => currentUser ? <Redirect to='/' /> : <Auth />} />
      </Switch>
    </div>
  );
}

export default App;
