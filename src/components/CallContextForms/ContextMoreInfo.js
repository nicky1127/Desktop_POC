import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DialpadIcon from '@material-ui/icons/Dialpad';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import moment from 'moment';
import constants from '../../constants';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const mapStateToProps = state => {
  if (state) {
    return { iVRProfile: state.IVRList[state.IVRNo] };
  }
  return { iVRProfile: [] };
};

const { timeFormat } = constants;

const useStyles = makeStyles(theme => ({
  icon: { marginRight: theme.spacing(-1) },
  caption: {
    paddingLeft: '16px',
    fontWeight: 700
  }
}));

function ContextAdditionalInfo(props) {
  const {iVRProfile} = props;
  const classes = useStyles({ ...props });

  return (
    <div>
      <Typography variant="h6" className={classes.caption}>
        Additional Call Information
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <PhoneInTalkIcon />
          </ListItemIcon>
          <ListItemText
            primary={`Call Time:  ${moment(props.customer.call_time).format(timeFormat.call_time)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <DialpadIcon />
          </ListItemIcon>
          <ListItemText primary={`VDN: ${iVRProfile.vdn}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={`Transfer from:  ${props.iVRProfile.transfered_from}`} />
        </ListItem>
      </List>
    </div>
  );
}

const ConnectedContextAdditionalInfo = connect(mapStateToProps)(ContextAdditionalInfo);

export default ConnectedContextAdditionalInfo;
