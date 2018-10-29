import { EventType } from '../constants/events';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

export class AppEvent {

  private _uuid: string;
  private _data: {[key: string]: any};

  constructor(private _type: EventType, private _subjectUuid: string, uuid?: string, data?: {[key: string]: any}) {
    this._uuid = uuid || genUuid();
    this._data = data || {};
  }

  get subjectUuid(): string {
    return this._subjectUuid;
  }

  get type(): EventType {
    return this._type;
  }

  get uuid(): string {
    return this._uuid;
  }

  get data(): {[key: string]: any} {
    return this._data;
  }

}

export abstract class EventService {

  private static subject = new Subject<AppEvent>();

  static dispatch(type: EventType, subjectUuid: string, data?: {[key: string]: any}): string {
    const evt = new AppEvent(type, subjectUuid, undefined, data);
    EventService.subject.next(evt);
    return evt.uuid;
  }

  static get observable(): Observable<AppEvent> {
    return EventService.subject;
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
