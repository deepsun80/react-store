import { useSelector } from 'react-redux';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = () => {
    const sections = useSelector(state => state.directory.sections);

    return (
        <div className='directory-menu'>
            {sections.map(({ id, ...sectionProps }) => (
                <MenuItem key={id} {...sectionProps} />
            ))}
        </div>
    )
}

export default Directory;
