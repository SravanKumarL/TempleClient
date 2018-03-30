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
    Management:'Management'
}
const ManagementReport=['pooja','amount'];
const PoojaReport=['names','gothram','nakshatram'];
const AccountReport=['names','id','pooja','amount','chequeNo','bankName','createdDate'];
exports.Constants=constants;
exports.reportMapping={
    'Accounts':AccountReport,
    'Pooja':PoojaReport,
    'Management':ManagementReport
}
exports.ManagementReport=ManagementReport;
exports.PoojaReport=PoojaReport;
exports.AccountReport=AccountReport;