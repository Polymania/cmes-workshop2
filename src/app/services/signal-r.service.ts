import { Injectable } from '@angular/core';
import { SignalRHub } from './rxjs-signal-r/signalr-hub';
import { createSignalRHub } from './rxjs-signal-r/signalr-hub-factory';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public createHub(hubName: string):SignalRHub{
    return createSignalRHub(hubName, "http://srv010wpapp1/Demo13/Application/signalR");
  }
  constructor() { }
}
