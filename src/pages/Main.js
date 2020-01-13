import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MainHeader from '../components/MainHeader';
import WorkingContainer from '../components/WorkingContainer';
import AvayaToolBar from '../components/AvayaToolBar';
import apiAuth from '../api/ApiAuth';
import apiSettingsConfig from '../api/ApiSettings';
import apiCustomer from '../api/ApiCustomer';
import apiIVRCalls from '../api/ApiIVR';
import Paper from '@material-ui/core/Paper';
import IncomingCallModal from '../components/Modals/IncomingCallModal';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '25vh',
    backgroundColor: '#9e9e9e'
  },
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

function Main() {
  const [ready, setReady] = useState(false);
  const [onCall, setOnCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openIdentified, setOpenIdentified] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [withCustomer, setWithCustomer] = useState(false);
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [iVRProfile, setIVRProfile] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await apiAuth.authUser();
      setUser(response);
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  const handleOpen = () => {
    setOpenIdentified(true);
  };

  const handleOpenSearchModal = () => {
    setOpenSearch(true);
  };

  const handleClose = () => {
    setOpenIdentified(false);
    setReady(false);
  };

  const handleAccept = async () => {
    if (iVRProfile.account_number !== null && iVRProfile.sort_code !== null) {
      const response = await apiCustomer.getCustomerByAccount(
        iVRProfile.account_number,
        iVRProfile.sort_code
      );
      console.log(response);

      if (response) {
        setCustomer(response);
        setOpenIdentified(false);
        setOnCall(true);
        setReady(false);
        setWithCustomer(true);
      } else {
      }
    } else {
    }
  };

  const getIVRCall = async () => {
    const response = await apiIVRCalls.callIVR();
    setIVRProfile(response);
    if (response.identified === true) {
      handleOpen();
    } else {
    }
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const changeStatusToReady = async () => {
    setWithCustomer(false);
    setReady(true);
    await delay(7000);
    getIVRCall();
  };

  const changeStatusToOnCall = async () => {
    setReady(false);
    setOnCall(true);
  };

  const stopCall = async () => {
    setOnCall(false);
  };

  const renderloading = () => <div>Loading</div>;

  const renderReady = () => (
    <div>
      <MainHeader
        className={classes.mainHeader}
        user={user}
        ready={ready}
        onCall={onCall}
        customer={customer}
        withCustomer={withCustomer}
      />
      <Paper className={classes.paper} />
      <WorkingContainer className={classes.workingContainer} />
      <AvayaToolBar
        setWaiting={changeStatusToReady}
        hangUp={stopCall}
        talking={changeStatusToOnCall}
        ready={ready}
        onCall={onCall}
        user={user}
      />
      <IncomingCallModal
        openIdentified={openIdentified}
        handleClose={handleClose}
        iVRProfile={iVRProfile}
        handleAccept={handleAccept}
        handleClose={handleClose}
      />
    </div>
  );

  let content = null;
  if (isLoading === true) {
    content = renderloading();
  } else {
    content = renderReady();
  }

  return content;
}

export default Main;
