import { Observable, Subject } from 'rxjs';

/**
 * Enumeration of valid paperjs event types.
 */
export type PaperEventType =
    'frame'
    | 'mousedown'
    | 'mouseup'
    | 'mousedrag'
    | 'click'
    | 'doubleclick'
    | 'mousemove'
    | 'mouseenter'
    | 'mouseleave';

/**
 * Exposes observables for canvas events.
 */
export class CanvasEventService {

  private static _observables: { [id: string]: Observable<paper.MouseEvent> } = {};

  /**
   * Gets an observable for the canvas view, for a particular event type.
   * @param project {paper.Project}
   * @param eventType {PaperEventType}
   */
  static getObservable(project: paper.Project, eventType: PaperEventType): Observable<paper.MouseEvent> {
    const id = this.getProjectEventID(project, eventType);
    if (!CanvasEventService._observables[id]) {
      const subject = new Subject<paper.MouseEvent>();
      project.view.on(eventType, (evt: paper.MouseEvent) => {
        subject.next(evt);
      });
      CanvasEventService._observables[id] = subject;
    }
    return CanvasEventService._observables[id];
  }

  /**
   * Generates an ID for a project/event type combo.
   * @param project {paper.Project}
   * @param eventType {PaperEventType}
   */
  private static getProjectEventID(project: paper.Project, eventType: PaperEventType): string {
    return `${project.index}:${eventType}`;
  }

}
