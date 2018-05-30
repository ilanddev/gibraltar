import { EventType } from '../constants/events';

export class AppEvent {

  private uuid: string;

  constructor(private type: EventType, private subjectUuid: string, uuid?: string) {
    this.uuid = uuid || genUuid();
  }

  getSubjectUuid(): string {
    return this.subjectUuid;
  }

  getType(): EventType {
    return this.type;
  }

  getUuid() {
    return this.uuid;
  }

}

export abstract class EventService {

  static dispatch(eventType: EventType, subjectUuid: string): string {
    const appEvent = new AppEvent(eventType, subjectUuid);
    document.dispatchEvent(EventService.generateCustomEvent(appEvent));
    return appEvent.getUuid();
  }

  static subscribe(type: EventType, subjectUuid: string|undefined, listener: (evt: AppEvent) => void): () => void {
    const evtListener = {
      handleEvent: function(evt: CustomEvent): void {
        if (subjectUuid === undefined || (evt.detail && evt.detail.subjectUuid === subjectUuid)) {
          listener(EventService.generateAppEvent(evt));
        }
      }
    };
    document.addEventListener(type, evtListener);
    return function() {
      document.removeEventListener(type, evtListener);
    };
  }

  private static generateCustomEvent(appEvent: AppEvent) {
    return new CustomEvent(appEvent.getType(), {
      detail: {
        subjectUuid: appEvent.getSubjectUuid(),
        eventUuid: appEvent.getUuid()
      }
    });
  }

  private static generateAppEvent(customEvent: CustomEvent): AppEvent {
    return new AppEvent(customEvent.type as EventType, customEvent.detail.subjectUuid, customEvent.detail.eventUuid);
  }

}

function genUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}
