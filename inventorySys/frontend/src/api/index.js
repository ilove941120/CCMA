import axios from 'axios'

//#region sys系統管理
    //#region BAS_System        --系統相關 查看,新增,修改,刪除
    const GetSystem = (req) => {
        return axios.post(`/api/sys/GetSystem`,req)
    }
    const AddSystem = (req) => {
        return axios.post(`/api/sys/AddSystem`, req)
    }
    const UpdateSystem = (req) => {
        return axios.post(`/api/sys/UpdateSystem`, req)
    }
    const DeleteSystem = (req) => {
        return axios.post(`/api/sys/DeleteSystem`, req)
    }
    //#endregion

    //#region BAS_Modal         --模組相關 查看,新增,修改,刪除
    const GetModal = (req) => {
        return axios.post(`/api/sys/GetModal`,req)
    }
    const AddModal = (req) => {
        return axios.post(`/api/sys/AddModal`, req)
    }
    const UpdateModal = (req) => {
        return axios.post(`/api/sys/UpdateModal`, req)
    }
    const DeleteModal = (req) => {
        return axios.post(`/api/sys/DeleteModal`, req)
    }
    //#endregion
    
    //#region BAS_Component     --組件相關 查看,新增,修改,刪除
    const GetComponent = (req) => {
        return axios.post(`/api/sys/GetComponent`,req)
    }
    const AddComponent = (req) => {
        return axios.post(`/api/sys/AddComponent`, req)
    }
    const UpdateComponent = (req) => {
        return axios.post(`/api/sys/UpdateComponent`, req)
    }
    const DeleteComponent = (req) => {
        return axios.post(`/api/sys/DeleteComponent`, req)
    }
    //#endregion

    //#region BAS_Type          --類別相關 查看,新增,修改,刪除
    const GetType = (req) => {
        return axios.post(`/api/sys/GetType`,req)
    }
    const AddType = (req) => {
        return axios.post(`/api/sys/AddType`, req)
    }
    const UpdateType = (req) => {
        return axios.post(`/api/sys/UpdateType`, req)
    }
    const DeleteType = (req) => {
        return axios.post(`/api/sys/DeleteType`, req)
    }
    //#endregion
   
    //#region BAS_Status        --狀態相關 查看,新增,修改,刪除
    const GetStatus = (req) => {
        return axios.post(`/api/sys/GetStatus`,req)
    }
    const AddStatus = (req) => {
        return axios.post(`/api/sys/AddStatus`, req)
    }
    const UpdateStatus = (req) => {
        return axios.post(`/api/sys/UpdateStatus`, req)
    }
    const DeleteStatus = (req) => {
        return axios.post(`/api/sys/DeleteStatus`, req)
    }
    //#endregion

    //#region BAS_Company       --公司相關 查看,新增,修改,刪除
    const GetCompany = (req) => {
        return axios.post(`/api/sys/GetCompany`,req)
    }
    const AddCompany = (req) => {
        return axios.post(`/api/sys/AddCompany`, req)
    }
    const UpdateCompany = (req) => {
        return axios.post(`/api/sys/UpdateCompany`, req)
    }
    const DeleteCompany = (req) => {
        return axios.post(`/api/sys/DeleteCompany`, req)
    }
    //#endregion

    //#region GetMenuModal      --取得列表模組+組件層
    const GetMenuModal = (req) => {
        return axios.post(`/api/sys/GetMenuModal`,req)
    }
    //#endregion 

    //#region GetLogin          --登入
    const GetLogin = (req) => {
        return axios.post(`/api/sys/GetLogin`,req)
    }
    //#endregion 
//#endregion

