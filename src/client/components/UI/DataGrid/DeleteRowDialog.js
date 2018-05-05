import React from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { Paper, Button } from 'material-ui';
import { Cell } from './Cell/CellFactory';
import constants, { transactionType } from '../../../../store/sagas/constants';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from 'material-ui/styles';

const styles = {
    dialog: {
        width: 'calc(100% - 16px)',
    }
}
class DeleteDialog extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            remainingRows: []
        }
        //#region Delete Handlers
        this.cancelDelete = () => {
            this.props.deleteRows(this.props.rows, this.props.rows);
        }
        this.onRowsDelete = () => {
            // this.state.deletingRows.forEach((rowId) => {
            //     const index = rows.findIndex(row => row.id === rowId);
            //     if (index > -1) {
            //         rows.splice(index, 1);
            //     }
            // });
            let rowsToBeDeleted = this.props.deletingRows.slice()[0];
            if (this.props.collection === constants.Users) {
                rowsToBeDeleted = this.props.rows.filter(row => row.id === rowsToBeDeleted)[0].username;
            }
            this.props.setAndCommitTransaction(transactionType.modify, this.props.collection, rowsToBeDeleted);
            this.props.deleteRows(this.state.remainingRows, this.props.rows);
        };
        //#endregion
    }
    componentWillReceiveProps(nextProps) {
        const deletingRows = nextProps.deletingRows;
        this.setState({ deletingRows, remainingRows: nextProps.rows.filter(row => nextProps.deletingRows.indexOf(row.id) > -1) });
    }
    render() {
        const { columns, collection, classes, deletingRows } = this.props;
        const { remainingRows } = this.state;
        return (<Dialog
            open={!!deletingRows.length}
            onClose={this.cancelDelete}
            classes={classes.dialog}
        >
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure to delete the following {(collection ? collection.substring(0, collection.length - 1)
                        : 'rows')}?
                </DialogContentText>
                <Paper>
                    <Grid
                        rows={remainingRows}
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
}
export default withStyles(styles)(DeleteDialog);