import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                alt="avatar"
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/ebbe4fb0abe27b830149baebc3725de7~c5_100x100.jpeg?x-expires=1682071200&x-signature=5u2dtRIvIV2xhHs5ioM1Jetbk%2Bg%3D"
            />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span> Nguyễn Văn A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
