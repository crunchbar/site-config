import React from 'react';
import './Home.scss';
import {Layout} from '../../components/Layout';
import {Instructions} from '../../components/Instructions';
import {getViewData} from './viewData';
import {Container, Grid, Typography} from '@material-ui/core';
import {downloadSiteConfig} from '../../utils/utils';
import JSON5 from 'json5';
/* eslint import/no-webpack-loader-syntax: off */
import defaultSiteConfigString from '!!raw-loader!../../assets/siteconfig.json5';
import {ViewData} from '../../interfaces';
import {KEY_MODIFIERS} from '../../constants';

export const Home: React.FC = () => {
  const keyStore = React.useRef('');
  const [siteConfigString, setSiteConfigString] = React.useState(defaultSiteConfigString);
  const [siteConfigObj, setSiteConfigObj] = React.useState(JSON5.parse(defaultSiteConfigString));
  const [viewData, setViewData] = React.useState<ViewData>();
  const onChange = (update: any) => setViewData(prevState => ({
    ...prevState,
    ...update,
  }));
  const onDeleteOpenQssShortcut = (chip: string) => setViewData(prevState => prevState ? ({
    ...prevState,
    openQssShortcut: prevState.openQssShortcut && prevState.openQssShortcut.split('+').filter(s => s !== chip).join('+'),
  }) : undefined);
  const onKeyDownOpenQssShortcut = (e: any) => {
    e.preventDefault();
    const key =
      e.key === 'Meta'
      ? 'Command'
      : e.key === ' '
      ? 'Space'
      : e.key;
    const isKeyModifier = KEY_MODIFIERS.includes(key);
    if (isKeyModifier) {
      keyStore.current += `${key}-`;
      return;
    }
    keyStore.current += key;
    setViewData(prevState => {
      if (!prevState) {
        return;
      }
      const chips = prevState.openQssShortcut ? prevState.openQssShortcut.split('+') : [];
      return {
        ...prevState,
        openQssShortcut: [...chips, keyStore.current].join('+'),
      };
    });
    keyStore.current = '';
  };
  const onDownload = () => viewData && downloadSiteConfig(siteConfigString, siteConfigObj, viewData);
  const onUpload = (file?: any) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event && event.target && event.target.result) {
        const s = event.target.result as string;
        setSiteConfigString(s);
        setSiteConfigObj(JSON5.parse(s));
      }
    };
    reader.readAsText(file);
  };
  React.useEffect(() => {
    const {
      qss: {
        showQssOnStart,
        buttonList,
        messages: {
          keyedOut,
        },
        urls: {
          cloudFolder,
        },
        tooltipDisplayDelay,
        scaleFactor,
        docuMorphExecutable,
      },
      disableRestartWarning,
      hideQssSaveButton,
      qssMorePanel: {
        defaultWidth,
        defaultHeight,
        movable,
        resizable,
        alwaysOnTop,
      },
      openQssShortcut,
    } = siteConfigObj;
    setViewData({
      showQssOnStart,
      buttonList,
      keyedOut,
      cloudFolder,
      tooltipDisplayDelay,
      scaleFactor,
      disableRestartWarning,
      docuMorphExecutable,
      hideQssSaveButton,
      defaultWidth,
      defaultHeight,
      movable,
      resizable,
      alwaysOnTop,
      openQssShortcut,
    });
  }, [siteConfigObj])
  return (
    <Layout>
      <div className="Home">
        <Instructions />
        {viewData && getViewData(
          viewData,
          onChange,
          onDeleteOpenQssShortcut,
          onKeyDownOpenQssShortcut,
          onDownload,
          onUpload,
        ).map((view, viewIndex) => (
          <React.Fragment key={viewIndex}>
            <Container maxWidth="md">
              <Typography variant="h5" component="h3" className="view-title">
                {viewIndex + 1}. {view.title}
              </Typography>
              {view.content}
            </Container>
            {view.groups && view.groups.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <Typography variant="h6" component="h4" className="group-title">
                  <Container maxWidth="md" component="span">
                    Group {groupIndex + 1} — {group.title}
                  </Container>
                </Typography>
                <Container maxWidth="md">
                  {group.items.map((groupItem, groupItemIndex) => (
                    <Grid key={groupItemIndex} container spacing={4} className="group-item">
                      <Grid item xs={7}>
                        <Typography variant="h6" component="h5" className="group-item-title">
                          {groupItem.title}
                        </Typography>
                        <Typography variant="body1">
                          {groupItem.body}
                        </Typography>
                        <Typography variant="body2" className="machine-name">
                          machineName: <span>{groupItem.machineName}</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        {groupItem.content}
                      </Grid>
                    </Grid>
                  ))}
                </Container>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
}
