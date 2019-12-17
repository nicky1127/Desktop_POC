import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import TimerIcon from '@material-ui/icons/Timer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import constants from '../constants';
import callInfo from '../mock/api/callInfo.json';

const { timeFormat } = constants;

const useStyles = makeStyles(theme => ({
  root: {
    // width: '25%'
  },
  icon: { marginRight: theme.spacing(-2) },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign :'right'
  },
  expansionSummary:{
      height: '15vh'
  }
}));

export default function CallInfoExpansion() {
  const classes = useStyles();

  const waitTime = moment.duration(callInfo.wait_time, 'seconds').seconds();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary classes={{root: classes.expansionSummary}} expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <div>
            <Typography className={classes.heading} variant="h1">
              Call Information
            </Typography>
            <List dense={true}>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <PhoneInTalkIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Call Time:  ${moment(callInfo.call_time).format(timeFormat.call_time)}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <TimerIcon />
                </ListItemIcon>
                <ListItemText primary={`Wait Time:  ${waitTime}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={`Transfer from:  ${callInfo.transfer_from}`} />
              </ListItem>
            </List>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
