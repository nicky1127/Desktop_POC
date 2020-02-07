import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CallEndSharpIcon from '@material-ui/icons/CallEndSharp';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomersTable from '../../components/tables/CustomersTable';
import CustomersTable2 from '../../components/tables/CustomerTable2';
import IDSearchForm from '../IDForms/UnknownUserSearch';

const useStyles = makeStyles(theme => ({
  modal: {
    margin: 'auto',
    maxHeight: 550,
    maxWidth: 1200,
    // overflow: 'scroll'
  },
  modal2: {
    margin: 'auto',
    maxHeight: 550,
    maxWidth: 900,
    // overflow: 'scroll'
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

export default function CustomerSearchModal(props) {
  const [customerArray, setCustomerArray] = React.useState(null);
  const [searchLevel, setSearchLevel] = React.useState(1);
  const classes = useStyles();

  const handleBack = () => {
    setSearchLevel(1);
  };

  const sizeSelector = () => {
    let format;
    if (searchLevel === 1) {
      format = classes.modal2;
    } else {
      format =classes.modal
    }
    return format
  };

  let searchDom = null;

  if (searchLevel === 1) {
    searchDom = (
      <IDSearchForm
        {...props}
        setCustomerArray={setCustomerArray}
        setSearchLevel={setSearchLevel}
      />
    );
  } else {
    searchDom = <CustomersTable {...props} customerArray={customerArray} handleBack={handleBack} />;
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={sizeSelector()}
        open={props.openCustomerSearch}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.openCustomerSearch}>
          <div className={classes.paper_modal}>{searchDom}</div>
        </Fade>
      </Modal>
    </div>
  );
}
