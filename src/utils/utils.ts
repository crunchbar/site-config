import json5Writer from 'json5-writer';
import {saveAs} from 'file-saver';
import {ViewData} from '../interfaces';
import {BUTTON_LIST, COOKIE_OPTIONS} from '../constants';
import Cookies from 'universal-cookie';

export const getButtonListFromCookie = () => {
  const cookies = new Cookies();
  return cookies.get(BUTTON_LIST);
};

export const setButtonListCookie = (buttonList: any) => {
  const cookies = new Cookies();
  cookies.set(BUTTON_LIST, buttonList, COOKIE_OPTIONS);
};

export const getUpdatedJSON5SiteConfig = (
  siteConfigString: string,
  viewData: ViewData,
): string => {
  const j5WriterInstance = json5Writer.load(siteConfigString);
  j5WriterInstance.write(viewData);
  return j5WriterInstance.toSource();
};

export const downloadSiteConfig = (
  siteConfigString: string,
  viewData: ViewData,
) => {
  const siteConfig =
`
del "C:\\Program Files (x86)\\Morphic\\windows\\resources\\app\\siteconfig.BAK"
ren "C:\\Program Files (x86)\\Morphic\\windows\\resources\\app\\siteconfig.json5" siteconfig.BAK
(
${
  getUpdatedJSON5SiteConfig(siteConfigString, viewData)
  .replace(/^[\s\S]/gim, match => `echo${/./.exec(match) ? ' ' : '.'}${match}`)
  .replace(/%/gim, '%%')
  .replace(/[\^&<>|'`,;=()](?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$)/gim, match => `^${match}`)
}
) > "C:\\Program Files (x86)\\Morphic\\windows\\resources\\app\\siteconfig.json5"
`;
  const blob = new Blob([siteConfig], {type: 'application/bat;charset=utf-8'});
  saveAs(blob, 'siteconfig-installer.bat');
};
