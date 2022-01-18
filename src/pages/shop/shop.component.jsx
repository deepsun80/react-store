import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

// HOC wrappers
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match }) => {
    const collections = useSelector((state) => state.shop.collections);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStartAsync());
      }, [dispatch]);

    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={Object.keys(collections).length === 0} {...props} />} />
            <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={Object.keys(collections).length === 0} {...props} />} />
        </div>
    )
}

export default ShopPage;