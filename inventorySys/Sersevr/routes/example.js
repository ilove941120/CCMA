    //#region  CyyProduct相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetCyyProduct', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, MtlItemId, ProductName,ShowNum,Index} = req.body;
                let conditions = []; //條件查詢容器
                let params = []; //參數容器
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 基本查詢
                    var baseQuery = `SELECT b.Total
                                        ,a.CpdId SelectId ,a1.MtlItemNo SelectNo ,a.ProductName SelectName                 
                                        ,a.* 
                                        FROM WEB_CyyProduct a
                                        INNER JOIN CM_MtlItem a1 on a.MtlItemId = a1.MtlItemId
                                        JOIN (
                                            SELECT COUNT('CpdId') Total FROM WEB_CyyProduct 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.CpdId = ?");
                        params.push(Id);
                    }
                    if (MtlItemId > 0) {
                        conditions.push("a.MtlItemId = ?");
                        params.push(MtlItemId);
                    }
                    if (ProductName) {
                        conditions.push("a.ProductName LIKE ?");
                        params.push('%' + ProductName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.CpdId'`
                    if(ShowNum >0 && Index >=0){
                        sql += " LIMIT ? OFFSET ?";
                        params.push(ShowNum);
                        params.push(Index);
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
                });
                //#endregion 
            }
            catch(queryError){
                console.error("Query Error:", queryError.message);
                res.status(400).send({ status: 'error', msg:queryError.message });
            }
        })
        //#endregion 

        //#region 新增
        router.post('/  ', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {CwId, MtlItemId, ProductName, ProductText, ProductAmount, GroupSetting
                    ,PhotoName ,PhotoDesc, PhotoHref} = req.body;
                let checkSql
                let sql
                let resultCheck
                let result
                //#endregion 

                //#region 參數檢查
                if (CwId <= 0) throw new Error('【官網】不可以為空'); 
                if (MtlItemId <= 0) throw new Error('【品號】不可以為空'); 

                if (ProductName.length > 1000) throw new Error('【產品名稱】不可以超過1000個字元')
                if (ProductName.length <= 0) throw new Error('【產品名稱】不可以為空'); 
                if (ProductText.length > 1000) throw new Error('【產品文案】不可以超過1000個字元')
                if (ProductText.length <= 0) throw new Error('【產品文案】不可以為空')
                if (ProductAmount < 0) throw new Error('【產品金額】不可以為負')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 官網是否存在
                    checkSql = `SELECT CwId
                                FROM WEB_CompanyWeb
                                WHERE 1=1
                                AND CwId = ?
                                LIMIT 1`
                    try {
                        resultCheck = await checkQuery(checkSql, [CwId]);
                        if (resultCheck.length > 0) return SendError(res,'【官網】不存在,請重新確認') 
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 品號是否存在
                    checkSql = `SELECT CyyProductNo
                                FROM CM_MtlItem
                                WHERE 1=1
                                AND MtlItemId = ?
                                LIMIT 1`
                    try {
                        resultCheck = await checkQuery(checkSql, [MtlItemId]);
                        if (resultCheck.length > 0) return SendError(res,'【品號】不存在,請重新確認') 
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    //#region 產品新增
                    sql = `INSERT INTO WEB_CyyProduct 
                                (CwId ,MtlItemId ,ProductName ,ProductText ,ProductAmount ,GroupSetting
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,? ,? ,? ,?
                                    ,? ,? ,? ,?)`;
                    try {
                        await query(sql, [CwId, MtlItemId, ProductName, ProductText, ProductAmount, GroupSetting
                            ,currentTime,currentTime,currentUser,currentUser]);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#region 取得最新插入的ID
                    let CpdId
                    var GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                    try {
                        result = await query(GetInsertedId);
                        result.foreach(()=>{
                            CpdId = item.id
                        })
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#endregion 
                    
                    //#region 產品圖片新增
                    sql = `INSERT INTO WEB_CompanyPhoto 
                            (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                            VALUES
                            (? ,? ,? ,?
                                ,? ,? ,? ,?)`;
                    try {
                        await query(sql, [currentCompany, PhotoName, PhotoDesc, PhotoHref
                            ,currentTime,currentTime,currentUser,currentUser]);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#region 取得最新插入的ID
                    let CpId
                    var GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                    try {
                        result = await query(GetInsertedId);
                        result.foreach(()=>{
                            CpId = item.id
                        })
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 
                    
                    //#endregion 
                    
                    //#region 產品圖片群集新增
                    sql = `INSERT INTO WEB_CyyProductPhoto 
                            (CpdId ,PhotoId ,MainSeting
                                ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                            VALUES
                            (? ,? ,?
                                ,? ,? ,? ,?)`;
                    try {
                        await query(sql, [CpdId, CpId, 'Y'
                            ,currentTime,currentTime,currentUser,currentUser]);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#endregion 

                    //#region commit段
                    CommitRun("add",connection,res,CpdId)
                    //#endregion 
                });
                //#endregion 
            }
            catch(queryError){
                console.error("Query Error:", queryError.message);
                res.status(400).send({ status: 'error', msg:queryError.message });
            }
        });
        //#endregion 

        //#region 更新
        router.post('/UpdateCyyProduct', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, CyyProductName, CyyProductDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【庫別Id】不可以為空')
                if (CyyProductName.length > 30) throw new Error('【庫別名字】不可以超過30個字元')
                if (CyyProductName.length <= 0) throw new Error('【庫別名字】不可以為空')
                if (CyyProductDesc.length > 100) throw new Error('【庫別描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT CyyProductId
                                        FROM WEB_CyyProduct
                                        WHERE 1=1
                                        AND CyyProductId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【庫別不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE WEB_CyyProduct set 
                                CyyProductName = ?
                                ,CyyProductDesc = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND CyyProductId = ?
                                `
                    try {
                        await query(sql, [CyyProductName, CyyProductDesc, currentTime,currentUser, Id]);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region commit段
                    CommitRun("update",connection,res,"")
                    //#endregion 
                });
                //#endregion 
            }
            catch(queryError){
                console.error("Query Error:", queryError.message);
                res.status(400).send({ status: 'error', msg:queryError.message });
            }
        })
        //#endregion 

        //#region 刪除
        router.post('/DeleteCyyProduct', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {CyyProductId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (CyyProductId <= 0) throw new Error('【庫別】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT CyyProductId
                                        FROM WEB_CyyProduct
                                        WHERE 1=1
                                        AND CyyProductId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [CyyProductId]);
                        if (resultCheck.length <= 0) return SendError(res,'【庫別不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM WEB_CyyProduct 
                                WHERE 1=1
                                AND CyyProductId = ? `
                    try {
                        await query(sql, [CyyProductId]);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region commit段
                    CommitRun("delete",connection,res,"")
                    //#endregion 
                });
                //#endregion 
            }
            catch(queryError){
                console.error("Query Error:", queryError.message);
                res.status(400).send({ status: 'error', msg:queryError.message });
            }
        })
        //#endregion 
        
    //#endregion 
