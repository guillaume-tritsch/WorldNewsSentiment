import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  private newsList: any[] = [];

  constructor(private _api: APIService) {
    var Sentiment = require('sentiment');
    var sentimentAnalysis  = require('sentiment-analysis');
    var winkSentiment  = require('wink-sentiment');

    var sentiment = new Sentiment();
    this._api.getPosts().subscribe(e => {
      this.newsList = e.news
      var t: any[] = []
      this.newsList.forEach(e => {
        console.log(e.title, sentiment.analyze(e.title).score, sentimentAnalysis(e.title), winkSentiment(e.title).score)
        t.push(sentiment.analyze(e.title).score)
      })

      function isPositive(value: number) {
        return value != 0;
    }

      t = t.filter(isPositive)
      console.log(t)

      var sum = 0;
      t.forEach(e => {
        sum += e;
      })
      console.log(sum / t.length, t[Math.floor(t.length/2)], (t[Math.floor(t.length/2)] + sum / t.length) / 2)

    });
  }
}
