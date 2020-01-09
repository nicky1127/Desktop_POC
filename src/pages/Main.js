import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MainHeader from '../components/MainHeader';
import WorkingContainer from '../components/WorkingContainer';
import AvayaToolBar from '../components/AvayaToolBar';
import IncomingCallModal from '../components/IncomingCallModal';
import apiAuth from '../api/ApiAuth';
import apiSettingsConfig from '../api/ApiSettings';
import apiIVRCalls from '../api/ApiIVR';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '25vh',
    backgroundColor: '#9e9e9e'
  }
}));

function Main() {
  const [ready, setReady] = useState(false);
  const [onCall, setOnCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState([]);
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeStatusToReady = async () => {
    setReady(true);
  };

  const changeStatusToOnCall = async () => {
    console.log('On Call');
    setReady(false);
    setOnCall(true);
  };

  const stopCall = async () => {
    setOnCall(false);
  };

  const renderloading = () => <div>Loading</div>;

  const renderReady = () => (
    <div>
      <MainHeader className={classes.mainHeader} />
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
