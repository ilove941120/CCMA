//#region BAS_Staff    --人員相關 查看,新增,修改,刪除
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
