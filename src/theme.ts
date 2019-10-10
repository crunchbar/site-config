import {createMuiTheme} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7b9cff',
      main: '#3C6EEA',
      dark: '#0044b7',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: grey[50],
      dark: '#c7c7c7',
      contrastText: '#000',
    },
  },
});
