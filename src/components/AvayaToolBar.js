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
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SmsIcon from '@material-ui/icons/Sms';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

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
  readyBtn: {
    color: '#fff',
    backgroundColor: '#558b2f'
  },
  list: {
    color:'#455a64',
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

export default function AvayaToolBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title} variant="h4" noWrap>
          AVAYA
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit">
            <PhoneEnabledIcon className={classes.greenIcon} />
          </IconButton>
          <IconButton color="inherit">
            <VideocamOffIcon className={classes.redIcon} />
          </IconButton>
          <IconButton color="inherit">
            <ChatBubbleIcon className={classes.greenIcon} />
          </IconButton>
          <IconButton color="inherit">
            <MailIcon className={classes.greenIcon} />
          </IconButton>
          <IconButton color="inherit">
            <SmsIcon className={classes.greenIcon} />
          </IconButton>
          <IconButton color="inherit">
            <ThumbUpIcon className={classes.greenIcon} />
          </IconButton>
          <Divider orientation="vertical" />
          <Paper>
            <List classes={{ padding: classes.list }}>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>Agent ID: 10001</ListItemText>
              </ListItem>
              <ListItem classes={{ root: classes.listItem }}>
                <ListItemText className={classes.idNumber}>Station ID: 1001</ListItemText>
              </ListItem>
            </List>
          </Paper>
          <Button variant="contained" className={classes.readyBtn}>
            READY (01:03)
          </Button>
        </div>
      </Toolbar>
    </div>
  );
}
