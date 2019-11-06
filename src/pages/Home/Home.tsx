import React from 'react';
import './Home.scss';
import {Layout} from '../../components/Layout';
import {Instructions} from '../../components/Instructions';
import {getViewData} from './viewData';
import {Container, Grid, Typography} from '@material-ui/core';
import {downloadSiteConfig, setButtonListCookie} from '../../utils/utils';
import JSON5 from 'json5';
/* eslint import/no-webpack-loader-syntax: off */
import defaultSiteConfigString from '!!raw-loader!../../assets/siteconfig.json5';
import {ViewData} from '../../interfaces';

export const Home: React.FC = () => {
  const [siteConfigString, setSiteConfigString] = React.useState(defaultSiteConfigString);
  const [siteConfigObj, setSiteConfigObj] = React.useState(JSON5.parse(defaultSiteConfigString));
  const [viewData, setViewData] = React.useState<ViewData>();
  const onDownload = () => viewData && downloadSiteConfig(siteConfigString, viewData);
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
    setButtonListCookie(siteConfigObj.qss.buttonList);
    setViewData(siteConfigObj);
  }, [siteConfigObj]);
  return (
    <Layout>
      <div className="Home">
        <Instructions />
        {viewData && getViewData(
          viewData,
          setViewData,
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
                          machineName: <span>{groupItem.machineName.split('.').reduce((a,c) => c)}</span>
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
