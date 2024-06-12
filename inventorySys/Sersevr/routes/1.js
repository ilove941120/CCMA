//#region 更新
router.post('/UpdateCompany', (req, res) => {
    try{
        var connection = CreateDBConnection()
        basic(req)
         
        //#region 宣告前端參數
        const {Id, CompanyName, CompanyDesc} = req.body;
        //#endregion 

        //#region 參數檢查
        if (CompanyName.length > 30) throw new Error('【公司名字】不可以超過30個字元')
        if (CompanyName.length <= 0) throw new Error('【公司名字】不可以為空')
        if (CompanyDesc.length > 100) throw new Error('【公司描述】不可以超過100個字元')
        //#endregion 

        //#region 開始後端交易
        connection.beginTransaction(async (transactionError) => {
            if(transactionError) {
                console.error("開啟後端交易失敗:", transactionError);
                return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
            }
            //#region 檢查段
            var checkSql = `SELECT CompanyId
                                FROM BAS_Company
                                WHERE 1=1
                                AND CompanyId = ?
                                LIMIT 1`
            const checkQuery = util.promisify(connection.query).bind(connection);
            const resultCheck = await checkQuery(checkSql, [Id]);
            if (resultCheck.length <= 0) SendError(res,'【公司不存在】,請重新確認');
            //#endregion 

            //#region 異動段
            var sql = `UPDATE BAS_Company set 
                        CompanyName = ?,
                        CompanyDesc = ?,
                        UpdateDate = ?,
                        UpdateUserId = ?
                        WHERE 1=1
                        AND CompanyId = ?
                        `
            const query = util.promisify(connection.query).bind(connection);
            await query(sql, [CompanyName, CompanyDesc, currentTime,currentUser, Id]);
            //#endregion 

            //#region commit段
            CommitRun("update",connection,res,"")
            //#endregion 
        });
        //#endregion 
    }
    catch(queryError){
        console.error("Query Error:", queryError);
        res.status(400).send({ status: 'error', msg:queryError.message });
    }
})
//#endregion 
