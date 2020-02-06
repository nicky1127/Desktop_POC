import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PasswordVerifyPane from '../VerificationForms/PasswordVerify';
import SecurityVerifyPane from '../VerificationForms/SecurityVerify';
import BirthdayQuestionPane from './VerificationForms/BirthdayVerify';
import AddressQuestionPane from './VerificationForms/AddressVerify';
import NoTokensPane from './VerificationForms/UnableToVerifyForm';


const useStyles = makeStyles(theme => ({
  modal: {
    margin: 'auto',
    maxHeight: 550,
    maxWidth: 700,
    overflow: 'scroll'
  },
  paper_modal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: theme.spacing(2, 3)
  }
}));

export default function VerificationModal(props) {
  const classes = useStyles();
  const theme = useTheme();
let verifyDom = null
  
      
    if (props.levelPass < 2) {
      if (props.question === 1) {
        
        verifyDom = <PasswordVerifyPane {...props} />;
      } else if (props.question === 2) {
        
        verifyDom = <SecurityVerifyPane {...props} />;
      }else{
        verifyDom = <UnableToVerifyPane {...props} />;
      }
    }else{
        props.onCloseVerifyModal()
    }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openVerifyModal}
        onClose={props.onCloseVerifyModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.openVerifyModal}>
          <div className={classes.paper_modal}>
            {verifyDom}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}