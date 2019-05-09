import DebounceClass from './debounce';
import EventEmitterClass from './event-emitter';
import './js-expansion';

export * from './array';
export * from './call';
export * from './datetime-helper';
export * from './filter';
export * from './generation';
export * from './money';

const Debounce = DebounceClass;
const EventEmitter = new EventEmitterClass();

export {
  Debounce, DebounceClass, 
  EventEmitterClass, EventEmitter
};