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

    //#region BAS_CompanyDate   --公司相關 查看,新增,修改,刪除
    const GetCompanyDate = (req) => {
        return axios.post(`/api/sys/GetCompanyDate`,req)
    }
    const UpdateCompanyDate = (req) => {
        return axios.post(`/api/sys/UpdateCompanyDate`, req)
    }
    const DeleteCompanyDate = (req) => {
        return axios.post(`/api/sys/DeleteCompanyDate`, req)
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
        return axios.post(`/api/oms/GetDepartment`,req)
    }
    const AddDepartment = (req) => {
        return axios.post(`/api/oms/AddDepartment`, req)
    }
    const UpdateDepartment = (req) => {
        return axios.post(`/api/oms/UpdateDepartment`, req)
    }
    const DeleteDepartment = (req) => {
        return axios.post(`/api/oms/DeleteDepartment`, req)
    }
    //#endregion

    //#region BAS_Staff         --人員相關 查看,新增,修改,刪除
    const GetStaff = (req) => {
        return axios.post(`/api/oms/GetStaff`,req)
    }
    const AddStaff = (req) => {
        return axios.post(`/api/oms/AddStaff`, req)
    }
    const UpdateStaff = (req) => {
        return axios.post(`/api/oms/UpdateStaff`, req)
    }
    const DeleteStaff = (req) => {
        return axios.post(`/api/oms/DeleteStaff`, req)
    }
    //#endregion

    //#region Warehouse         --庫別相關 查看,新增,修改,刪除
    const GetWarehouse = (req) => {
        return axios.post(`/api/oms/GetWarehouse`,req)
    }
    const AddWarehouse = (req) => {
        return axios.post(`/api/oms/AddWarehouse`, req)
    }
    const UpdateWarehouse = (req) => {
        return axios.post(`/api/oms/UpdateWarehouse`, req)
    }
    const DeleteWarehouse = (req) => {
        return axios.post(`/api/oms/DeleteWarehouse`, req)
    }
    //#endregion

    //#region Unit              --單位相關 查看,新增,修改,刪除
    const GetUnit = (req) => {
        return axios.post(`/api/oms/GetUnit`, req)
    }
    const AddUnit = (req) => {
        return axios.post(`/api/oms/AddUnit`, req)
    }
    const UpdateUnit = (req) => {
        return axios.post(`/api/oms/UpdateUnit`, req)
    }
    const DeleteUnit = (req) => {
        return axios.post(`/api/oms/DeleteUnit`, req)
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
    const UpdateMtlItemStatus = (req) => {
        return axios.post(`/api/oms/UpdateMtlItemStatus`, req)
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

    
//#endregion 

//#region Cyy官網編輯器
    //#region Banner
    const UpdateCyyBanner = (req) => {
        return axios.post(`/api/sys/UpdateCyyBanner`, req)
    }
    //#endregion 

    //#region About
    const UpdateCyyAbout = (req) => {
        return axios.post(`/api/sys/UpdateCyyAbout`, req)
    }
    //#endregion 

    //#region Product
    const UpdateCyyProduct = (req) => {
        return axios.post(`/api/sys/UpdateCyyProduct`, req)
    }
    //#endregion 

    //#region Serve
    const UpdateCyyServe = (req) => {
        return axios.post(`/api/sys/UpdateCyyServe`, req)
    }
    //#endregion 

    //#region Footer
    const UpdateCyyFooter = (req) => {
        return axios.post(`/api/sys/UpdateCyyFooter`, req)
    }
    //#endregion 
//#endregion 

//#region web官網 GetCyyIndexContent
const GetCyyIndexContent= (req) => {
    return axios.post(`/api/web/GetCyyIndexContent`, req)
}
const GetCyyWebBanner= (req) => {
    return axios.post(`/api/web/GetCyyWebBanner`, req)
}
const UpdateCyyWebBanner = (req) => {
    return axios.post(`/api/web/UpdateCyyWebBanner`, req)
}
const DeletCyyWebBanner = (req) => {
    return axios.post(`/api/web/DeletCyyWebBanner`, req)
}
const UpdateCyyWebAbout = (req) => {
    return axios.post(`/api/web/UpdateCyyWebAbout`, req)
}
const DeletCyyWebAbout = (req) => {
    return axios.post(`/api/web/DeletCyyWebAbout`, req)
}
const UpdateCyyWebFooter = (req) => {
    return axios.post(`/api/web/UpdateCyyWebFooter`, req)
}
const DeletCyyWebFooter = (req) => {
    return axios.post(`/api/web/DeletCyyWebFooter`, req)
}
const AddCyyProduct = (req) => {
    return axios.post(`/api/web/AddCyyProduct`, req)
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

//#region 
//#endregion 

export {
    GetLogin,
    GetSystem, AddSystem, UpdateSystem, DeleteSystem,
    GetModal, AddModal, UpdateModal, DeleteModal,
    GetComponent, AddComponent, UpdateComponent, DeleteComponent,
    GetType, AddType, UpdateType, DeleteType,
    GetStatus, AddStatus, UpdateStatus, DeleteStatus,
    GetCompany, AddCompany, UpdateCompany, DeleteCompany,
    GetCompanyDate, UpdateCompanyDate, DeleteCompanyDate,

    GetDepartment, AddDepartment, UpdateDepartment, DeleteDepartment,
    GetStaff, AddStaff, UpdateStaff, DeleteStaff,
    GetWarehouse, AddWarehouse, UpdateWarehouse, DeleteWarehouse,
    GetUnit, AddUnit, UpdateUnit, DeleteUnit,
    GetMtlItem, AddMtlItem, UpdateMtlItem, UpdateMtlItemStatus, DeleteMtlItem,

    GetCompanyWeb, AddCompanyWeb, UpdateCompanyWeb, DeleteCompanyWeb,
    GetCompanyPhoto, AddCompanyPhoto, UpdateCompanyPhoto, DeleteCompanyPhoto,
    GetCyyWebBanner,
    UpdateCyyWebBanner,DeletCyyWebBanner,
    UpdateCyyWebAbout,DeletCyyWebAbout,
    UpdateCyyWebFooter,DeletCyyWebFooter,
    GetCyyIndexContent,
    UpdateCyyAbout, UpdateCyyProduct, UpdateCyyServe, UpdateCyyFooter,
    AddCyyProduct,
    
    GetMenuModal,
    GetTransaction, AddTransaction
}