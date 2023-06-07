import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/Components/Popper';
import AccountItem from '~/Components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import * as httpRequest from '~/utils/httpRequest';


const cx = classNames.bind(styles);



function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    //sử dungk useDebounce
    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef(); //get dom element

    useEffect(() => {   
        //khi mà k có value = null  hoặc bằng dấu cách thì return
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);
        //nếu có kí tự ngăn cách trong api thì sẽ convert sang dữ liệu khác khắc phục lỗi khi nhập &?....
        httpRequest
            .get('users/search', {
                params: {
                    q: debounced,
                    type: 'less',
                },
            })
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            });
    }, [debounced]); //[searchValue] khi gõ thì sẽ lọt vào đây

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        //uing a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. Sp
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Tài khoản</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                //click ra ngoài sẽ ẩn phần hiển thị tìm kiếm
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        //Lấy ra dom element để forcus vào
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm"
                        spellCheck={false}
                        onChange={(e) => handleChange(e)}
                        //khi focus lại input thì sẽ hiện khung tìm kiếm nếu có searchResult
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                //set lại ô input
                                setSearchValue('');
                                //set searchResult về [] & khung tìm kiếm sẽ bị xóa
                                setSearchResult([]);
                                //get dom element input để focus lại
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    {/* onMouseDown={(e) => e.preventDefault() bỏ hành vi mặc định */}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
