import React from 'react';
import { EnumAvailableRoles } from './Cell/CellFactory';
import {
    SortingState, EditingState, PagingState, FilteringState, IntegratedSelection,
    IntegratedPaging, IntegratedSorting, IntegratedFiltering, GroupingState, IntegratedGrouping, SelectionState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFilterRow, ColumnChooser, TableSelection, TableGroupRow,
    PagingPanel, DragDropProvider, TableColumnReordering, TableColumnVisibility, GroupingPanel, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
export default class Grid extends React.PureComponent {
    constructor(props) {
        this.state = {
            displayFilter: false,
            prevRows: [],
            rows: [],
            snackBarOpen: false,
            transaction: null,
            isGrouped: false,
            sorting: [],
            editingRowIds: [],
            addedRows: [],
            rowChanges: {},
            currentPage: 0,
            deletingRows: [],
            pageSize: 5,
            pageSizes: [5, 10, 0],
            columnOrder: [],
        };

        //#region Grouping Handlers
        this.handleGroupingChange = (groups) => {
            let isGrouped = groups.length > 0;
            this.setState({ isGrouped });
        }
        this.onGroupToggle = () => {
            this.setState((prevState, props) => { return { ...prevState, isGrouped: !prevState.isGrouped }; });
        }
        //#endregion

        //#region Change Handlers
        this.changeSorting = sorting => this.setState({ sorting });
        this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
        this.changeAddedRows = addedRows => {
            this.setState({
                addedRows: addedRows.map(row => (Object.keys(row).length ? row : (this.props.collection === constants.Users ? { role: EnumAvailableRoles.user } : {})))
            });
        }
        this.changeRowChanges = rowChanges => this.setState({ rowChanges });
        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });
        this.commitChanges = (props) => {
            const { added, changed, deleted } = props;
            let { rows } = this.state;
            this.setState({ prevRows: rows });
            if (added && ((this.props.collection !== constants.Users && added[0].keys.length > 0) || (username in added[0] && password in added[0]))) {
                const modRows = rows.map(row => {
                    row['id'] = row['id'] + 1;
                    return row;
                });
                added[0]['id'] = 0;
                modRows.unshift(added[0]);
                rows = modRows;
                this.props.setAndCommitTrans(constants.add, this.props.collection, added[0]);
            }
            if (changed) {
                rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
                this.setAndCommitTrans(() => this.props.commitTransaction(constants.edit, this.props.collection, changed));
            }
            this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
        };
        //#endregion

        //#region Delete Handlers
        this.cancelDelete = () => this.setState({ deletingRows: [] });
        this.deleteRows = () => {
            const rows = this.state.rows.slice();
            this.setState({ prevRows: rows });
            this.state.deletingRows.forEach((rowId) => {
                const index = rows.findIndex(row => row.id === rowId);
                if (index > -1) {
                    rows.splice(index, 1);
                }
            });
            let rowsToBeDeleted = this.state.deletingRows.slice()[0];
            if (this.props.collection === constants.Users) {
                rowsToBeDeleted = this.state.rows.filter(row => row.id === rowsToBeDeleted)[0].username;
            }
            this.setAndCommitTrans(() => this.props.commitTransaction(constants.delete, this.props.collection, rowsToBeDeleted));
            this.setState({ rows, deletingRows: [] });
        };
        //#endregion

        //#region Misc Handlers
        this.changeColumnOrder = (order) => {
            this.setState({ columnOrder: order });
        };
        this.onSnackBarClose = () => this.setState({ snackBarOpen: false });
        this.onFilterClick = () => {
            this.setState((prevState) => ({ displayFilter: !prevState.displayFilter }));
        }
        this.onPrintClicked = () => {
            printHtml.printElement(document.getElementById('datagridPaper'));
        }
        //#endregion
    }
    render() {
        return (
            <React.Fragment>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    {!readOnly && <FilteringState />}
                    {!readOnly && <SelectionState />}
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
                    {!readOnly && <IntegratedFiltering />}
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
                            commandComponent={(props) => (<Command collection={collection} {...props} />)}
                        />}
                    {!readOnly && <TableColumnVisibility />}
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <Toolbar />
                    {!readOnly && <GroupingPanel showSortingControls />}
                    {!readOnly && <ColumnChooser />}
                </Grid>
                {!readOnly && <DeleteDialog deletingRows={deletingRows} cancelDelete={this.cancelDelete} deleteRows={this.deleteRows} collection={collection} />}
                <ErrorSnackbar message={snackBarMsg} open={this.state.snackBarOpen} redoTransaction={transaction}
                    onSnackBarClose={this.onSnackBarClose} />
            </React.Fragment>
        );
    }
}
