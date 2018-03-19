import * as actionTypes from './actiontypes';
export const commitTransaction=(type,collection,rows,change)=>{
    return {type:actionTypes.commitTransaction,payload:{rows,type,change,collection}}
}
export const fetchData=(collection)=>{
    return {type:actionTypes.fetchData,payload:{collection}};
}
export const onFetchReq=()=>{
    return {type:actionTypes.onFetchReq,payload:{loading:true,rows:[]}};
}
export const onFetchSuccess=(rows)=>{
    return {type:actionTypes.onFetchSuccess,payload:{loading:false,rows}};
}
export const onFetchFailed=(error)=>{
    return {type:actionTypes.onFetchSuccess,payload:{error}};
}
export const onTransactionFailed=(error)=>{
    return {type:actionTypes.onTransactionFailed,payload:{error}};
}
export const onTransactionCommitted=(rows,message)=>{
    return {type:actionTypes.onTransactionCommitted,payload:{rows,message}};
}
export const onTransactionCommitReq=()=>{
    return {type:actionTypes.onTransactionCommitReq};
}