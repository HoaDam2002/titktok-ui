import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/Components/Popper';
import MenuItems from './MenuItems';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultfn = () => {};

function Menu({ children, items = [], onChange = defaultfn }) {
    const [language, setLanguage] = useState([{ data: items }]);
    const current = language[language.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            //isParent kiểm tra item nào có thèn con children trả về true false
            const isParent = !!item.children;
            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setLanguage((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {language.length > 1 && (
                            <Header
                                title={'Ngôn ngữ'}
                                onBack={() => {
                                    return setLanguage((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            //khi k hover vào other thì sẽ reset về item ban đầu
            onHide={() => setLanguage((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
