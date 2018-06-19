const constants={
    delete:'delete',
    add:'add',
    edit:'edit',
    get:'get',
    Poojas:'poojas',
    Transactions:'transactions',
    Reports:'reports', 
    Schema:'schema',
    Accounts:'Accounts',
    Pooja:'Pooja',
    Management:'Management',
    Users:'users'
}

export const transactionType = {
    fetch: {
        schema: 'schema',
        data: 'data'
    },
    modify: 'modify'
}

export const uniqueProp = collection => collection === constants.Users ? 'username' : 'id';

export const ManagementReport = ['pooja','total poojas','total amount'];
export const PoojaReport=['names','gothram','nakshatram','pooja'];
export const AccountReport=['names','id','pooja','amount','chequeNo','bankName','createdDate'];
export default constants;
export const reportMapping={
    'Accounts':AccountReport,
    'Pooja':PoojaReport,
    'Management':ManagementReport
}