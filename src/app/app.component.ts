import { Component, OnInit, NgZone } from '@angular/core';
import { WebsocketService } from './service/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'websocket-angular';
  messages: string[] = [];
  message: string = '';
  private messageSubscription: Subscription = new Subscription();

  constructor(public websocketService: WebsocketService,private ngZone: NgZone) {
    console.log(this.messages);
  }

  ngOnInit(): void {
    this.websocketService.connect();
    this.messageSubscription = this.websocketService.messageSubject.subscribe((message) => {
      this.ngZone.run(() => {
        console.log('Messages array: ', this.messages);
        this.messages.push(message);
        console.log('Message received in component: ' + message);
      });
    });
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.messageSubscription.unsubscribe();
  }

  sendMessage(): void {
    console.log('Sending message from component: ' + this.message);
    this.websocketService.sendMessage(this.message);
    this.message = '';
  }
}
