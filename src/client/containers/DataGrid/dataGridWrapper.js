import DataGrid from '../../components/UI/DataGrid/dataGrid'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/entity'
import { getFormattedColumns } from '../../shared/utility';
const mapStateToProps=(state,ownProps)=>{
    const {columns,collection}=ownProps;
    let formattedColumns =getFormattedColumns(columns);
    let {loading,rows,error,message}=state.entity;
    return {loading,rows,columns:formattedColumns,error,message,collection};
}
const mapDispatchToProps = {...actions};
export const DataGridWrapper = connect(mapStateToProps,mapDispatchToProps)(DataGrid);