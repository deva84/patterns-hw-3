import {Row} from "../components";

export const search = (rows: Row[], searchString: string): Row[] => {
    const rowsCopy = [...rows];
    return rowsCopy.filter(row => {
        const rowCopy = {...row};
        delete rowCopy.avatar;
        const rowValues = Object.values(rowCopy);
        return rowValues.some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().indexOf(searchString.toLowerCase()) >= 0;
            }
            return false;
        })
    })
}
