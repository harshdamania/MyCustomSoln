import { ISettings } from "../Interfaces/ISettings";
import { CBusiness_Unit } from "./CBusines_Unit";

export class CSettings{
    private Title:string;
    private Application:string;
    private Key:string;
    private Business_Unit:{}[];

    constructor(item:ISettings)
    {
        this.Title=item.Title;
        this.Application=item.Application;
        this.Business_Unit=item.Business_x0020_Unit.map(item=>new CBusiness_Unit(item));
        this.Key=item.Key;
    }
}
