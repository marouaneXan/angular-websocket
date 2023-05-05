import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws: WebSocket | undefined;
  public messageSubject = new Subject<string>();

  connect(): void {
    console.log('Connecting...');
    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result as string;
        console.log('Received: ' + data);
        this.messageSubject.next(data);
      };
      reader.readAsText(event.data as Blob);
    };

    this.ws.onclose = () => {
      console.log('Disconnected');
    };
  }

  sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('Sending message: ' + message);
      this.ws.send(message);
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}
