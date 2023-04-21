import Button from '~/Components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItems({ data }) {
    return (
        <Button leftIcon={data.icon} to={data.to} classNames={cx('menu-item')}>
            {data.title}
        </Button>
    );
}

export default MenuItems;
