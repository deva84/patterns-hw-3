import {Row} from "../components";

export const duplicateRemover = (users: Row[]): Row[] => {
    const usersCopy = [...users];
    return usersCopy.reduce((acc, next) => {
            if (!acc.some(user => user.username === next.username)) {
                acc.push(next);
            }
            return acc;
        }, []
    )
}
