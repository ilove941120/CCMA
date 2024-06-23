try {
    
} 
catch(err) {
    return SendError(res,err.message) 
}


                    //#region 获取最新插入的ID
                    let result
                    var GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                    try {
                        result = await query(GetInsertedId);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 


                    //#region 執行
                    try {
                        const result = await query(sql, params);
                        SendSuccess(res,"",result)
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 


                if(!basic(req,res)) return
