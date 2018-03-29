import * as actionTypes from './actionTypes';
export const commitTransaction=(type,collection,change)=>{
    return {type:actionTypes.commitTransaction,payload:{type,change,collection}}
}
export const fetchData=(collection)=>{
    return {type:actionTypes.fetchData,payload:{collection}};
}
export const fetchSchema=(collection)=>{
    return {type:actionTypes.fetchSchema,payload:{collection}};
}
export const onFetchReq=()=>{
    return {type:actionTypes.onFetchReq,payload:{loading:true,rows:[]}};
}
export const onFetchSuccess=(rows)=>{
    return {type:actionTypes.onFetchSuccess,payload:{loading:false,rows}};
}
export const onFetchSchemaSuccess=(columns)=>{
    return {type:actionTypes.onFetchSchemaSuccess,payload:{loading:false,columns}};
}
export const onFetchFailed=(error)=>{
    return {type:actionTypes.onFetchFailed,payload:{error}};
}
export const onTransactionFailed=(error)=>{
    return {type:actionTypes.onTransactionFailed,payload:{error}};
}
export const onTransactionCommitted=(message)=>{
    return {type:actionTypes.onTransactionCommitted,payload:{message}};
}
export const onTransactionCommitReq=()=>{
    return {type:actionTypes.onTransactionCommitReq};
}