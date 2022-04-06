/*
 * @Description: 发布订阅事件
 * @FilePath: /proste-react-use/src/utils/event.ts
 */

type Listener<T> = (val: T) => void;

const events = new Map<string, Listener<any>[]>();

class EventBus {
  on<T>(key: string, listener: Listener<T>) {
    const listeners = events.get(key) || [];
    listeners.push(listener);
    events.set(key, listeners);

    return () => this.off(key, listener);
  }

  off<T>(key: string, listener?: Listener<T>) {
    if (!listener) {
      events.delete(key);
      return;
    }

    const listeners = events.get(key);
    if (!listeners) return;

    const index = listeners.indexOf(listener);
    if (index >= 0) listeners.splice(index, 1);
  }

  once<T>(key: string, listener: Listener<T>) {
    const _listener = (value: T) => {
      this.off(key, _listener);
      listener(value);
    };

    return this.on(key, _listener);
  }

  emit<T>(key: string, value: T) {
    const fns = events.get(key);
    if (!fns) return;

    fns.forEach(fn => fn(value));
  }
}

export default EventBus;
