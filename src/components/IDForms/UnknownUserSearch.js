import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { List} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import apiCustomer from '../../api/ApiCustomer';
import { customerRows } from '../../HelperFiles/CustomerHelpers';

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
  showTextGrid: { display: props => (props.methodSelected === 30 ? 'none' : 'block') },
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
  submitBtn: {
    marginRight: theme.spacing(2),
    backgroundColor: '#0A9014',
    color: 'white',
    left: '5%'
  },
  cancelButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#DE0C3B',
    color: 'white',
    left: '9%'
  },
  modalContent: {
    boxSizing: 'border-box',
    borderBottom: '5px solid #26a69a',
    position: 'relative'
  }
}));

export default function IDSearchForm(props) {


  const [brand, setBrand] = React.useState('');
  const [methodSelected, setMethodSelected] = React.useState('');
  const [account, setAccount] = React.useState(null);
  const [sort_code, setSort_code] = React.useState(null);
  const [surname, setSurname] = React.useState(null);
  const [postcode, setPostcode] = React.useState(null);

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

  //
  const classes = useStyles({ ...props, methodSelected });

  const onSubmit = async () => {
    const response = await apiCustomer.getCustomerBySearch(account, sort_code, surname, postcode);
    const rows = customerRows(response);
    props.setCustomerArray(rows);
    props.setSearchLevel(2);
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
    <div >
      <List className={classes.modalContent}>
        <h2>Identification Panel</h2>
        <Grid container spacing={1}>
          <Grid container item xs={6} spacing={3}>
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

          <Grid container item xs={6} spacing={3}>
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

          <Grid container item xs={6} spacing={3}>
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

          <Grid container item xs={6} spacing={3} className={classes.showTextGrid}>
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
        </Grid>
        <Grid container item xs={6} spacing={3}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelButton}
              onClick={props.handleCloseSearch}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </List>
    </div>
  );
}
