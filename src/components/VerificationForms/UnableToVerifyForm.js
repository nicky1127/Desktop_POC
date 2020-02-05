import React from 'react';
import { ListItem, ListItemText} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Icon } from '@material-ui/core';

export default function NoTokensPane(props) {
  
    const useStyles = makeStyles(theme => ({
        icon: { color: 'red', fontSize: 100, alignContent: 'centre' },
        name: {
          fontWeight: 'bold',
          width: '60%',
          height: '20px',
          textAlign: 'center'
        },
      }));
    
      const classes = useStyles({ ...props });
    
      return (
        <div>
          <Grid container direction="row" alignItems="center" >
            <Grid item align="center" xs={12} >
              <Icon>
                <ErrorIcon className={classes.icon} />
              </Icon>
              <List className={classes.modalContent }>
                <ListItem>
                  <ListItemText classes={{ root: classes.name }} primary={"Unable to Verify Customer"} />
                </ListItem>
                <ListItem>
                  <ListItemText classes={{ root: classes.name }} primary={"No more Verify tokens available"} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </div>
      )
}
