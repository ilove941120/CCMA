//#region  CompanyDate相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetCompanyDate', (req, res) => {
            try{
                //#region 宣告前端參數
                if(!basic(req,res)) return
                const {Id, CompanyDateNo, CompanyDateName,ShowNum,Index} = req.body;
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
                                        ,a.CpDateId SelectId ,a.CompanyDateNo SelectNo ,a.CompanyDateName SelectName                 
                                        ,a.* 
                                        FROM CM_CompanyDate a
                                        JOIN (
                                            SELECT COUNT('CpDateId') Total FROM CM_CompanyDate 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.CpDateId = ?");
                        params.push(Id);
                    }
                    if (CompanyDateNo) {
                        conditions.push("a.CompanyDateNo LIKE ?");
                        params.push('%' + CompanyDateNo + '%');
                    }
                    if (CompanyDateName) {
                        conditions.push("a.CompanyDateName LIKE ?");
                        params.push('%' + CompanyDateName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.CpDateId'`
                    if(ShowNum >0 && Index >=0){
                        sql += " LIMIT ? OFFSET ?";
                        params.push(ShowNum);
                        params.push(Index);
                    }
                    //#endregion 

                    //#region 執行
                    connection.query(sql, params, (err, rows) => {
                        if (!err) { 
                            SendSuccess(res,"",rows)
                        } else {
                            SendError(res, err) 
                        }
                    });
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
        
        //#region 新增
        router.post('/AddCompanyDate', (req, res) => {
            try{
                //#region 參數宣告+資料庫連接
                var connection = CreateDBConnection()
                basic(req,res)
                const {CompanyFullName, CompanyName, CompanyPerson, Phone, TaxID} = req.body;
                //#endregion 

                //#region 參數檢查
                if (CompanyFullName.length > 100) throw new Error('【公司全名】不可以超過100個字元')
                if (CompanyFullName.length <= 0) throw new Error('【公司全名】不可以為空')
                if (CompanyName.length > 100) throw new Error('【公司簡稱】不可以超過100個字元')
                if (CompanyPerson.length > 100) throw new Error('【負責人】不可以超過100個字元')
                if (CompanyPerson.length <= 0) throw new Error('【負責人】不可以為空')
                if (Phone.length > 10) throw new Error('【公司電話】不可以超過100個字元')
                if (Phone.length <= 0) throw new Error('【公司電話】不可以為空')
                if (TaxID.length > 8) throw new Error('【統一編號】不可以超過100個字元')
                if (TaxID.length <= 0) throw new Error('【統一編號】不可以為空')
                //#endregion 

                //#region 開始後端交易
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查公司代碼是否重複
                    var checkSql = `SELECT TaxID
                                    FROM CM_CompanyDate
                                    WHERE 1=1
                                    AND TaxID = ?
                                    LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [TaxID]);
                    if (resultCheck.length > 0) return SendError(res,'【統一編號】重複,請重新輸入') 
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO CM_CompanyDate 
                                (CompanyFullName ,CompanyName ,CompanyPerson ,Phone ,TaxID, AssetAmount, CompanyId
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,? ,? ,? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [CompanyFullName, CompanyName, CompanyPerson, Phone, TaxID, 0, currentCompany
                                    ,currentTime,currentTime,currentUser,currentUser]);
                    //#endregion 

                    //#region 获取最新插入的ID
                    var GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                    const result = await query(GetInsertedId);
                    //#endregion 

                    //#region commit段
                    CommitRun("add",connection,res,result)
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
        router.post('/UpdateCompanyDate', (req, res) => {
            try{
                //#region 宣告前端參數
                var connection = CreateDBConnection()
                basic(req)
                const {Id, CompanyFullName, CompanyName, CompanyPerson, Phone, TaxID} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【公司Id】不可以為空')
                if (CompanyFullName.length > 100) throw new Error('【公司全名】不可以超過100個字元')
                if (CompanyFullName.length <= 0) throw new Error('【公司全名】不可以為空')
                if (CompanyName.length > 100) throw new Error('【公司簡稱】不可以超過100個字元')
                if (CompanyPerson.length > 100) throw new Error('【負責人】不可以超過100個字元')
                if (CompanyPerson.length <= 0) throw new Error('【負責人】不可以為空')
                if (Phone.length > 10) throw new Error('【公司電話】不可以超過100個字元')
                if (Phone.length <= 0) throw new Error('【公司電話】不可以為空')
                if (TaxID.length > 8) throw new Error('【統一編號】不可以超過100個字元')
                if (TaxID.length <= 0) throw new Error('【統一編號】不可以為空')
                //#endregion 

                //#region 開始後端交易
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT CpDateId
                                        FROM CM_CompanyDate
                                        WHERE 1=1
                                        AND CpDateId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [Id]);
                    if (resultCheck.length <= 0) return SendError(res,'【公司資料不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE CM_CompanyDate set 
                                 CompanyFullName = ?
                                ,CompanyName = ?
                                ,CompanyPerson = ?
                                ,Phone = ?
                                ,TaxID = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND CpDateId = ?
                                `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [CompanyFullName, CompanyName, CompanyPerson,Phone,TaxID, currentTime, currentUser, Id]);
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
        router.post('/DeleteCompanyDate', (req, res) => {
            try{
                //#region 宣告前端參數
                var connection = CreateDBConnection()
                basic(req)
                const {CpDateId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (CpDateId <= 0) throw new Error('【公司】不可以為空')
                //#endregion 

                //#region 開始後端交易
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT CpDateId
                                        FROM CM_CompanyDate
                                        WHERE 1=1
                                        AND CpDateId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [CpDateId]);
                    if (resultCheck.length <= 0) return SendError(res,'【公司不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM CM_CompanyDate 
                                WHERE 1=1
                                AND CpDateId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [CpDateId]);
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
