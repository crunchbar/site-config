import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import {Launch, Publish} from '@material-ui/icons';
import {ViewData} from '../../interfaces';
import ChipInput from 'material-ui-chip-input';

export const getViewData = ({
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
}: ViewData,
onChange: (value: any) => void,
onDeleteOpenQssShortcut: (value: any) => void,
onKeyDownOpenQssShortcut: (value: any) => void,
onDownload: () => void,
onUpload: (file?: any) => void) => [
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
    groups: [
      {
        title: 'Commonly changed settings',
        items: [
          {
            title: 'Show QuickStrip when Windows starts',
            body: 'Changes whether or not the QuickStrip will be displayed automatically each time Windows starts up.',
            machineName: 'showQssOnStart',
            content: (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showQssOnStart}
                    onChange={e => onChange({showQssOnStart: e.target.checked})}
                    value="Enabled"
                    color="primary"
                  />
                }
                label="Enabled"
              />
            )
          },
          {
            title: 'QuickStrip Button List',
            body: 'Determines which buttons are displayed, and in which order, on a QuickStrip. Customize this setting to control the functionality that is available to your users via the QuickStrip.',
            machineName: 'buttonList',
            content: (
              <Button
                variant="contained"
                color="primary"
                endIcon={<Launch />}>
                Configure QuickStrip Buttons
              </Button>
            )
          },
          {
            title: 'Save Message - when not signed into Morphic',
            body: 'This defines the message that is displayed to the user when they click the Save button when they are not signed into Morphic. (NOTE: clicking Reset to Standard button will sign them out of Morphic.)',
            machineName: 'keyedOut',
            content: (
              <TextField
                multiline
                margin="normal"
                variant="outlined"
                fullWidth
                value={keyedOut}
                onChange={e => onChange({keyedOut: e.target.value})}
              />
            )
          },
          {
            title: 'QuickFolder Location',
            body: 'Enter the website that the QuickFolder button should open for your site.',
            machineName: 'cloudFolder',
            content: (
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                value={cloudFolder}
                onChange={e => onChange({cloudFolder: e.target.value})}
              />
            )
          },
        ],
      },
      {
        title: 'Settings that are usually not changed, but can be',
        items: [
          {
            title: 'Tooltip Display Delay (in milliseconds)',
            body: 'Changes the time delay before a tooltip is displayed (when hovering on something in the QuickStrip).',
            machineName: 'tooltipDisplayDelay',
            content: (
              <TextField
                type="number"
                margin="normal"
                variant="outlined"
                value={tooltipDisplayDelay}
                onChange={e => onChange({tooltipDisplayDelay: e.target.value})}
              />
            )
          },
          {
            title: 'QuickStrip Scale Factor',
            body: 'Changes the size of the QuickStrip. Increasing this value makes the QuickStrip bigger.',
            machineName: 'scaleFactor',
            content: (
              <TextField
                type="number"
                margin="normal"
                variant="outlined"
                value={scaleFactor}
                onChange={e => onChange({scaleFactor: e.target.value})}
              />
            )
          },
          {
            title: 'Disable Restart Warnings for Apps',
            body: 'Disables warnings which inform users to restart their apps in order for a changed settings to be fully applied. For example, this notification is usually displayed for the Language setting.',
            machineName: 'disableRestartWarning',
            content: (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={disableRestartWarning}
                    onChange={e => onChange({disableRestartWarning: e.target.checked})}
                    value="Enabled"
                    color="primary"
                  />
                }
                label="Enabled"
              />
            )
          },
        ],
      },
      {
        title: 'Special settings for unusual situations',
        items: [
          {
            title: 'DocuMorph Executable File Location',
            body: 'The file path to the DocuMorph executable to use in the QuickStrip document conversion features. DocuMorph is included in the Quickstrip, so you do not need to change this setting. However, you can do so if you wish to use a custom version of DocuMorph.',
            machineName: 'docuMorphExecutable',
            content: (
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                value={docuMorphExecutable}
                onChange={e => onChange({docuMorphExecutable: e.target.value})}
              />
            )
          },
          {
            title: 'Hide QuickStrip Save Button',
            body: 'Changes whether to hide or show the Save button on the Morphic QuickStrip.',
            machineName: 'hideQssSaveButton',
            content: (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hideQssSaveButton}
                    onChange={e => onChange({hideQssSaveButton: e.target.checked})}
                    value="Enabled"
                    color="primary"
                  />
                }
                label="Enabled"
              />
            )
          },
          {
            title: 'More Window Settings',
            body: 'These settings change the visual appearance and behavior of the window which opens when you click the More button on the QuickStrip',
            machineName: 'defaultWidth; defaultHeight; movable; resizable; alwaysOnTop;',
            content: (
              <React.Fragment>
                <TextField
                  type="number"
                  margin="normal"
                  variant="outlined"
                  label="Width"
                  value={defaultWidth}
                  onChange={e => onChange({defaultWidth: e.target.value})}
                />
                <TextField
                  type="number"
                  margin="normal"
                  variant="outlined"
                  label="Height"
                  value={defaultHeight}
                  onChange={e => onChange({defaultHeight: e.target.value})}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={movable}
                      onChange={e => onChange({movable: e.target.checked})}
                      value="Allow Movement"
                      color="primary"
                    />
                  }
                  label="Allow Movement"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={resizable}
                      onChange={e => onChange({resizable: e.target.checked})}
                      value="Allow Resizing"
                      color="primary"
                    />
                  }
                  label="Allow Resizing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={alwaysOnTop}
                      onChange={e => onChange({alwaysOnTop: e.target.checked})}
                      value="Always on Top"
                      color="primary"
                    />
                  }
                  label="Always on Top"
                />
              </React.Fragment>
            )
          },
          {
            title: 'Open QuickStrip Keyboard Shortcut',
            body: 'The keyboard shortcut to open the QuickStrip. Pressing these keys will display the QuickStrip immediately over all windows on screen.',
            machineName: 'openQssShortcut',
            content: (
              <ChipInput
                margin="normal"
                variant="outlined"
                fullWidth
                onDelete={onDeleteOpenQssShortcut}
                onKeyDown={onKeyDownOpenQssShortcut}
                placeholder="Press a key to add it to the shortcut"
                value={openQssShortcut ? openQssShortcut.split('+') : []}
              />
            )
          },
        ],
      },
    ]
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
