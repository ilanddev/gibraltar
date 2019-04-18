import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as paper from 'paper';

const DEFAULT_BACKGROUND_COLOR = '#343B4E';

@Component({
  selector: 'demo',
  template: `
    <div class="demo-component" #root>
      <div class="demo-title">{{ label }}</div>
      <p class="demo-description" *ngIf="description">{{ description }}</p>
	    <div class="runnable-demo-ctrls" *ngIf="runnable">
		    <button type="button" (click)="runClicked()">Run</button>
	    </div>
	    <canvas class="demo-canvas" #canvas></canvas>
    </div>
  `,
  styles: [require('./demo.component.less')]
})
export class DemoComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;

  @Input()
  label: string;

  @Input()
  description: string;

  @Input()
  runnable: boolean;

  @Output()
  run: EventEmitter<void> = new EventEmitter<void>();

  private project: paper.Project;

  ngOnInit(): void {
    this.project = new paper.Project(this.canvas.nativeElement);
    this.backgroundColor = DEFAULT_BACKGROUND_COLOR;
  }

  runClicked() {
    this.run.emit();
  }

  /**
   * Gets the paper project that is associated with this demo component.
   */
  getProject(): paper.Project {
    return this.project;
  }

  set backgroundColor(color: string) {
    (this.canvas.nativeElement as HTMLCanvasElement).style.backgroundColor = color;
  }

  @Input()
  set height(height: number) {
    (this.canvas.nativeElement as HTMLCanvasElement).style.height = height + 'px';
  }

  @Input()
  set width(width: number) {
    (this.canvas.nativeElement as HTMLCanvasElement).style.width = width + 'px';
  }

}
