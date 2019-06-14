import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { DemoComponent } from '../demo-component/demo.component';
import { LIGHT_GREY, CANVAS_BACKGROUND_COLOR, VAPP_BACKGROUND_COLOR } from '../../../../../src/constants/colors';
import { ScrollbarComponent } from '../../../../../src/components/scrollbar';
import { DEFAULT_SCROLLBAR_THICKNESS } from '../../../../../src/constants/dimensions';

@Component({
  selector: 'misc-scrollbar-vertical-demo',
  template: `
	  <demo label="Vertical Scrollbar" height="800"
          description="Scrollbar UI component for vertical scrolling with custom scrollbar, track, and effects."
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
    const scrollbar = new ScrollbarComponent(
      { content: content, containerBounds: view.bounds, contentOffsetEnd: VIEW_PADDING },
      new paper.Point(view.bounds.right - VIEW_PADDING - DEFAULT_SCROLLBAR_THICKNESS, VIEW_PADDING),
      view.bounds.height - VIEW_PADDING * 2,
      'vertical');

    // add scroll listening. paper doesn't have a wheel event handler
    canvas.onwheel = (event: WheelEvent) => {
      scrollbar.onScroll(event);
    };
    // paper tools are global, so specific tools need to be activated when a different view is active
    view.onMouseEnter = () => {
      scrollbar.activateDefaultTool();
    };

    scrollbar.getScrollbar().fillColor = 'red';
    scrollbar.getTrack().fillColor = 'blue';

    // set up custom scrollbar
    const customScrollbar = new paper.Path.Rectangle({
      point: new paper.Point(-6.5, 0),
      size: new paper.Size(15, 15),
      pivot: new paper.Point(0, 0),
      radius: 15 / 2,
      fillColor: LIGHT_GREY
    });
    customScrollbar.remove();
    scrollbar.setScrollbar(customScrollbar);

    // set up custom track
    const customTrack = new paper.Path.Rectangle({
      point: new paper.Point(0, 0),
      size: new paper.Size(2, view.bounds.height - VIEW_PADDING * 2),
      fillColor: VAPP_BACKGROUND_COLOR
    });
    customTrack.remove();
    scrollbar.setTrack(customTrack);

    // set custom Effects
    (scrollbar.getScrollbar() as paper.Path).opacity = 1;
    scrollbar.disableDefaultEffects();
    scrollbar.setCustomEffects({
      setActive: () => {
        (scrollbar.getScrollbar() as paper.Path).fillColor = 'DeepSkyBlue';
      },
      setNormal: () => {
        (scrollbar.getScrollbar() as any).tweenTo({
          fillColor: LIGHT_GREY
        }, 250);
      }
    });
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
