import DataGrid from '../../components/UI/DataGrid/dataGrid'
import createContainer from '../../hoc/createContainer/createContainer';
import { getFormattedColumns } from '../../shared/utility';

const mapStateToProps = (state, ownProps) => {
    const { columns, collection, readOnly, searchCriteria } = ownProps;
    let formattedColumns = [];
    let readOnlyProp = false;
    if (readOnly !== undefined)
        readOnlyProp = readOnly;
    if (columns)
        formattedColumns = getFormattedColumns(columns);
    else
        formattedColumns = getFormattedColumns(state[collection].columns);
    let { loading, rows, error, message } = state[collection];
    return { loading, rows, columns: formattedColumns, error, message, collection, readOnly: readOnlyProp, searchCriteria };
}

export default createContainer(DataGrid, mapStateToProps);