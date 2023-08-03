import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  public result: Subject<number>;

  private newsList: any[] = [];

  constructor(private _api: APIService) {
    this.result = new Subject();

    var Sentiment = require('sentiment');
    // var sentimentAnalysis  = require('sentiment-analysis');
    // var winkSentiment  = require('wink-sentiment');

    var sentiment = new Sentiment();
    this._api.getPosts().subscribe(e => {
      this.newsList = e.news
      var t: any[] = []
      this.newsList.forEach(e => {
        t.push(sentiment.analyze(e.title).score)
      })

      t = t.sort()
      t = t.filter(e => (e != 0))
      console.log(t)

      var sum = 0;
      t.forEach(e => {
        sum += e;
      })

      let result = ((t[Math.floor(t.length/2)] + sum / t.length) / 2)
      this.result.next(result)
          });
  }
}
