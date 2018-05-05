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
import Command from './CommandButton';

const styles = theme => ({
    inputRoot: {
        width: '100%',
    },
});
const EditRow = (props) => {
    return <TableEditRow.Row {...props} key={props.row.id} />
}
const Row = (props) => {
    return <Table.Row {...props} key={props.row.id} />;
}
class GridContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            prevRows: [],
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

        //#region Grouping Handlers
        this.handleGroupingChange = (groups) => {
            let isGrouped = groups.length > 0;
            this.setState({ isGrouped });
        }
        this.onGroupToggle = () => {
            this.setState((prevState) => ({ isGrouped: !prevState.isGrouped }));
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
            if (added && ((this.props.collection !== constants.Users && added[0].keys.length > 0) || ('username' in added[0] && 'password' in added[0]))) {
                const modRows = rows.map(row => {
                    row['id'] = row['id'] + 1;
                    return row;
                });
                added[0]['id'] = 0;
                modRows.unshift(added[0]);
                rows = modRows;
                this.props.setAndCommitTransaction(transactionType.modify, this.props.collection, added[0]);
            }
            if (changed) {
                rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
                this.setAndCommitTransaction(transactionType.modify, this.props.collection, changed);
            }
            this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
        };
        //#endregion
        //#region Misc Handlers
        this.deleteRows = (rows, prevRows) => this.setState((prevState) =>
            ({ rows, prevRows: prevRows || prevState.prevRows, deletingRows: [] }));
        this.changeColumnOrder = (order) => {
            this.setState({ columnOrder: order });
        };
        this.getRowId = row => row.id;
        //#endregion
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ rows: nextProps.rows, prevRows: nextProps.prevRows });
    }
    render() {
        const { columns, setAndCommitTransaction, collection,
            readOnly, displayFilter } = this.props;
        const { rows,
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
                    {!readOnly && <FilteringState />}
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
                {!readOnly && <DeleteDialog setAndCommitTransaction={setAndCommitTransaction} deletingRows={deletingRows}
                    deleteRows={this.deleteRows} collection={collection} rows={rows} columns={columns} />}
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(GridContainer);
