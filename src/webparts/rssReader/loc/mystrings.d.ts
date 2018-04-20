declare interface IRssReaderWebPartStrings {
  HeaderFieldLabel: string;
  UrlFieldLabel:string;
  TitleFieldLabel:string;
  SubTitleFieldLabel:string;
  DescriptionFieldLabel:string;
  NoOfItemsFieldLabel:string;
  ImageTemplateFieldLabel:string;
}

declare module 'RssReaderWebPartStrings' {
  const strings: IRssReaderWebPartStrings;
  export = strings;
}
