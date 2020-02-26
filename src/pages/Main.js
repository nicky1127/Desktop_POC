import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MainHeader from '../components/MainHeader';
import WorkingContainer from '../components/WorkingContainer';
import AvayaToolBar from '../components/AvayaToolBar';
import apiAuth from '../api/ApiAuth';
import apiCustomer from '../api/ApiCustomer';
import apiIVRCalls from '../api/ApiIVR';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IncomingCallModal from '../components/Modals/IncomingCallModal';

import { setBrandScheme, clearIVR, getCustomerByAccount } from '../redux/actions/action-creator';

import constants from '../constants';

const mapStateToProps = state => {
  if (state) {
    const { IVR } = state;
    return { IVR };
  }
  return { IVR: {} };
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '18vh',
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

function Main(props) {
  const [ready, setReady] = useState(false);
  const [onCall, setOnCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openIdentified, setOpenIdentified] = React.useState(false);
  const [withCustomer, setWithCustomer] = useState(false);
  const [customerIdentified, setCustomerIdentified] = useState(false);
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [poaFor, setPOA] = React.useState(null);
  const [iVRProfile, setIVRProfile1] = useState([]);
  const classes = useStyles();
  // const [statusColor, setStatusColor] = React.useState('red');
  // const [levelColor, setLevelColor] = React.useState('red');
  const [brandScheme, setBrandScheme1] = useState(constants.brandSchemes[0]);
  const [closeAllDropdown, setCloseAllDropdown] = useState(false);
  const [closeLayer, setCloseLayer] = useState(false);

  const { IVR, clearIVR, getCustomerByAccount } = props;

  // const vConfirmationColor = () => {
  //   if (iVRProfile.verified === true) {
  //     setStatusColor('blue');
  //   } else {
  //     //
  //   }
  // };

  // const vLevelConfirmationColor = ctr => {
  //   if (ctr.verification_level > 40) {
  //     setLevelColor('blue');
  //   } else if (ctr.verification_level > 20) {
  //     setLevelColor('green');
  //   } else {
  //   }
  // };

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await apiAuth.authUser();
      setUser(response);
      setIsLoading(false);
    }
    fetchUser();
    selectBrandScheme(props.IVR);
  }, []);

  useEffect(() => {
    selectBrandScheme(props.IVR);
  }, [props.IVR]);

  const handleOpen = () => {
    setOpenIdentified(true);
  };

  const handleClose = () => {
    setOpenIdentified(false);
    setReady(false);
    clearIVR();
  };

  const handleAccept = async () => {
    if (IVR.identified === true) {
      // const response = await apiCustomer.getCustomerByAccount(IVR.account_number, IVR.sort_code);

      // if (response) {
      // setCustomer(response);
      setOpenIdentified(false);
      setOnCall(true);
      setReady(false);
      setWithCustomer(true);
      setCustomerIdentified(true);
      // vConfirmationColor();
      //   vLevelConfirmationColor(response);
      // } else {
      // }
    } else {
      console.log('The no user path has been taken');
      setOpenIdentified(false);
      setOnCall(true);
      setReady(false);
      setWithCustomer(true);
    }
  };
  const selectBrandScheme = ivr => {
    const { brand } = ivr;
    if (brand) {
      const result = constants.brandSchemes.filter(scheme => scheme.brand === brand);
      if (result && result.length === 1) {
        props.setBrandScheme(result[0]);
      } else {
        props.setBrandScheme(constants.brandSchemes[0]);
      }
    } else {
      props.setBrandScheme(constants.brandSchemes[0]);
    }
  };

  const getIVRCall = () => {
    handleOpen();
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const changeStatusToReady = () => {
    setCustomer([]);
    setWithCustomer(false);
    setReady(true);
    setCustomerIdentified(false);
    // await delay(3000);
    getIVRCall();
  };

  const changeStatusToOnCall = async () => {
    setReady(false);
    setOnCall(true);
  };

  const stopCall = async () => {
    setOnCall(false);
  };

  const openLayer = toggle => {
    setCloseLayer(toggle);
  };

  const onClickWorkingContainer = () => {
    setCloseAllDropdown(prev => {
      return !prev;
    });
    setCloseLayer(false);
  };

  let layer;
  if (closeLayer)
    layer = (
      <Box
        style={{
          backgroudcolor: 'red',
          position: 'absolute',
          zIndex: '4',
          bottom: '0',
          width: '100%',
          height: '80vh'
        }}
        onClick={onClickWorkingContainer}
      />
    );

  const renderloading = () => <div>Loading</div>;

  const renderReady = () => (
    <div>
      <MainHeader
        className={classes.mainHeader}
        user={user}
        ready={ready}
        onCall={onCall}
        // customer={customer}
        // brandScheme={brandScheme}
        withCustomer={withCustomer}
        // iVRProfile={iVRProfile}
        // statusColor={statusColor}
        // levelColor={levelColor}
        customerIdentified={customerIdentified}
        setCustomerIdentified={setCustomerIdentified}
        // vConfirmationColor={vConfirmationColor}
        // vLevelConfirmationColor={vLevelConfirmationColor}
        setCustomer={setCustomer}
        closeAllDropdown={closeAllDropdown}
        openLayer={openLayer}
      />
      <Paper className={classes.paper} />
      <WorkingContainer
        customerIdentified={customerIdentified}
        className={classes.workingContainer}
        onClickWorkingContainer={onClickWorkingContainer}
        customer={customer}
      />
      {layer}

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
        // iVRProfile={iVRProfile}
        handleAccept={handleAccept}
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

const ConnectedMain = connect(mapStateToProps, { setBrandScheme, clearIVR, getCustomerByAccount })(
  Main
);

export default ConnectedMain;
