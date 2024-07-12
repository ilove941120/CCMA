    const express = require('express');
    const router = express.Router();
    const util = require('util');
    const configs = require('../config')
    var mysql = require('mysql');
    var currentTime = "";
    var currentUser = -1
    var currentCompany = -1
    let connection,query,action,sql,result,checkSql,resultCheck

    router.use((req, res, next) => {
        action = req.url
        if(!basic(req,res)) return
        CreateDBConnection(action)
        next();
    });

    //#region 公用程式
        //#region 開啟連線
        function CreateDBConnection(action) {
            connection = mysql.createConnection(configs.mysql); // 填入你的数据库配置
            connection.connect(function(err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log(`連線id:${connection.threadId},觸發程式:web${action}`);
            });
            query = util.promisify(connection.query).bind(connection);
        }
        //#endregion 

        //#region 後端交易失敗
        function TransactionError(res,Error){
            console.error(`開啟後端交易失敗:${Error}`);
            return `開啟後端交易失敗:${Error}`
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
            res.status(200).send({ status: 'success', msg:success, data:result });
        }
        //#endregion 

        //#region 回傳錯誤
        function SendError(res,err) {
            console.error(`執行${action}出現錯誤:${err}`);
            res.status(400).send({ status: 'error', msg:`執行${action}出現錯誤:${err}` });
            connection.end();
        }
        //#endregion 

        //#region Commit段
        async function CommitRun(type, connection, res, result) {
            try {
                await connection.commit();
                switch(type){
                    case "get":
                        SendSuccess(res, "", result);
                        break;
                    case "read":
                        SendSuccess(res, "查看成功!!", result);
                        break;
                    case "add":
                        SendSuccess(res, "新增成功!!", result);
                        break;
                    case "update":
                        SendSuccess(res, "更新成功!!", "");
                        break;
                    case "delete":
                        SendSuccess(res, "刪除成功!!", "");
                        break;
                    case "Logein":
                        SendSuccess(res, "登入成功!!", result);
                        break;
                }
            } catch (commitError) {
                try {
                    await connection.rollback();
                } catch (rollbackError) {
                    console.error("Rollback Error:", rollbackError);
                }
                console.error("Commit Error:", commitError);
                return res.status(500).send({ msg: 'error', err: 'Commit Error' });
            } finally {
                connection.end();
            }
        }
        //#endregion 

    //#endregion 

    //#region Web
        //#region  CompanyPhoto相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCompanyPhoto',async (req, res) => {
                try{
                    //#region 宣告參數
                    let conditions= []; //條件查詢容器,參數容器
                    let params = []; //條件查詢容器,參數容器
                    const {CpId, PhotoNo, PhotoName,ChildreUse,ShowNum,Index} = req.body;
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 基本查詢
                            sql = `SELECT COUNT(a.CpId) OVER() Total
                                    ,a.*
                                    FROM WEB_CompanyPhoto a
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
                            if (conditions.length) {
                                sql += " AND " + conditions.join(" AND ");
                            }
                            //#endregion 

                            //#region 列表顯示設定
                            sql += ` ORDER BY a.CpId`
                            if(ShowNum >0 && Index >=0){
                                sql += " LIMIT ? OFFSET ?";
                                params.push(ShowNum);
                                params.push(Index);
                            }
                            //#endregion 

                            //#region 執行
                            try{
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion 

                        });
                    });
                    //#endregion 
                
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 
            
            //#region 新增
            router.post('/AddCompanyPhoto',async (req, res) => {
                try{
                    //#region 參數宣告
                    let params = []; //條件查詢容器,參數容器
                    const {PhotoName, PhotoDesc, PhotoHref} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (PhotoName.length > 100) throw new Error('【圖片名字】不可以超過100個字元')
                    if (PhotoName.length <= 0) throw new Error('【圖片名字】不可以為空')
                    if (PhotoDesc.length > 100) throw new Error('【圖片描述】不可以超過100個字元')
                    if (PhotoHref.length <= 0) throw new Error('【圖片連結】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            //#endregion 

                            //#region 異動段
                            sql = `INSERT INTO WEB_CompanyPhoto 
                                    (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                            try{
                                params = [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                    ,currentTime,currentTime,currentUser,currentUser]
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 获取最新插入的ID
                            let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                            try {
                                result = await query(GetInsertedId);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("add",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新
            router.post('/UpdateCompanyPhoto',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CpId,PhotoName, PhotoDesc} = req.body;
                    let params = []; //條件查詢容器,參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (PhotoName.length > 100) throw new Error('【圖片名字】不可以超過100個字元')
                    if (PhotoName.length <= 0) throw new Error('【圖片名字】不可以為空')
                    if (PhotoDesc.length > 100) throw new Error('【圖片描述】不可以超過100個字元')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                        
                            //#region 檢查段
                            checkSql = `SELECT CpId
                                        FROM WEB_CompanyPhoto
                                        WHERE 1=1
                                        AND CpId = ?
                                        LIMIT 1`
                            try {
                                params = [CpId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【品號】不存在,請重新確認');
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `UPDATE WEB_CompanyPhoto set 
                                    PhotoName = ?
                                    ,PhotoDesc = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CpId = ?
                                    `
                            try {
                                params = [PhotoName, PhotoDesc, currentTime,currentUser, CpId]
                                resultCheck = await query(sql, params);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 刪除
            router.post('/DeleteCompanyPhoto',async (req, res) => {
                try{
                    //#region 宣告前端參數
                    const {CpId} = req.body;
                    let params = []; //條件查詢容器,參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (CpId <= 0) throw new Error('【圖片】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                            //#region 檢查段
                            checkSql = `SELECT CpId
                                        FROM WEB_CompanyPhoto
                                        WHERE 1=1
                                        AND CpId = ?
                                        LIMIT 1`
                            try {
                                params = [CpId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【圖片】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `DELETE FROM WEB_CompanyPhoto 
                                    WHERE 1=1
                                    AND CpId = ? `
                            try {
                                params = [CpId]
                                result = await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 
        //#endregion 

        //#region  CompanyWeb相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCompanyWeb',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {Id, WebNo, WebName,ShowNum,Index} = req.body;
                    let conditions = []; //條件查詢容器
                    let params = []; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 基本查詢
                            sql = `SELECT COUNT(a.CwId) OVER() Total
                                    ,a.CwId SelectId ,a.WebNo SelectNo ,a.WebName SelectName                 
                                    ,a.* 
                                    FROM WEB_CompanyWeb a
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
                            try{
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 
            
            //#region 新增
            router.post('/AddCompanyWeb',async (req, res) => {
                try{

                    //#region 參數宣告+資料庫連接
                    let params = []; //條件查詢容器,參數容器
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
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            //#region 檢查網站代碼是否重複
                            checkSql = `SELECT WebNo
                                        FROM WEB_CompanyWeb
                                        WHERE 1=1
                                        AND WebNo = ?
                                        LIMIT 1`
                            try {
                                params = [WebNo]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length > 0) throw new Error('【網站代碼】重複,請重新確認');
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 
                            //#endregion 

                            //#region 異動段
                            var sql = `INSERT INTO WEB_CompanyWeb 
                                        (CompnayId, WebNo ,WebName ,WebDesc
                                            ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                        VALUES
                                        (?, ? ,? ,?
                                            ,? ,? ,? ,?)`;
                            try {
                                params = [currentCompany, WebNo, WebName, WebDesc
                                    ,currentTime,currentTime,currentUser,currentUser]
                                resultCheck = await query(sql, params);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 获取最新插入的ID
                            let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                            try {
                                result = await query(GetInsertedId);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("add",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新
            router.post('/UpdateCompanyWeb',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    let params = []; //條件查詢容器,參數容器
                    const {Id, WebName, WebDesc} = req.body;
                    //#endregion 

                    //#region 參數檢查
                    if (Id <= 0) throw new Error('【網站Id】不可以為空')
                    if (WebName.length > 30) throw new Error('【網站名字】不可以超過30個字元')
                    if (WebName.length <= 0) throw new Error('【網站名字】不可以為空')
                    if (WebDesc.length > 100) throw new Error('【網站描述】不可以超過100個字元')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                            //#region 檢查段
                            checkSql = `SELECT CwId
                                        FROM WEB_CompanyWeb
                                        WHERE 1=1
                                        AND CwId = ?
                                        LIMIT 1`
                            try{
                                params = [Id]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【網站】不存在,請重新確認');
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `UPDATE WEB_CompanyWeb set 
                                    WebName = ?
                                    ,WebDesc = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CwId = ?
                                    `
                            try {
                                params = [WebName, WebDesc, currentTime,currentUser, Id]
                                resultCheck = await query(sql, params);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 刪除
            router.post('/DeleteCompanyWeb',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CwId} = req.body;
                    let params = []; //條件查詢容器,參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (CwId <= 0) throw new Error('【網站】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                            //#region 檢查段
                            checkSql = `SELECT CwId
                                        FROM WEB_CompanyWeb
                                        WHERE 1=1
                                        AND CwId = ?
                                        LIMIT 1`
                            try {
                                params = [CwId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【網站】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            var sql = `DELETE FROM WEB_CompanyWeb 
                                        WHERE 1=1
                                        AND CwId = ? `
                            try {
                                params = [CwId]
                                resultCheck = await query(sql, params);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 
        //#endregion 

        
    //#endregion  

    //#region CyyWeb
        //#region  編輯器相關
            //#region 查看
            router.post('/GetCyyIndexContent',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CiContentId,CwId} = req.body;
                    let params = []; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                            //#region 基本查詢
                            sql = `SELECT a.*
                                    , b1.PhotoName AS BannerPhotoName ,b1.PhotoHref AS BannerHref
                                    , b2.PhotoName AS AboutPhotoName ,b2.PhotoHref AS AboutHref
                                    , b3.PhotoName AS WebPhotoPhotoName ,b3.PhotoHref AS WebPhotoHref
                                    FROM WEB_CyyIndexContent a
                                    LEFT JOIN WEB_CompanyPhoto b1 on  b1.CpId = a.BannerPhotoId
                                    LEFT JOIN WEB_CompanyPhoto b2 on  b2.CpId = a.AboutPhotoId 
                                    LEFT JOIN WEB_CompanyPhoto b3 on  b3.CpId = a.WebPhotoId 
                                    WHERE CiContentId = ?
                                    AND CwId =?`
                            try {
                                params = [CiContentId,CwId]
                                result = await query(sql, params);
                                if (result.length <= 0) throw new Error('【網站】不存在,請重新確認');
                                result.forEach((item)=>{
                                    if(item.MainSeting == "Y") throw new Error('【產品圖片】目前為主圖片不可以刪除,請先切換主圖片再刪除');
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 查看產品輪播
            router.post('/GetCyyIndexProductSiwper',async (req, res) => {
                try{
                    //#region 宣告前端參數
                    const {CwId} = req.body;
                    let params = [];; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 基本查詢
                            sql = `SELECT a.CpdId,a.ProductName,a.ProductAmount
                                    ,a1.PhotoId,a1.MainSeting,a2.PhotoHref,a2.PhotoDesc,a2.PhotoName
                                    FROM web_cyyproduct a
                                    INNER JOIN web_cyyproductphoto a1 on a.CpdId = a1.CpdId
                                    INNER JOIN web_companyphoto a2 on a1.PhotoId = a2.CpId
                                    WHERE 1=1
                                    AND a.CwId = ?
                                    AND a.Status = 'A'
                                    AND a.GroupSetting = '1'
                                    AND a1.MainSeting = 'Y'`
                            try {
                                params = [CwId]
                                result = await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion 

                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新Banner
            router.post('/UpdateCyyWebBanner',async (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    const {CwId,PhotoName, PhotoDesc, PhotoHref} = req.body;
                    let params = []; //條件查詢容器,參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                    if (PhotoName.length > 100) throw new Error('【圖片名字】不可以超過100個字元')
                    if (PhotoName.length <= 0) throw new Error('【圖片名字】不可以為空')
                    if (PhotoDesc.length > 100) throw new Error('【圖片描述】不可以超過100個字元')
                    if (PhotoHref.length <= 0) throw new Error('【圖片連結】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            //#endregion 

                            //#region 異動段
                            sql = `INSERT INTO WEB_CompanyPhoto 
                                    (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,? ,?
                                        ,? ,? ,? ,?)`;
                            try {
                                params = [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                    ,currentTime,currentTime,currentUser,currentUser]
                                result = await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 获取最新插入的ID
                            let CpId = -1;
                            let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                            try {
                                result = await query(GetInsertedId);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            result.forEach((item)=>{
                                CpId= item.id
                            })
                            //#endregion 

                            

                            //#region 異動段
                            sql = `UPDATE WEB_CyyIndexContent set 
                                        BannerPhotoId = ?
                                        ,UpdateDate = ?
                                        ,UpdateUserId = ?
                                        WHERE 1=1
                                        AND CwId = ?
                                    `
                            try{
                                params = [CpId,currentTime,currentUser,CwId ]
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("add",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 刪除Banner
            router.post('/DeletCyyWebBanner',async (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    const {CiContentId,CwId} = req.body;
                    let params = []; //條件查詢容器,參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (CiContentId.length <= 0) throw new Error('【版本資料】不可以為空')
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            //#endregion 
                        
                            //#region 異動段
                            sql = `UPDATE WEB_CyyIndexContent set 
                                    BannerPhotoId = null
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CiContentId = ?
                                    AND CwId = ?
                                    `
                            try {
                                params = [currentTime,currentUser,CiContentId,CwId ]
                                result = await query(sql, params);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("delete",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新About
            router.post('/UpdateCyyWebAbout',async (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    const {CiContentId,CwId,AboutText,PhotoName, PhotoDesc, PhotoHref,textChange,photoChange} = req.body;
                    let params = []; //條件查詢容器,參數容器
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
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                            try {
                                params = [CwId,CiContentId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【編輯版本】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            //#region 新增圖片段
                            let CpId = -1;
                            if(photoChange){
                                sql = `INSERT INTO WEB_CompanyPhoto 
                                        (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                            ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                        VALUES
                                        (? ,? ,? ,?
                                            ,? ,? ,? ,?)`;
                                try {
                                    params = [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                        ,currentTime,currentTime,currentUser,currentUser]
                                    result = await query(sql, params);
                                } 
                                catch(err) {
                                    return reject(new Error(err));
                                }

                                //#region 获取最新插入的ID
                                let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                                try {
                                    result = await query(GetInsertedId);
                                } 
                                catch(err){
                                    return reject(new Error(err));
                                }
                                result.forEach((item)=>{
                                    CpId= item.id
                                })
                                //#endregion 
                            }
                            //#endregion 

                            //#region 更新About資料
                            let AboutTextSql = `,AboutText = ?`
                            let AboutPhotoSql = `,AboutPhotoId = ?`
                            
                            let updates = [currentTime,currentUser];
                            if(textChange){
                                updates.push(AboutText)
                            }
                            if(photoChange){
                                updates.push(CpId)
                            }
                            updates.push(CwId,CiContentId)

                            sql = `UPDATE WEB_CyyIndexContent set 
                                    UpdateDate = ?
                                    ,UpdateUserId = ?
                                    ${textChange == true ? AboutTextSql : ``}
                                    ${photoChange == true ? AboutPhotoSql : ``}
                                    WHERE 1=1
                                    AND CwId = ?
                                    AND CiContentId = ?
                                    `
                            try{
                                result = await query(sql, updates);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 
                            //#endregion 

                            //#region commit段
                            await CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 刪除About
            router.post('/DeletCyyWebAbout',async (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    const {CiContentId,CwId,textChange,photoChange} = req.body;
                    let params = []; //條件查詢容器,參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (CiContentId.length <= 0) throw new Error('【版本資料】不可以為空')
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                            try {
                                params = [CwId,CiContentId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【編輯版本】不存在,請重新確認');
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 
                        
                            //#region 異動段
                            let AboutTextSql = `,AboutText = null`
                            let AboutPhotoSql = `,AboutPhotoId = null`
                            sql = `UPDATE WEB_CyyIndexContent set 
                                    UpdateDate = ?
                                    ,UpdateUserId = ?
                                    ${textChange == true ? AboutTextSql : ``}
                                    ${photoChange == true ? AboutPhotoSql : ``}
                                    WHERE 1=1
                                    AND CwId = ?
                                    AND CiContentId = ?
                                    `
                            try {
                                params = [currentTime,currentUser,CwId ,CiContentId]
                                resultCheck = await query(sql, params);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新ShopText
            router.post('/UpdateCyyWebShopText',async (req, res) => {
                try{

                    //#region 參數宣告+資料庫連接
                    const {CiContentId,CwId,ShopText,textChange} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if(textChange){
                        if (ShopText.length > 300) throw new Error('【商品店標語】不可以超過300個字元')
                        if (ShopText.length <= 0) throw new Error('【商品店標語】不可以為空')
                    }
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                            try {
                                params = [CwId,CiContentId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【編輯版本】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            
                            //#region 更新About資料
                            sql = `UPDATE WEB_CyyIndexContent set 
                                    ShopText = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CwId = ?
                                    AND CiContentId = ?
                                `
                            try {
                                params = [ShopText,currentTime,currentUser,CwId,CiContentId]
                                result = await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 
                            //#endregion 

                            //#region commit段
                            await CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新Footer
            router.post('/UpdateCyyWebFooter',async (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    const {CiContentId,CwId,FootTitle,ContactAddress,ContactPhone,ContactEmail,ServiceTime,CopyrightNotice} = req.body;
                    let params = []; //參數容器
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
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                            try {
                                params = [CwId,CiContentId]
                                resultCheck = await query(sql, params);
                                if (resultCheck.length <= 0) throw new Error('【編輯版本】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            
                            //#region 更新footer資料
                            sql = `UPDATE WEB_CyyIndexContent set 
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
                            try {
                                params = [FootTitle,ContactAddress,ContactPhone,ContactEmail,ServiceTime,CopyrightNotice
                                    ,currentTime,currentUser,CwId,CiContentId]
                                result = await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 
                            //#endregion 

                            //#region commit段
                            await CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 刪除Footer
            router.post('/DeletCyyWebFooter',async (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    const {CiContentId,CwId} = req.body;
                    let params = []; //參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (CiContentId.length <= 0) throw new Error('【版本資料】不可以為空')
                    if (CwId.length <= 0) throw new Error('【官網資料】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            checkSql = `SELECT CwId
                                        FROM WEB_CyyIndexContent
                                        WHERE 1=1
                                        AND CwId = ?
                                        AND CiContentId = ?
                                        LIMIT 1`
                            try {
                                params = [CwId,CiContentId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【編輯版本】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 
                        
                            //#region 異動段
                            sql = `UPDATE WEB_CyyIndexContent set 
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
                            try {
                                params = [currentTime,currentUser,CwId ,CiContentId]
                                result = await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

        //#endregion 

        //#region  CyyEvent相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCyyEvent',async (req, res) => {
                try{
                    if(!basic(req,res)) return
                    //#region 宣告前端參數
                    const {Id, CwId, EventName, EventDate,ShowNum,Index} = req.body;
                    let conditions = []; //條件查詢容器
                    let params = []; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 基本查詢
                            baseQuery = `SELECT COUNT(a.CeId) OVER() Total
                                        ,a.* 
                                        ,DATE_FORMAT(a.EventDate,'%Y-%m-%d') EventDate
                                        ,a2.PhotoName,a2.PhotoDesc,a2.PhotoHref
                                        FROM WEB_CyyEvent a
                                        LEFT JOIN WEB_CyyEventPhoto a1 on a.CeId = a1.CeId
                                        LEFT JOIN WEB_CompanyPhoto a2 on a1.PhotoId = a2.CpId
                                        WHERE 1=1
                                        AND a1.MainSeting = 'Y'`
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
                            try{
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion 

                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }            
            });
            //#endregion 
            
            //#region 新增
            router.post('/AddCyyEvent',async (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    const {CwId, EventName, EventText, EventDate
                        ,CpId ,PhotoName ,PhotoDesc, PhotoHref} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (EventName.length > 300) throw new Error('【活動名稱】不可以超過300個字元')
                    if (EventName.length <= 0) throw new Error('【活動名稱】不可以為空'); 
                    if (EventText.length > 1000) throw new Error('【活動文章】不可以超過1000個字元')
                    if (EventText.length <= 0) throw new Error('【活動文章】不可以為空')
                    if (EventDate.length <= 0) throw new Error('【活動日期】不可以為空')
                    if(CpId<=0){
                        if (PhotoName.length <= 0) throw new Error('【圖片名稱】不可以為負')
                        if (PhotoDesc.length <= 0) throw new Error('【圖片描述】不可以為負')
                        if (PhotoHref.length <= 0) throw new Error('【圖片】不可以為空'); 
                    }
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
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
                                if (resultCheck.length <= 0) throw new Error('【官網】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
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
                                    if (resultCheck.length <= 0) throw new Error('【圖片】不存在,請重新確認') 
                                } 
                                catch(err){
                                    return reject(new Error(err));
                                }
                            }
                            //#endregion 
                            //#endregion 

                            //#region 異動段
                            //#region 活動新增
                            let CeId
                            sql = `INSERT INTO WEB_CyyEvent 
                                        (CwId,EventName ,EventText ,EventDate
                                            ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                        VALUES
                                        (? ,? ,? ,?
                                            ,? ,? ,? ,?)`;
                            try {
                                params = [CwId, EventName, EventText, EventDate
                                    ,currentTime,currentTime,currentUser,currentUser]
                                await query(sql, params);

                                //#region 取得最新插入的ID
                                let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                                try {
                                    result = await query(GetInsertedId);
                                    result.forEach((item)=>{
                                        CeId = item.id
                                    })
                                } 
                                catch(err){
                                    return reject(new Error(err));
                                }
                                //#endregion 
                            } 
                            catch(err) {
                                return reject(new Error(err));
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
                                        return reject(new Error(err));
                                    }
                                    //#endregion 
                                } 
                                catch(err){
                                    return reject(new Error(err));
                                }
                            }
                            //#endregion 
                            
                            //#region 產品圖片群集新增
                            sql = `INSERT INTO WEB_CyyEventPhoto 
                                    (CeId ,PhotoId ,MainSeting
                                        ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                    VALUES
                                    (? ,? ,?
                                        ,? ,? ,? ,?)`;
                            try {
                                params = [CeId, CpId, 'Y'
                                ,currentTime,currentTime,currentUser,currentUser]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#endregion 

                            //#region commit段
                            await CommitRun("add",connection,res,CeId)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新
            router.post('/UpdateCyyEvent',async (req, res) => {
                try{
                    //#region 宣告前端參數
                    const {Id, EventName, EventText, EventDate
                        ,photoChange ,CpId ,PhotoName ,PhotoDesc, PhotoHref} = req.body;
                    
                    
                    let params = []; //條件查詢容器,參數容器
                    //#endregion 

                    //#region 參數檢查
                    if (EventName.length > 300) throw new Error('【活動名稱】不可以超過300個字元')
                    if (EventName.length <= 0) throw new Error('【活動名稱】不可以為空'); 
                    if (EventText.length > 1000) throw new Error('【活動文章】不可以超過1000個字元')
                    if (EventText.length <= 0) throw new Error('【活動文章】不可以為空')
                    if (EventDate.length <= 0) throw new Error('【活動日期】不可以為空')
                    if(CpId<=0){
                        if (PhotoHref.length <= 0) throw new Error('【圖片】不可以為空'); 
                    }
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                            //#region 檢查段
                            checkSql = `SELECT CeId
                                        FROM WEB_CyyEvent
                                        WHERE 1=1
                                        AND CeId = ?
                                        LIMIT 1`
                            try {
                                params = [Id]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【活動】不存在,請重新確認');
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }

                            //#region 檢核圖片是否存在
                            if(CpId>0){
                                checkSql = `SELECT CpId
                                            FROM WEB_CompanyPhoto
                                            WHERE 1=1
                                            AND CpId = ?
                                            LIMIT 1`
                                try {
                                    params = [CpId]
                                    resultCheck = await query(checkSql, params);
                                    if (resultCheck.length <= 0) throw new Error('【圖片】不存在,請重新確認') 
                                } 
                                catch(err){
                                    return reject(new Error(err));
                                }
                            }
                            //#endregion
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
                            try {
                                params = [EventName, EventText, EventDate, currentTime,currentUser, Id]
                                resultCheck = await query(sql, params);
                            } 
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 刪除
            router.post('/DeleteCyyEvent',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CeId} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (CeId <= 0) throw new Error('【活動】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                            //#region 檢查段
                            checkSql = `SELECT CeId
                                            FROM WEB_CyyEvent
                                            WHERE 1=1
                                            AND CeId = ?
                                            LIMIT 1`
                            try {
                                params = [CeId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【活動】不存在,請重新確認');
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `DELETE FROM WEB_CyyEventPhoto 
                                    WHERE 1=1
                                    AND CeId = ? `
                            try {
                                params = [CeId]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            sql = `DELETE FROM WEB_CyyEvent 
                                        WHERE 1=1
                                        AND CeId = ? `
                            try {
                                params = [CeId]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 
        
            //#region 查看活動圖片
            router.post('/GetCyyEventPhoto',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {Id,CeId,ShowNum,Index} = req.body;
                    let conditions = []; //條件查詢容器
                    let params = [];; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 基本查詢
                            sql = `SELECT COUNT(a.CePhotoId) OVER() Total
                                    ,a.* 
                                    ,a1.CpId,a1.PhotoName,a1.PhotoDesc,a1.PhotoHref
                                    FROM WEB_CyyEventPhoto a
                                    LEFT JOIN WEB_CompanyPhoto a1 on a.PhotoId = a1.CpId
                                    WHERE 1=1`
                            //#endregion 

                            //#region 條件
                            if (Id > 0) {
                                conditions.push("a.CePhotoId = ?");
                                params.push(Id);
                            }
                            if (CeId > 0) {
                                conditions.push("a.CeId = ?");
                                params.push(CeId);
                            }
                            if (conditions.length) {
                                sql += " AND " + conditions.join(" AND ");
                            }
                            //#endregion 

                            //#region 列表顯示設定
                            sql += ` ORDER BY FIELD(a.MainSeting,'Y','N') , 'a.CePhotoId'`
                            if(ShowNum >0 && Index >=0){
                                sql += " LIMIT ? OFFSET ?";
                                params.push(ShowNum);
                                params.push(Index);
                            }
                            //#endregion 

                            //#region 執行
                            try{
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 新增活動圖片(批量)
            router.post('/AddCyyEventPhoto',async (req, res) => {
                try{

                    //#region 參數宣告+資料庫連接
                    const {CeId, data} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (CeId <= 0) throw new Error('【活動】資料不可為空,請重新確認'); 
                    if (data.length <= 0) throw new Error('未上傳照片,請重新確認'); 
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            //#region 活動是否存在
                            checkSql = `SELECT CeId
                                        FROM WEB_CyyEvent
                                        WHERE 1=1
                                        AND CeId = ?
                                        LIMIT 1`
                            try {
                                params = [CeId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【活動】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 
                            //#endregion 

                            //#region 異動段
                            (async () => {

                                for(let i=0;i<data.length;i++){
                                    let {PhotoName ,PhotoDesc, PhotoHref} = data[i];
                                    let CpId = -1

                                    //#region 公司照片新增
                                    sql = `INSERT INTO WEB_CompanyPhoto 
                                            (CompanyId ,PhotoName ,PhotoDesc ,PhotoHref
                                                ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                            VALUES
                                            (? ,? ,? ,?
                                                ,? ,? ,? ,?)`;
                                    try {
                                        params = [currentCompany, PhotoName, PhotoDesc, PhotoHref
                                            ,currentTime,currentTime,currentUser,currentUser]
                                        result = await query(sql, params);

                                        //#region 取得最新插入的ID
                                        let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                                        try {
                                            result = await query(GetInsertedId);
                                            result.forEach((item)=>{
                                                CpId = item.id
                                            })
                                        } 
                                        catch(err){
                                            return reject(new Error(err));
                                        }
                                        //#endregion 
                                    } 
                                    catch(err){
                                        return reject(new Error(err));
                                    }
                                    //#endregion 

                                    //#region 活動圖片群集新增
                                    sql = `INSERT INTO WEB_CyyEventPhoto 
                                            (CeId ,PhotoId ,MainSeting
                                                ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                            VALUES
                                            (? ,? ,?
                                                ,? ,? ,? ,?)`;
                                    try {
                                        params = [CeId, CpId, 'N'
                                        ,currentTime,currentTime,currentUser,currentUser]
                                        result = await query(sql, params);
                                    } 
                                    catch(err){
                                        return reject(new Error(err));
                                    }
                                    //#endregion 
                                }
                                //#region commit段
                                await CommitRun("add", connection, res, CeId);
                                //#endregion 
                            })();
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 
            
            //#region 刪除產品圖片
            router.post('/DeleteCyyEventPhoto',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CePhotoId} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (CePhotoId <= 0) throw new Error('【活動圖片】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            checkSql = `SELECT CePhotoId,MainSeting
                                        FROM WEB_CyyEventPhoto
                                        WHERE 1=1
                                        AND CePhotoId = ?
                                        LIMIT 1`
                            try {
                                params = [CePhotoId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【活動圖片】不存在,請重新確認');
                                resultCheck.forEach((item)=>{
                                    if(item.MainSeting == "Y") throw new Error('【活動圖片】目前為主圖片不可以刪除,請先切換主圖片再刪除');
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `DELETE FROM WEB_CyyEventPhoto 
                                    WHERE 1=1
                                    AND CePhotoId = ? `
                            try {
                                params = [CePhotoId]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
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
                    let connection = CreateDBConnection(action)
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
                    SendError(res,queryError) 
                }
            });
            //#endregion 
            
            //#region 新增
            router.post('/AddCyyIssues', (req, res) => {
                try{
                    //#region 參數宣告+資料庫連接
                    let connection = CreateDBConnection(action)
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
                        if (resultCheck.length <= 0) throw new Error('【網站不存在】,請重新確認');
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
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新
            router.post('/UpdateCyyIssues', (req, res) => {
                try{
                    //#region 宣告前端參數
                    let connection = CreateDBConnection(action)
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
                        if (resultCheck.length <= 0) throw new Error('【議題不存在】,請重新確認');
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
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 刪除
            router.post('/DeleteCyyIssues', (req, res) => {
                try{
                    //#region 宣告前端參數
                    let connection = CreateDBConnection(action)
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
                        if (resultCheck.length <= 0) throw new Error('【議題不存在】,請重新確認');
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
                    SendError(res,queryError) 
                }
            })
            //#endregion 
        //#endregion 

        //#region  CyyProduct相關 查看,新增,修改,刪除
            //#region 查看
            router.post('/GetCyyProduct',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {Id, MtlItemId, ProductName,ShowNum,Index} = req.body;
                    let conditions = []; //條件查詢容器
                    let params = [];; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 基本查詢
                            sql = `SELECT COUNT(a.CpdId) OVER() Total
                                    ,a.CpdId SelectId ,a1.MtlItemNo SelectNo ,a.ProductName SelectName                 
                                    ,a.* 
                                    ,a3.CpId,a3.PhotoName,a3.PhotoDesc,a3.PhotoHref
                                    FROM WEB_CyyProduct a
                                    INNER JOIN CM_MtlItem a1 on a.MtlItemId = a1.MtlItemId
                                    LEFT JOIN WEB_CyyProductPhoto a2 on a.CpdId = a2.CpdId
                                    LEFT JOIN WEB_CompanyPhoto a3 on a2.PhotoId = a3.CpId
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
                            try{
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 新增
            router.post('/AddCyyProduct',async (req, res) => {
                try{

                    //#region 參數宣告+資料庫連接
                    const {CwId, MtlItemId, ProductName, ProductText, ProductAmount, GroupSetting
                        ,CpId ,PhotoName ,PhotoDesc, PhotoHref} = req.body;
                    let params = []; //條件查詢容器,參數容器
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
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
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
                                if (resultCheck.length <= 0) throw new Error('【官網】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
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
                                if (resultCheck.length <= 0) throw new Error('【品號】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
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
                                    if (resultCheck.length <= 0) throw new Error('【圖片】不存在,請重新確認') 
                                } 
                                catch(err){
                                    return reject(new Error(err));
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
                                catch(err){
                                    return reject(new Error(err));
                                }
                                //#endregion 
                            } 
                            catch(err) {
                                return reject(new Error(err));
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
                                        return reject(new Error(err));
                                    }
                                    //#endregion 
                                } 
                                catch(err){
                                    return reject(new Error(err));
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
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#endregion 

                            //#region commit段
                            CommitRun("add",connection,res,CpdId)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            });
            //#endregion 

            //#region 更新
            router.post('/UpdateCyyProduct',async (req, res) => {
                try{

                    //#region 參數宣告+資料庫連接
                    const {Id, CwId, MtlItemId, ProductName, ProductText, ProductAmount, GroupSetting
                        ,photoChange ,CpId ,PhotoName ,PhotoDesc, PhotoHref} = req.body;
                    let params = []
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
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            //#region 產品是否存在
                            let MainPhotoId = -1;
                            checkSql = `SELECT a.CpdId,a.Status
                                        ,a1.PhotoId
                                        FROM WEB_CyyProduct a
                                        INNER JOIN WEB_CyyProductPhoto a1 on a.CpdId = a1.CpdId
                                        WHERE 1=1
                                        AND a.CpdId = ?
                                        AND a1.MainSeting = 'Y'
                                        LIMIT 1`
                            try {
                                params = [Id]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【產品】不存在,請重新確認') 
                                resultCheck.forEach((item)=>{
                                    if(item.Status != "S")  throw new Error('【產品】目前處於啟用中,請先停用才能異動') 
                                    MainPhotoId = item.PhotoId
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 官網是否存在
                            checkSql = `SELECT CwId
                                        FROM WEB_CompanyWeb
                                        WHERE 1=1
                                        AND CwId = ?
                                        LIMIT 1`
                            try {
                                params = [CwId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【官網】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return reject(new Error(err));
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
                                if (resultCheck.length <= 0) throw new Error('【品號】不存在,請重新確認') 
                                resultCheck.forEach((item)=>{
                                    MtlItemStatus = item.Status
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 
                            
                            //#region 檢核圖片是否存在
                            if(CpId>0){
                                checkSql = `SELECT CpId
                                            FROM WEB_CompanyPhoto
                                            WHERE 1=1
                                            AND CpId = ?
                                            LIMIT 1`
                                try {
                                    params = [CpId]
                                    resultCheck = await query(checkSql, params);
                                    if (resultCheck.length <= 0) throw new Error('【圖片】不存在,請重新確認') 
                                } 
                                catch(err){
                                    return reject(new Error(err));
                                }
                            }
                            //#endregion 
                            //#endregion 

                            //#region 異動段

                            //#region 更新
                            sql = `UPDATE WEB_CyyProduct set 
                                    ${MtlItemStatus != "A" ? `MtlItemId = ?,`: `` }
                                    ProductName = ?
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
                                return reject(new Error(err));
                            }
                            //#endregion 
                            
                            //#region 判斷圖片是否有異動
                            if(photoChange){
                                if(CpId>0){
                                    if(MainPhotoId != CpId){
                                        //await updateMainSetting(currentTime, currentUser, MainPhotoId, connection);
                                        //#region 更新-將原圖片取消主圖片
                                        sql = `UPDATE WEB_CyyProductPhoto set 
                                                MainSeting = 'N'
                                                ,UpdateDate = ?
                                                ,UpdateUserId = ?
                                                WHERE 1=1
                                                AND CpdId = ?
                                                AND PhotoId = ?
                                                `
                                        try {
                                            params = [currentTime,currentUser, Id, MainPhotoId]
                                            await query(sql, params);
                                        } 
                                        catch(err) {
                                            return reject(new Error(err));
                                        }
                                        //#endregion 

                                        //#region 判斷圖片是否存在產品資料庫
                                        checkSql = `SELECT PhotoId
                                                    FROM WEB_CyyProductPhoto
                                                    WHERE 1=1
                                                    AND CpdId = ?
                                                    AND PhotoId = ?
                                                    LIMIT 1`
                                        try {
                                            params = [Id,CpId]
                                            resultCheck = await query(checkSql, params);
                                            if (resultCheck.length <= 0) {
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
                                                    return reject(new Error(err));
                                                }
                                                //#endregion 
                                            } 
                                            else{
                                                //#region 更新-將選擇圖片設定主圖片
                                                sql = `UPDATE WEB_CyyProductPhoto set 
                                                        MainSeting = 'Y'
                                                        ,UpdateDate = ?
                                                        ,UpdateUserId = ?
                                                        WHERE 1=1
                                                        AND CpdId = ?
                                                        AND PhotoId = ?
                                                        `
                                                try {
                                                    params = [currentTime,currentUser, Id, CpId]
                                                    await query(sql, params);
                                                } 
                                                catch(err) {
                                                    return reject(new Error(err));
                                                }
                                                //#endregion 

                                            }
                                        } 
                                        catch(err) {
                                            return reject(new Error(err));
                                        }
                                        //#endregion 
                                    }
                                }
                                else{
                                    //#region 更新-將原圖片取消主圖片
                                    sql = `UPDATE WEB_CyyProductPhoto set 
                                            MainSeting = 'N'
                                            ,UpdateDate = ?
                                            ,UpdateUserId = ?
                                            WHERE 1=1
                                            AND CpdId = ?
                                            AND PhotoId = ?
                                            `
                                    try {
                                        params = [currentTime,currentUser, Id, MainPhotoId]
                                        await query(sql, params);
                                    } 
                                    catch(err) {
                                        return reject(new Error(err));
                                    }
                                    //#endregion 

                                    //#region 產品圖片新增
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
                                        return reject(new Error(err));
                                    }
                                    //#region 取得最新插入的ID
                                    let GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                                    let NewId = -1
                                    try {
                                        result = await query(GetInsertedId);
                                            result.forEach((item)=>{
                                            NewId = item.id
                                        })
                                    } 
                                    catch(err) {
                                        return reject(new Error(err));
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
                                        params = [Id, NewId, 'Y'
                                            ,currentTime,currentTime,currentUser,currentUser]
                                        await query(sql, params);
                                    } 
                                    catch(err) {
                                        return reject(new Error(err));
                                    }
                                    //#endregion 

                                }
                            }
                            //#endregion 

                            //#endregion 

                            //#region commit段
                            await CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 更新狀態
            router.post('/UpdateCyyProductStatus',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CpdId} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (CpdId <= 0) throw new Error('【產品】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            let Status
                            checkSql = `SELECT CpdId,Status
                                        FROM WEB_CyyProduct
                                        WHERE 1=1
                                        AND CpdId = ?
                                        LIMIT 1`
                            try {
                                params = [CpdId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【品號】不存在,請重新確認');
                                resultCheck.forEach((item)=>{
                                    Status = item.Status
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 品號狀態走向
                            switch(Status)
                            {
                                case "A":
                                    Status = "S";
                                    break;
                                case "S":
                                    Status = "A";
                                    break;
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `UPDATE WEB_CyyProduct set 
                                    Status = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CpdId = ?
                                    `
                            try {
                                params = [Status
                                , currentTime,currentUser, CpdId]

                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            
                            //#endregion 

                            //#region commit段
                            await CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 刪除
            router.post('/DeleteCyyProduct',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CpdId} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (CpdId <= 0) throw new Error('【庫別】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }
                            //#region 檢查段
                            checkSql = `SELECT CpdId,Status
                                        FROM WEB_CyyProduct
                                        WHERE 1=1
                                        AND CpdId = ?
                                        LIMIT 1`
                            try {
                                params = [CpdId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【產品】不存在,請重新確認');
                                resultCheck.forEach((item)=>{
                                    if(item.Status == "A") throw new Error('【產品】已經啟用不可以刪除,請採用停用方式');
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `DELETE FROM WEB_CyyProductPhoto 
                                    WHERE 1=1
                                    AND CpdId = ? `
                            try {
                                params = [CpdId]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }

                            sql = `DELETE FROM WEB_CyyProduct 
                                    WHERE 1=1
                                    AND CpdId = ? `
                            try {
                                params = [CpdId]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 
            
            //#region 查看產品圖片
            router.post('/GetCyyProductPhoto',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {Id,CpdId,ShowNum,Index} = req.body;
                    let conditions = []; //條件查詢容器
                    let params = [];; //參數容器
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 基本查詢
                            sql = `SELECT b.Total
                                    ,a.* 
                                    ,a1.CpId,a1.PhotoName,a1.PhotoDesc,a1.PhotoHref
                                    FROM WEB_CyyProductPhoto a
                                    INNER JOIN WEB_CompanyPhoto a1 on a.PhotoId = a1.CpId
                                    JOIN (
                                        SELECT COUNT('CpdPhotoId') Total 
                                        FROM WEB_CyyProductPhoto 
                                        WHERE 1=1
                                        AND CpdId = ${CpdId}
                                    ) b
                                    WHERE 1=1`
                            //#endregion 

                            //#region 條件
                            if (Id > 0) {
                                conditions.push("a.CpdPhotoId = ?");
                                params.push(Id);
                            }
                            if (CpdId > 0) {
                                conditions.push("a.CpdId = ?");
                                params.push(CpdId);
                            }
                            if (conditions.length) {
                                sql += " AND " + conditions.join(" AND ");
                            }
                            //#endregion 

                            //#region 列表顯示設定
                            sql += ` ORDER BY FIELD(a.MainSeting,'Y','N') , 'a.CpdPhotoId'`
                            if(ShowNum >0 && Index >=0){
                                sql += " LIMIT ? OFFSET ?";
                                params.push(ShowNum);
                                params.push(Index);
                            }
                            //#endregion 

                            //#region 執行
                            try{
                                result = await query(sql, params);
                            }
                            catch(err){
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("get",connection,res,result)
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 

            //#region 更新狀態
            router.post('/UpdateCyyProductPhotoMain',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CpdPhotoId} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (CpdPhotoId <= 0) throw new Error('【產品圖片】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            let CpdId
                            checkSql = `SELECT CpdPhotoId,CpdId,MainSeting
                                        FROM WEB_CyyProductPhoto
                                        WHERE 1=1
                                        AND CpdPhotoId = ?
                                        LIMIT 1`
                            try {
                                params = [CpdPhotoId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【產品圖片】不存在,請重新確認');
                                resultCheck.forEach((item)=>{
                                    CpdId = item.CpdId
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            await updateMainSetting(CpdId)

                            //#region 異動段
                            sql = `UPDATE WEB_CyyProductPhoto set 
                                    MainSeting = 'Y'
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND CpdPhotoId = ?
                                    `
                            try {
                                params = [currentTime,currentUser,CpdPhotoId]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("update",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 
            
            //#region 刪除產品圖片
            router.post('/DeleteCyyProductPhoto',async (req, res) => {
                try{

                    //#region 宣告前端參數
                    const {CpdPhotoId} = req.body;
                    let params = []
                    //#endregion 

                    //#region 參數檢查
                    if (CpdPhotoId <= 0) throw new Error('【產品圖片】不可以為空')
                    //#endregion 

                    //#region 開始後端交易
                    await new Promise((resolve, reject) => {
                        connection.beginTransaction(async (transactionError) => {
                            if(transactionError){
                                return reject(new Error(TransactionError(res,transactionError)));
                            }

                            //#region 檢查段
                            checkSql = `SELECT CpdPhotoId,MainSeting
                                        FROM WEB_CyyProductPhoto
                                        WHERE 1=1
                                        AND CpdPhotoId = ?
                                        LIMIT 1`
                            try {
                                params = [CpdPhotoId]
                                resultCheck = await query(checkSql, params);
                                if (resultCheck.length <= 0) throw new Error('【產品圖片】不存在,請重新確認');
                                resultCheck.forEach((item)=>{
                                    if(item.MainSeting == "Y") throw new Error('【產品圖片】目前為主圖片不可以刪除,請先切換主圖片再刪除');
                                })
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region 異動段
                            sql = `DELETE FROM WEB_CyyProductPhoto 
                                    WHERE 1=1
                                    AND CpdPhotoId = ? `
                            try {
                                params = [CpdPhotoId]
                                await query(sql, params);
                            } 
                            catch(err) {
                                return reject(new Error(err));
                            }
                            //#endregion 

                            //#region commit段
                            await CommitRun("delete",connection,res,"")
                            //#endregion 
                        });
                    });
                    //#endregion 
                }
                catch(queryError){
                    SendError(res,queryError) 
                }
            })
            //#endregion 
            

            //#region 取消主圖片設定
            async function updateMainSetting(CpdId) {
                const sql = `UPDATE WEB_CyyProductPhoto set 
                             MainSeting = 'N'
                             ,UpdateDate = ?
                             ,UpdateUserId = ?
                             WHERE 1=1
                             AND CpdId = ?
                             AND MainSeting = 'Y'`;
                try {
                    const params = [currentTime, currentUser, CpdId];
                    await query(sql, params);
                } catch(err) {
                    throw err;  // 抛出错误，让调用者处理
                }
            }
            //#endregion 

        //#endregion 

    //#endregion  

    


    module.exports = router;
