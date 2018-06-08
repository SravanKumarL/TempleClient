import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper, Button } from '@material-ui/core';
import { Cell } from './Cell/CellFactory';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    dialog: {
        width: 'calc(100% - 16px)'
    }
});
const DeleteDialog = ({ columns, collection, classes, deletingRows, dialogOpen, onDelDialogClick }) => {
    //#region Delete Handlers
    this.cancelDelete = () => {
        onDelDialogClick(false);
    }
    this.onRowsDelete = () => {
        onDelDialogClick(true);
    }
    //#endregion
    return (<Dialog
        open={dialogOpen}
        onClose={this.cancelDelete}
        classes={{ paper: classes.dialog }}
    >
        <DialogTitle>Delete Row</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure to delete the following {(collection ? collection.substring(0, collection.length - 1)
                    : 'rows')}?
                </DialogContentText>
            <Paper>
                <Grid
                    rows={deletingRows}
                    columns={columns}
                >
                    <Table cellComponent={Cell} />
                    <TableHeaderRow />
                </Grid>
            </Paper>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
            <Button onClick={this.onRowsDelete} color="secondary">Delete</Button>
        </DialogActions>
    </Dialog>);
}
export default withStyles(styles)(DeleteDialog);