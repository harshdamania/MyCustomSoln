    export function waitForUserInfo():Promise<{}> {
    return new Promise(function (resolve, reject) {
        (function wait(){
            if (sessionStorage.getItem("myLink") !==null)
             {return resolve(JSON.parse(sessionStorage.getItem("myLink")))
             }
             else
             {
                 console.log("Not found");
             }
            setTimeout(wait, 30);
        })();
    });
  }
