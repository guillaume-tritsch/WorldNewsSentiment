import { Component } from '@angular/core';
import { SentimentService } from 'src/app/service/sentiment.service';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.scss']
})
export class ServiceTestComponent {
  constructor(private _sentiment: SentimentService) {

  }
}
