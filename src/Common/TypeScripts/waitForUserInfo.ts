import { common } from "./Config";

export function waitForUserInfo(): Promise<{}> {
  return new Promise((resolve, reject)=> {
    (function wait() {
      if (sessionStorage.getItem(common.sessionStoreMyLink) !== null) {
        return resolve(JSON.parse(sessionStorage.getItem(common.sessionStoreMyLink)));
      } else {
        console.log(common.userProfileSessionWait);
      }
      setTimeout(wait, 30);
    })();
  });
}
