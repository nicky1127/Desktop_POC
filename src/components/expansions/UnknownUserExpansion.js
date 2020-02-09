import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import apiCustomer from '../../api/ApiCustomer';
import CustomerSearchModal from '../Modals/CustomerSearch';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
  redIcon: {
    color: '#d50000'
  },
  name: {
    fontWeight: 'bold',
    width: '60%',
    height: '20px'
  },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: props => `5px solid ${props.brandScheme.secondaryClr}`,
    paddingBottom: '4vh',
    position: 'relative'
  },
  expansionSummary: {
    height: '14vh'
  },
  identifyBtn: {
    padding: '2px 10px',
    display: 'block',
    position: 'absolute',
    bottom: '56x',
    left: '40%'
  },
  submitBtn: {
    // padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '70%'
  }
}));

export default function UnknownUserExpansion(props) {
  const [openCustomerSearch, setOpenCustomerSearch] = React.useState(false);

  const onClickBtn = () => {
    setOpenCustomerSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenCustomerSearch(false);
  };

  //
  const classes = useStyles({ ...props });

  const onSubmitSelection = async (name, dob, address, postcode) => {
    const response = await apiCustomer.getIdentifiedCustomer(name, dob, address, postcode);
    console.log(response);
    if (response) {
      props.setCustomer(response);
      props.vLevelConfirmationColor(response);
      props.vConfirmationColor();
      setOpenCustomerSearch(false);
      props.setCustomerIdentified(true);
    } else {
    }
  };

  const onSubmitSelection2 = async id => {
    const response = await apiCustomer.getCustomerByPartyId(id);
    if (response) {
      props.setCustomer(response);
      props.vLevelConfirmationColor(response);
      props.vConfirmationColor();
      setOpenCustomerSearch(false);
      props.setCustomerIdentified(true);
    } else {
    }
  };

  return (
    <div className={classes.root}>
      <Paper classes={{ root: classes.expansionContainer }}>
        <Box classes={{ root: classes.expansionSummary }}>
          <List dense>
            <Grid container>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText classes={{ root: classes.name }} primary={`Unknown`} />
              </ListItem>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <CakeIcon />
                </ListItemIcon>
                <ListItemText primary={`Unknown`} />
              </ListItem>

              <ListItem>
                <ListItemIcon className={`${classes.icon} ${classes.redIcon}`}>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText primary={`ID by: Unidentified`} />
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.identifyBtn}
                  onClick={onClickBtn}
                  // endIcon={<Icon>send</Icon>}
                >
                  Identify
                </Button>
              </ListItem>
            </Grid>
          </List>
        </Box>
      </Paper>
      <CustomerSearchModal
        openCustomerSearch={openCustomerSearch}
        onSubmitSelection={onSubmitSelection}
        handleCloseSearch={handleCloseSearch}
        onSubmitSelection2={onSubmitSelection2}
        {...props}
      />
    </div>
  );
}
