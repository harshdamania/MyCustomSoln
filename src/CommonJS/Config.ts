export const rssFeeds = {
    corsurl: "https://cors-anywhere.herokuapp.com/",
  };
  export const common={
    currentsiteurl: window.location.protocol +"//" +window.location.host,
    userprofileurl:"/_api/sp.userprofiles.peoplemanager/GetMyProperties",
    credential:"same-origin",
    headerswithnodata:"application/json; odata=nometadata",
    customProperties:["BusinessUnit","Countries","GeoLocation","CompetenceArea","PictureURL"],
    currentLanguage:1033
  }
  export const error={
    businessunitnotfound:"Your Business Unit is not avaiable in term store"
  }
 
 