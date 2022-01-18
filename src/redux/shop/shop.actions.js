import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const fetchCollectionsStart = () => ({
 type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

const fetchCollectionsSuccess = collectionsMap => ({
 type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
 payload: collectionsMap
});

const fetchCollectionsFailure = error => ({
 type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
 payload: error
});

const fetchCollectionsStartAsync = collectionsMap => {
 return dispatch => {
  const collectionsRef = firestore.collection('collections');
  dispatch (fetchCollectionsStart());

  collectionsRef
  .get()
  .then(snapshot => {
   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
   dispatch(fetchCollectionsSuccess(collectionsMap));
  })
  .catch(error => dispatch(fetchCollectionsFailure(error.message)));
 };
};

export { fetchCollectionsStartAsync }