import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  private newsList: any[] = [];

  constructor(private _api: APIService) {
    var Sentiment = require('sentiment');
    var sentimental = require('sentimental');

    var sentiment = new Sentiment();
    this._api.getPosts().subscribe(e => {
      this.newsList = e.news
      var t: any[] = []
      this.newsList.forEach(e => {
        console.log(e.title, sentiment.analyze(e.title), sentimental('EN',e.title))
        t.push(sentiment.analyze(e.title))
      })
      console.log(t)
    });
  }
}
