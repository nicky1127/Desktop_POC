import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import moment from 'moment';
import DataUsageIcon from '@material-ui/icons/DataUsage';

const useStyles = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(-1) },
  redIcon: {
    color: '#d50000'
  },
  greenIcon: {
    color: '#558b2f'
  }
}));

export default function CallContextMainPane(props) {
  //
  const classes = useStyles({ ...props });

  const waitTime = moment.duration(props.iVRProfile.wait_time, 'seconds').seconds();

  const waitTimeColor = waitTime => {
    if (parseInt(waitTime) >= 10) {
      return classes.redIcon;
    } else {
      return classes.greenIcon;
    }
  };

  return (
    <div>
      <List dense>
        <ListItem>
          <ListItemIcon className={waitTimeColor(waitTime)}>
            <WatchLaterIcon />
          </ListItemIcon>
          <ListItemText primary={`Time spent waiting: ${waitTime}`} />
        </ListItem>

        <ListItem>
          <ListItemIcon className={classes.icon}>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary={`Say Anything: ${props.iVRProfile.say_anything}`} />
        </ListItem>
        <Grid container>
          <Grid xs={9}>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <DataUsageIcon />
              </ListItemIcon>
              <ListItemText primary={`IVR Intent: ${props.iVRProfile.ivr_intent}`} />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </div>
  );
}
