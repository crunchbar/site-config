export const KEY_MODIFIERS = [
  'Control',
  'Command',
  'Alt',
  'Shift',
];
export const BUTTON_LIST = 'buttonList';
const isLocalHost = window.location.hostname === 'localhost';
export const COOKIE_OPTIONS = {
  domain: isLocalHost ? 'localhost' : '.herokuapp.com',
  path: '/',
};
export const QCT_URL = isLocalHost ? 'http://localhost:3001/' : 'https://morphic.herokuapp.com';
