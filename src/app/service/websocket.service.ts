import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'

const SOCKET_ENDPOINT="localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any

  constructor() { }
}
