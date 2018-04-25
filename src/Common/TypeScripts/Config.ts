export const rssFeeds = {
    corsurl: "https://cors-anywhere.herokuapp.com/",
  };
  export const common={
    currentSiteUrl: window.location.protocol +"//" +window.location.host,
    userProfileUrl:"/_api/sp.userprofiles.peoplemanager/GetMyProperties",
    credential:"same-origin",
    headersWithNoMetaData:"application/json; odata=nometadata",
    customProperties:["BusinessUnit","Countries","GeoLocation","CompetenceArea","PictureURL"],
    currentLanguage:1033,
    userProfileSessionWait:"waiting for user profile information to be loaded in session",
    sessionStoreMyLink:"myLink"
  }
  export const errorLogs={
    businessUnitNotFound:"Your Business Unit is not avaiable in term store",
    failure:"An error has occured",
    success:"Error is logged successfully",
    HtppResponseFailure:"The Http response has failed"
  }
  export const MyLinklist={
    ApplicationLogs:"Application Logs",
    Settings:"Settings",
  }
 
 