import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ezspeak-offline";
  public currentSpeechExerciseIndex = 0;
  public jsonData: any;
  public speakSections: any = [];
  public isDone: boolean = false;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  public feedbackUrls = [
    "assets/feedbacks/1Keep it Up 2.3s.mp4",
    "assets/feedbacks/1Keep it Up 2.5s.mp4",
    "assets/feedbacks/2Fantastic 1.8s.mp4",
    "assets/feedbacks/2High five 1.8s.mp4",
    "assets/feedbacks/2High five Original.mp4",
    "assets/feedbacks/2Nailed it 2s.mp4",
    "assets/feedbacks/2Well done 1.8s.mp4",
    "assets/feedbacks/2Wohooo 1.6s.mp4",
    "assets/feedbacks/A for effort 1.8s.mp4",
    "assets/feedbacks/Fantastic 1.9s.mp4",
    "assets/feedbacks/high five 1.3s.mp4",
    "assets/feedbacks/Keep it Up 2s.mp4",
    "assets/feedbacks/Nailed It 1.3s.mp4",
    "assets/feedbacks/Nicely done 2.s.mp4",
    "assets/feedbacks/That_s even better than last time 2.8 s.mp4",
    "assets/feedbacks/This is awesome 1.9s.mp4",
    "assets/feedbacks/this is awesome 2.2s.mp4",
    "assets/feedbacks/Trumpet 1.5s.mp4",
    "assets/feedbacks/trumpet 2.2.mp4",
    "assets/feedbacks/Well done 1.5s.mp4",
    "assets/feedbacks/Wohoo 1.4s.mp4",
    "assets/feedbacks/You can do it 2s.mp4",
    "assets/feedbacks/You can do it long 3.3.mp4",
    "assets/feedbacks/You can do it short and clean 1.9.mp4",
    "assets/You Rock 1.7s.mp4",
  ];

  ngOnInit() {
    this.http.get("/assets/speakSections.json").subscribe((data: any) => {
      this.jsonData = data;
      this.speakSections = data.phases.singleAnswers;
    });
  }

  handleProgressClick(isNext: boolean) {
    if (isNext) {
      this.nextSpeechExercise();
    } else {
      this.previousSpeechExercise();
    }
  }

  nextSpeechExercise() {
    if (this.currentSpeechExerciseIndex < this.speakSections.length - 1) {
      this.currentSpeechExerciseIndex++;
    }
  }

  previousSpeechExercise() {
    if (this.currentSpeechExerciseIndex > 0) {
      this.currentSpeechExerciseIndex--;
    }
  }

  selectFirstSpeechExercise() {
    this.currentSpeechExerciseIndex = 0;
  }

  handleIsDone(isDone: boolean) {
    this.isDone = isDone;
    this.cdr.detectChanges();
  }
}
