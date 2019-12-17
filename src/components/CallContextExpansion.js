import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import PhonePausedIcon from '@material-ui/icons/PhonePaused';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';

import constants from '../constants';
import callInfo from '../mock/api/callInfo.json';

const { timeFormat } = constants;

const useStyles = makeStyles(theme => ({
  root: {
    // height:'30vh'
  },
  icon: { marginRight: theme.spacing(-2) },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  expansionSummary:{
      height: '15vh'
  },
  blueIcon: {
    color: '#1e88e5'
  },
  redIcon: {
    color: '#d50000'
  },
  greenIcon: {
    color: '#558b2f'
  }
}));

export default function CallContextExpansion() {
  const classes = useStyles();

  const waitTime = moment.duration(callInfo.wait_time, 'seconds').seconds();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary 
        classes={{root: classes.expansionSummary}} 
         expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <div>
            <List dense={true}>
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <PhoneInTalkIcon className={classes.blueIcon} /> 01:55
                  </Grid>
                  <Grid item xs={4}>
                    <PhonePausedIcon className={classes.redIcon} /> 02:22
                  </Grid>
                  <Grid item xs={4}>
                    <PhoneCallbackIcon className={classes.greenIcon} /> 9207
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Intent: Replace Card`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Say Anything: I would like to replace my credit card`} />
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
