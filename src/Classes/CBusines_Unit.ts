import { IBusiness_Unit } from "../Interfaces/IBusiness_Unit";

export class CBusiness_Unit{
    public Title:string;
    public ID:Int16Array;
    constructor(item:IBusiness_Unit)
    {
        this.Title=item.Title;
        this.ID=item.ID;
    }
}