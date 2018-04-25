import { sp, ItemAddResult } from "@pnp/sp";
import {errorLogs,MyLinklist} from '../TypeScripts/Config';
export class CError {
  private name: string;
  private message: string;
  private stack: string;
  private user: string;
  private webpart: string;
  public AddError(
    name: string,
    msg: string,
    stack: string,
    webpart: string,
    user: string
  ): void {
    let list = sp.web.lists.getByTitle(MyLinklist.ApplicationLogs);
    list.items
      .add({
        Title: this.name,
        Message: this.message,
        Stack: this.stack,
        Webpart: this.webpart,
        User: this.user
      })
      .then((iar: ItemAddResult) => {
        console.log(errorLogs.success+ ":"+ iar);
      }).catch((error)=>{
        console.log(errorLogs.failure);
      });
  }
}
