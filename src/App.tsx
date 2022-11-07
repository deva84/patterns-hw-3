import {FC, useEffect, useState} from 'react';
import {StyledEngineProvider} from '@mui/material/styles';

import {Account, Handler, HandlerData, Image, State, User} from './types';
import {Filters, Row, Search, Sort, Table} from './components';
import {getAccounts, getImages, getUsers} from './mocks/api';


import styles from './App.module.scss';
import {dataConverter} from "./helpers/data-converter";
import {filter, FilterOption} from "./helpers/filter";
import {search} from "./helpers/search";
import {Order, sort} from "./helpers/sort";
import {duplicateRemover} from "./helpers/duplicate-remover";

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = [];

const initialState: State = {
    users: [],
    filters: null,
    sortOrder: null,
    searchString: null,
};

let fetchedState: State = {...initialState};

export const App: FC = () => {
    const [data, setData] = useState<State>(initialState);

    useEffect(() => {
        // fetching data from API
        Promise.all([
            getImages(),
            getUsers(),
            getAccounts(),
        ]).then(([images, users, accounts]: [Image[], User[], Account[]]) => {
                fetchedState.users = dataConverter(images, users, accounts);
                setData(fetchedState);
            }
        );
    }, []);

    const filterHandler = (filterOptions: FilterOption[]): Row[] => {
        return filter(fetchedState.users, filterOptions);
    }

    const searchHandler = (searchString: string): Row[] => {
        return search(fetchedState.users, searchString);
    }

    const sortHandler = (order: Order, users: Row[]): Row[] => {
        return sort(users, order);
    }

    const originalDataHandler = (sortOrder: Order | null): void => {
        const updatedUsers = sortOrder ? sort(fetchedState.users, sortOrder) : fetchedState.users;
        const updatedState = {...fetchedState, users: updatedUsers};
        setData(updatedState);
    }

    const updatedStateHandlers = (currentHandler: Handler, value: any): State => {
        switch (currentHandler) {
            case Handler.FILTER: {
                return {...data, filters: value};
            }
            case Handler.SEARCH: {
                return {...data, searchString: value};
            }
            case Handler.SORT: {
                return {...data, sortOrder: value};
            }
        }
    }

    const commonHandler = (options: HandlerData<any>): void => {
        const currentHandler = options.handler;

        let updatedState = updatedStateHandlers(currentHandler, options.data);
        let users: Row[] = [];
        if (!updatedState.filters && !updatedState.searchString) {
            return originalDataHandler(updatedState.sortOrder);
        }

        if (updatedState.filters) {
            users = [...users, ...filterHandler(updatedState.filters)];
        }
        if (updatedState.searchString) {
            users = [...users, ...searchHandler(updatedState.searchString)];
        }
        users = duplicateRemover(users);
        if (updatedState.sortOrder) {
            users = sortHandler(updatedState.sortOrder, users);
        }
        updatedState = {...updatedState, users: users};
        setData(updatedState);
    }

    return (
        <StyledEngineProvider injectFirst>
            <div className="App">
                <div className={styles.container}>
                    <div className={styles.sortFilterContainer}>
                        <Filters updateStore={commonHandler}/>
                        <Sort updateStore={commonHandler}/>
                    </div>
                    <Search updateStore={commonHandler}/>
                </div>
                <Table rows={data.users || mockedData}/>
            </div>
        </StyledEngineProvider>
    );
};
