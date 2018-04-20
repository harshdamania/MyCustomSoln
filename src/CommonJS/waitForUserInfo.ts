    export function waitForUserInfo():Promise<{}> {
    return new Promise(function (resolve, reject) {
        (function waitForFoo(){
            if (sessionStorage.getItem("myLink") !==null) return resolve(sessionStorage.getItem("myLink"));
            setTimeout(waitForFoo, 30);
        })();
    });
  }
