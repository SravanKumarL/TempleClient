import DataGridContainer from '../../components/UI/DataGrid/DataGridContainer'
import createContainer from '../../hoc/createContainer/createContainer';
import sharedMapStateToProps from './sharedMapStateToProps';
export default createContainer(DataGridContainer, sharedMapStateToProps);