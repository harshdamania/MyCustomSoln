import { common, errorLogs } from "./Config";
/** 
 * This function fetches user profile information and gets the data in this format based on custom 
 * properties mentioned in Config file.
*/
export function getUserProperties(): Promise<{}> {
  let promise = new Promise((resolve, reject) => {
    let userProperties = {};
    debugger;
    //Creating a new Request url i.e userprofile url
    let userProfileReq = new Request(
      common.currentSiteUrl + common.userProfileUrl
    );
    //Fecth APi fetches data from user profile with headers as no data verbose
    fetch(userProfileReq, {
      method: "GET",
      credentials: "same-origin", // required
      headers: new Headers({
        Accept: common.headersWithNoMetaData
      })
    }) // Converting response to JSON mandatory
      .then((response) => {
       if(response.ok) return response.json(); else throw new Error(errorLogs.HtppResponseFailure);
      }).catch((error:Error)=>{        
        console.log(error.message);
        reject(error);
      })
      .then(user => {
        //user contains all information about current user from user profile.
        //Filter Custom Properties from  object i.e user
        let customProperties = common.customProperties;        
        customProperties.map(item => {


          
          var userProfileProperty = user["UserProfileProperties"].filter(
            BU => BU.Key == item
          )[0];
          //Store null value if "Custom Property" does not exist.
          if (userProfileProperty == null)
            userProperties[userProfileProperty.Key] = null; // deepscan-disable-line
          // deepscan-disable-line NULL_POINTER
          else {
            // deepscan-disable-line
            userProperties[userProfileProperty.Key] = userProfileProperty.Value;
          }
          //resolve promise
          resolve(userProperties);
          return userProperties;
        });
      }).catch((error:Error)=>{
        console.log(error.message);
        reject(error);
      });
  });
  return promise;
}
export default getUserProperties;

