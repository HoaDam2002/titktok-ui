import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    primary = false,
    children,
    outline = false,
    outline_primary = false,
    small = false,
    large = false,
    disable = false,
    rounded = false,
    leftIcon = false,
    rightIcon = false,
    to,
    href,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // removeEventListener
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        outline_primary,
        small,
        large,
        disable,
        rounded,
        leftIcon,
        rightIcon,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    primary: PropTypes.string,
    children: PropTypes.node.isRequired,
    outline: PropTypes.bool,
    outline_primary: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disable: PropTypes.bool,
    rounded: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
