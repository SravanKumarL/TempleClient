import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Paper,Typography, Checkbox, FormControlLabel  } from 'material-ui';
const styles = theme => ({
    root: {
      display: 'flex',
      position: 'absolute',
      zIndex: 1,
      top:0,
      marginLeft:120,
      flexWrap: 'wrap',
      alignItems: 'center',
      flexGrow: 1,
      background: '#F5F5F5',
      marginBottom: 10,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300,
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  });
const ContentPaper = (props) => {
    // const cols = items % height > 1 ? (items / height + 1) : (items / height);
    // let arrangedItems = [];
    // let x = 0;
    // let end;
    // for (i = 0; i < cols; i++) {
    //     end = x + height > items.length ? items.length - 1 : x + height;
    //     arrangedItems.push(items.slice(x, end));
    //     x += height;
    // }
    const {classes}=props;
    const arrangedItems = [['Sunday', 'Wednesday', 'Saturday'], ['Monday', 'Thursday'], ['Tuesday', 'Friday']]
    return (
        <div className={classes.root}>
            <Paper>
                <Typography variant="headline" component="h3">
                    This is a sheet of paper.
            </Typography>
                {arrangedItems.map(arrItem =>
                    (<Typography component="p" key={arrItem}>
                        {arrItem.map((ai,index) => 
                            <FormControlLabel className={classes.formControl} control={<Checkbox value={ai}/>} label={ai} key={`${ai},${index}`}/>)}
                    </Typography>))}
            </Paper>
        </div>
    );
}
export default withStyles(styles,{ withTheme: true })(ContentPaper);