import { Injectable } from '@angular/core';

// declare var SockJS;
// declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  stompClientNotification;
  private url: string;
  private parametrizationAction: string;

  constructor() { }

}
