import DataGrid from '../../components/UI/DataGrid/dataGrid'
import createContainer from '../../hoc/createContainer/createContainer';
import { getFormattedColumns, convertToStartCase } from '../../shared/utility';

const mapStateToProps = (state, ownProps) => {
    const { columns, collection, readOnly, searchCriteria, title } = ownProps;
    let formattedColumns = [];
    let readOnlyProp = false;
    if (readOnly !== undefined)
        readOnlyProp = readOnly;
    if (columns)
        formattedColumns = getFormattedColumns(columns);
    else
        formattedColumns = getFormattedColumns(state[collection].columns);
    let { loading, rows, error, message, printReq, totalCount } = state[collection];
    formattedColumns = formattedColumns.map(column => ({ ...column, title: convertToStartCase(column.title) }));
    return {
        loading, rows, columns: formattedColumns, error, message, collection, title,
        readOnly: readOnlyProp, searchCriteria, printReq, totalCount
    };
}

export default createContainer(DataGrid, mapStateToProps);