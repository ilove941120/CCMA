const express = require('express');
const router = express.Router();
const util = require('util');
const configs = require('../config')
var mysql = require('mysql');
var currentTime = "";
var currentUser = -1
var currentCompany = -1



//#region 公用程式
    //#region 開啟連線
    function CreateDBConnection() {
        var connection = mysql.createConnection(configs.mysql); // 填入你的数据库配置
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
        
        return connection;
    }
    //#endregion 

    //#region 基本值宣告
    function basic(req,res){
        currentTime = new Date();
        if(req.session.user != undefined){
            currentUser = req.session.user.StaffId
            currentCompany = req.session.user.CompanyId
            return true
        }
        else{
           res.status(400).send({ status: 'restart', msg:"登入過期了,請重新登入"});
           return false;
        }
    }
    //#endregion 

    //#region 回傳成功
    function SendSuccess(res,success,result) {
        return res.status(200).send({ status: 'success', msg:success, data:result });
     }
    //#endregion 

    //#region 回傳錯誤
    function SendError(res,err) {
         res.status(400).send({ status: 'error', msg:err });
    }
    //#endregion 

    //#region Commit段
    function CommitRun(type,connection,res,result){
        connection.commit((commitError) => {
            if(commitError) {
                connection.rollback((rollbackError) => {
                    if (rollbackError) {
                        console.error("Rollback Error:", rollbackError);
                    }
                    console.error("Commit Error:", commitError);
                    connection.end();
                    return res.status(500).send({ msg: 'error', err: 'Commit Error' });
                });
            } else {
                switch(type){
                    case "read":
                        SendSuccess(res,"查看成功!!",result);
                        break;
                    case "add":
                        SendSuccess(res,"新增成功!!",result);
                        break;
                    case "update":
                        SendSuccess(res,"更新成功!!","");
                        break;
                    case "delete":
                        SendSuccess(res,"刪除成功!!","");
                        break;
                    case "Logein":
                        SendSuccess(res,"登入成功!!",result);
                        break;
                }
                connection.end();
            }
        });
    }
    //#endregion 

//#endregion 

