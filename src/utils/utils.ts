import json5Writer from 'json5-writer';
import {saveAs} from 'file-saver';
import {ViewData} from '../interfaces';
import {
  BUTTON_LIST,
  MORE_PANEL_LIST,
  MY_CHOICES_LIST,
  COOKIE_OPTIONS,
} from '../constants';
import Cookies from 'universal-cookie';

export const getCookieData = () => {
  const cookies = new Cookies();
  return [
    cookies.get(BUTTON_LIST),
    cookies.get(MORE_PANEL_LIST),
    cookies.get(MY_CHOICES_LIST),
  ];
};

export const setCookieData = (viewData: ViewData) => {
  const cookies = new Cookies();
  cookies.set(BUTTON_LIST, viewData.qss.buttonList || [], COOKIE_OPTIONS);
  cookies.set(MORE_PANEL_LIST, viewData.qss.morePanelList || [], COOKIE_OPTIONS);
  cookies.set(MY_CHOICES_LIST, viewData.qssMyChoices || [], COOKIE_OPTIONS);
};

export const getUpdatedJSON5SiteConfig = (
  siteConfigString: string,
  viewData: ViewData,
): string => {
  const [buttonList, morePanelList, qssMyChoices] = getCookieData();
  const j5WriterInstance = json5Writer.load(siteConfigString);
  j5WriterInstance.write({
    ...viewData,
    qss: {
      ...viewData.qss,
      buttonList,
      morePanelList,
    },
    qssMyChoices,
  });
  return j5WriterInstance.toSource({quote: 'double', trailingComma: true, quoteKeys: undefined});
};

export const downloadSiteConfig = (
  siteConfigString: string,
  viewData: ViewData,
) => {
  const siteConfig =
`
del "C:\\ProgramData\\Morphic\\siteconfig.BAK"
ren "C:\\ProgramData\\Morphic\\siteconfig.json5" siteconfig.BAK
(
${
  getUpdatedJSON5SiteConfig(siteConfigString, viewData)
  .replace(/^[\s\S]/gim, match => `echo${/./.exec(match) ? ' ' : '.'}${match}`)
  .replace(/%/gim, '%%')
  .replace(/[\^&<>|'`,;=()](?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$)/gim, match => `^${match}`)
}
) > "C:\\ProgramData\\Morphic\\siteconfig.json5"
`;
  const blob = new Blob([siteConfig], {type: 'application/bat;charset=utf-8'});
  saveAs(blob, 'siteconfig-installer.bat');
};
