import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { DemoComponent } from '../demo-component/demo.component';
import { VappData, VappComponent } from '../../../../../src/components/vapp';
import { placeholderArrayOfVappData } from '../../constants/vapp-basic-placeholder-data';
import { ScrollbarComponent } from '../../../../../src/components/scrollbar';
import { CANVAS_BACKGROUND_COLOR } from '../../../../../src/constants/colors';
import { CONNECTOR_RADIUS, DEFAULT_SCROLLBAR_THICKNESS } from '../../../../../src/constants/dimensions';

@Component({
  selector: 'vapp-static-demo',
  template: `
	  <demo label="Static Design" height="730"
          description="Demonstrates the static layout design of the vApp visual component for different cases."></demo>
  ` })
export class VappStaticDemoComponent implements AfterViewInit {

  @ViewChild(DemoComponent)
  demo: DemoComponent;

  ngAfterViewInit() {
    // sets up Paper Project
    const proj = this.demo.getProject();
    proj.activate();
    const view = paper.view;
    const canvas = paper.view.element;
    this.demo.backgroundColor = CANVAS_BACKGROUND_COLOR;

    const VIEW_PADDING = 30;
    const DEMO_VAPP_TOP_ALIGNMENT = 59;
    const VERTICAL_POSITION = VIEW_PADDING + DEMO_VAPP_TOP_ALIGNMENT + CONNECTOR_RADIUS;
    const vapps: Array<VappData> = placeholderArrayOfVappData;

    const content = new paper.Group({ applyMatrix: false });
    // create origin paper Item for vapps to base position from
    const origin = new paper.Path.Circle({
      position: new paper.Point(VIEW_PADDING, VERTICAL_POSITION),
      radius: 0,
      parent: content
    });

    // create vapps
    vapps.forEach(vappData => {
      const position = new paper.Point(content.lastChild.bounds.right, VERTICAL_POSITION);
      content.addChild(new VappComponent(vappData, position));
    });
    (content.lastChild as VappComponent).margin.right = 0;

    // create view horizontal scrollbar
    const horizontalScrollbar = new ScrollbarComponent({
      content: content,
      containerBounds: view.bounds,
      contentOffsetEnd: VIEW_PADDING
    },
      new paper.Point(VIEW_PADDING, view.size.height - DEFAULT_SCROLLBAR_THICKNESS - 10),
      view.bounds.width - VIEW_PADDING * 2,
      'horizontal'
    );
    if (horizontalScrollbar.isEnabled) {
      canvas.onmouseenter = horizontalScrollbar.containerMouseEnter;
      canvas.onmouseleave = horizontalScrollbar.containerMouseLeave;
    }

    // add scroll listening. paper doesn't have a wheel event handler
    canvas.onwheel = (event: WheelEvent) => {
      // horizontal scrolling sent to horizontal scrollbar
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        horizontalScrollbar.onScroll(event);
      } else {
        // vertical scrolling sent to any scrollable vapp that's active/hovered
        content.children.forEach(item => {
          if (item instanceof VappComponent && item.isScrollable) {
            item.setScrollListening(event);
          }
        });
      }
    };

    // TODO: keydown 'left' and 'right' should always go to horizontalScrollbar. keydown 'up' and 'down' to should go to
    //  any scrollable vapp that's active/hovered. can try handling with a paper tools service and/or tool stack

    // TODO: make sure 'Roboto' font loading finishes before canvas elements are rendered
  }
}
