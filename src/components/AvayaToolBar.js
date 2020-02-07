import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CallEndIcon from '@material-ui/icons/CallEnd';
import SmsIcon from '@material-ui/icons/Sms';
import PhonePausedIcon from '@material-ui/icons/PhonePaused';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles(theme => ({
  toolBar: {
    backgroundColor: '#b0bec5',
    position: 'static'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    color: '#607d8b',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  greenIcon: {
    color: '#558b2f'
  },
  redIcon: {
    color: '#d50000'
  },
  yellowIcon: {
    color: '#ffff00'
  },
  readyBtn: {
    color: '#fff',
    backgroundColor: '#558b2f'
  },
  onCallBtn: {
    color: '#fff',
    backgroundColor: '#0000ff'
  },
  notReadyBtn: {
    color: '#fff',
    backgroundColor: '#ff0000'
  },
  list: {
    color: '#455a64',
    backgroundColor: '#b0bec5',
    paddingTop: 0,
    paddingBottom: 0
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  idNumber: {
    lineHeight: '10px',
    fontSize: '5px'
  }
}));

export default function AvayaToolBar(props) {
  const classes = useStyles();

  const renderNotReady = () => (
    <div className={classes.grow}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title} variant="h4" noWrap>
          CALL CONTROL
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Divider orientation="vertical" />
          <Paper>
            <List classes={{ padding: classes.list }}>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>
                  Agent ID: {props.user.user_Id}
                </ListItemText>
              </ListItem>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>Station ID: 1001</ListItemText>
              </ListItem>
            </List>
          </Paper>
          <Button variant="contained" className={classes.notReadyBtn} onClick={props.setWaiting}>
            NOT READY
          </Button>
        </div>
      </Toolbar>
    </div>
  );

  const renderOnCall = () => (
    <div className={classes.grow}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title} variant="h4" noWrap>
          CALL CONTROL
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit">
            <PhonePausedIcon className={classes.yellowIcon} />
          </IconButton>
          <IconButton color="inherit" onClick={props.hangUp}>
            <CallEndIcon className={classes.redIcon} />
          </IconButton>
          <IconButton color="inherit">
            <MailIcon className={classes.greenIcon} />
          </IconButton>
          <IconButton color="inherit">
            <SmsIcon className={classes.greenIcon} />
          </IconButton>
          <IconButton color="inherit">
            <DirectionsIcon className={classes.yellowIcon} />
          </IconButton>
          <Divider orientation="vertical" />
          <Paper>
            <List classes={{ padding: classes.list }}>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>
                  Agent ID: {props.user.user_Id}
                </ListItemText>
              </ListItem>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>Station ID: 1001</ListItemText>
              </ListItem>
            </List>
          </Paper>
          <Button variant="contained" className={classes.onCallBtn}>
            ON CALL
          </Button>
        </div>
      </Toolbar>
    </div>
  );

  const renderReady = () => (
    <div className={classes.grow}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title} variant="h4" noWrap>
          CALL CONTROL
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Divider orientation="vertical" />
          <Paper>
            <List classes={{ padding: classes.list }}>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>
                  Agent ID: {props.user.user_Id}
                </ListItemText>
              </ListItem>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>Station ID: 1001</ListItemText>
              </ListItem>
            </List>
          </Paper>
          <Button variant="contained" className={classes.readyBtn}>
            READY - WAITING FOR CALL
          </Button>
        </div>
      </Toolbar>
    </div>
  );

  let content = null;
  if (props.ready === false && props.onCall === false) {
    content = renderNotReady();
  } else if (props.ready === true && props.onCall === false) {
    content = renderReady();
  } else if (props.ready === false && props.onCall === true) {
    content = renderOnCall();
  }

  return content;
}
