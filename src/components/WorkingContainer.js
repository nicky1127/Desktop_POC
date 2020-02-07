import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import ContactlessIcon from '@material-ui/icons/Contactless';
import AppleIcon from '@material-ui/icons/Apple';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import BuildIcon from '@material-ui/icons/Build';

import customers from '../mock/api/customers.json';

const drawerWidth = 240;

const Background = '';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    zIndex: 3,
    height: '77vh'
  },
  container: {
    display: 'flex',
    height: '100%'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: props => `${props.brandScheme.primaryClr}`
  },
  drawerIcon: {
    color: 'white',
    marginRight: theme.spacing(1)
  },
  listIcon: {
    color: 'white'
  },
  drawerOpen: {
    width: drawerWidth,
    color: 'white',
    backgroundColor: props => `${props.brandScheme.primaryClr}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    color: 'white',
    backgroundColor: props => `${props.brandScheme.primaryClr}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  customerInfo: {
    textAlign: 'center',
    padding: theme.spacing(1, 0)
  },
  content: {
    flexGrow: 1
    // padding: theme.spacing(3)
  },
  iframeContainer: {
    width: '100%',
    height: '100%'
  },
  iframe: {
    width: '100%',
    height: '100%',
    backgroundImage: props => (props.customerIdentified === true ? `url(${Background})` : ''),
    backgroundSize: '100% 125%',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles({ ...props });
  console.log('props',props);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [appURL, setAppURL] = React.useState('');

  const handleDrawerToggle = () => {
    setOpen(prevState => !prevState);
  };
  const onChangeAppURL = appURL => {
    setAppURL(appURL);
  };

  let customerInfo = null;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton className={classes.drawerIcon} onClick={handleDrawerToggle}>
              {!open ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() =>
                onChangeAppURL('https://open.spotify.com/embed/playlist/5a2OuIJ1kEttA8X3PaewlI')
              }
            >
              <ListItemIcon className={classes.listIcon}>
                <ContactlessIcon />
              </ListItemIcon>
              <ListItemText primary={'MCA'} />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                onChangeAppURL('https://embed.music.apple.com/pl/album/nightride/1171507241')
              }
            >
              <ListItemIcon className={classes.listIcon}>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={'CAAG'} />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                onChangeAppURL(
                  'https://w.soundcloud.com/player/?visual=true&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F310215586&amp;show_artwork=true'
                )
              }
            >
              <ListItemIcon className={classes.listIcon}>
                <InvertColorsIcon />
              </ListItemIcon>
              <ListItemText primary={'Resolve'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {['CTM', 'COA', 'Forms', 'PEGA', 'Debit Cards'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon className={classes.listIcon}>
                  {index % 2 === 0 ? <InboxIcon /> : <BuildIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.iframeContainer}>
            <iframe
              className={classes.iframe}
              src={`${appURL}`}
              allowFullScreen
              allow="encrypted-media"
            ></iframe>
          </div>
        </main>
      </div>
    </div>
  );
}
