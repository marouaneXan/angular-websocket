import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Client | undefined;
  public messageSubject = new Subject<string>();

  constructor() { }

  connect(): void {
  console.log('Connecting...');
  const socket = new SockJS('http://localhost:8080/websocket-endpoint');
  this.stompClient = over(socket);

  this.stompClient.debug = (str) => {
    console.log('STOMP: ' + str);
  };

  this.stompClient.connect(
    {},
    (frame) => {
      console.log('Connected: ' + frame);
      this.subscribeToTopic();
    },
    (error) => {
      console.log('Error: ' + error);
    }
  );
}

  subscribeToTopic(): void {
    if (this.stompClient) {
      console.log('Subscribing to topic...');
      this.stompClient.subscribe('/topic/messages', (message) => {
        console.log('Received: ' + message.body);
        this.messageSubject.next(message.body);
        console.log('Message emitted: ' + message.body);
      }, (error: any) => {
        console.error('Error in subscription: ', error);
      });
    }
  }

  sendMessage(message: string): void {
    console.log('Sending message from service: ' + message);
    if (this.stompClient) {
      this.stompClient.send('/app/send', {}, message);
      console.log('Message sent: ' + message);
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
}
