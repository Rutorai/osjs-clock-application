import './index.scss';
import {h, app} from 'hyperapp';
import osjs from 'osjs';
import {Box} from '@osjs/gui';
import {name as applicationName} from './metadata.json';

// Timer
const currentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const secondes = now.getSeconds();
  return {hours, minutes, secondes};
};

const {hours, minutes, secondes} = currentTime();

const delay = 60 * (minutes + 60 * hours) + secondes;
document.body.style.setProperty('--delay', '' + delay);

// Out view
const createView = (state, actions) => h(Box, {
  class: 'osjs-clock-content',
  grow: 1,
  shrink: 1
}, [
  h('div', {class: 'clock'}, [
    h('span', {class: 'tick', style:'--count: 1'}),
    h('span', {class: 'tick', style:'--count: 2'}),
    h('span', {class: 'tick', style:'--count: 3'}),
    h('span', {class: 'tick', style:'--count: 4'}),
    h('span', {class: 'tick', style:'--count: 5'}),
    h('span', {class: 'tick', style:'--count: 6'}),
    h('span', {class: 'tick', style:'--count: 7'}),
    h('span', {class: 'tick', style:'--count: 8'}),
    h('span', {class: 'tick', style:'--count: 9'}),
    h('span', {class: 'tick', style:'--count: 10'}),
    h('span', {class: 'tick', style:'--count: 11'}),
    h('span', {class: 'tick', style:'--count: 12'}),

    h('span', {class: 'pin hourhand'}),
    h('span', {class: 'pin minutehand'}),
    h('span', {class: 'pin secondhand'})
  ])
]);

// Our application
const createApp = (proc, win, $content) => {
  app({}, {}, createView, $content);
};

// Our launcher
const register = (core, args, options, metadata) => {
  // Create a new Application instance
  const proc = core.make('osjs/application', {args, options, metadata});
  const title = core.make('osjs/locale').translatableFlat(metadata.title);

  // Create  a new Window instance
  proc.createWindow({
    title,
    id: 'ClockWindow',
    icon: proc.resource(metadata.icon),
    position: 'center',
    attributes: {
      resizable: false,
      maximizable: false,
      minimizable: false
    },
    dimension: {width: 400, height: 400}
  })
    .on('destroy', () => proc.destroy())
    .render(($content, win) => createApp(proc, win, $content));

  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
