import React from 'react';
import { EnumAvailableRoles, EditCell, Cell } from './Cell/CellFactory';
import { withStyles } from 'material-ui';
import {
    SortingState, EditingState, PagingState, FilteringState, /* IntegratedSelection, */
    IntegratedPaging, IntegratedSorting, IntegratedFiltering, GroupingState, IntegratedGrouping, /* SelectionState */
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFilterRow, ColumnChooser, /* TableSelection, */ TableGroupRow,
    PagingPanel, DragDropProvider, TableColumnReordering, TableColumnVisibility, GroupingPanel, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import DeleteDialog from './DeleteRowDialog';
import constants, { transactionType } from '../../../../store/sagas/constants';
import { Command } from './CommandButton';

// const styles = theme => ({

// });
const EditRow = (props) => {
    return <TableEditRow.Row {...props} key={props.row.id} />
}
const Row = (props) => {
    return <Table.Row {...props} key={props.row.id} />;
}
export default class GridContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            delDialogOpen: false,
            deletingRows: [],
            isGrouped: false,
            sorting: [],
            editingRowIds: [],
            addedRows: [],
            rowChanges: {},
            currentPage: 0,
            pageSize: 5,
            pageSizes: [5, 10, 0],
            columnOrder: [],
        };
    }
    //#region Grouping Handlers
    handleGroupingChange = (groups) => {
        let isGrouped = groups.length > 0;
        this.setState({ isGrouped });
    }
    onGroupToggle = () => {
        this.setState((prevState) => ({ isGrouped: !prevState.isGrouped }));
    }
    //#endregion

    //#region Change Handlers
    changeSorting = sorting => this.setState({ sorting });
    changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    changeAddedRows = addedRows => {
        this.setState({
            addedRows: addedRows.map(row => (Object.keys(row).length ? row : (this.props.collection === constants.Users ? { role: EnumAvailableRoles.user } : {})))
        });
    }
    changeRowChanges = rowChanges => this.setState({ rowChanges });
    changeCurrentPage = currentPage => this.setState({ currentPage });
    changePageSize = pageSize => this.setState({ pageSize });
    commitChanges = (props) => {
        const { added, changed, deleted } = props;
        const rows = this.props.rows.map((row, index) => ({ ...row, id: index }));
        if (added && ((this.props.collection !== constants.Users && added[0].keys.length > 0) || ('username' in added[0] && 'password' in added[0]))) {
            // const modRows = rows.map(row => {
            //     row['id'] = row['id'] + 1;
            //     return row;
            // });
            // added[0]['id'] = 0;
            // modRows.unshift(added[0]);
            this.props.setAndCommitTransaction(constants.add, this.props.collection, added[0]);
        }
        if (changed) {
            // rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
            const changes= Object.entries(changed)[0];
            const changedId = Number(changes[0]);
            const changedObj = rows.filter(row => row.id === changedId)[0];
            this.props.setAndCommitTransaction(constants.edit, this.props.collection, changes[1], changedObj);
        }
        if (deleted) {
            const deletingRows = rows.filter(row => row.id === deleted[0]);
            this.setState({ deletingRows, delDialogOpen: true });
        }
    };
    //#endregion
    //#region Misc Handlers
    onDelDialogClick = (toDelete) => {
        if (toDelete)
            this.props.setAndCommitTransaction(constants.delete, this.props.collection, this.state.deletingRows[0]);
        this.setState({ deletingRows: [], delDialogOpen: false });
    }
    changeColumnOrder = (order) => {
        this.setState({ columnOrder: order });
    };
    getRowId = row => row.id;
    //#endregion
    render() {
        const { columns, setAndCommitTransaction, collection,
            readOnly, displayFilter } = this.props;
        const rows = this.props.rows.map((row, index) => ({ ...row, id: index }));
        const {
            delDialogOpen,
            sorting,
            isGrouped,
            deletingRows,
            editingRowIds,
            addedRows,
            rowChanges,
            currentPage,
            pageSize,
            pageSizes,
            columnOrder } = this.state;
        return (
            <React.Fragment>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={this.getRowId}
                >
                    <FilteringState />
                    {/* {!readOnly && <SelectionState />} */}
                    <SortingState
                        sorting={sorting}
                        onSortingChange={this.changeSorting}
                    />
                    <GroupingState onGroupingChange={this.handleGroupingChange} />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    <IntegratedFiltering />
                    {/* {!readOnly && <IntegratedSelection />} */}
                    <IntegratedGrouping />
                    <IntegratedSorting />
                    <IntegratedPaging />
                    {!readOnly &&
                        <EditingState
                            editingRowIds={editingRowIds}
                            onEditingRowIdsChange={this.changeEditingRowIds}
                            rowChanges={rowChanges}
                            onRowChangesChange={this.changeRowChanges}
                            addedRows={addedRows}
                            onAddedRowsChange={this.changeAddedRows}
                            onCommitChanges={this.commitChanges}
                        />}
                    <DragDropProvider />
                    <Table cellComponent={Cell} rowComponent={Row} />
                    {/* {!readOnly && <TableSelection showSelectionColumn={!isGrouped} />} */}
                    <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={this.changeColumnOrder}
                    />
                    <TableHeaderRow showSortingControls />
                    {displayFilter && <TableFilterRow />}
                    {isGrouped ? <TableGroupRow /> :
                        (!readOnly && <TableEditRow
                            cellComponent={EditCell} rowComponent={EditRow}
                        />)}
                    {(!isGrouped && !readOnly) &&
                        <TableEditColumn
                            width={180}
                            showAddCommand={!addedRows.length}
                            showEditCommand
                            showDeleteCommand
                            commandComponent={props => (<Command collection={collection} {...props} />)}
                        />}
                    {!readOnly && <TableColumnVisibility />}
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <Toolbar />
                    {!readOnly && <GroupingPanel showSortingControls />}
                    {!readOnly && <ColumnChooser />}
                </Grid>
                {!readOnly && <DeleteDialog setAndCommitTransaction={setAndCommitTransaction} deletingRows={deletingRows}
                    collection={collection} columns={columns} onDelDialogClick={this.onDelDialogClick} dialogOpen={delDialogOpen} />}
            </React.Fragment>
        );
    }
}
// export default withStyles(styles)(GridContainer);
