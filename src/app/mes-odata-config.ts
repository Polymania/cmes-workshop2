import { Injectable } from "@angular/core";
import { ODataConfiguration, ODataServiceFactory, ODataService } from "angular-odata-es5";

@Injectable()
export class MesODataConfig extends ODataConfiguration{
  override baseUrl="http://srv010wpapp1/Demo13/application/odata/";
}
