import React from 'react';
import { connect } from 'react-redux';
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
import { List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';

const mapStateToProps = state => {
  const { getIVRList } = state;
  if (getIVRList && getIVRList.length > 0) {
    return { iVRProfile: state.getIVRList[state.IVRNo] };
  }
  return { iVRProfile: {} };
};

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
  buttons: {
    paddingTop: theme.spacing(5)
  },
  pickupButton: {
    marginRight: theme.spacing(1),
    backgroundColor: '#00ff00'
  },
  rejectButton: {
    marginRight: theme.spacing(1),
    backgroundColor: '#ff0000'
  },
  greenIcon: {
    color: '#33cc33'
  },
  redIcon: {
    color: '#ff1a1a'
  }
}));

function IncomingCallModal(props) {
  const classes = useStyles();
  const { iVRProfile, openIdentified, handleClose, handleAccept } = props;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openIdentified}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openIdentified}>
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
                  primary={`${iVRProfile.full_name}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={`Sort Code: ${iVRProfile.sort_code}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={`Account Number: ${iVRProfile.account_number}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <FingerprintIcon
                    className={iVRProfile.identified ? classes.greenIcon : classes.redIcon}
                  />
                </ListItemIcon>
                <ListItemText primary={`Caller Identification Status:  ${iVRProfile.identified}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <VerifiedUserIcon
                    className={iVRProfile.verified ? classes.greenIcon : classes.redIcon}
                  />
                </ListItemIcon>
                <ListItemText primary={`ID Verification Status:  ${iVRProfile.verified}`} />
              </ListItem>
              <Grid container className={classes.buttons} spacing={5}>
                <Grid item xs={6} justify="space-between">
                  <ListItem>
                    <Fab variant="extended" className={classes.pickupButton} onClick={handleAccept}>
                      <PhoneInTalkSharpIcon className={classes.extendedIcon} />
                      Accept
                    </Fab>
                  </ListItem>
                </Grid>
                <Grid item xs={6} justify="space-between">
                  <ListItem>
                    <Fab variant="extended" className={classes.rejectButton} onClick={handleClose}>
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

const ConnectedIncomingCallModal = connect(mapStateToProps)(IncomingCallModal);

export default ConnectedIncomingCallModal;
