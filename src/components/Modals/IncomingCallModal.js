import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CallEndSharpIcon from '@material-ui/icons/CallEndSharp';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import PhoneInTalkSharpIcon from '@material-ui/icons/PhoneInTalkSharp';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import Fab from '@material-ui/core/Fab';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper_modal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: theme.spacing(2, 3)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  pickupButton: {
    marginRight: theme.spacing(1),
    backgroundColor: '#00ff00'
  },
  rejectButton: {
    marginRight: theme.spacing(1),
    backgroundColor: '#ff0000'
  }
}));

export default function IncomingCallModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openIdentified}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.openIdentified}>
          <div className={classes.paper_modal}>
            <Grid container direction="row" alignItems="center">
              <Grid item align="center" xs={12}>
                <h2>Incoming Call</h2>
                <Icon>
                  <PersonIcon fontSize="large" />
                </Icon>
              </Grid>
            </Grid>
            <List dense>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: classes.name }}
                  primary={`${props.iVRProfile.full_name}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={`Sort Code: ${props.iVRProfile.sort_code}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={`Account Number: ${props.iVRProfile.account_number}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText primary={`Caller Identification Status:  ${props.iVRProfile.identified}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <VerifiedUserIcon />
                </ListItemIcon>
                <ListItemText primary={`ID Verification Status:  ${props.iVRProfile.verified}`} />
              </ListItem>
              <Grid container spacing={2}>
                <Grid item xs={6} justify="space-between">
                  <ListItem>
                    <Fab variant="extended" className={classes.pickupButton} onClick={props.handleAccept}>
                      <PhoneInTalkSharpIcon className={classes.extendedIcon} />
                      Accept
                    </Fab>
                  </ListItem>
                </Grid>
                <Grid item xs={6} justify="space-between">
                  <ListItem>
                    <Fab variant="extended" className={classes.rejectButton} onClick={props.handleClose}>
                      <CallEndSharpIcon className={classes.extendedIcon} />
                      Reject
                    </Fab>
                  </ListItem>
                </Grid>
              </Grid>
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
