import React from 'react';
import {
  SortingState, EditingState, PagingState, FilteringState, IntegratedSelection,
  IntegratedPaging, IntegratedSorting, IntegratedFiltering, GroupingState, IntegratedGrouping, SelectionState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFilterRow, ColumnChooser, TableSelection, TableGroupRow,
  PagingPanel, DragDropProvider, TableColumnReordering, TableColumnVisibility, GroupingPanel, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { TableCell } from 'material-ui/Table';
import ErrorSnackbar from '../Snackbar/errorSnackBar';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import { withStyles } from 'material-ui/styles';
import constants from '../../../../store/sagas/constants';
import LoadingGrid from './loadingGrid';

const styles = theme => ({
  lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
});

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Create new row"
    >
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => (
    <TableCell
      className={classes.lookupEditCell}
    >
      <Select
        value={value}
        onChange={event => onValueChange(event.target.value)}
        input={
          <Input
            classes={{ root: classes.inputRoot }}
          />
        }
      >
        {availableColumnValues.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </TableCell>
  );
export const LookupEditCell = withStyles(styles, { name: 'DataGrid' })(LookupEditCellBase);

const Cell = (props) => {
  // if (props.column.name === 'discount') {
  //   return <ProgressBarCell {...props} />;
  // }
  // if (props.column.name === 'amount') {
  //   return <HighlightedCell {...props} />;
  // }
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  // const availableColumnValues = availableValues[props.column.name];
  // if (availableColumnValues) {
  //   return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
  // }
  return <TableEditRow.Cell {...props} />;
};
const EditRow = (props) => {
  return <TableEditRow.Row {...props} key={props.row.id} />
}
// const groupCell = (props) => {
//   // return <TableGroupRow.Cell {...props} onToggle={onGroupToggle}/>;
//   return <TableGroupRow.Cell {...props} key={props.row.key} />
// }
const Row = (props) => {
  return <Table.Row {...props} key={props.row.id} />;
}

const getRowId = row => row.id;
class DataGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // tableColumnExtensions: [
      //   { columnName: 'amount', align: 'right' },
      // ],
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
    this.handleGroupingChange = (groups) => {
      let isGrouped = groups.length > 0;
      this.setState({ isGrouped });
    }
    this.onGroupToggle = () => {
      this.setState((prevState, props) => { return { ...prevState, isGrouped: !prevState.isGrouped }; });
    }
    this.setAndCommitTrans = (transaction) => {
      transaction();
      this.setState({ transaction });
    }
    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    // this.changeAddedRows = addedRows => this.setState({
    //   addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
    //     amount: 0,
    //     discount: 0,
    //     saleDate: new Date().toISOString().split('T')[0],
    //     product: availableValues.product[0],
    //     region: availableValues.region[0],
    //     customer: availableValues.customer[0],
    //   })),
    // });
    this.changeRowChanges = rowChanges => this.setState({ rowChanges });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      this.setState({ prevRows: rows });
      if (added) {
        const modRows = rows.map(row => {
          row['id'] = row['id'] + 1;
          return row;
        });
        added[0]['id'] = 0;
        modRows.unshift(added[0]);
        rows = modRows;
        // const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
        // rows = [
        //   ...rows,
        //   ...added.map((row, index) => ({
        //     id: startingAddedId + index,
        //     ...row,
        //   })),
        // ];
        this.setAndCommitTrans(() => this.props.commitTransaction(constants.add, this.props.collection, added[0]));
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        this.setAndCommitTrans(() => this.props.commitTransaction(constants.edit, this.props.collection, changed));
      }
      this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };
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
      this.setAndCommitTrans(() => this.props.commitTransaction(constants.delete, this.props.collection, this.state.deletingRows[0]));
      this.setState({ rows, deletingRows: [] });
    };
    this.changeColumnOrder = (order) => {
      this.setState({ columnOrder: order });
    };
    this.onSnackBarClose = () => this.setState({ snackBarOpen: false });
  }
  componentDidMount() {
    this.setAndCommitTrans(() => this.props.fetchSchema(this.props.collection, this.props.searchCriteria));
    this.setAndCommitTrans(() => this.props.fetchData(this.props.collection, this.props.searchCriteria));
  }
  componentWillReceiveProps(nextProps) {
    const { rows, error, message } = nextProps;
    if (error === '')
      this.setState({ transaction: null });
    if (rows !== undefined)
      this.setState({ rows, prevRows: rows });
    else
      this.setState({ rows: this.state.prevRows });
    if (message !== '' || error !== '')
      this.setState({ snackBarOpen: true });
    else
      this.setState({ snackBarOpen: false });
  }
  // componentWillUpdate(nextProps, nextState) {
  //   if(nextState.snackBarOpen && nextProps.error!=='')
  //     this.setState({ recommit:true });
  // }
  render() {
    const {
      classes, loading, columns, error, message, readOnly
    } = this.props;
    const {
      // tableColumnExtensions,
      rows,
      sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      currentPage,
      deletingRows,
      pageSize,
      pageSizes,
      columnOrder,
      isGrouped,
      transaction
    } = this.state;
    let snackBarMsg = message !== '' ? message : error;
    return (
      loading ? <LoadingGrid columns={columns} /> :
        <Paper>
          <Grid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
          >
            <FilteringState />
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
            <IntegratedFiltering />
            {!readOnly && <IntegratedSelection />}
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
            {/* <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
            rowComponent={Row}
          /> */}
            {!readOnly && <TableSelection showSelectionColumn={!isGrouped} />}
            <TableColumnReordering
              order={columnOrder}
              onOrderChange={this.changeColumnOrder}
            />

            <TableHeaderRow showSortingControls />
            <TableFilterRow />
            {isGrouped ? <TableGroupRow /> :
              (!readOnly && <TableEditRow
                cellComponent={EditCell} row={EditRow}
              />)}
            {(!isGrouped && !readOnly) &&
              <TableEditColumn
                width={120}
                showAddCommand={!addedRows.length}
                showEditCommand
                showDeleteCommand
                commandComponent={Command}
              />}
            <TableColumnVisibility />
            <PagingPanel
              pageSizes={pageSizes}
            />
            <Toolbar />
            {!readOnly && <GroupingPanel showSortingControls />}
            <ColumnChooser />
          </Grid>
          {!readOnly && <Dialog
            open={!!deletingRows.length}
            onClose={this.cancelDelete}
            classes={{ paper: classes.dialog }}
          >
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure to delete the following row?
            </DialogContentText>
              <Paper>
                <Grid
                  rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
                  columns={columns}
                >
                  <Table cellComponent={Cell} />
                  {/* <Table
                  columnExtensions={tableColumnExtensions}
                  cellComponent={Cell}
                /> */}
                  <TableHeaderRow />
                </Grid>
              </Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
              <Button onClick={this.deleteRows} color="secondary">Delete</Button>
            </DialogActions>
          </Dialog>}
          <ErrorSnackbar message={snackBarMsg} open={this.state.snackBarOpen} redoTransaction={transaction}
            onSnackBarClose={this.onSnackBarClose} />
        </Paper>
    );
  }
}

export default withStyles(styles, { name: 'DataGrid' })(DataGrid);