import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ContactlessIcon from '@material-ui/icons/Contactless';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import BuildIcon from '@material-ui/icons/Build';
import ReplaySharpIcon from '@material-ui/icons/ReplaySharp';

const mapStateToProps = state => {
  const { brandScheme, customer } = state;
  return { brandScheme, customer };
};

const drawerWidth = 240;

const Background = '';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    zIndex: 3,
    height: '76vh'
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
  refreshIcon: {
    color: 'white',
    fontSize: '20px'
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
    height: '100%',
    display: 'none'
  },
  visibleIframe: {
    display: 'block'
  },
  greenBtn: {
    color: '#b2ff59'
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

function WorkingContainer(props) {
  const classes = useStyles({ ...props });
  const { customer, brandScheme } = props;
  const [open, setOpen] = React.useState(false);
  const [visibleIframeNo, setVisibleIframeNo] = useState(0);
  const [appURL1, setAppURL1] = useState('');
  const [appURL2, setAppURL2] = useState('');
  const [appURL3, setAppURL3] = useState('');
  const mcaURL = `http://localhost:4000?firstname=${customer.first_name}&lastname=${customer.last_name}&title=${customer.title}&brand=${brandScheme.brand}`;

  useEffect(() => {
    if (!(Object.entries(customer).length === 0 && customer.constructor === Object)) {
      setAppURL1(mcaURL);
      setAppURL2(mcaURL);
      setAppURL3(mcaURL);
      setVisibleIframeNo(1);
    }
  }, [customer]);

  // useEffect(() => {
  //   setVisibleIframeNo(1);
  // }, []);

  const handleDrawerToggle = () => {
    setOpen(prevState => !prevState);
  };
  const onChangeAppURL1 = url => {
    setAppURL1(url);
    setVisibleIframeNo(1);
  };
  const onChangeAppURL2 = url => {
    setAppURL2(url);
    setVisibleIframeNo(2);
  };
  const onChangeAppURL3 = url => {
    setAppURL3(url);
    setVisibleIframeNo(3);
  };

  const onClickRefreshBtn1 = () => {
    document.getElementById('iframeid1').src += '';
  };

  const onClickRefreshBtn2 = () => {
    document.getElementById('iframeid2').src += '';
  };

  const onClickRefreshBtn3 = () => {
    document.getElementById('iframeid3').src += '';
  };

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
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
                // onChangeAppURL('https://open.spotify.com/embed/playlist/5a2OuIJ1kEttA8X3PaewlI')
                onChangeAppURL1(mcaURL)
              }
            >
              <ListItemIcon
                className={clsx(classes.listIcon, {
                  [classes.greenBtn]: visibleIframeNo === 1
                })}
              >
                <ContactlessIcon />
              </ListItemIcon>

              <ListItemText primary={'MCA'} />
              {/* <ListItemIcon className={classes.refreshIcon} onClick={onClickRefreshBtn1}> */}
              <ReplaySharpIcon className={classes.refreshIcon} onClick={onClickRefreshBtn1} />
              {/* </ListItemIcon> */}
            </ListItem>
            <ListItem
              button
              onClick={() =>
                // onChangeAppURL2('https://embed.music.apple.com/pl/album/nightride/1171507241')
                onChangeAppURL2(mcaURL)
              }
            >
              <ListItemIcon
                className={clsx(classes.listIcon, {
                  [classes.greenBtn]: visibleIframeNo === 2
                })}
              >
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={'CAAG'} />
              {/* <ListItemIcon className={classes.refreshIcon} onClick={onClickRefreshBtn2}> */}
              <ReplaySharpIcon className={classes.refreshIcon} onClick={onClickRefreshBtn2} />
              {/* </ListItemIcon> */}
            </ListItem>
            <ListItem
              button
              onClick={() =>
                //   onChangeAppURL3(
                //     'https://w.soundcloud.com/player/?visual=true&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F310215586&amp;show_artwork=true'
                //   )
                onChangeAppURL3(mcaURL)
              }
            >
              <ListItemIcon
                className={clsx(classes.listIcon, {
                  [classes.greenBtn]: visibleIframeNo === 3
                })}
              >
                <InvertColorsIcon />
              </ListItemIcon>
              <ListItemText primary={'Resolve'} />
              {/* <ListItemIcon className={classes.refreshIcon} onClick={onClickRefreshBtn3}> */}
              <ReplaySharpIcon className={classes.refreshIcon} onClick={onClickRefreshBtn3} />
              {/* </ListItemIcon> */}
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
          <Box
            className={clsx(classes.iframeContainer, {
              [classes.visibleIframe]: visibleIframeNo === 1
            })}
          >
            <iframe
              id="iframeid1"
              className={classes.iframe}
              src={`${appURL1}`}
              allowFullScreen
              allow="encrypted-media"
              onClick={props.onClickWorkingContainer}
            ></iframe>
          </Box>
          <Box
            className={clsx(classes.iframeContainer, {
              [classes.visibleIframe]: visibleIframeNo === 2
            })}
          >
            <iframe
              id="iframeid2"
              className={classes.iframe}
              src={`${appURL2}`}
              allowFullScreen
              allow="encrypted-media"
              onClick={props.onClickWorkingContainer}
            ></iframe>
          </Box>
          <Box
            className={clsx(classes.iframeContainer, {
              [classes.visibleIframe]: visibleIframeNo === 3
            })}
          >
            <iframe
              id="iframeid3"
              className={classes.iframe}
              src={`${appURL3}`}
              allowFullScreen
              allow="encrypted-media"
              onClick={props.onClickWorkingContainer}
            ></iframe>
          </Box>
        </main>
      </Box>
    </div>
  );
}

const ConnectedWorkingContainer = connect(mapStateToProps)(WorkingContainer);

export default ConnectedWorkingContainer;
