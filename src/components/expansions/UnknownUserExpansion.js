import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import apiCustomer from '../../api/ApiCustomer';
import CustomerSearchModal from '../Modals/CustomerSearch';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
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
  expandIcon: {
    padding: '3px',
    display: 'block',
    position: 'absolute',
    bottom: '56x',
    left: '47%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
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
              <Grid item xs={6}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText classes={{ root: classes.name }} primary={`Unknown`} />
                </ListItem>
              </Grid>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <CakeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Unknown`} />
                </ListItem>

                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <FingerprintIcon />
                  </ListItemIcon>
                  <ListItemText primary={`ID by: Unidentified`} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <IconButton classes={{ root: classes.expandIcon }} onClick={onClickBtn}>
          <ExpandMoreIcon />
        </IconButton>
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
