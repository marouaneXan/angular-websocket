import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const SOCKET_ENDPOINT="http://localhost:8081/ngdev/api/ws"

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }
  
}
