import { useSelector } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ match }) => { 
    const collections = useSelector(state => state.shop.collections);

    const collection = collections[match.params.collectionId];

    return(
        <div className='collection-page'>
            <h2 className='title'>{collection.title}</h2>
            <div className='items'>
                {collection.items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default CollectionPage;