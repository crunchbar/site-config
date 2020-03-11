export const KEY_MODIFIERS = [
  'Control',
  'Command',
  'Alt',
  'Shift',
];
export const BUTTON_LIST = 'buttonList';
export const MORE_PANEL_LIST = 'morePanelList';
export const MY_CHOICES_LIST = 'myChoicesList';
const isLocalHost = window.location.hostname === 'localhost';
export const COOKIE_OPTIONS = {
  domain: isLocalHost ? 'localhost' : '.morphic.org',
  path: '/',
};
export const QCT_URL = isLocalHost ? 'http://localhost:3001/' : 'http://qct.morphic.org';
