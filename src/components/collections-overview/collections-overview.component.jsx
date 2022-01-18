import { useSelector } from 'react-redux';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = () => {
    const collections = useSelector(state => state.shop.collections);

    const collection = Object.keys(collections).map(key => collections[key]);

    return (
        <div className='collections-overview'>
            {collection.map(({ id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))}
        </div>
    );
}

export default CollectionsOverview;