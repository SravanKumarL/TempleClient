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

const styles = theme => ({
    dialog: {
        width: 'calc(100% - 16px)',
    }
});
class DeleteDialog extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        }
        //#region Delete Handlers
        this.cancelDelete = () => {
            this.setState({ dialogOpen: false });
        }
        this.onRowsDelete = () => {
            this.setState({ dialogOpen: false });
            this.props.setAndCommitTransaction(constants.delete, this.props.collection, this.props.deletingRows);
            this.props.delDialogHandle();
        };
        //#endregion
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ dialogOpen: nextProps.deletingRows && nextProps.deletingRows.length > 0 });
    }
    render() {
        const { columns, collection, classes, deletingRows } = this.props;
        return (<Dialog
            open={this.state.dialogOpen}
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
}
export default withStyles(styles)(DeleteDialog);