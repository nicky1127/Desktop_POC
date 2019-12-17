import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import CakeIcon from '@material-ui/icons/Cake';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import constants from '../constants';
import callInfo from '../mock/api/callInfo.json';

import customers from '../mock/api/customers.json';

const { timeFormat } = constants;

const useStyles = makeStyles(theme => ({
  root: {
    // width: '25%'
  },
  icon: { marginRight: theme.spacing(-2) },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'right'
  },
  expansionSummary: {
    height: '15vh'
  }
}));

export default function CallInfoExpansion() {
  const classes = useStyles();

  const waitTime = moment.duration(callInfo.wait_time, 'seconds').seconds();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          classes={{ root: classes.expansionSummary }}
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <div>
            <List dense={true}>
              <Grid container>
                <Grid item xs={8}>
                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${customers.title}  ${customers.name}`} />
                  </ListItem>
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <CakeIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${customers.date_of_birth}`} />
                  </ListItem>
                </Grid>
              </Grid>
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={`${customers.address}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Account Type:  ${customers.account_type}`} />
              </ListItem>
            </List>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
