import {FC, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';

import styles from './Filters.module.scss';
import {Handler, HandlerData} from "../../types";
import {FilterOption} from "../../helpers/filter";

interface FiltersProps {
    store?: {};
    updateStore?: (val: HandlerData<FilterOption[]>) => void;
}

const OPTIONS = [
    {
        title: 'Without posts',
    },
    {
        title: 'More than 100 posts',
    },
];

export const Filters: FC<FiltersProps> = props => {
    const [selectedFilter, setSelectedFilter] = useState<FilterOption[]>([]);
    const onChange = ({ title }) => {
        let updatedFilters = [];

        if (selectedFilter.find(filter => filter === title)) {
            updatedFilters = selectedFilter.filter(filter => filter !== title);
        } else {
            updatedFilters = [...selectedFilter, title];
        }

        setSelectedFilter(updatedFilters);

        if (!updatedFilters.length) {
            props.updateStore({data: null, handler: Handler.FILTER});
        }
        props.updateStore({data: updatedFilters, handler: Handler.FILTER});
    };

    return (
        <div className={styles.group}>
            <div className={styles.title}>Filter by posts</div>
            <ul className={styles.list}>
                {OPTIONS.map(option => (
                    <li
                        value={option.title}
                        key={option.title}
                        onClick={() => onChange(option)}
                    >
                        <Checkbox
                            checked={!!selectedFilter.find(filter => filter === option.title)}
                            value={option.title}
                            size="small"
                            color="primary"
                            onChange={() => onChange(option)}
                        />{' '}
                        {option.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};
