import * as paper from 'paper';
import { OrgItem } from './components/org-component';
import { DataService } from './services/data-service';
import { PanZoom } from './services/pan-zoom';

/**
 * Main controller for the visualization.
 */
export class Gibraltar {

  private canvas: HTMLCanvasElement;

  constructor(canvas: string | HTMLCanvasElement) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
    } else {
      const el = document.getElementById(canvas);
      if (el === null) {
        throw new Error(`could not find canvas element: #${canvas}`);
      }
      this.canvas = el as HTMLCanvasElement;
    }
    paper.setup(this.canvas);
  }

  async drawOrg(orgUuid: string): Promise<OrgItem> {
    const self = this;
    const removeLoadingText = self.drawLoadingText();
    const panZoomCtrl = new PanZoom(paper.project);
    const orgData = await DataService.loadOrgData(orgUuid);
    removeLoadingText();
    const orgItem = new OrgItem(orgData);
    const bounds = paper.project.activeLayer.bounds;
    panZoomCtrl.zoomTo(
        new paper.Rectangle(bounds.x - 1000, bounds.y - 1000, bounds.width + 2000, bounds.height + 2000));
    return orgItem;
  }

  drawLoadingText(): () => void {
    const textItem = new paper.PointText({
      point: [100, 100],
      content: 'Loading...',
      strokeColor: 'white',
      fontFamily: 'Courier New'
    });
    return () => {
      textItem.remove();
    };
  }

}
