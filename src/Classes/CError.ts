
import {sp, ItemAddResult} from '@pnp/sp';

export class CError
{
    private name:string;
    private message:string;
    private stack:string;
    private user:String;
    private webpart:string;

    // constructor(item:IError)
    // {
    //     this.name=item.name;
    //     this.message=item.message;
    //     this.stack=item.stack;
    //     this.webpart=item.webpart
    //     this.user=item.user;
    // }
    public AddError(name:string,msg:string,stack:string,webpart:string,user:string):void
    {
        sp.web.lists.getByTitle("Application Logs").items.add(
            {
                "Title":this.name,
                "Message":this.message,
                "Stack":this.stack,
                "Webpart":this.webpart,
                "User":this.user

            }).then((iar:ItemAddResult)=>{
                console.log(iar);
            })
    }
}