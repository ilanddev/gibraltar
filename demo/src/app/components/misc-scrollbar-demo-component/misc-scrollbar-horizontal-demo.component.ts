import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { DemoComponent } from '../demo-component/demo.component';
import { LIGHT_GREY, CANVAS_BACKGROUND_COLOR } from '../../../../../src/constants/colors';
import { ScrollbarComponent } from '../../../../../src/components/scrollbar';
import { DEFAULT_SCROLLBAR_THICKNESS } from '../../../../../src/constants/dimensions';

@Component({
  selector: 'misc-scrollbar-horizontal-demo',
  template: `
	  <demo label="Horizontal Scrollbar" height="200"
          description="Scrollbar UI component for horizontal scrolling with the default scrollbar and scroll track."
          runnable="true" (run)="run()" (reset)="reset()"></demo>
  ` })
export class MiscScrollbarHorizontalDemoComponent implements AfterViewInit {

  @ViewChild(DemoComponent)
  demo: DemoComponent;

  private fizzSize: number = 100;

  ngAfterViewInit() {
    // sets up Paper Project
    const proj = this.demo.getProject();
    proj.activate();
    proj.activeLayer.applyMatrix = false;
    this.demo.backgroundColor = CANVAS_BACKGROUND_COLOR;
    const view = paper.view;
    const canvas = this.demo.canvas.nativeElement;
    const VIEW_PADDING = 30;

    // create content
    const content = new paper.Group();
    for (let i = 0; i < this.fizzSize; i++) {
      const textContent = i === 0
        ? 0
        : i % 15 === 0 && 'fizzbuzz' || i % 3 === 0 && 'fizz' || i % 5 === 0 && 'buzz' || i;
      content.addChildren([
        new paper.Path.Circle({
          position: new paper.Point((100 + 15) * i + 50, view.center.y - 15),
          radius: 50,
          strokeWidth: 1,
          strokeColor: LIGHT_GREY
        }),
        new paper.PointText({
          point: new paper.Point((100 + 15) * i + 50, view.center.y + 10 - 15),
          content: textContent,
          fillColor: LIGHT_GREY,
          fontSize: 25,
          justification: 'center'
        })
      ]);
    }
    content.translate(new paper.Point(VIEW_PADDING, 0));

    // create scrollbar
    const scrollbar = new ScrollbarComponent(
      { content: content, containerBounds: view.bounds, contentOffsetEnd: VIEW_PADDING },
      new paper.Point(VIEW_PADDING, view.bounds.bottom - VIEW_PADDING - DEFAULT_SCROLLBAR_THICKNESS),
      view.bounds.width - VIEW_PADDING * 2,
      'horizontal'
    );

    // add scroll listening. paper doesn't have a wheel event handler
    canvas.onwheel = (event: WheelEvent) => {
      scrollbar.onScroll(event);
    };
    // paper tools are global, so specific tools need to be activated when a different view is active
    view.onMouseEnter = () => {
      scrollbar.activateDefaultTool();
    };
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