//#region oms營運管理系統
    //#region BAS_Department    --部門相關 查看,新增,修改,刪除
    const GetDepartment = (req) => {
        return axios.post(`/api/GetDepartment`,req)
    }
    const AddDepartment = (req) => {
        return axios.post(`/api/AddDepartment`, req)
    }
    const UpdateDepartment = (req) => {
        return axios.post(`/api/UpdateDepartment`, req)
    }
    const DeleteDepartment = (DepartmentId) => {
        return axios.post(`/api/DeleteDepartment?DepartmentId=${DepartmentId}`)
    }
    //#endregion

    //#region BAS_Staff         --人員相關 查看,新增,修改,刪除
    const GetStaff = (req) => {
        return axios.post(`/api/GetStaff`,req)
    }
    const AddStaff = (req) => {
        return axios.post(`/api/AddStaff`, req)
    }
    const UpdateStaff = (req) => {
        return axios.post(`/api/UpdateStaff`, req)
    }
    const DeleteStaff = (StaffId) => {
        return axios.post(`/api/DeleteStaff?StaffId=${StaffId}`)
    }
    //#endregion

    //#region Warehouse         --庫別相關 查看,新增,修改,刪除
    const GetWarehouse = (req) => {
        return axios.post(`/api/GetWarehouse`,req)
    }
    const AddWarehouse = (req) => {
        return axios.post(`/api/AddWarehouse`, req)
    }
    const UpdateWarehouse = (req) => {
        return axios.post(`/api/UpdateWarehouse`, req)
    }
    const DeleteWarehouse = (WarehouseId) => {
        return axios.post(`/api/DeleteWarehouse?WarehouseId=${WarehouseId}`)
    }
    //#endregion

    //#region Unit              --單位相關 查看,新增,修改,刪除
    const GetUnit = (req) => {
        return axios.post(`/api/GetUnit`, req)
    }
    const AddUnit = (req) => {
        return axios.post(`/api/AddUnit`, req)
    }
    const UpdateUnit = (req) => {
        return axios.post(`/api/UpdateUnit`, req)
    }
    const DeleteUnit = (UnitId) => {
        return axios.post(`/api/DeleteUnit?UnitId=${UnitId}`)
    }
    //#endregion

    //#region MtlItem           --品號相關 查看,新增,修改,刪除
    const GetMtlItem = (req) => {
        return axios.post(`/api/oms/GetMtlItem`,req)
    }
    const AddMtlItem = (req) => {
        return axios.post(`/api/oms/AddMtlItem`, req)
    }
    const UpdateMtlItem = (req) => {
        return axios.post(`/api/oms/UpdateMtlItem`, req)
    }
    const DeleteMtlItem = (req) => {
        return axios.post(`/api/oms/DeleteMtlItem`, req)
    }
    //#endregion

//#endregion

//#region web官網

    //#region WEB_CompanyWeb 官網圖片資料庫
    const GetCompanyWeb  = (req) => {
        return axios.post(`/api/web/GetCompanyWeb `, req)
    }
    const AddCompanyWeb  = (req) => {
        return axios.post(`/api/web/AddCompanyWeb `, req)
    }
    const UpdateCompanyWeb  = (req) => {
        return axios.post(`/api/web/UpdateCompanyWeb `, req)
    }
    const DeleteCompanyWeb  = (req) => {
        return axios.post(`/api/web/DeleteCompanyWeb `, req)
    }
    //#endregion oms營運管理系統

    //#region WEB_CompanyPhoto 官網圖片資料庫
    const GetCompanyPhoto = (req) => {
        return axios.post(`/api/web/GetCompanyPhoto`, req)
    }
    const AddCompanyPhoto = (req) => {
        return axios.post(`/api/web/AddCompanyPhoto`, req)
    }
    const UpdateCompanyPhoto = (req) => {
        return axios.post(`/api/web/UpdateCompanyPhoto`, req)
    }
    const DeleteCompanyPhoto = (req) => {
        return axios.post(`/api/web/DeleteCompanyPhoto`, req)
    }
    //#endregion oms營運管理系統
//#endregion oms營運管理系統

//#region web官網
const GetImg = (req) => {
    return axios.post(`/api/sys/GetImg`, req)
}
const AddImg = (req) => {
    return axios.post(`/api/sys/AddImg`, req)
}
const DeletImg = (req) => {
    return axios.post(`/api/sys/DeletImg`, req)
}
//#endregion oms營運管理系統

//#region Transaction--交易相關 查看,新增,修改,刪除
    const GetTransaction = (MtlItemId) => {
        return axios.get(`/api/GetTransaction?MtlItemId=${MtlItemId}`)
    }
    const AddTransaction = (req) => {
        return axios.post(`/api/AddTransaction`, req)
    }
//#endregion


export {
    GetLogin,
    GetSystem, AddSystem, UpdateSystem, DeleteSystem,
    GetModal, AddModal, UpdateModal, DeleteModal,
    GetComponent, AddComponent, UpdateComponent, DeleteComponent,
    GetType, AddType, UpdateType, DeleteType,
    GetStatus, AddStatus, UpdateStatus, DeleteStatus,
    GetCompany, AddCompany, UpdateCompany, DeleteCompany,

    GetDepartment, AddDepartment, UpdateDepartment, DeleteDepartment,
    GetStaff, AddStaff, UpdateStaff, DeleteStaff,
    GetWarehouse, AddWarehouse, UpdateWarehouse, DeleteWarehouse,
    GetUnit, AddUnit, UpdateUnit, DeleteUnit,
    GetMtlItem, AddMtlItem, UpdateMtlItem, DeleteMtlItem,

    GetCompanyWeb , AddCompanyWeb , UpdateCompanyWeb , DeleteCompanyWeb ,
    GetCompanyPhoto, AddCompanyPhoto, UpdateCompanyPhoto, DeleteCompanyPhoto,

    GetMenuModal,
    GetTransaction, AddTransaction,
    GetImg,AddImg,DeletImg
}