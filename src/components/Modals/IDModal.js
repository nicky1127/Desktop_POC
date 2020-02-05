import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CallEndSharpIcon from '@material-ui/icons/CallEndSharp';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AdditionalInfoPane from '../IDForms/AdditionalInfo';
import CorrespondancePane from '../IDForms/CorrespondanceInfo';
import SwitchPartiesPane from '../IDForms/SwitchParties';

const useStyles = makeStyles(theme => ({
  modal: {
    margin: 'auto',
    maxHeight: 600,
    maxWidth: 950,
    overflow: 'scroll'
  },
  paper_modal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: theme.spacing(2, 3)
  }
}));

export default function IDPanelModal(props) {
  const classes = useStyles();
  const theme = useTheme();

  let IDDom = null;

  if (props.withCustomer === true && props.customerIdentified === true) {
    IDDom = (
      <div>
        <AdditionalInfoPane {...props} />

        <CorrespondancePane {...props} />
        <SwitchPartiesPane {...props} />
      </div>
    );
  } else {
    IDDom = (
      <div>
        <AdditionalInfoPane {...props} />

        <CorrespondancePane {...props} />
        <SwitchPartiesPane {...props} />
      </div>
    );
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openIDPanels}
        onClose={props.onCloseClick}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.openIDPanels}>
          <div className={classes.paper_modal}>{IDDom}</div>
        </Fade>
      </Modal>
    </div>
  );
}
