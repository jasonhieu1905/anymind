import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  totalTweets: number;
  tweets = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

    this.callService()
      .subscribe((resp:any) => {

        this.totalTweets = resp.length;

        for (let i = 0; i < this.totalTweets; i++) {
          this.tweets.push(
            {
              tweet: resp[i].title,
              likes: Math.floor((Math.random() * 10000) + 1),
              replies: Math.floor((Math.random() * 10000) + 1),
              retweets: Math.floor((Math.random() * 10000) + 1),
              hashtags: ['#Python', '#AWS', '#Java'].join('-'),
              date: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
            }
          );
        }

      });
  }

  callService() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(url);
  }
}
