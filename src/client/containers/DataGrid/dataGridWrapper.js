import DataGrid from '../../components/UI/DataGrid/dataGrid'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/entity'
import { getFormattedColumns } from '../../shared/utility';
const mapStateToProps = (state, ownProps) => {
    const { columns, collection, readOnly, searchCriteria } = ownProps;
    let formattedColumns=[];
    let readOnlyProp=false;
    if(readOnly!==undefined)
        readOnlyProp=readOnly;
    if(columns)
        formattedColumns= getFormattedColumns(columns);
    else
        formattedColumns = getFormattedColumns(state[collection].columns);
    let { loading, rows, error, message } = state[collection];
    return { loading, rows, columns: formattedColumns, error, message, collection, readOnly:readOnlyProp, searchCriteria };
}
const mapDispatchToProps = { ...actions };
export const DataGridWrapper = connect(mapStateToProps, mapDispatchToProps)(DataGrid);