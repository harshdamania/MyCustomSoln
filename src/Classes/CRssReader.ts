import { IRssReader } from "../Interfaces/IRssReader";
export class CRssReader{
private Title:string;
private description:string;
constructor(item:IRssReader)
{
    this.Title=item.Title,
    this.description=item.Description
}
}