import {FC, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';
import {Handler, HandlerData} from "../../types";

interface SearchProps {
    store?: {};
    updateStore?: (val: HandlerData<string>) => void;
}


export const Search: FC<SearchProps> = props => {
    const [searchedValue, setSearchedValue] = useState<string>('');

    const onChange = value => {
        if (value.length === 0) {
            props.updateStore({data: null, handler: Handler.SEARCH});
        }
        setSearchedValue(value);
    };

    const onKeyPress = event => {
        if (event.key === 'Enter' && searchedValue.length >= 3) {
            props.updateStore({data: searchedValue, handler: Handler.SEARCH});
        }
    }

    return (
        <OutlinedInput
            className={styles.input}
            placeholder="Search by country/name/username"
            value={searchedValue}
            type="search"
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => onKeyPress(e)}
        />
    );
};
