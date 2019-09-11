import {createMuiTheme} from '@material-ui/core/styles';
import {blue, grey} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: grey[50],
      dark: '#c7c7c7',
      contrastText: '#000',
    },
    secondary: {
      light: '#63a4ff',
      main: blue[700],
      dark: '#004ba0',
      contrastText: '#fff',
    },
  },
});
