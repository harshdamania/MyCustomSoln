import * as React from "react";
import styles from "./RssReader.module.scss";
import { IRssReaderProps } from "./IRssReaderProps";
import { List } from "office-ui-fabric-react/lib/List";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { Label } from "office-ui-fabric-react/lib/Label";
import "../../../CommonCss/list.module.scss";
import { IRssReader } from "../../../Interfaces/IRssReader";
import { rssFeeds } from "../../../CommonJS/Config";
import { waitForUserInfo } from "../../../CommonJS/waitForUserInfo";
import { IUserProperties } from "../../../Interfaces/IUserProperties";

export default class RssReader extends React.Component<IRssReaderProps, any> {
  public constructor(props: IRssReaderProps, any) {
    super(props);
    this.state = {
      rssfeeds: {}
    };
    
  }

  public render(): React.ReactElement<IRssReaderProps> {
    if (this.props.imagetemplate) {
      return (
        <div className={styles.rssReader}>
          <Label className={"ms-fontWeight-semibold " + styles.webpartHeader}>
            {this.props.header}
          </Label>
          <FocusZone direction={FocusZoneDirection.vertical}>
            <List
              items={this.state.rssfeeds}
              onRenderCell={this._onRenderCell_Template_withImage}
            />
          </FocusZone>
        </div>
      );
    } else {
      return (
        <div className={styles.rssReader}>
          <Label className={"ms-fontWeight-semibold " + styles.webpartHeader}>
            {this.props.header}
          </Label>
          <FocusZone direction={FocusZoneDirection.vertical}>
            <List
              items={this.state.rssfeeds}
              onRenderCell={this._onRenderCell_Template_withoutImage}
            />
          </FocusZone>
        </div>
      );
    }
  }
  private _onRenderCell_Template_withoutImage(
    item: IRssReader,
    index: number | undefined
  ): JSX.Element {
    return (
      <div className="ms-ListBasicExample-itemCell" data-is-focusable={true}>
        <div className="ms-ListBasicExample-itemContent">
          <div className="ms-ListBasicExample-itemName">{item.Title}</div>
          <div className="ms-ListBasicExample-itemSub">{item.SubTitle}</div>
          <div className="ms-ListBasicExample-itemDesc">{item.Description}</div>
        </div>
      </div>
    );
  }
  private _onRenderCell_Template_withImage(
    item: IRssReader,
    index: number | undefined
  ): JSX.Element {
    return (
      <div className="ms-ListBasicExample-itemCell" data-is-focusable={true}>
        <Image
          className="ms-ListBasicExample-itemImage"
          src={item.ImageURl}
          width={50}
          height={50}
          imageFit={ImageFit.cover}
        />
        <div className="ms-ListBasicExample-itemContent">
          <div className="ms-ListBasicExample-itemName">{item.Title}</div>
          <div className="ms-ListBasicExample-itemSub">{item.SubTitle}</div>
          <div className="ms-ListBasicExample-itemDesc">{item.Description}</div>
        </div>
      </div>
    );
  }

  private _getrssFeeds() {
    var self = this;

    fetch(rssFeeds.corsurl + this.props.url).then(response => {
      response.text().then(responseText => {
        var parseString = require("xml2js").parseString;
        var xml = responseText;
        parseString(xml, (err, result) => {
          if (result.rss !== "undefined") {
            var rssFeedsData = [];
            for (
              var i = 0;
              i <
              result.rss.channel[0].item.slice(0, this.props.noofitems).length;
              i++
            ) {
              var objRssReader = {
                Title: "",
                Description: "",
                ImageURl: "",
                SubTitle: ""
              };

              var createElementDescription = document.createElement("div");
              if((result.rss.channel[0].item[i][self.props.description] !== undefined
              && result.rss.channel[0].item[i][self.props.description] !== "") &&
              (self.props.title !== "" && self.props.title !== undefined) &&
              
              (self.props.subtitle !== "" && self.props.subtitle !== undefined)  )
              {
              createElementDescription.innerHTML =
                result.rss.channel[0].item[i][self.props.description][0];
              if (this.props.imagetemplate) {
                if (
                  createElementDescription.getElementsByTagName("img")[0] !==
                    undefined ||
                  ""
                ) {
                  objRssReader.ImageURl = createElementDescription.getElementsByTagName(
                    "img"
                  )[0].src;
                }
              }
              objRssReader.Title =
                result.rss.channel[0].item[i][self.props.title][0];
              objRssReader.Description =
                result.rss.channel[0].item[i][self.props.description][0];
              objRssReader.SubTitle =
                result.rss.channel[0].item[i][self.props.subtitle][0];
              rssFeedsData.push(objRssReader);
            }  
              //objRssReader.ImageURl=result.rss.channel[0].item[i][""][0];
            }
            self.setState({ rssfeeds: rssFeedsData });
          } else this.setState({ rssfeeds: [] });
        });
      });
    });
  }

  public componentDidUpdate(
    prevProps: IRssReaderProps,
    prevContext: any
  ): void {
    if (
      this.props.header !== prevProps.header ||
      this.props.url !== prevProps.url ||
      this.props.title !== prevProps.title ||
      this.props.subtitle !== prevProps.subtitle ||
      this.props.description !== prevProps.description ||
      this.props.noofitems !== prevProps.noofitems ||
      this.props.imagetemplate !== prevProps.imagetemplate
    ) {
      this._getrssFeeds();
    }
  }

  public componentDidMount() {
    waitForUserInfo().then((data: IUserProperties) => {
      this._getrssFeeds();
    });
  }
}
