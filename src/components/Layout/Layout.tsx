import React from 'react';
import './Layout.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {
  AppBar,
  Container,
  createStyles,
  CssBaseline,
  Fab,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

export const ScrollTop: React.FC = ({children}) => {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export interface LayoutProps {
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({className, children}) => (
  <div className={`Layout${className ? ` ${className}` : ''}`}>
    <CssBaseline />
    <AppBar color="secondary">
      <Toolbar>
        <Logo />
        <Container maxWidth="md">
          <Typography variant="h5" component="h1">
            SiteConfig Configurator
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
    {children}
    <ScrollTop>
      <Fab color="primary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  </div>
);
