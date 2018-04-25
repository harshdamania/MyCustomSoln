import { IBusinessUnit } from "../Interfaces/IBusinessUnit";

export class CBusinessUnit{
    public Title:string;
    public ID:Int16Array;
    constructor(item:IBusinessUnit)
    {
        this.Title=item.Title;
        this.ID=item.ID;
    }
}