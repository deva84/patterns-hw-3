import {Row} from "../components";

export enum FilterOption {
    NONE = 'Without posts',
    OVER_100 = 'More than 100 posts'
}

const callbackMap = {
    none: (row: Row) => !row.posts,
    over100: (row: Row) => row.posts > 100
}

export const filter = (rows: Row[], filterOptions: FilterOption[]): Row[] => {
    const rowsCopy = [...rows];
    const callbacks = [];
    filterOptions.forEach(option => {
        let cb = option === FilterOption.NONE ? callbackMap.none : callbackMap.over100;
        callbacks.push(cb);
    })
    return rowsCopy.filter(row => {
        return callbacks.some(cb => cb(row))
    })
}
