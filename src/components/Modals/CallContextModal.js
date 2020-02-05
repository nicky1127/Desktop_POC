import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CallEndSharpIcon from '@material-ui/icons/CallEndSharp';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AdditionalCallInfo from '../CallContextForms/AdditionalCallInfo';
import IVRInfo from '../CallContextForms/IVRAudit'

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => ({
  modal: {
    margin: 'auto',
    maxHeight: 600,
    maxWidth: 950,
    overflow:'scroll',
  },
  paper_modal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: theme.spacing(2, 3)
  }
}));

export default function CallContextModal(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openCallPanels}
        onClose={props.onCloseCallsClick}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.openCallPanels}>
          <div className={classes.paper_modal}>
            <AdditionalCallInfo {...props} />
            <IVRInfo {...props}/>

            
            {/* <MobileStepper
              variant="dots"
              steps={4}
              position="static"
              className={classes.stepper}
              nextButton={
                <Button size="small">
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" >
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            /> */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
