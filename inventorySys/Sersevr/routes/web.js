    const express = require('express');
    const router = express.Router();
    const util = require('util');
    const configs = require('../config')
    var mysql = require('mysql');
    var currentTime = "";
    var currentUser = -1
    var currentCompany = -1
    let query

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
            query = util.promisify(connection.query).bind(connection);
            
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

    //#region Web
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
                        
                        const resultCheck = await query(checkSql, [CpId]);
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
                        
                        const resultCheck = await query(checkSql, [CpId]);
                        if (resultCheck.length <= 0) return SendError(res,'【圖片圖片】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CompanyPhoto 
                                    WHERE 1=1
                                    AND CpId = ? `
                        
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
                        
                        const resultCheck = await query(checkSql, [WebNo]);
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
                        
                        const resultCheck = await query(checkSql, [Id]);
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
                        
                        const resultCheck = await query(checkSql, [CwId]);
                        if (resultCheck.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CompanyWeb 
                                    WHERE 1=1
                                    AND CwId = ? `
                        
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

        
    //#endregion  

    //#region CyyWeb
        //#region  編輯器相關
            //#region 查看
            router.post('/GetCyyIndexContent', (req, res) => {
                try{
                    //#region 宣告前端參數
                    if(!basic(req,res)) return
                    const {CiContentId,CwId} = req.body;
                    //#endregion 

                    //#region 開始後端交易
                    var connection = CreateDBConnection()
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 基本查詢
                        var sql = `SELECT a.*
                                    , b1.PhotoName AS BannerPhotoName ,b1.PhotoHref AS BannerHref
                                    , b2.PhotoName AS AboutPhotoName ,b2.PhotoHref AS AboutHref
                                    , b3.PhotoName AS WebPhotoPhotoName ,b3.PhotoHref AS WebPhotoHref
                                    FROM WEB_CyyIndexContent a
                                    LEFT JOIN WEB_CompanyPhoto b1 on  b1.CpId = a.BannerPhotoId
                                    LEFT JOIN WEB_CompanyPhoto b2 on  b2.CpId = a.AboutPhotoId 
                                    LEFT JOIN WEB_CompanyPhoto b3 on  b3.CpId = a.WebPhotoId 
                                    WHERE CiContentId = ?
                                    AND CwId =?`
                        const baseQuery = util.promisify(connection.query).bind(connection);
                        const result = await baseQuery(sql, [CiContentId,CwId]);
                        if (result.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        SendSuccess(res,"",result)

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

            //#region 更新Banner
            router.post('/UpdateCyyWebBanner', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CwId,PhotoName, PhotoDesc, PhotoHref} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
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
                        
                        await query(sql, [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                        ,currentTime,currentTime,currentUser,currentUser]);
                        //#endregion 

                        //#region 获取最新插入的ID
                        var GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                        const result = await query(GetInsertedId);
                        //#endregion 

                        var CpId = -1;
                        result.forEach((item)=>{
                            CpId= item.id
                        })
                        //#region 異動段
                        var sql = `UPDATE WEB_CyyIndexContent set 
                                     BannerPhotoId = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CwId = ?
                                    `
                        const query1 = util.promisify(connection.query).bind(connection);
                        await query(sql, [CpId,currentTime,currentUser,CwId ]);
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

            //#region 刪除Banner
            router.post('/DeletCyyWebBanner', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CiContentId,CwId} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CiContentId.length <= 0) throw new Error('【版本資料】不可以為空')
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
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
                        var sql = `UPDATE WEB_CyyIndexContent set 
                                     BannerPhotoId = null
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CiContentId = ?
                                    AND CwId = ?
                                    `
                        const query1 = util.promisify(connection.query).bind(connection);
                        await query(sql, [currentTime,currentUser,CiContentId,CwId ]);
                        //#endregion 

                        //#region commit段
                        CommitRun("delete",connection,res,result)
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

            //#region 更新About
            router.post('/UpdateCyyWebAbout', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CiContentId,CwId,AboutText,PhotoName, PhotoDesc, PhotoHref,textChange,photoChange} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if(textChange){
                        if (AboutText.length > 300) throw new Error('【關於我】不可以超過300個字元')
                        if (AboutText.length <= 0) throw new Error('【關於我】不可以為空')
                    }
                    if(photoChange){
                        if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                        if (PhotoName.length > 100) throw new Error('【圖片名字】不可以超過100個字元')
                        if (PhotoName.length <= 0) throw new Error('【圖片名字】不可以為空')
                        if (PhotoDesc.length > 100) throw new Error('【圖片描述】不可以超過100個字元')
                        if (PhotoHref.length <= 0) throw new Error('【圖片連結】不可以為空')
                    }
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        var checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                        
                        const resultCheck = await query(checkSql, [CwId,CiContentId]);
                        if (resultCheck.length <= 0) return SendError(res,'【編輯版本不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        //#region 新增圖片段
                        var CpId = -1;
                        if(photoChange){
                            var sql = `INSERT INTO WEB_CompanyPhoto 
                                        (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                            ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                        VALUES
                                        (? ,? ,? ,?
                                            ,? ,? ,? ,?)`;
                            
                            await query(sql, [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                            ,currentTime,currentTime,currentUser,currentUser]);

                            //#region 获取最新插入的ID
                            var GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                            const result = await query(GetInsertedId);

                            result.forEach((item)=>{
                                CpId= item.id
                            })
                            //#endregion 
                        }
                        //#endregion 

                        //#region 更新About資料
                        var AboutTextSql = `,AboutText = ?`
                        var AboutPhotoSql = `,AboutPhotoId = ?`
                        
                        let updates = [currentTime,currentUser];
                        if(textChange){
                            updates.push(AboutText)
                        }
                        if(photoChange){
                            updates.push(CpId)
                        }
                        updates.push(CwId,CiContentId)

                        var sql = `UPDATE WEB_CyyIndexContent set 
                                     UpdateDate = ?
                                    ,UpdateUserId = ?
                                    ${textChange == true ? AboutTextSql : ``}
                                    ${photoChange == true ? AboutPhotoSql : ``}
                                    WHERE 1=1
                                    AND CwId = ?
                                    AND CiContentId = ?
                                    `
                        const query1 = util.promisify(connection.query).bind(connection);
                        await query1(sql, updates);
                        //#endregion 
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
            });
            //#endregion 

            //#region 刪除About
            router.post('/DeletCyyWebAbout', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CiContentId,CwId,textChange,photoChange} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CiContentId.length <= 0) throw new Error('【版本資料】不可以為空')
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        var checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                        
                        const resultCheck = await query(checkSql, [CwId,CiContentId]);
                        if (resultCheck.length <= 0) return SendError(res,'【編輯版本不存在】,請重新確認');
                        //#endregion 
                       
                        //#region 異動段
                        var AboutTextSql = `,AboutText = null`
                        var AboutPhotoSql = `,AboutPhotoId = null`
                        var sql = `UPDATE WEB_CyyIndexContent set 
                                     UpdateDate = ?
                                    ,UpdateUserId = ?
                                    ${textChange == true ? AboutTextSql : ``}
                                    ${photoChange == true ? AboutPhotoSql : ``}
                                    WHERE 1=1
                                    AND CwId = ?
                                    AND CiContentId = ?
                                    `
                        const query1 = util.promisify(connection.query).bind(connection);
                        await query1(sql, [currentTime,currentUser,CwId ,CiContentId]);
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

            //#region 更新Footer
            router.post('/UpdateCyyWebFooter', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CiContentId,CwId,FootTitle,ContactAddress,ContactPhone,ContactEmail,ServiceTime,CopyrightNotice} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CiContentId.length <= 0) throw new Error('【版本資料】不可以為空')
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                    if (FootTitle.length > 30) throw new Error('【標題】不可以超過30個字元')
                    if (FootTitle.length <= 0) throw new Error('【標題】不可以為空')
                    if (ContactAddress.length > 30) throw new Error('【聯絡地址】不可以超過30個字元')
                    if (ContactAddress.length <= 0) throw new Error('【聯絡地址】不可以為空')
                    if (ContactPhone.length > 30) throw new Error('【聯絡電話】不可以超過30個字元')
                    if (ContactPhone.length <= 0) throw new Error('【聯絡電話】不可以為空')
                    if (ContactEmail.length > 30) throw new Error('【聯絡信箱】不可以超過30個字元')
                    if (ContactEmail.length <= 0) throw new Error('【聯絡信箱】不可以為空')
                    if (ServiceTime.length > 30) throw new Error('【服務時間】不可以超過30個字元')
                    if (ServiceTime.length <= 0) throw new Error('【服務時間】不可以為空')
                    if (CopyrightNotice.length > 30) throw new Error('【版權聲明】不可以超過30個字元')
                    if (CopyrightNotice.length <= 0) throw new Error('【版權聲明】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        var checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                        
                        const resultCheck = await query(checkSql, [CwId,CiContentId]);
                        if (resultCheck.length <= 0) return SendError(res,'【編輯版本不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        
                        //#region 更新footer資料
                        var sql = `UPDATE WEB_CyyIndexContent set 
                                     FootTitle = ?
                                    ,ContactAddress = ?
                                    ,ContactPhone = ?
                                    ,ContactEmail = ?
                                    ,ServiceTime = ?
                                    ,CopyrightNotice = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CwId = ?
                                    AND CiContentId = ?
                                    `
                        const query1 = util.promisify(connection.query).bind(connection);
                        await query1(sql, [FootTitle,ContactAddress,ContactPhone,ContactEmail,ServiceTime,CopyrightNotice
                            ,currentTime,currentUser,CwId,CiContentId]);
                        //#endregion 
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
            });
            //#endregion 

            //#region 刪除Footer
            router.post('/DeletCyyWebFooter', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    var connection = CreateDBConnection()
                    basic(req,res)
                    const {CiContentId,CwId} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (CiContentId.length <= 0) throw new Error('【版本資料】不可以為空')
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 檢查段
                        var checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                        
                        const resultCheck = await query(checkSql, [CwId,CiContentId]);
                        if (resultCheck.length <= 0) return SendError(res,'【編輯版本不存在】,請重新確認');
                        //#endregion 
                       
                        //#region 異動段
                        var sql = `UPDATE WEB_CyyIndexContent set 
                                     FootTitle = null
                                    ,ContactAddress = null
                                    ,ContactPhone = null
                                    ,ContactEmail = null
                                    ,CopyrightNotice = null
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CwId = ?
                                    AND CiContentId = ?
                                    `
                        const query1 = util.promisify(connection.query).bind(connection);
                        await query1(sql, [currentTime,currentUser,CwId ,CiContentId]);
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
                        
                        const resultCheck = await query(checkSql, [CwId]);
                        if (resultCheck.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `INSERT INTO WEB_CyyEvent 
                                    (CwId,EventName ,EventText ,EventDate
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                        
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
                        
                        const resultCheck = await query(checkSql, [Id]);
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
                        
                        const resultCheck = await query(checkSql, [CeId]);
                        if (resultCheck.length <= 0) return SendError(res,'【活動不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CyyEvent 
                                    WHERE 1=1
                                    AND CeId = ? `
                        
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
                        
                        const resultCheck = await query(checkSql, [CwId]);
                        if (resultCheck.length <= 0) return SendError(res,'【網站不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `INSERT INTO WEB_CyyIssues 
                                    (CwId,IssuesName ,IssuesText ,IssuesDate
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                        
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
                        
                        const resultCheck = await query(checkSql, [Id]);
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
                        
                        const resultCheck = await query(checkSql, [CiId]);
                        if (resultCheck.length <= 0) return SendError(res,'【議題不存在】,請重新確認');
                        //#endregion 

                        //#region 異動段
                        var sql = `DELETE FROM WEB_CyyIssues 
                                    WHERE 1=1
                                    AND CiId = ? `
                        
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

        //#region  CyyProduct相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCyyProduct', (req, res) => {
                try{
                    if(!basic(req,res)) return

                    //#region 宣告前端參數
                    const {Id, MtlItemId, ProductName,ShowNum,Index} = req.body;
                    let conditions = []; //條件查詢容器
                    let params = [];; //參數容器
                    let sql; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    var connection = CreateDBConnection()
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }

                        //#region 基本查詢
                        sql = `SELECT b.Total
                                ,a.CpdId SelectId ,a1.MtlItemNo SelectNo ,a.ProductName SelectName                 
                                ,a.* 
                                ,a3.CpId,a3.PhotoName,a3.PhotoDesc,a3.PhotoHref
                                FROM WEB_CyyProduct a
                                INNER JOIN CM_MtlItem a1 on a.MtlItemId = a1.MtlItemId
                                INNER JOIN WEB_CyyProductPhoto a2 on a.CpdId = a2.CpdId
                                INNER JOIN WEB_CompanyPhoto a3 on a2.PhotoId = a3.CpId
                                JOIN (
                                    SELECT COUNT('CpdId') Total FROM WEB_CyyProduct 
                                ) b
                                WHERE 1=1
                                AND a2.MainSeting = 'Y'`
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
            router.post('/AddCyyProduct', (req, res) => {
                try{
                    if(!basic(req,res)) return

                    //#region 參數宣告+資料庫連接
                    const {CwId, MtlItemId, ProductName, ProductText, ProductAmount, GroupSetting
                        ,CpId ,PhotoName ,PhotoDesc, PhotoHref} = req.body;
                    let checkSql
                    let sql
                    let resultCheck
                    let result
                    let params
                    //#endregion 

                    //#region 參數檢查
                    if (CwId <= 0) throw new Error('【官網】不可以為空'); 
                    if (MtlItemId <= 0) throw new Error('【品號】不可以為空'); 

                    if(CpId<=0){
                        if (ProductName.length > 1000) throw new Error('【產品名稱】不可以超過1000個字元')
                        if (ProductName.length <= 0) throw new Error('【產品名稱】不可以為空'); 
                        if (ProductText.length > 1000) throw new Error('【產品文案】不可以超過1000個字元')
                        if (ProductText.length <= 0) throw new Error('【產品文案】不可以為空')
                        if (ProductAmount < 0) throw new Error('【產品金額】不可以為負')
                    }
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
                            params = [CwId]
                            resultCheck = await query(checkSql, params);
                            if (resultCheck.length <= 0) return SendError(res,'【官網】不存在,請重新確認') 
                        } 
                        catch(err) {
                            return SendError(res,err.message) 
                        }
                        //#endregion 

                        //#region 品號是否存在
                        checkSql = `SELECT MtlItemId
                                    FROM CM_MtlItem
                                    WHERE 1=1
                                    AND MtlItemId = ?
                                    LIMIT 1`
                        try {
                            params = [MtlItemId]

                            resultCheck = await query(checkSql, params);
                            if (resultCheck.length <= 0) return SendError(res,'【品號】不存在,請重新確認') 
                        } 
                        catch(err) {
                            return SendError(res,err.message) 
                        }
                        //#endregion 
                        
                        //#region 圖片是否存在
                        if(CpId>0){
                            checkSql = `SELECT CpId
                                        FROM WEB_CompanyPhoto
                                        WHERE 1=1
                                        AND CpId = ?
                                        LIMIT 1`
                            try {
                                params = [CpId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) return SendError(res,'【圖片】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                        }
                        //#endregion 
                        
                        //#endregion 

                        //#region 異動段
                        //#region 產品新增
                        let CpdId
                        sql = `INSERT INTO WEB_CyyProduct 
                                    (CwId ,MtlItemId ,ProductName ,ProductText ,ProductAmount ,GroupSetting
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                        try {
                            params = [CwId, MtlItemId, ProductName, ProductText, ProductAmount, GroupSetting
                                ,currentTime,currentTime,currentUser,currentUser]
                            await query(sql, params);

                            //#region 取得最新插入的ID
                            let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                            try {
                                result = await query(GetInsertedId);
                                result.forEach((item)=>{
                                    CpdId = item.id
                                })
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 
                        } 
                        catch(err) {
                            return SendError(res,err.message) 
                        }
                        

                        //#endregion 
                        
                        //#region 產品圖片新增
                        if(CpId <=0){
                            sql = `INSERT INTO WEB_CompanyPhoto 
                                    (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                            try {
                                params = [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                    ,currentTime,currentTime,currentUser,currentUser]
                                await query(sql, params);
                                //#region 取得最新插入的ID
                                let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                                try {
                                    result = await query(GetInsertedId);
                                    result.forEach((item)=>{
                                        CpId = item.id
                                    })
                                } 
                                catch(err) {
                                    return SendError(res,err.message) 
                                }
                                //#endregion 
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                        }
                        //#endregion 
                        
                        //#region 產品圖片群集新增
                        sql = `INSERT INTO WEB_CyyProductPhoto 
                                (CpdId ,PhotoId ,MainSeting
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?
                                    ,? ,? ,? ,?)`;
                        try {
                            params = [CpdId, CpId, 'Y'
                            ,currentTime,currentTime,currentUser,currentUser]
                            await query(sql, params);
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

                    //#region 參數宣告+資料庫連接
                    const {Id,CwId, MtlItemId, ProductName, ProductText, ProductAmount, GroupSetting
                        ,PhotoName ,PhotoDesc, PhotoHref, photoChange} = req.body;
                    let checkSql
                    let sql
                    let resultCheck
                    let result
                    let params
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
                            params = [CwId]
                            resultCheck = await query(checkSql, params);
                            if (resultCheck.length <= 0) return SendError(res,'【官網】不存在,請重新確認') 
                        } 
                        catch(err) {
                            return SendError(res,err.message) 
                        }
                        //#endregion 

                        //#region 品號是否存在
                        let MtlItemStatus
                        checkSql = `SELECT Status
                                    FROM CM_MtlItem
                                    WHERE 1=1
                                    AND MtlItemId = ?
                                    LIMIT 1`
                        try {
                            params = [MtlItemId]
                            resultCheck = await query(checkSql, params);
                            if (resultCheck.length <= 0) return SendError(res,'【品號】不存在,請重新確認') 
                            resultCheck.forEach((item)=>{
                                MtlItemStatus = item.Status
                            })
                        } 
                        catch(err) {
                            return SendError(res,err.message) 
                        }
                        //#endregion 
                        //#endregion 

                        //#region 異動段

                        //#region 更新
                        sql = `UPDATE WEB_CyyProduct set 
                                ${MtlItemStatus != "A" ? `MtlItemId = ?`: `` }
                                ,ProductName = ?
                                ,ProductText = ?
                                ,ProductAmount = ?
                                ,GroupSetting = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND CpdId = ?
                                `
                        try {
                            params = [ProductName ,ProductText ,ProductAmount ,GroupSetting
                                , currentTime,currentUser, Id]
                            if (MtlItemStatus !== "A") {
                                params.unshift(MtlItemId); // 在参数列表的开头插入 MtlItemId
                            }
                            await query(sql, params);
                        } 
                        catch(err) {
                            return SendError(res,err.message) 
                        }
                        //#endregion 

                        if(photoChange){
                            //#region 產品圖片新增
                            let CpId
                            sql = `INSERT INTO WEB_CompanyPhoto 
                                    (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                            try {
                                params = [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                    ,currentTime,currentTime,currentUser,currentUser]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#region 取得最新插入的ID
                            let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                            try {
                                result = await query(GetInsertedId);
                                result.forEach((item)=>{
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
                                params = [Id, CpId, 'Y'
                                    ,currentTime,currentTime,currentUser,currentUser]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 
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
                    const {CpdId} = req.body;
                    let checkSql
                    let sql
                    let resultCheck
                    let params
                    //#endregion 

                    //#region 參數檢查
                    if (CpdId <= 0) throw new Error('【庫別】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    let connection = CreateDBConnection()
                    connection.beginTransaction(async (transactionError) => {
                        if(transactionError) {
                            console.error("開啟後端交易失敗:", transactionError);
                            return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                        }
                        //#region 檢查段
                        checkSql = `SELECT CpdId
                                    FROM WEB_CyyProduct
                                    WHERE 1=1
                                    AND CpdId = ?
                                    LIMIT 1`
                        try {
                            params = [CpdId]
                            resultCheck = await query(checkSql, params);
                            if (resultCheck.length <= 0) return SendError(res,'【產品】不存在,請重新確認');
                        } 
                        catch(err) {
                            return SendError(res,err.message) 
                        }
                        //#endregion 

                        //#region 異動段
                        sql = `DELETE FROM WEB_CyyProduct 
                                WHERE 1=1
                                AND CpdId = ? `
                        try {
                            params = [CpdId]
                            await query(sql, params);
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

    //#endregion  

    


    module.exports = router;
