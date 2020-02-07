import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CallEndSharpIcon from '@material-ui/icons/CallEndSharp';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountsTable from '../../components/tables/AccountsTable';

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

export default function AccountsModal(props) {
  const classes = useStyles();

  const handleCloseAccounts = () => {
    props.setOpenCustomerAccounts(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openCustomerAccounts}
        onClose={handleCloseAccounts}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.openCustomerAccounts}>
          <div className={classes.paper_modal}>
            <AccountsTable {...props} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}