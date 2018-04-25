import { ISettings } from "../Interfaces/ISettings";
import { CBusinessUnit } from "../Classes/CBusinesUnit";

export class CSettings{
    private Title:string;
    private Application:string;
    private Key:string;
    private BusinessUnit:{}[];
    constructor(item:ISettings)
    {
        this.Title=item.Title;
        this.Application=item.Application;
        this.BusinessUnit=item.Business_x0020_Unit.map(item=>new CBusinessUnit(item));
        this.Key=item.Key;
    }
}
