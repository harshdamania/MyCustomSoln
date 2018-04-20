// /** Fetch User Profile Properties from user profile services and binds it to currentuser variable.
//  * The userproperties are defined in managed metadata service.
//  */
// var MyLinkConfig = MyLinkConfig || {
//     nometadata: "application/json; odata=nometadata",
//     userprofileurl: "/_api/sp.userprofiles.peoplemanager/GetMyProperties",
//     currenturl: window.location.protocol + "//" + window.location.host,
//     customProperties: [
//       "BusinessUnit",
//       "Countries",
//       "GeoLocation",
//       "CompetenceArea"
//     ]
//   };
//   var myLink ={
//     say: function(text) { alert(text); },

//   myLinkUP:function() {
//       let userProperties = {};
//       /** SharePoint Default Headers */
//       let metaData = {
//         method: "GET",
//         credentials: "same-origin", // required
//         headers: new Headers({
//           Accept: MyLinkConfig.nometadata
//         })
//       };
//       let userProfileReq = new Request(
//         MyLinkConfig.currenturl + MyLinkConfig.userprofileurl,
//         metaData
//       );
//       fetch(userProfileReq)
//         .then(response => response.json())
//         .then(data => {
//           // GetUserProperties(data.AccountName)
//           //Filter Custom Properties from array object i.e data
//           let customProperties = MyLinkConfig.customProperties;
//           customProperties.map(item => {
//             var userProfileProperty = data.UserProfileProperties.find(
//               BU => BU.Key == item
//             );
//             if (userProfileProperty == null)
//               userProperties[userProfileProperty.Key] = null; // deepscan-disable-line
//             else {
//               // deepscan-disable-line NULL_POINTER
//               // deepscan-disable-line
//               userProperties[userProfileProperty.Key] = userProfileProperty.Value;
//             }
//             return userProperties;
//           });
//           //self.userProperties = userProperties;
//         })
//         .then(() => {
//           getParentTerm();
//         });
//       return { currentUser: userProperties };
//     }
//   }
  
//     let getParentTerm = function() {
//       var self = this;
//       let parentTermBU = {};
//       SP.SOD.executeFunc("sp.js", "SP.ClientContext", fetchTaxonomy);
//       function fetchTaxonomy() {
//         SP.SOD.registerSod(
//           "sp.taxonomy.js",
//           SP.Utilities.Utility.getLayoutsPageUrl("sp.taxonomy.js")
//         );
//         SP.SOD.executeFunc(
//           "sp.taxonomy.js",
//           "SP.Taxonomy.TaxonomySession",
//           function() {
//             var clientContext = SP.ClientContext.get_current();
//             var taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(
//               clientContext
//             );
//             var lmi = SP.Taxonomy.LabelMatchInformation.newObject(clientContext);
//             //Search for label i.e Business Unit
//             //Set Various Properties
//             lmi.set_termLabel(myLink.currentUser.BusinessUnit);
//             lmi.set_defaultLabelOnly(true);
//             lmi.set_stringMatchOption(SP.Taxonomy.StringMatchOption.exactMatch);
//             lmi.set_lcid(_spPageContextInfo.currentLanguage);
//             lmi.set_resultCollectionSize(1);
//             lmi.set_trimDeprecated(true);
//             lmi.set_trimUnavailable(true);
//             terms = taxonomySession.getTerms(lmi);
//             clientContext.load(
//               terms,
//               "Include(IsRoot,TermsCount,Id,Name,Parent,Parent.Id,TermSet.Name)"
//             );
//             clientContext.executeQueryAsync(
//               function onSuccess() {
//                 //for (var i = 0; i < terms.get_count(); i++) {
//                 if (terms.get_count() > 0) {
//                   var term = terms.getItemAtIndex(0);
    
//                   if (!term.get_isRoot()) {
//                     var parentTermBU = getTermValue(term.get_parent());
//                     var childTermsBU = getTermValue(term);
//                     return (self.myLink = currentUserProperties(
//                       {
//                         ParentTerm: parentTermBU,
//                         ChildTerms: childTermsBU
//                       },
//                       self.myLink.currentUser,
//                       term.get_isRoot()
//                     ));
//                   } else {
//                     self.parentTermBU = getTermValue(term);
//                     getChildTerms(term.get_isRoot());
//                   }
//                 } else {
//                   console.log("Business Unit is not a part of term store.");
//                   return (self.myLink = self.myLink.currentUser), { BU: null };
//                 }
//               },
//               function(sender, args) {
//                 console.log(args.get_message());
//               }
//             );
//           }
//         );
//       }
//     };
//     let getChildTerms = function(isRoot) {
//       var self = this;
//       var childTermsBU = [];
//       var context = SP.ClientContext.get_current();
//       var session = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
//       var termStore = session.getDefaultSiteCollectionTermStore();
//       var parentTermId = self.parentTermBU.ID; //parent Term Id
//       var parentTerm = termStore.getTerm(parentTermId);
//       var terms = parentTerm.get_terms(); //load child Terms
//       context.load(terms,"Include(IsRoot,TermsCount,Id,Name,Parent,Parent.Id,TermSet.Name)");
//       context.executeQueryAsync(
//         function() {
//           for (var i = 0; i < terms.get_count(); i++) {
//             var term = terms.getItemAtIndex(i);
//             childTermsBU.push(getTermValue(term));
//           }
//           return (self.myLink = currentUserProperties(
//             { ParentTerm: self.parentTermBU, ChildTerms: childTermsBU },
//             self.myLink.currentUser,
//             isRoot
//           ));
//         },
//         function(sender, args) {
//           console.log(args.get_message());
//         }
//       );
//     };
    
//     let getTermValue = function(term) {
//       return {
//         Name: term.get_name(),
//         ID: term.get_id().ToSerialized(),
//         Root: term.get_isRoot()
//       };
//     };
//     let currentUserProperties = function(BU, userProperties, term) {
//       return (currentUser = {
//         BU: BU,
//         userProperties: userProperties,
//         BusinessUnit_isRoot: term
//       });
//     };
var ContosoJS = {
  say: function(text) { alert(text); },
  sayHello: function(name) { alert('Hello, ' + name + '!'); }
};    
