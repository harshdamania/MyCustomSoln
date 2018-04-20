export interface IUserProperties {
    ParentTerm: ParentTerm;
    userProperties: UserProperties;
  }
  export interface ParentTerm {
    Name: string;
    ID: string;
    Root: boolean;
    ChildTerm?: (ChildTermEntity)[] | null;
  }
  export interface ChildTermEntity {
    Name: string;
    ID: string;
    Root: boolean;
  }
  export interface UserProperties {
    BusinessUnit: string;
    Countries: string;
    GeoLocation: string;
    CompetenceArea: string;
    PictureURL: string;
  }
  