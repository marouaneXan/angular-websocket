import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { WebsocketService } from './service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'websocket-angular';
  messages: string[] = [];
  message: string = '';

  constructor(public websocketService: WebsocketService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.websocketService.connect();
    this.websocketService.messageSubject.subscribe((message) => {
      this.messages.push(message);
      console.log('Message received in component: ' + message);
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  sendMessage(): void {
    console.log('Sending message from component: ' + this.message);
    this.websocketService.sendMessage(this.message);
    this.message = '';
  }
}
