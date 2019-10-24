import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { DemoComponent } from '../demo-component/demo.component';
import { LIGHT_GREY, CANVAS_BACKGROUND_COLOR } from '../../../../../src/constants/colors';
import { ScrollbarComponent } from '../../../../../src/components/scrollbar';

@Component({
  selector: 'misc-scrollbar-vertical-demo',
  template: `
	  <demo label="Vertical Scrollbar" height="800"
          description="Scrollbar UI component for vertical scrolling with default scrollbar and track."
          runnable="true" (run)="run()" (reset)="reset()"></demo>
  ` })
export class MiscScrollbarVerticalDemoComponent implements AfterViewInit {

  @ViewChild(DemoComponent)
  demo: DemoComponent;

  private fizzSize: number = 100;

  ngAfterViewInit() {
    // sets up Paper Project
    const proj = this.demo.getProject();
    proj.activate();
    this.demo.backgroundColor = CANVAS_BACKGROUND_COLOR;
    const view = paper.view;
    const VIEW_PADDING = 30;

    // create content
    const content = new paper.Group();
    for (let i = 0; i < this.fizzSize; i++) {
      const textContent = i === 0
        ? 0
        : i % 15 === 0 && 'fizzbuzz' || i % 3 === 0 && 'fizz' || i % 5 === 0 && 'buzz' || i;
      content.addChildren([
        new paper.Path.Circle({
          position: new paper.Point(view.center.x, (100 + 15) * i + 50),
          radius: 50,
          strokeWidth: 1,
          strokeColor: LIGHT_GREY
        }),
        new paper.PointText({
          point: new paper.Point(view.center.x, (100 + 15) * i + 60),
          content: textContent,
          fillColor: LIGHT_GREY,
          fontSize: 25,
          justification: 'center'
        })
      ]);
    }
    content.translate(new paper.Point(0, VIEW_PADDING));

    // create scrollbar
    const scrollbar = new ScrollbarComponent({
      content: content,
      container: view.element,
      containerBounds: view.bounds,
      contentOffsetEnd: VIEW_PADDING
    },
      new paper.Point(view.bounds.right - VIEW_PADDING, VIEW_PADDING),
      view.bounds.height - VIEW_PADDING * 2,
      'vertical'
    );

  }

  run() {
    this.fizzSize = 4;
    this.demo.getProject().clear();
    this.ngAfterViewInit();
  }

  reset() {
    this.fizzSize = 100;
    this.demo.getProject().clear();
    this.ngAfterViewInit();
  }
}
