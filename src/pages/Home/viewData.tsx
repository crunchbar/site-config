import React from 'react';
import {
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import {Launch, Publish} from '@material-ui/icons';
import {ViewData} from '../../interfaces';
import {Controls} from '../../components';
import {QCT_URL} from '../../constants'
import template from '../../assets/template.json';
import {get, set} from 'lodash/fp';

export const getViewData = (
  viewData: ViewData,
  onChange: (value: ViewData) => void,
  onDownload: () => void,
  onUpload: (file?: any) => void
) => [
  {
    title: 'Upload Current SiteConfig File (Optional)',
    content: (
      <React.Fragment>
        <Typography variant="body1">
          If you upload your current SiteConfig file we will read the uploaded file and update the settings below to match your current configuration. (Or you can start with the default settings and go from there)
        </Typography>
        <input
          accept="application/json5"
          style={{display: 'none'}}
          id="siteconfig-upload-button"
          type="file"
          onChange={e => onUpload(e.target && e.target.files && e.target.files[0])}
        />
        <label htmlFor="siteconfig-upload-button">
          <Button
            variant="contained"
            component="span"
            color="primary"
            endIcon={<Publish />}
          >
            Upload Current SiteConfig File
          </Button>
        </label>
      </React.Fragment>
    )
  },
  {
    title: 'Configure SiteConfig Settings',
    groups: template.map(group => ({
      ...group,
      items: group.items.map(item => {
        if (item.machineName === 'qss.buttonList') {
          return {
            ...item,
            content: (
              <Button
                variant="contained"
                color="primary"
                endIcon={<Launch />}
                onClick={() => window.open(QCT_URL, '_blank')}
              >
                Configure QuickStrip Buttons
              </Button>
            )
          };
        }
        if (item.controlType === 'Checkbox') {
          return {
            ...item,
            content: (
              <Controls.Checkbox
                checked={get(item.machineName, viewData) || false}
                onChange={e => onChange(set(item.machineName, e.target.checked, viewData))}
                label="Enabled"
              />
            ),
          };
        }
        if (item.controlType.includes('Field')) {
          const isNumericField = item.controlType === 'NumericField';
          return {
            ...item,
            content: (
              <TextField
                type={isNumericField ? 'number' : 'text'}
                multiline={item.controlType === 'MultilineTextField'}
                margin="normal"
                variant="outlined"
                fullWidth={!isNumericField}
                value={get(item.machineName, viewData) || (isNumericField ? 0 : '')}
                onChange={e => onChange(set(item.machineName, e.target.value, viewData))}
              />
            ),
          };
        }
        return {
          ...item,
          content: null,
        };
      })
    }))
  },
  {
    title: 'Download New SiteConfig',
    content: (
      <React.Fragment>
        <Typography variant="body1">
          To install the SiteConfig File, download the installation script below and double-click the downloaded file. The SiteConfig file will be automatically installed on your computer.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onDownload}
        >
          Download SiteConfig Installer
        </Button>
        <Typography variant="body2">
          If you are comfortable with scripting, you may also edit the SiteConfig settings directly in the script by opening it in a text editor.
        </Typography>
      </React.Fragment>
    )
  },
];
