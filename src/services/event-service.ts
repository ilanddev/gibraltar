import { EventType } from '../constants/events';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

export class EventBuilder {

  readonly uuid: string;
  readonly type: EventType;
  readonly subjectUuid: string;
  readonly parent: AppEvent | undefined;
  private readonly _data: {[key: string]: any};

  constructor(type: EventType, subjectUuid: string, parent?: AppEvent) {
    this.uuid = EventBuilder.genUuid();
    this.type = type;
    this.subjectUuid = subjectUuid;
    this.parent = parent;
    this._data = parent ? parent.getData() : {};
  }

  private static genUuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  }

  getData(): {[key: string]: any} {
    return Object.assign({}, this._data);
  }

  setDataValue(key: string, value: any): EventBuilder {
    this._data[key] = value;
    return this;
  }

  build(): AppEvent {
    return new AppEvent(this);
  }

}

export class AppEvent {

  readonly uuid: string;
  readonly type: EventType;
  readonly parent: AppEvent | undefined;
  readonly subjectUuid: string;
  private readonly data: {[key: string]: any};

  constructor(builder: EventBuilder) {
    this.uuid = builder.uuid;
    this.parent = builder.parent;
    this.subjectUuid = builder.subjectUuid;
    this.type = builder.type;
    this.data = builder.getData();
  }

  getData(): {[key: string]: any} {
    return Object.assign({}, this.data);
  }

  hasAncestor(subjectUuid: string, type: EventType) {
    let parent = this.parent;
    while (parent) {
      if (parent.subjectUuid === subjectUuid && parent.type === type) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }

  getDataValue(key: string): any {
    return this.data[key];
  }

}

export abstract class EventService {

  private static subject = new Subject<AppEvent>();

  static publish(evt: AppEvent) {
    EventService.subject.next(evt);
  }

  static get observable(): Observable<AppEvent> {
    return EventService.subject;
  }

  static getObservable(subjectUuid: string, type?: EventType): Observable<AppEvent> {
    return EventService.subject.filter(it => it.subjectUuid === subjectUuid &&
        (type === undefined || it.type === type));
  }

}
