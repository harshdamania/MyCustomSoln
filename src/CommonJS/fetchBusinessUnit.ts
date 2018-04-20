import { common,error } from "./Config";

export function getBusinessUnit(userproperties): Promise<{}> {
  var parTerm = {};
  var userProperties = {};
  let promise = new Promise((resolve, reject) => {
    const clientContext = SP.ClientContext.get_current();
    const taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(
      clientContext
    );
    //Match label information
    const lmi = SP.Taxonomy.LabelMatchInformation.newObject(clientContext);
    userProperties = userproperties;
    //Set the Business Unit that has to be found from term store
    lmi.set_termLabel(userproperties["BusinessUnit"]);
    lmi.set_defaultLabelOnly(true);
    lmi.set_stringMatchOption(SP.Taxonomy.StringMatchOption.exactMatch);
    //Hardcoded language
    lmi.set_lcid(common.currentLanguage);
    lmi.set_resultCollectionSize(1);
    lmi.set_trimDeprecated(true);
    lmi.set_trimUnavailable(true);
    const terms = taxonomySession.getTerms(lmi);
    clientContext.load(
      terms,
      "Include(IsRoot, TermsCount,  Id, Name, Parent, Parent.Id, TermSet.Name)"
    );
    clientContext.executeQueryAsync(
      function onSuccess() {
        if (terms.get_count() > 0) {
          var term = terms.getItemAtIndex(0);
          
          if (!term.get_isRoot()) {
            var userProfileProperties = {};
            var parentTermBU: any = getTermValue(term.get_parent());
            var childTermsBU: any = getTermValue(term);            
            userProfileProperties["ParentTerm"] = parentTermBU;
            parTerm["ChildTerm"] = childTermsBU;
            userProfileProperties["userProperties"] = userproperties;            
            resolve(userProfileProperties);
          } else {
            getChildTerms(getTermValue(term)).then(userProfileProperties => {
              userProfileProperties["userProperties"] = userProperties;
              resolve(userProfileProperties);
            });
          }
          
          } else {
          console.log(error.businessunitnotfound);
          reject(error.businessunitnotfound);
        }
      },
      function(sender, args) {
        console.log(args.get_message());
      }
    );
    return promise;
  });
  let getChildTerms = function promise(parentTermValue: any) {
    let promise = new Promise((resolve, reject) => {
      var childTermsBU = [];
      parTerm = parentTermValue;
      var context = SP.ClientContext.get_current();
      var session = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
      var termStore = session.getDefaultSiteCollectionTermStore();
      var parentTermId = parTerm["ID"]; //parent Term Id
      var parentTerm = termStore.getTerm(parentTermId);
      var terms = parentTerm.get_terms(); //load child Terms
      context.load(terms);
      context.executeQueryAsync(
        function() {
          for (var i = 0; i < terms.get_count(); i++) {
            var term = terms.getItemAtIndex(i);
            childTermsBU.push(getTermValue(term));
          }
          var userProfileProperties = {};
          userProfileProperties["ParentTerm"] = parTerm;
          parTerm["ChildTerm"] = childTermsBU;
          resolve(userProfileProperties);
        },
        function(sender, args) {
          console.log(args.get_message());
          reject(error.businessunitnotfound);
        }
      );
    });
    return promise;
  };
  let getTermValue = function(term) {
    return {
      Name: term.get_name(),
      ID: term.get_id().ToSerialized(),
      Root: term.get_isRoot()
    };
  };
  return promise;
}
