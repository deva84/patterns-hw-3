import {Row} from "../components";

export type Order = 'asc' | 'desc';

const sortMap = {
    asc: (a: Row, b: Row) => a.posts < b.posts ? -1 : 1,
    desc: (a: Row, b: Row) => a.posts > b.posts ? -1 : 1,
}

export const sort = (rows: Row[], order: Order): Row[] => {
    const rowsCopy = [...rows];
    return rowsCopy.sort(sortMap[order as string])
}