//#region  SYS相關
    //#region  登入相關
    router.post('/GetLogin', (req, res) => {
        try{
            //#region 宣告前端參數
            const {StaffNo, PassWord} = req.body;
            //#endregion 

            //#region 參數檢查
            if (StaffNo.length <= 0) throw new Error('【登入帳號】不可以為空')
            if (PassWord.length <= 0) throw new Error('【登入密碼】不可以為空')
            //#endregion 

            //#region 開始後端交易
            var connection = CreateDBConnection()
            connection.beginTransaction(async (transactionError) => {
                if(transactionError) {
                    console.error("開啟後端交易失敗:", transactionError);
                    return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                }

                //#region 檢查段
                var checkSql = `SELECT a.StaffId,a.StaffNo,a.StaffName
                                ,a1.CompanyId
                                FROM CM_Staff a
                                LEFT JOIN CM_Department a1 on a.DepartmentId = a1.DepartmentId
                                WHERE 1=1
                                AND StaffNo = ?
                                AND PassWord = ?
                                LIMIT 1
                                `
                var checkQuery = util.promisify(connection.query).bind(connection);
                var resultCheck = await checkQuery(checkSql, [StaffNo,PassWord]);
                if (resultCheck.length <= 0) return SendError(res,'【使用者不存在】,請重新確認');
                var StaffIdBase = -1;
                var StaffNoBase = "";
                var StaffNameBase = "";
                var CompanyIdBase = -1;
                resultCheck.forEach(row => {
                    StaffIdBase = row.StaffId
                    StaffNoBase = row.StaffNo
                    StaffNameBase = row.StaffName
                    CompanyIdBase = row.CompanyId
                });
                //#endregion 
                
                //#region commit段
                req.session.user = {StaffId: StaffIdBase, StaffNo: StaffNoBase,CompanyId:CompanyIdBase};
                CommitRun("Logein",connection,res,resultCheck)
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

    //#region  Company相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetCompany', (req, res) => {
            try{
                //#region 宣告前端參數
                if(!basic(req,res)) return
                const {Id, CompanyNo, CompanyName,ShowNum,Index} = req.body;
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
                                        ,a.CompanyId SelectId ,a.CompanyNo SelectNo ,a.CompanyName SelectName                 
                                        ,a.* 
                                        FROM BAS_Company a
                                        JOIN (
                                            SELECT COUNT('CompanyId') Total FROM BAS_Company 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.CompanyId = ?");
                        params.push(Id);
                    }
                    if (CompanyNo) {
                        conditions.push("a.CompanyNo LIKE ?");
                        params.push('%' + CompanyNo + '%');
                    }
                    if (CompanyName) {
                        conditions.push("a.CompanyName LIKE ?");
                        params.push('%' + CompanyName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.CompanyId'`
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
        router.post('/AddCompany', (req, res) => {
            try{
                //#region 參數宣告+資料庫連接
                var connection = CreateDBConnection()
                basic(req,res)
                const {CompanyNo, CompanyName, CompanyDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (CompanyNo.length > 10) throw new Error('【公司代碼】不可以超過10個字元')
                if (CompanyNo.length <= 0) throw new Error('【公司代碼】不可以為空'); 
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
                    //#region 檢查公司代碼是否重複
                    var checkSql = `SELECT CompanyNo
                                    FROM BAS_Company
                                    WHERE 1=1
                                    AND CompanyNo = ?
                                    LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [CompanyNo]);
                    if (resultCheck.length > 0) return SendError(res,'【公司代碼】重複,請重新輸入') 
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO BAS_Company 
                                (CompanyNo ,CompanyName ,CompanyDesc
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [CompanyNo, CompanyName, CompanyDesc
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
        router.post('/UpdateCompany', (req, res) => {
            try{
                //#region 宣告前端參數
                var connection = CreateDBConnection()
                basic(req)
                const {Id, CompanyName, CompanyDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【公司Id】不可以為空')
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
                    if (resultCheck.length <= 0) return SendError(res,'【公司不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE BAS_Company set 
                                CompanyName = ?
                                ,CompanyDesc = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
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
                console.error("Query Error:", queryError.message);
                res.status(400).send({ status: 'error', msg:queryError.message });
            }
        })
        //#endregion 

        //#region 刪除
        router.post('/DeleteCompany', (req, res) => {
            try{
                //#region 宣告前端參數
                var connection = CreateDBConnection()
                basic(req)
                const {CompanyId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (CompanyId <= 0) throw new Error('【公司】不可以為空')
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
                    const resultCheck = await checkQuery(checkSql, [CompanyId]);
                    if (resultCheck.length <= 0) return SendError(res,'【公司不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM BAS_Company 
                                WHERE 1=1
                                AND CompanyId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [CompanyId]);
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

    //#region  System相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetSystem', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, SystemNo, SystemName,ShowNum,Index} = req.body;
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
                                        ,a.SystemId SelectId ,a.SystemNo SelectNo ,a.SystemName SelectName                 
                                        ,a.* 
                                        FROM BAS_System a
                                        JOIN (
                                            SELECT COUNT('SystemId') Total FROM BAS_System 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.SystemId = ?");
                        params.push(Id);
                    }
                    if (SystemNo) {
                        conditions.push("a.SystemNo LIKE ?");
                        params.push('%' + SystemNo + '%');
                    }
                    if (SystemName) {
                        conditions.push("a.SystemName LIKE ?");
                        params.push('%' + SystemName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.SystemId'`
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
        router.post('/AddSystem', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {SystemNo, SystemName, SystemDesc ,IconStyle} = req.body;
                //#endregion 

                //#region 參數檢查
                if (SystemNo.length > 10) throw new Error('【系統代碼】不可以超過10個字元')
                if (SystemNo.length <= 0) throw new Error('【系統代碼】不可以為空'); 
                if (SystemName.length > 30) throw new Error('【系統名字】不可以超過30個字元')
                if (SystemName.length <= 0) throw new Error('【系統名字】不可以為空')
                if (SystemDesc.length > 100) throw new Error('【系統描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查系統代碼是否重複
                    var checkSql = `SELECT SystemNo
                                    FROM BAS_System
                                    WHERE 1=1
                                    AND SystemNo = ?
                                    LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [SystemNo]);
                    if (resultCheck.length > 0) return SendError(res,'【系統代碼】重複,請重新輸入') 
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO BAS_System 
                                (SystemNo ,SystemName ,SystemDesc ,IconStyle
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [SystemNo, SystemName, SystemDesc ,IconStyle
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
        router.post('/UpdateSystem', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, SystemName, SystemDesc ,IconStyle} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【系統Id】不可以為空')
                if (SystemName.length > 30) throw new Error('【系統名字】不可以超過30個字元')
                if (SystemName.length <= 0) throw new Error('【系統名字】不可以為空')
                if (SystemDesc.length > 100) throw new Error('【系統描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT SystemId
                                        FROM BAS_System
                                        WHERE 1=1
                                        AND SystemId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [Id]);
                    if (resultCheck.length <= 0) return SendError(res,'【系統不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE BAS_System set 
                                SystemName = ?
                                ,SystemDesc = ?
                                ,IconStyle = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND SystemId = ?
                                `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [SystemName ,SystemDesc ,IconStyle ,currentTime ,currentUser ,Id]);
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
        router.post('/DeleteSystem', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {SystemId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (SystemId <= 0) throw new Error('【系統】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT SystemId
                                        FROM BAS_System
                                        WHERE 1=1
                                        AND SystemId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [SystemId]);
                    if (resultCheck.length <= 0) return SendError(res,'【系統不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM BAS_System 
                                WHERE 1=1
                                AND SystemId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [SystemId]);
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
    
    //#region  Modal相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetModal', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id ,SystemId ,ModalNo ,ModalName ,ShowNum ,Index} = req.body;
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
                                        ,a.ModalId SelectId ,a.ModalNo SelectNo ,a.ModalName SelectName                 
                                        ,a.* 
                                        ,a1.SystemName
                                        FROM BAS_Modal a
                                        INNER JOIN BAS_System a1 on a.SystemId = a1.SystemId
                                        JOIN (
                                            SELECT COUNT('ModalId') Total FROM BAS_Modal 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.ModalId = ?");
                        params.push(Id);
                    }
                    if (SystemId > 0) {
                        conditions.push("a.SystemId = ?");
                        params.push(SystemId);
                    }
                    if (ModalNo) {
                        conditions.push("a.ModalNo LIKE ?");
                        params.push('%' + ModalNo + '%');
                    }
                    if (ModalName) {
                        conditions.push("a.ModalName LIKE ?");
                        params.push('%' + ModalName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.ModalId'`
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
        router.post('/AddModal', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {SystemId ,ModalNo ,ModalName ,ModalDesc ,IconStyle} = req.body;
                //#endregion 

                //#region 參數檢查
                if (SystemId <= 0) throw new Error('【系統】不可以為空')
                if (ModalNo.length > 10) throw new Error('【模組代碼】不可以超過10個字元')
                if (ModalNo.length <= 0) throw new Error('【模組代碼】不可以為空'); 
                if (ModalName.length > 30) throw new Error('【模組名字】不可以超過30個字元')
                if (ModalName.length <= 0) throw new Error('【模組名字】不可以為空')
                if (ModalDesc.length > 100) throw new Error('【模組描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查系統是否存在
                    var checkSql = `SELECT SystemId
                                    FROM BAS_System
                                    WHERE 1=1
                                    AND SystemId = ?
                                    LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [SystemId]);
                    if (resultCheck.length <= 0) return SendError(res,'【系統不存在】,請重新確認');
                    //#endregion 

                    //#region 檢查系統+模組代碼是否重複
                        checkSql = `SELECT ModalNo
                                    FROM BAS_Modal
                                    WHERE 1=1
                                    AND ModalNo = ?
                                    AND SystemId = ?
                                    LIMIT 1`
                    checkQuery = util.promisify(connection.query).bind(connection);
                    resultCheck = await checkQuery(checkSql, [ModalNo,SystemId]);
                    if (resultCheck.length > 0) return SendError(res,'【系統+模組代碼】重複,請重新輸入');
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO BAS_Modal 
                                (ModalNo ,ModalName ,ModalDesc ,IconStyle ,SystemId
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [ModalNo, ModalName, ModalDesc ,IconStyle ,SystemId
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
        router.post('/UpdateModal', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id ,SystemId ,ModalName ,ModalDesc ,IconStyle} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【模組Id】不可以為空')
                if (SystemId <= 0) throw new Error('【系統】不可以為空')
                if (ModalName.length > 30) throw new Error('【模組名字】不可以超過30個字元')
                if (ModalName.length <= 0) throw new Error('【模組名字】不可以為空')
                if (ModalDesc.length > 100) throw new Error('【模組描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    //#region 檢查模組是否存在
                    var ModalNo = "";
                    var checkSql = `SELECT ModalNo
                                    FROM BAS_Modal
                                    WHERE 1=1
                                    AND ModalId = ?
                                    LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [Id]);
                    if (resultCheck.length <= 0) return SendError(res,'【模組不存在】,請重新確認');
                    resultCheck.forEach((item)=>{
                        ModalNo = item.ModalNo;
                    })
                    
                    //#endregion 

                    //#region 檢查系統+模組代碼是否重複
                        checkSql = `SELECT ModalNo
                                    FROM BAS_Modal
                                    WHERE 1=1
                                    AND ModalNo = ?
                                    AND SystemId = ?
                                    AND ModalId != ?
                                    LIMIT 1`
                    checkQuery = util.promisify(connection.query).bind(connection);
                    resultCheck = await checkQuery(checkSql, [ModalNo,SystemId,Id]);
                    if (resultCheck.length > 0) return SendError(res,'【系統+模組代碼】重複,請重新輸入');
                    //#endregion 

                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE BAS_Modal set 
                                ModalName = ?
                                ,ModalDesc = ?
                                ,IconStyle = ?
                                ,SystemId = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND ModalId = ?
                                `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [ModalName ,ModalDesc ,IconStyle ,SystemId ,currentTime ,currentUser ,Id]);
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
        router.post('/DeleteModal', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {ModalId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (ModalId <= 0) throw new Error('【模組】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT ModalId
                                        FROM BAS_Modal
                                        WHERE 1=1
                                        AND ModalId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [ModalId]);
                    if (resultCheck.length <= 0) return SendError(res,'【模組不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM BAS_Modal 
                                WHERE 1=1
                                AND ModalId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [ModalId]);
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

    //#region  Component相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetComponent', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id ,ModalId ,ComponentNo ,ComponentName ,PageNo ,ShowNum ,Index} = req.body;
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
                                        ,a.ComponentId SelectId ,a.ComponentNo SelectNo ,a.ComponentName SelectName                 
                                        ,a.*  
                                        ,a1.ModalId ,a1.ModalName ,a1.IconStyle ModalIconStyle
                                        ,a2.SystemId ,a2.SystemName ,a2.IconStyle SystemIconStyle
                                        FROM BAS_Component a
                                        INNER JOIN BAS_Modal a1 on a.ModalId = a1.ModalId
                                        INNER JOIN BAS_System a2 on a1.SystemId = a2.SystemId
                                        JOIN (
                                            SELECT COUNT('ComponentId') Total FROM BAS_Component 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.ComponentId = ?");
                        params.push(Id);
                    }
                    if (ModalId > 0) {
                        conditions.push("a.ModalId = ?");
                        params.push(ModalId);
                    }
                    if (ComponentNo) {
                        conditions.push("a.ComponentNo LIKE ?");
                        params.push('%' + ComponentNo + '%');
                    }
                    if (ComponentName) {
                        conditions.push("a.ComponentName LIKE ?");
                        params.push('%' + ComponentName + '%');
                    }
                    if (PageNo) {
                        conditions.push("a.ComponentName LIKE ?");
                        params.push('%' + PageNo + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.ComponentId'`
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
        router.post('/AddComponent', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {ModalId ,ComponentNo ,ComponentName ,ComponentDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (ModalId <= 0) throw new Error('【模組】不可以為空')
                if (ComponentNo.length > 10) throw new Error('【組件代碼】不可以超過10個字元')
                if (ComponentNo.length <= 0) throw new Error('【組件代碼】不可以為空'); 
                if (ComponentName.length > 30) throw new Error('【組件名字】不可以超過30個字元')
                if (ComponentName.length <= 0) throw new Error('【組件名字】不可以為空')
                if (ComponentDesc.length > 100) throw new Error('【組件描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查模組是否存在
                    var checkSql = `SELECT ModalId
                                    FROM BAS_Modal
                                    WHERE 1=1
                                    AND ModalId = ?
                                    LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [ModalId]);
                    if (resultCheck.length <= 0) return SendError(res,'【模組不存在】,請重新確認');
                    //#endregion 

                    //#region 檢查模組+組件代碼是否重複
                        checkSql = `SELECT ComponentNo
                                    FROM BAS_Component
                                    WHERE 1=1
                                    AND ComponentNo = ?
                                    AND ModalId = ?
                                    LIMIT 1`
                    checkQuery = util.promisify(connection.query).bind(connection);
                    resultCheck = await checkQuery(checkSql, [ComponentNo,ModalId]);
                    if (resultCheck.length > 0) return SendError(res,'【模組+組件代碼】重複,請重新輸入');
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO BAS_Component 
                                (ComponentNo ,ComponentName ,ComponentDesc ,ModalId
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [ComponentNo, ComponentName, ComponentDesc ,ModalId
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
        router.post('/UpdateComponent', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id ,ModalId ,ComponentNo ,ComponentName ,ComponentDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【組件Id】不可以為空')
                if (ModalId <= 0) throw new Error('【模組】不可以為空')
                if (ComponentNo.length > 10) throw new Error('【組件代碼】不可以超過10個字元')
                if (ComponentNo.length <= 0) throw new Error('【組件代碼】不可以為空'); 
                if (ComponentName.length > 30) throw new Error('【組件名字】不可以超過30個字元')
                if (ComponentName.length <= 0) throw new Error('【組件名字】不可以為空')
                if (ComponentDesc.length > 100) throw new Error('【組件描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    //#region 檢查組件是否存在
                    var checkSql = `SELECT ComponentNo
                                    FROM BAS_Component
                                    WHERE 1=1
                                    AND ComponentId = ?
                                    LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [Id]);
                    if (resultCheck.length <= 0) return SendError(res,'【組件不存在】,請重新確認');
                    //#endregion 

                    //#region 檢查模組+組件代碼是否重複
                        checkSql = `SELECT ComponentNo
                                    FROM BAS_Component
                                    WHERE 1=1
                                    AND ComponentNo = ?
                                    AND ModalId = ?
                                    AND ComponentId != ?
                                    LIMIT 1`
                    checkQuery = util.promisify(connection.query).bind(connection);
                    resultCheck = await checkQuery(checkSql, [ComponentNo,ModalId,Id]);
                    if (resultCheck.length > 0) return SendError(res,'【模組+組件代碼】重複,請重新輸入');
                    //#endregion 

                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE BAS_Component set 
                                 ComponentNo = ?
                                ,ComponentName = ?
                                ,ComponentDesc = ?
                                ,ModalId = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND ComponentId = ?
                                `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [ComponentNo, ComponentName ,ComponentDesc ,ModalId ,currentTime ,currentUser ,Id]);
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
        router.post('/DeleteComponent', (req, res) => {
            try{
                if(!basic(req,res)) return
                
                //#region 宣告前端參數
                const {ComponentId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (ComponentId <= 0) throw new Error('【組件】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT ComponentId
                                        FROM BAS_Component
                                        WHERE 1=1
                                        AND ComponentId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [ComponentId]);
                    if (resultCheck.length <= 0) return SendError(res,'【組件不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM BAS_Component 
                                WHERE 1=1
                                AND ComponentId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [ComponentId]);
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

    //#region  Type相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetType', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, TypeNo, TypeName ,UseFrom ,ShowNum ,Index} = req.body;
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
                                        ,a.TypeId SelectId ,a.TypeNo SelectNo ,a.TypeName SelectName                 
                                        ,a.*  
                                        FROM BAS_Type a
                                        JOIN (
                                            SELECT COUNT('TypeId') Total FROM BAS_Type 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.TypeId = ?");
                        params.push(Id);
                    }
                    if (TypeNo) {
                        conditions.push("a.TypeNo LIKE ?");
                        params.push('%' + TypeNo + '%');
                    }
                    if (TypeName) {
                        conditions.push("a.TypeName LIKE ?");
                        params.push('%' + TypeName + '%');
                    }
                    if (UseFrom) {
                        conditions.push("a.UseFrom LIKE ?");
                        params.push('%' + UseFrom + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.TypeId'`
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
        router.post('/AddType', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {TypeNo ,TypeName ,TypeDesc ,UseFrom} = req.body;
                //#endregion 

                //#region 參數檢查
                if (TypeNo.length > 10) throw new Error('【類別代碼】不可以超過10個字元')
                if (TypeNo.length <= 0) throw new Error('【類別代碼】不可以為空'); 
                if (TypeName.length > 30) throw new Error('【類別名字】不可以超過30個字元')
                if (TypeName.length <= 0) throw new Error('【類別名字】不可以為空')
                if (TypeDesc.length > 100) throw new Error('【類別描述】不可以超過100個字元')
                if (UseFrom.length <= 0) throw new Error('【用途來源】不可以為空')
                if (UseFrom.length > 100) throw new Error('【用途來源】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查類別代碼是否重複
                    var checkSql = `SELECT TypeNo
                                    FROM BAS_Type
                                    WHERE 1=1
                                    AND UseFrom = ?
                                    AND TypeNo = ?
                                    LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [UseFrom ,TypeNo]);
                    if (resultCheck.length > 0) return SendError(res,'【類別代碼】重複,請重新輸入') 
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO BAS_Type 
                                (TypeNo ,TypeName ,TypeDesc ,UseFrom
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [TypeNo, TypeName, TypeDesc ,UseFrom
                                        ,currentTime ,currentTime ,currentUser ,currentUser]);
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
        router.post('/UpdateType', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id ,TypeNo ,TypeName ,TypeDesc ,UseFrom} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【類別Id】不可以為空')
                if (TypeNo.length > 10) throw new Error('【類別代碼】不可以超過10個字元')
                if (TypeNo.length <= 0) throw new Error('【類別代碼】不可以為空'); 
                if (TypeName.length > 30) throw new Error('【類別名字】不可以超過30個字元')
                if (TypeName.length <= 0) throw new Error('【類別名字】不可以為空')
                if (TypeDesc.length > 100) throw new Error('【類別描述】不可以超過100個字元')
                if (UseFrom.length <= 0) throw new Error('【用途來源】不可以為空')
                if (UseFrom.length > 100) throw new Error('【用途來源】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT TypeNo
                                        FROM BAS_Type
                                        WHERE 1=1
                                        AND TypeId = ?
                                        LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [Id]);
                    if (resultCheck.length <= 0) return SendError(res,'【類別不存在】,請重新確認');

                    //#region 檢查類別代碼是否重複
                    checkSql = `SELECT TypeNo
                                    FROM BAS_Type
                                    WHERE 1=1
                                    AND UseFrom = ?
                                    AND TypeNo = ?
                                    AND TypeId != ?
                                    LIMIT 1`
                    checkQuery = util.promisify(connection.query).bind(connection);
                    resultCheck = await checkQuery(checkSql, [UseFrom ,TypeNo ,Id]);
                    if (resultCheck.length > 0) return SendError(res,'【類別代碼 + 用途來源】重複,請重新輸入') 
                    //#endregion
                    
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE BAS_Type set 
                                 TypeNo = ?
                                ,TypeName = ?
                                ,TypeDesc = ?
                                ,UseFrom = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND TypeId = ?
                                `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [TypeNo ,TypeName ,TypeDesc ,UseFrom
                                        ,currentTime ,currentUser ,Id]);
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
        router.post('/DeleteType', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {TypeId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (TypeId <= 0) throw new Error('【類別】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT TypeId
                                        FROM BAS_Type
                                        WHERE 1=1
                                        AND TypeId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [TypeId]);
                    if (resultCheck.length <= 0) return SendError(res,'【類別不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM BAS_Type 
                                WHERE 1=1
                                AND TypeId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [TypeId]);
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

    //#region  Status相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetStatus', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, StatusNo, StatusName ,UseFrom ,ShowNum ,Index} = req.body;
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
                                        ,a.StatusId SelectId ,a.StatusNo SelectNo ,a.StatusName SelectName                 
                                        ,a.*  
                                        FROM BAS_Status a
                                        JOIN (
                                            SELECT COUNT('StatusId') Total FROM BAS_Status 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.StatusId = ?");
                        params.push(Id);
                    }
                    if (StatusNo) {
                        conditions.push("a.StatusNo LIKE ?");
                        params.push('%' + StatusNo + '%');
                    }
                    if (StatusName) {
                        conditions.push("a.StatusName LIKE ?");
                        params.push('%' + StatusName + '%');
                    }
                    if (UseFrom) {
                        conditions.push("a.UseFrom LIKE ?");
                        params.push('%' + UseFrom + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.StatusId'`
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
        router.post('/AddStatus', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {StatusNo ,StatusName ,StatusDesc ,UseFrom} = req.body;
                //#endregion 

                //#region 參數檢查
                if (StatusNo.length > 10) throw new Error('【狀態代碼】不可以超過10個字元')
                if (StatusNo.length <= 0) throw new Error('【狀態代碼】不可以為空'); 
                if (StatusName.length > 30) throw new Error('【狀態名字】不可以超過30個字元')
                if (StatusName.length <= 0) throw new Error('【狀態名字】不可以為空')
                if (StatusDesc.length > 100) throw new Error('【狀態描述】不可以超過100個字元')
                if (UseFrom.length <= 0) throw new Error('【用途來源】不可以為空')
                if (UseFrom.length > 100) throw new Error('【用途來源】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查狀態代碼是否重複
                    var checkSql = `SELECT StatusNo
                                    FROM BAS_Status
                                    WHERE 1=1
                                    AND UseFrom = ?
                                    AND StatusNo = ?
                                    LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [UseFrom ,StatusNo]);
                    if (resultCheck.length > 0) return SendError(res,'【狀態代碼 + 用途來源】重複,請重新輸入') 
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO BAS_Status 
                                (StatusNo ,StatusName ,StatusDesc ,UseFrom
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [StatusNo, StatusName, StatusDesc ,UseFrom
                                        ,currentTime ,currentTime ,currentUser ,currentUser]);
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
        router.post('/UpdateStatus', (req, res) => {
            try{
                if(!basic(req,res)) return
                
                //#region 宣告前端參數
                const {Id ,StatusNo ,StatusName  ,StatusDesc ,UseFrom} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【狀態Id】不可以為空')
                if (StatusNo.length > 30) throw new Error('【狀態代碼】不可以超過30個字元')
                if (StatusNo.length <= 0) throw new Error('【狀態代碼】不可以為空')
                if (StatusName.length > 30) throw new Error('【狀態名字】不可以超過30個字元')
                if (StatusName.length <= 0) throw new Error('【狀態名字】不可以為空')
                if (StatusDesc.length > 100) throw new Error('【狀態描述】不可以超過100個字元')
                if (UseFrom.length <= 0) throw new Error('【用途來源】不可以為空')
                if (UseFrom.length > 100) throw new Error('【用途來源】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT StatusNo
                                        FROM BAS_Status
                                        WHERE 1=1
                                        AND StatusId = ?
                                        LIMIT 1`
                    var checkQuery = util.promisify(connection.query).bind(connection);
                    var resultCheck = await checkQuery(checkSql, [Id]);
                    if (resultCheck.length <= 0) return SendError(res,'【狀態不存在】,請重新確認');

                    //#region 檢查狀態代碼是否重複
                    checkSql = `SELECT StatusNo
                                    FROM BAS_Status
                                    WHERE 1=1
                                    AND UseFrom = ?
                                    AND StatusNo = ?
                                    AND StatusId != ?
                                    LIMIT 1`
                    checkQuery = util.promisify(connection.query).bind(connection);
                    resultCheck = await checkQuery(checkSql, [UseFrom ,StatusNo ,Id]);
                    if (resultCheck.length > 0) return SendError(res,'【狀態代碼 + 用途來源】重複,請重新輸入') 
                    //#endregion
                    
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE BAS_Status set 
                                 StatusNo = ?
                                ,StatusName = ?
                                ,StatusDesc = ?
                                ,UseFrom = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND StatusId = ?
                                `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [StatusNo ,StatusName ,StatusDesc ,UseFrom
                                        ,currentTime ,currentUser ,Id]);
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
        router.post('/DeleteStatus', (req, res) => {
            try{
                if(!basic(req,res)) return
                
                //#region 宣告前端參數
                const {StatusId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (StatusId <= 0) throw new Error('【狀態】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT StatusId
                                        FROM BAS_Status
                                        WHERE 1=1
                                        AND StatusId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [StatusId]);
                    if (resultCheck.length <= 0) return SendError(res,'【狀態不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM BAS_Status 
                                WHERE 1=1
                                AND StatusId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [StatusId]);
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

    //#region  GetMenuModal 取得列表模組+組件層
    router.post('/GetMenuModal', (req, res) => {
        try{
            if(!basic(req,res)) return
            
            //#region 宣告前端參數
            const {SystemId} = req.body;
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
                var baseQuery = `SELECT a.ModalId, a.ModalName, a.IconStyle
                                    , a1.ComponentName, a1.ComponentNo
                                FROM bas_modal a
                                INNER JOIN bas_component a1 on a.ModalId = a1.ModalId
                                WHERE 1=1`
                //#endregion 

                //#region 條件
                if (SystemId > 0) {
                    conditions.push("a.SystemId = ?");
                    params.push(SystemId);
                }
                
                let sql = baseQuery;
                if (conditions.length) {
                    sql += " AND " + conditions.join(" AND ");
                }
                //#endregion 

                //#region 執行
                connection.query(sql, params, (err, rows) => {
                    if (!err) { 
                        res.send(rows); 
                    } else {
                        res.send(err);
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

//#endregion 

//#region 圖片運用
    //#region 取得圖片
    router.post('/GetImg', (req, res) => {
        try{
            if(!basic(req,res)) return
            
            //#region 宣告前端參數
            const {Id} = req.body;
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
                var baseQuery = `SELECT a.* 
                                    FROM CM_CyyImg a
                                    WHERE 1=1
                                    ORDER BY a.CyyImgId DESC LIMIT 1`
                //#endregion 

                //#region 條件
                
                let sql = baseQuery;
                
                //#endregion 

                //#region 列表顯示設定
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

    //#region 上傳圖片
    router.post('/AddImg', (req, res) => {
        try{
            if(!basic(req,res)) return

            //#region 參數宣告+資料庫連接
            const {href ,ImgName ,ImgSpec} = req.body;
            //#endregion 
            // let newImg = new ImageModel({ data: href}); // 建立新Image模型
        
            //#region 參數檢查
            //#endregion 

            //#region 開始後端交易
            var connection = CreateDBConnection()
            connection.beginTransaction(async (transactionError) => {
                if(transactionError) {
                    console.error("開啟後端交易失敗:", transactionError);
                    return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                }

                //#region 檢查段
                //#endregion 

                //#region 異動段
                var sql = `INSERT INTO CM_CyyImg 
                            (href ,ImgName ,ImgSpec
                                ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                            VALUES
                            (? ,? ,? 
                                ,? ,? ,? ,?)`;
                const query = util.promisify(connection.query).bind(connection);
                await query(sql, [href, ImgName, ImgSpec
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

    //#region 刪除圖片
    router.post('/DeletImg', (req, res) => {
        try{
            if(!basic(req,res)) return

            //#region 宣告前端參數
            const {Id} = req.body;
            //#endregion 
          
            //#region 參數檢查
            if (Id <= 0) throw new Error('【圖片】不可以為空')
            //#endregion 

            //#region 開始後端交易
            var connection = CreateDBConnection()
            connection.beginTransaction(async (transactionError) => {
                if(transactionError) {
                    console.error("開啟後端交易失敗:", transactionError);
                    return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                }
                //#region 檢查段
                var checkSql = `SELECT CyyImgId
                                    FROM CM_CyyImg
                                    WHERE 1=1
                                    AND CyyImgId = ?
                                    LIMIT 1`
                const checkQuery = util.promisify(connection.query).bind(connection);
                const resultCheck = await checkQuery(checkSql, [Id]);
                if (resultCheck.length <= 0) return SendError(res,'【圖片不存在】,請重新確認');
                //#endregion 

                //#region 異動段
                var sql = `DELETE FROM CM_CyyImg 
                            WHERE 1=1
                            AND CyyImgId = ? `
                const query = util.promisify(connection.query).bind(connection);
                await query(sql, [Id]);
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
    });
    //#endregion 

//#endregion 

module.exports = router;