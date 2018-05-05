import React from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { Paper, Button } from 'material-ui';
import { Cell } from './Cell/CellFactory';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
export const DeleteDialog = ({ deletingRows, cancelDelete, deleteRows, classes, collection, rows, columns }) =>
    (<Dialog
        open={!!deletingRows.length}
        onClose={cancelDelete}
        classes={{ paper: classes.dialog }}
    >
        <DialogTitle>Delete Row</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure to delete the following {(collection ? collection.substring(0, collection.length - 1) : 'rows')}?
                </DialogContentText>
            <Paper>
                <Grid
                    rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
                    columns={columns}
                >
                    <Table cellComponent={Cell} />
                    <TableHeaderRow />
                </Grid>
            </Paper>
        </DialogContent>
        <DialogActions>
            <Button onClick={cancelDelete} color="primary">Cancel</Button>
            <Button onClick={deleteRows} color="secondary">Delete</Button>
        </DialogActions>
    </Dialog>);