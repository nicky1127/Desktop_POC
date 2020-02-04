import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TextField from '@material-ui/core/TextField';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import apiCustomer from '../api/ApiCustomer';
import { customerRows } from '../HelperFiles/CustomerHelpers';
import CustomerSearchModal from '../components/Modals/CustomerSearch';

// carousel
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute'
  },
  icon: { marginRight: theme.spacing(-1) },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  name: {
    fontWeight: 'bold',
    // overflow: 'hidden',
    width: '60%',
    height: '20px'
  },
  address: {
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '60%',
    height: '20px'
  },
  expansionContainer: {
    boxSizing: 'border-box',
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  },
  expansionSummary: {
    height: props => props.height
  },
  expansionDropdown: {
    height: '47vh'
  },
  expandIcon: {
    padding: '3px',
    display: 'block',
    margin: '0 auto',
    position: 'absolute',
    bottom: '5px',
    left: '47%',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: props => (props.checked ? 'rotate(180deg)' : 'rotate(0deg)')
  },
  expansionDropdownContent: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '30vh'
  },
  stepper: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100
  },
  showTextGrid: { display: props => (props.methodSelected === 30 ? 'none' : 'block') },
  slide1: {
    position: props => (props.activeStep === 0 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 0 ? 'block' : 'none')
  },
  slide2: {
    position: props => (props.activeStep === 1 ? 'static' : 'absolute'),
    display: props => (props.activeStep === 1 ? 'block' : 'none')
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

export default function IDSearchPanel(props) {
  const [checked, setChecked] = useState(true);

  const onClickBtn = () => {
    setChecked(prev => !prev);
  };

  // carousel
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [brand, setBrand] = React.useState('');
  const [methodSelected, setMethodSelected] = React.useState('');
  const [account, setAccount] = React.useState(null);
  const [sort_code, setSort_code] = React.useState(null);
  const [surname, setSurname] = React.useState(null);
  const [postcode, setPostcode] = React.useState(null);
  const [openCustomerSearch, setOpenCustomerSearch] = React.useState(false);
  const [customerArray, setCustomerArray] = React.useState(null);

  const onChangeAccount_Surname = evt => {
    if (methodSelected === 10) {
      setAccount(evt.target.value);
    } else {
      setSurname(evt.target.value);
    }
  };
  const onChangeSortCode_PostCode = evt => {
    if (methodSelected === 10) {
      setSort_code(evt.target.value);
    } else {
      setPostcode(evt.target.value);
    }
  };

  const handleChangeMethod = event => {
    setMethodSelected(event.target.value);
    console.log(methodSelected);

    setSurname(null);
    setPostcode(null);

    setAccount(null);
    setSort_code(null);
    console.log('All cleared');
  };

  const handleChangeBrand = event => {
    setBrand(event.target.value);
  };

  const handleCloseSearch = () => {
    setOpenCustomerSearch(false);
  };

  //
  const classes = useStyles({ ...props, checked, activeStep, methodSelected });

  const IDParam = props => {
    if (props.iVRProfile.account_number && props.iVRProfile.account_number) {
      return 'Account Number and Sort Code';
    } else if (props.iVRProfile.last_name && props.iVRProfile.address_postcode) {
      return 'Surname and Postcode';
    } else {
      return 'unIdentified';
    }
  };

  const onSubmit = async () => {
    const response = await apiCustomer.getCustomerBySearch(account, sort_code, surname, postcode);
    const rows = customerRows(response);
    setCustomerArray(rows);
    setOpenCustomerSearch(true);
  };

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

  const onSubmitSelection2 = async (id) => {
    const response = await apiCustomer.getCustomerByPartyId(id)
    if (response) {
      props.setCustomer(response);
      props.vLevelConfirmationColor(response);
      props.vConfirmationColor();
      setOpenCustomerSearch(false);
      props.setCustomerIdentified(true);
    } else {
    }
  };

  const IDSelection = methodSelected => {
    if (methodSelected === 10) {
      return 'Account Number';
    } else if (methodSelected === 30) {
      return 'PAN Number';
    } else {
      return 'Surname';
    }
  };
  const IDSelection2 = methodSelected => {
    if (methodSelected === 10) {
      return 'Sort Code';
    } else {
      return 'PostCode';
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
                  <ListItemText
                    classes={{ root: classes.name }}
                    primary={`${props.customer.title}  ${props.customer.name}`}
                  />
                </ListItem>
              </Grid>
              <Grid item xs={12}>
                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <CakeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${props.customer.date_of_birth}`} />
                </ListItem>

                <ListItem>
                  <ListItemIcon className={classes.icon}>
                    <FingerprintIcon />
                  </ListItemIcon>
                  <ListItemText primary={`ID by: ${IDParam(props)}`} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
        <Collapse in={checked}>
          <Paper elevation={4} className={classes.expansionDropdown}>
            <Box className={classes.expansionDropdownContent}>
              <Fade in={activeStep === 0} className={classes.slide1}>
                <Paper elevation={4}>
                  <div>
                    <h3>Identification Panel</h3>
                    <Grid container spacing={1}>
                      <Grid container item xs={12} spacing={3}>
                        <FormControl className={classes.formControl}>
                          {' '}
                          <h4>Brand Selection</h4>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-controlled-open-select-label">Brand</InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={brand}
                            onChange={handleChangeBrand}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Lloyds</MenuItem>
                            <MenuItem value={20}>Halifax</MenuItem>
                            <MenuItem value={30}>Scotland</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid container item xs={12} spacing={3}>
                        <FormControl className={classes.formControl}>
                          {' '}
                          <h4>Identification Token</h4>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-controlled-open-select-label">Token</InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={methodSelected}
                            onChange={handleChangeMethod}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Account/SortCode</MenuItem>
                            <MenuItem value={20}>Surname/Postcode</MenuItem>
                            <MenuItem value={30}>PAN Number</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid container item xs={12} spacing={3}>
                        <FormControl className={classes.formControl}>
                          {' '}
                          <h4>{IDSelection(methodSelected)}</h4>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="ID Question 1"></InputLabel>
                          <TextField
                            required
                            id="filled-required"
                            defaultValue=""
                            variant="outlined"
                            onChange={onChangeAccount_Surname}
                          />
                        </FormControl>
                      </Grid>

                      <Grid container item xs={12} spacing={3} className={classes.showTextGrid}>
                        <FormControl className={classes.formControl}>
                          {' '}
                          <h4>{IDSelection2(methodSelected)}</h4>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="ID Question 2"></InputLabel>

                          <TextField
                            required
                            id="filled-required"
                            defaultValue=""
                            variant="outlined"
                            onChange={onChangeSortCode_PostCode}
                          />
                        </FormControl>
                      </Grid>
                      <Grid container item xs={12} spacing={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.submitBtn}
                          onClick={onSubmit}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
              </Fade>
            </Box>
          </Paper>
        </Collapse>
        <IconButton classes={{ root: classes.expandIcon }} onClick={onClickBtn}>
          <ExpandMoreIcon />
        </IconButton>
      </Paper>
      <CustomerSearchModal
        customerArray={customerArray}
        openCustomerSearch={openCustomerSearch}
        onSubmitSelection={onSubmitSelection}
        handleCloseSearch={handleCloseSearch}
        onSubmitSelection2={onSubmitSelection2}
        {...props}
      />
    </div>
  );
}
