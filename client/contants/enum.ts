export enum Status {
    wait = 1,   // trans
    inventoryted= 2,   // trans 
    gatherChecked = 3,  // gather
    gatherSend = 4,   // gather 
    gatherPassGatherCheck = 5,  // another gather
    gatherSendTrans = 6,  // another gather
    gatherPassTransCheck = 7,  // another trans
    transSendUser = 8, // another trans
    transporting = 9,  // user
    done = 10,  // user 
    paynot = 11, // user
    cancel = 12,// user
    notdone = 13,
    forget = 14, // user
    
    
}


export enum Career {
    employeeTrans = "EmTrans",
    employeeGather = "EmGather",
    managerTrans = "MaTrans",
    magegerGather = "MaGather",
    owner = "owner",
    customer = ""
}

export enum TypeAdd {
    new = 1,
    old = 0,
}

export enum PathRoot {
    EmployeeTrans = "/employeeTrans",
    EmployeeGather = "/employeeGather",
    ManagerTrans = "/manageTrans",
    ManangerGather = "/manageGather",
    Owner = "/owner",
    user = "",

}


export enum SearchColumns {
    description = "description",
    name = "name"
    
}
