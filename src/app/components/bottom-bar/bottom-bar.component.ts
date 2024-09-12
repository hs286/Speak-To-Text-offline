import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "ez-bottom-bar",
  templateUrl: "./bottom-bar.component.html",
  styleUrls: ["./bottom-bar.component.css"],
})
export class BottomBarComponent {
  @Input() totalLessonSegments: number;
  @Input() index: number;
  @Input() feedbackUrls: string[];
  @Output() isNext = new EventEmitter<boolean>();
  @Output() selectFirst = new EventEmitter<boolean>();
  @Output() tickEmitter = new EventEmitter<boolean>();
  isRecording = false;
  repeatation = 0;
  isDone = false;
  randomUrl = "";

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let change in changes) {
      if (change === "index") {
        this.repeatation = 0;
        this.isDone = false;
        this.tickEmitter.emit(this.isDone);
        this.pickRandomUrl();
      }
    }
  }

  setPrev(selectedIndex: number) {
    if (selectedIndex > this.totalLessonSegments) this.selectFirst.emit(true);
    else this.isNext.emit(selectedIndex - 1 > this.index);
  }

  handleIsRecording(isRecording: boolean) {
    this.isRecording = isRecording;
    if (!isRecording) {
      this.repeatation++;
    }
  }

  handleIsExerciseCompleted(isCompleted: boolean) {
    if (this.repeatation >= 3 && isCompleted) this.isDone = true;
    else this.isDone = false;
    this.tickEmitter.emit(this.isDone);
    this.cdr.detectChanges();
  }

  pickRandomUrl() {
    const randomIndex = Math.floor(Math.random() * this.feedbackUrls.length);
    this.randomUrl = this.feedbackUrls[randomIndex];
  }
}
