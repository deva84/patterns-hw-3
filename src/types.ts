import {Row} from './components';
import {Order} from './helpers/sort';
import {FilterOption} from "./helpers/filter";

export interface Image {
    userID: string;
    url: string;
}

export interface User {
    userID: string;
    username: string;
    country: string;
    name: string;
}

export interface Payment {
    totalSum: number;
    date: string;
}

export interface Account {
    userID: string;
    posts: number;
    payments: Payment[];
}

export interface HandlerData<T> {
    data: T;
    handler: Handler;
}

export interface State {
    users: Row[];
    filters: FilterOption[] | null;
    sortOrder: Order | null;
    searchString: string | null;
}

export enum Handler {
    FILTER,
    SEARCH,
    SORT,
    ORIGINAL_DATA
}
