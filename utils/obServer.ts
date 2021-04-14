

/**
 * 观察者
 */
export default class Observer {
  _name: string = 'ObServer';

  private _Subjects: { [key: string]: Subject } = {};

  constructor(obServerName?: string) {
    if (obServerName) this._name = obServerName;
  }

  on(subjectName: string, event: CallableFunction) {
    const { _Subjects } = this;
    if (!_Subjects[subjectName]) {
      _Subjects[subjectName] = new Subject();
    }
    return _Subjects[subjectName].add(event);
  }

  emit(subjectName: string, data?: any) {
    return this._Subjects[subjectName]?.notifyObserver(data);
  }

  off(subjectName: string, event: CallableFunction) {
    return this._Subjects[subjectName]?.remove(event);
  }

  offAll(subjectName: string) {
    return delete this._Subjects[subjectName];
  }
}


/**
 * 主题
 */
// tslint:disable-next-line: max-classes-per-file
class Subject {
  private _map: CallableFunction[] = [];

  add(event: CallableFunction) {
    this._map.push(event);
  }

  remove(event: CallableFunction) {
    return !this._map.every((v, i) => {
      console.log(v , event, v === event);
      
      return v === event ? this._map.splice(i, 1) : null;
    });
  }

  notifyObserver(data) {
    this._map.forEach(v => v(data));
  }
}