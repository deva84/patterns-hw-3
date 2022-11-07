import {Account, Image, Payment, User} from "../types";
import {Row} from "../components";

export const dataConverter = (images: Image[], users: User[], accounts: Account[]): Row[] => {
  return images.map((item) => {
      const userAvatar = {avatar: item.url};
      const userInfo = personalInfo(users, item.userID);
      const userAccount = accountInfo(accounts, item.userID);
      const row = Object.assign({}, userAvatar, userInfo, userAccount);
      return row as Row;
  });
}

const personalInfo = (users: User[], id: string): Partial<Row> => {
    const userInfoCopy = {...users.find(user => user.userID === id)};
    delete userInfoCopy.userID;
    return userInfoCopy;
}

const accountInfo = (accounts: Account[], id: string): Partial<Row> => {
    const user = accounts.find(user => user.userID === id);
    return {posts: user.posts, lastPayments: latestPayments(user.payments)};
}

const latestPayments = (payments: Payment[]): number => {
    if (!payments.length) {
        return 0;
    }
    const latestPayment = payments.reduce((latest, current) => {
        if (Date.parse(latest.date) > Date.parse(current.date)) {
            return latest;
        }
        return current;
    });
    return latestPayment.totalSum;
}
