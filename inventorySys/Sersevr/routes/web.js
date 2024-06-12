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


    //#region   CyyWeb
        //#region  CompanyPhoto相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCompanyPhoto', (req, res) => {
                try{
                    //#region 宣告前端參數
                    if(!basic(req,res)) return
                    const {CpId, PhotoNo, PhotoName,ShowNum,Index} = req.body;
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
                                            ,a.* 
                                            FROM WEB_CompanyPhoto a
                                            JOIN (
                                                SELECT COUNT('CpId') Total FROM WEB_CompanyPhoto 
                                            ) b
                                            WHERE 1=1`
                        //#endregion 

                        //#region 條件
                        // if (currentCompany > 0) {
                        //     conditions.push("a.CompnayId = ?");
                        //     params.push(currentCompany);
                        // }
                        if (CpId > 0) {
                            conditions.push("a.CpId = ?");
                            params.push(CpId);
                        }
                        if (PhotoNo) {
                            conditions.push("a.PhotoNo LIKE ?");
                            params.push('%' + PhotoNo + '%');
                        }
                        if (PhotoName) {
                            conditions.push("a.PhotoName LIKE ?");
                            params.push('%' + PhotoName + '%');
                        }
                        let sql = baseQuery;
                        if (conditions.length) {
                            sql += " AND " + conditions.join(" AND ");
                        }
                        //#endregion 

                        //#region 列表顯示設定
                        sql += ` ORDER BY 'a.CpId'`
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
            router.post('/AddCompanyPhoto', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {PhotoName, PhotoDesc, PhotoHref} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (PhotoName.length > 100) throw new Error('【圖片名字】不可以超過100個字元')
                    if (PhotoName.length <= 0) throw new Error('【圖片名字】不可以為空')
                    if (PhotoDesc.length > 100) throw new Error('【圖片描述】不可以超過100個字元')
                    if (PhotoHref.length <= 0) throw new Error('【圖片連結】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        //#endregion 

                        //#region 異動段
                        var sql = `INSERT INTO WEB_CompanyPhoto 
                                    (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [currentCompany, PhotoName, PhotoDesc, PhotoHref
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
            router.post('/UpdateCompanyPhoto', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {CpId,PhotoName, PhotoDesc} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (PhotoName.length > 100) throw new Error('【圖片名字】不可以超過100個字元')
                    if (PhotoName.length <= 0) throw new Error('【圖片名字】不可以為空')
                    if (PhotoDesc.length > 100) throw new Error('【圖片描述】不可以超過100個字元')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CpId
                                        FROM WEB_CompanyPhoto
                                        WHERE 1=1
                                        AND CpId = ?
                                        LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [CpId]);
                        if (resultCheck.length <= 0) return SendError(res,'【圖片不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `UPDATE WEB_CompanyPhoto set 
                                    PhotoName = ?
                                    ,PhotoDesc = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CpId = ?
                                    `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [PhotoName, PhotoDesc, currentTime,currentUser, CpId]);
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
            router.post('/DeleteCompanyPhoto', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {CpId} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CpId <= 0) throw new Error('【圖片圖片】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CpId
                                            FROM WEB_CompanyPhoto
                                            WHERE 1=1
                                            AND CpId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [CpId]);
                        if (resultCheck.length <= 0) return SendError(res,'【圖片圖片】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CompanyPhoto 
                                    WHERE 1=1
                                    AND CpId = ? `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [CpId]);
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

        //#region  CompanyWeb相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCompanyWeb', (req, res) => {
                try{
                    //#region 宣告前端參數
                    if(!basic(req,res)) return
                    const {Id, WebNo, WebName,ShowNum,Index} = req.body;
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
                                            ,a.CwId SelectId ,a.WebNo SelectNo ,a.WebName SelectName                 
                                            ,a.* 
                                            FROM WEB_CompanyWeb a
                                            JOIN (
                                                SELECT COUNT('CwId') Total FROM WEB_CompanyWeb 
                                            ) b
                                            WHERE 1=1`
                        //#endregion 

                        //#region 條件
                        if (Id > 0) {
                            conditions.push("a.CwId = ?");
                            params.push(Id);
                        }
                        if (WebNo) {
                            conditions.push("a.WebNo LIKE ?");
                            params.push('%' + CompanyWebNo + '%');
                        }
                        if (WebName) {
                            conditions.push("a.WebName LIKE ?");
                            params.push('%' + CompanyWebName + '%');
                        }
                        let sql = baseQuery;
                        if (conditions.length) {
                            sql += " AND " + conditions.join(" AND ");
                        }
                        //#endregion 

                        //#region 列表顯示設定
                        sql += ` ORDER BY 'a.CwId'`
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
            router.post('/AddCompanyWeb', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {WebNo, WebName, WebDesc} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (WebNo.length > 10) throw new Error('【網站代碼】不可以超過10個字元')
                    if (WebNo.length <= 0) throw new Error('【網站代碼】不可以為空'); 
                    if (WebName.length > 100) throw new Error('【網站名字】不可以超過100個字元')
                    if (WebName.length <= 0) throw new Error('【網站名字】不可以為空')
                    if (WebDesc.length > 100) throw new Error('【網站描述】不可以超過100個字元')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        //#region 檢查網站代碼是否重複
                        var checkSql = `SELECT WebNo
                                        FROM WEB_CompanyWeb
                                        WHERE 1=1
                                        AND WebNo = ?
                                        LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [WebNo]);
                        if (resultCheck.length > 0) return SendError(res,'【網站代碼】重複,請重新輸入') 
                        //#endregion 
                        //#endregion 

                        //#region 異動段
                        var sql = `INSERT INTO WEB_CompanyWeb 
                                    (WebNo ,WebName ,WebDesc
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,?
                                        ,? ,? ,? ,?)`;
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [WebNo, WebName, WebDesc
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
            router.post('/UpdateCompanyWeb', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {Id, WebName, WebDesc} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (Id <= 0) throw new Error('【網站Id】不可以為空')
                    if (WebName.length > 30) throw new Error('【網站名字】不可以超過30個字元')
                    if (WebName.length <= 0) throw new Error('【網站名字】不可以為空')
                    if (WebDesc.length > 100) throw new Error('【網站描述】不可以超過100個字元')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CwId
                                            FROM BAS_CompanyWeb
                                            WHERE 1=1
                                            AND CwId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `UPDATE WEB_CompanyWeb set 
                                    WebName = ?
                                    ,WebDesc = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CwId = ?
                                    `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [WebName, WebDesc, currentTime,currentUser, Id]);
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
            router.post('/DeleteCompanyWeb', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {CwId} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CwId <= 0) throw new Error('【網站】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CwId
                                            FROM WEB_CompanyWeb
                                            WHERE 1=1
                                            AND CwId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [CwId]);
                        if (resultCheck.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CompanyWeb 
                                    WHERE 1=1
                                    AND CwId = ? `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [CwId]);
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

        //#region  CyyEvent相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCyyEvent', (req, res) => {
                try{
                    //#region 宣告前端參數
                    if(!basic(req,res)) return
                    const {Id, CwId, EventName, EventDate,ShowNum,Index} = req.body;
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
                                            ,a.* 
                                            FROM WEB_CyyEvent a
                                            JOIN (
                                                SELECT COUNT('CeId') Total FROM WEB_CyyEvent 
                                            ) b
                                            WHERE 1=1`
                        //#endregion 

                        //#region 條件
                        if (Id > 0) {
                            conditions.push("a.CeId = ?");
                            params.push(Id);
                        }
                        if (EventName) {
                            conditions.push("a.EventName LIKE ?");
                            params.push('%' + EventName + '%');
                        }
                        if (EventDate) {
                            conditions.push("a.EventDate LIKE ?");
                            params.push('%' + EventDate + '%');
                        }
                        let sql = baseQuery;
                        if (conditions.length) {
                            sql += " AND " + conditions.join(" AND ");
                        }
                        //#endregion 

                        //#region 列表顯示設定
                        sql += ` ORDER BY 'a.CeId'`
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
            router.post('/AddCyyEvent', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CwId, EventName, EventText, EventDate} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (EventName.length > 10) throw new Error('【活動名稱】不可以超過300個字元')
                    if (EventName.length <= 0) throw new Error('【活動名稱】不可以為空'); 
                    if (EventText.length > 100) throw new Error('【活動文章】不可以超過1000個字元')
                    if (EventText.length <= 0) throw new Error('【活動文章】不可以為空')
                    if (EventDate.length <= 0) throw new Error('【活動日期】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        var checkSql = `SELECT CeId
                                            FROM WEB_CompanyWeb
                                            WHERE 1=1
                                            AND CwId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [CwId]);
                        if (resultCheck.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `INSERT INTO WEB_CyyEvent 
                                    (CwId,EventName ,EventText ,EventDate
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [CwId,EventName, EventText, EventDate
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
            router.post('/UpdateCyyEvent', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {Id, EventName, EventText, EventDate} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (EventName.length > 10) throw new Error('【活動名稱】不可以超過300個字元')
                    if (EventName.length <= 0) throw new Error('【活動名稱】不可以為空'); 
                    if (EventText.length > 100) throw new Error('【活動文章】不可以超過1000個字元')
                    if (EventText.length <= 0) throw new Error('【活動文章】不可以為空')
                    if (EventDate.length <= 0) throw new Error('【活動日期】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CeId
                                            FROM WEB_CyyEvent
                                            WHERE 1=1
                                            AND CeId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【活動不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `UPDATE WEB_CyyEvent set 
                                    EventName = ?
                                    ,EventText = ?
                                    ,EventDate = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CeId = ?
                                    `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [EventName, EventText, EventDate, currentTime,currentUser, Id]);
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
            router.post('/DeleteCyyEvent', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {CeId} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CeId <= 0) throw new Error('【活動】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CeId
                                            FROM WEB_CyyEvent
                                            WHERE 1=1
                                            AND CeId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [CeId]);
                        if (resultCheck.length <= 0) return SendError(res,'【活動不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CyyEvent 
                                    WHERE 1=1
                                    AND CeId = ? `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [CeId]);
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

        //#region  CyyIssues相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCyyIssues', (req, res) => {
                try{
                    //#region 宣告前端參數
                    if(!basic(req,res)) return
                    const {Id, CwId, IssuesName, IssuesDate,ShowNum,Index} = req.body;
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
                                            ,a.* 
                                            FROM WEB_CyyIssues a
                                            JOIN (
                                                SELECT COUNT('CiId') Total FROM WEB_CyyIssues 
                                            ) b
                                            WHERE 1=1`
                        //#endregion 

                        //#region 條件
                        if (Id > 0) {
                            conditions.push("a.CiId = ?");
                            params.push(Id);
                        }
                        if (IssuesName) {
                            conditions.push("a.IssuesName LIKE ?");
                            params.push('%' + IssuesName + '%');
                        }
                        if (IssuesDate) {
                            conditions.push("a.IssuesDate LIKE ?");
                            params.push('%' + IssuesDate + '%');
                        }
                        let sql = baseQuery;
                        if (conditions.length) {
                            sql += " AND " + conditions.join(" AND ");
                        }
                        //#endregion 

                        //#region 列表顯示設定
                        sql += ` ORDER BY 'a.CiId'`
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
            router.post('/AddCyyIssues', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CwId, IssuesName, IssuesText, IssuesDate} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (IssuesName.length > 10) throw new Error('【議題名稱】不可以超過300個字元')
                    if (IssuesName.length <= 0) throw new Error('【議題名稱】不可以為空'); 
                    if (IssuesText.length > 100) throw new Error('【議題文章】不可以超過1000個字元')
                    if (IssuesText.length <= 0) throw new Error('【議題文章】不可以為空')
                    if (IssuesDate.length <= 0) throw new Error('【議題日期】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        var checkSql = `SELECT CiId
                                            FROM WEB_CompanyWeb
                                            WHERE 1=1
                                            AND CwId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [CwId]);
                        if (resultCheck.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `INSERT INTO WEB_CyyIssues 
                                    (CwId,IssuesName ,IssuesText ,IssuesDate
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [CwId,IssuesName, IssuesText, IssuesDate
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
            router.post('/UpdateCyyIssues', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {Id, IssuesName, IssuesText, IssuesDate} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (IssuesName.length > 10) throw new Error('【議題名稱】不可以超過300個字元')
                    if (IssuesName.length <= 0) throw new Error('【議題名稱】不可以為空'); 
                    if (IssuesText.length > 100) throw new Error('【議題文章】不可以超過1000個字元')
                    if (IssuesText.length <= 0) throw new Error('【議題文章】不可以為空')
                    if (IssuesDate.length <= 0) throw new Error('【議題日期】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CiId
                                            FROM WEB_CyyIssues
                                            WHERE 1=1
                                            AND CiId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【議題不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `UPDATE WEB_CyyIssues set 
                                    IssuesName = ?
                                    ,IssuesText = ?
                                    ,IssuesDate = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CiId = ?
                                    `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [IssuesName, IssuesText, IssuesDate, currentTime,currentUser, Id]);
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
            router.post('/DeleteCyyIssues', (req, res) => {
                try{
                    //#region 宣告前端參數
                    var connection = CreateDBConnection()
                    basic(req)
                    const {CiId} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CiId <= 0) throw new Error('【議題】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        var checkSql = `SELECT CiId
                                            FROM WEB_CyyIssues
                                            WHERE 1=1
                                            AND CiId = ?
                                            LIMIT 1`
                        const checkQuery = util.promisify(connection.query).bind(connection);
                        const resultCheck = await checkQuery(checkSql, [CiId]);
                        if (resultCheck.length <= 0) return SendError(res,'【議題不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CyyIssues 
                                    WHERE 1=1
                                    AND CiId = ? `
                        const query = util.promisify(connection.query).bind(connection);
                        await query(sql, [CiId]);
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

    //#endregion  


    module.exports = router;
