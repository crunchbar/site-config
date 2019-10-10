import React from 'react';
import './Instructions.scss';
import {Container, Typography} from '@material-ui/core';

export const Instructions: React.FC = () => (
  <Container maxWidth="md" className="Instructions">
    <Typography variant="h5" component="h2">Instructions</Typography>
    <Typography variant="body1">
      The SiteConfig Configurator is a tool for configuring your Morphic deployment at your site.
    </Typography>
    <Typography variant="body1">
      This tool will generate a SiteConfig file installer that will automatically configure your Morphic deployment with the settings you choose. These settings will be active on all computers under your deployment.
    </Typography>
    <Typography variant="body1">
      You can use different SiteConfig files for different groups of computers at your site. Just create a SiteConfig file for each group and install it on all computers in that group.
    </Typography>
    <Typography variant="body1">
      To create and deploy a SiteConfig file, follow these steps:
    </Typography>
    <ol>
      <li>
        <Typography variant="body1">
          Upload Current SiteConfig (Optional - you can start with defaults)
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Configure SiteConfig Settings
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Download new SiteConfig
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          Install it on all computers you want to configure
        </Typography>
      </li>
    </ol>
  </Container>
);
