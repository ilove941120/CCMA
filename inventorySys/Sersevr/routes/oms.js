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

//#region  OMS相關
    //#region  Department相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetDepartment', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, DepartmentNo, DepartmentName,ShowNum,Index} = req.body;
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
                    let baseQuery = `SELECT b.Total
                                        ,a.DepartmentId SelectId ,a.DepartmentNo SelectNo ,a.DepartmentName SelectName                 
                                        ,a.* 
                                        FROM CM_Department a
                                        JOIN (
                                            SELECT COUNT('DepartmentId') Total FROM CM_Department 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.DepartmentId = ?");
                        params.push(Id);
                    }
                    if (DepartmentNo) {
                        conditions.push("a.DepartmentNo LIKE ?");
                        params.push('%' + DepartmentNo + '%');
                    }
                    if (DepartmentName) {
                        conditions.push("a.DepartmentName LIKE ?");
                        params.push('%' + DepartmentName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.DepartmentId'`
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
        });
        //#endregion 
        
        //#region 新增
        router.post('/AddDepartment', (req, res) => {
            try{
                if(!basic(req,res)) return
                
                //#region 參數宣告+資料庫連接
                const {DepartmentNo, DepartmentName, DepartmentDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (DepartmentNo.length > 10) throw new Error('【部門代碼】不可以超過10個字元')
                if (DepartmentNo.length <= 0) throw new Error('【部門代碼】不可以為空'); 
                if (DepartmentName.length > 30) throw new Error('【部門名字】不可以超過30個字元')
                if (DepartmentName.length <= 0) throw new Error('【部門名字】不可以為空')
                if (DepartmentDesc.length > 100) throw new Error('【部門描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 部門代碼是否重複
                    var checkSql = `SELECT DepartmentNo
                                    FROM CM_Department
                                    WHERE 1=1
                                    AND DepartmentNo = ?
                                    LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [DepartmentNo]);
                        if (resultCheck.length > 0) return SendError(res,'【部門代碼】重複,請重新輸入') 
                    } catch(err) {
                        return SendError(res,err.sqlMessage) 
                    }
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO CM_Department 
                                (DepartmentNo ,DepartmentName ,DepartmentDesc
                                    ,CompanyId,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?
                                    ,? ,? ,? ,? ,?)`;
                    try {
                        await query(sql, [DepartmentNo, DepartmentName, DepartmentDesc
                            ,currentCompany,currentTime,currentTime,currentUser,currentUser]);
                    } catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 取得最新插入的ID
                    let result
                    var GetInsertedId = `SELECT LAST_INSERT_ID() as id`;
                    try {
                        result = await query(GetInsertedId);
                    } catch(err) {
                        return SendError(res,err.message) 
                    }
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
        router.post('/UpdateDepartment', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, DepartmentName, DepartmentDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【部門Id】不可以為空')
                if (DepartmentName.length > 30) throw new Error('【部門名字】不可以超過30個字元')
                if (DepartmentName.length <= 0) throw new Error('【部門名字】不可以為空')
                if (DepartmentDesc.length > 100) throw new Error('【部門描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT DepartmentId
                                        FROM CM_Department
                                        WHERE 1=1
                                        AND DepartmentId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【部門不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE CM_Department set 
                                DepartmentName = ?
                                ,DepartmentDesc = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND DepartmentId = ?
                                `
                    try {
                        await query(sql, [DepartmentName, DepartmentDesc, currentTime,currentUser, Id]);
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
        router.post('/DeleteDepartment', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {DepartmentId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (DepartmentId <= 0) throw new Error('【部門】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT DepartmentId
                                        FROM CM_Department
                                        WHERE 1=1
                                        AND DepartmentId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [DepartmentId]);
                        if (resultCheck.length <= 0) return SendError(res,'【部門不存在】,請重新確認');

                    } catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM CM_Department 
                                WHERE 1=1
                                AND DepartmentId = ? `
                    try {
                        await query(sql, [DepartmentId]);
                    } catch(err) {
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

    //#region  Staff相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetStaff', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, StaffNo, StaffName,ShowNum,Index} = req.body;
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
                                        ,a.StaffId SelectId ,a.StaffNo SelectNo ,a.StaffName SelectName                 
                                        ,a.* 
                                        FROM CM_Staff a
                                        JOIN (
                                            SELECT COUNT('StaffId') Total FROM CM_Staff 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.StaffId = ?");
                        params.push(Id);
                    }
                    if (StaffNo) {
                        conditions.push("a.StaffNo LIKE ?");
                        params.push('%' + StaffNo + '%');
                    }
                    if (StaffName) {
                        conditions.push("a.StaffName LIKE ?");
                        params.push('%' + StaffName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.StaffId'`
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
        });
        //#endregion 
        
        //#region 新增
        router.post('/AddStaff', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {StaffNo, StaffName, StaffDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (StaffNo.length > 10) throw new Error('【員工代碼】不可以超過10個字元')
                if (StaffNo.length <= 0) throw new Error('【員工代碼】不可以為空'); 
                if (StaffName.length > 30) throw new Error('【員工名字】不可以超過30個字元')
                if (StaffName.length <= 0) throw new Error('【員工名字】不可以為空')
                if (StaffDesc.length > 100) throw new Error('【員工描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查員工代碼是否重複
                    var checkSql = `SELECT StaffNo
                                    FROM CM_Staff
                                    WHERE 1=1
                                    AND StaffNo = ?
                                    LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [StaffNo]);
                        if (resultCheck.length > 0) return SendError(res,'【員工代碼】重複,請重新輸入') 
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO CM_Staff 
                                (StaffNo ,StaffName ,StaffDesc
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?
                                    ,? ,? ,? ,?)`;
                    try {
                        await query(sql, [StaffNo, StaffName, StaffDesc
                            ,currentTime,currentTime,currentUser,currentUser]);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

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
        router.post('/UpdateStaff', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, StaffName, StaffDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【員工Id】不可以為空')
                if (StaffName.length > 30) throw new Error('【員工名字】不可以超過30個字元')
                if (StaffName.length <= 0) throw new Error('【員工名字】不可以為空')
                if (StaffDesc.length > 100) throw new Error('【員工描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT StaffId
                                        FROM CM_Staff
                                        WHERE 1=1
                                        AND StaffId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【員工不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE CM_Staff set 
                                StaffName = ?
                                ,StaffDesc = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND StaffId = ?
                                `
                    try {
                        await query(sql, [StaffName, StaffDesc, currentTime,currentUser, Id]);
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
        router.post('/DeleteStaff', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {StaffId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (StaffId <= 0) throw new Error('【員工】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT StaffId
                                        FROM CM_Staff
                                        WHERE 1=1
                                        AND StaffId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [StaffId]);
                        if (resultCheck.length <= 0) return SendError(res,'【員工不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM CM_Staff 
                                WHERE 1=1
                                AND StaffId = ? `
                    try {
                        await query(sql, [StaffId]);
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

    //#region  MtlItem相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetMtlItem', (req, res) => {
            try{
                
                //#region 宣告前端參數
                if(!basic(req,res)) return
                const {Id, MtlItemNo, MtlItemName,ShowNum,Index} = req.body;
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
                                        ,a.MtlItemId SelectId ,a.MtlItemNo SelectNo ,a.MtlItemName SelectName                 
                                        , a.* 
                                        FROM CM_MtlItem a
                                        JOIN (
                                            SELECT COUNT('MtlItemId') Total FROM CM_MtlItem 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.MtlItemId = ?");
                        params.push(Id);
                    }
                    if (MtlItemNo) {
                        conditions.push("a.MtlItemNo LIKE ?");
                        params.push('%' + MtlItemNo + '%');
                    }
                    if (MtlItemName) {
                        conditions.push("a.MtlItemName LIKE ?");
                        params.push('%' + MtlItemName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.MtlItemId'`
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
        });
        //#endregion 
        
        //#region 新增
        router.post('/AddMtlItem', (req, res) => {
            try{
                if(!basic(req,res)) return
                
                //#region 參數宣告+資料庫連接
                var connection = CreateDBConnection()
                const {MtlItemNo, MtlItemName, MtlItemDesc,InventoryWarehouseId,InventoryUnitId,Attributes} = req.body;
                let sql
                let checkSql
                //#endregion 

                //#region 參數檢查
                if (!!!MtlItemNo) throw new Error('【品號代碼】不可以為空'); 
                if (MtlItemNo.length > 10) throw new Error('【品號代碼】不可以超過10個字元')
                if (!!!MtlItemName) throw new Error('【品號名字】不可以為空')
                if (MtlItemName.length > 30) throw new Error('【品號名字】不可以超過30個字元')
                if (MtlItemDesc.length > 100) throw new Error('【品號描述】不可以超過100個字元')
                if (InventoryWarehouseId<=0) throw new Error('【庫別】不可以為空'); 
                if (InventoryUnitId<=0) throw new Error('【單位】不可以為空'); 
                if (Attributes<=0) throw new Error('【屬性】不可以為空'); 
                //#endregion 

                //#region 開始後端交易
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 品號代碼是否重複
                    checkSql = `SELECT MtlItemNo
                                    FROM CM_MtlItem
                                    WHERE 1=1
                                    AND MtlItemNo = ?
                                    LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [MtlItemNo]);
                        if (resultCheck.length>0) return SendError(res,'【品號代碼】重複,請重新輸入') 
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 庫別是否存在
                    checkSql = `SELECT WarehouseId
                                FROM CM_Warehouse
                                WHERE 1=1
                                AND WarehouseId = ?
                                LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [InventoryWarehouseId]);
                        if (resultCheck.length<=0) return SendError(res,'【庫別】不存在,請重新確認') 
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 單位是否存在
                    checkSql = `SELECT UnitId
                                FROM CM_Unit
                                WHERE 1=1
                                AND UnitId = ?
                                LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [InventoryUnitId]);
                        if (resultCheck.length<=0) return SendError(res,'【單位】不存在,請重新確認') 
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 屬性是否存在
                    let AttributesNo
                    checkSql = `SELECT TypeNo
                                FROM BAS_Type
                                WHERE 1=1
                                AND TypeId = ?
                                LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [Attributes]);
                        if (resultCheck.length<=0) return SendError(res,'【屬性類別】不存在,請重新確認') 
                        resultCheck.forEach(item => {
                            AttributesNo = item.TypeNo
                        });
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#endregion 

                    //#region 異動段
                    sql = `INSERT INTO CM_MtlItem 
                                (MtlItemNo ,MtlItemName ,MtlItemDesc
                                    ,InventoryWarehouseId ,InventoryUnitId ,Attributes
                                    ,CompanyId ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?
                                    ,? ,? ,?
                                    ,? ,? ,? ,? ,?)`;
                    try {
                        await query(sql, [MtlItemNo, MtlItemName, MtlItemDesc
                            ,InventoryWarehouseId,InventoryUnitId,AttributesNo
                            ,currentCompany,currentTime,currentTime,currentUser,currentUser]);
            
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

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
        router.post('/UpdateMtlItem', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, MtlItemNo, MtlItemName, MtlItemDesc,InventoryWarehouseId,InventoryUnitId,Attributes} = req.body;
                let sql
                let checkSql
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【品號Id】不可以為空')
                if (!!!MtlItemNo) throw new Error('【品號代碼】不可以為空'); 
                if (MtlItemNo.length > 10) throw new Error('【品號代碼】不可以超過10個字元')
                if (!!!MtlItemName) throw new Error('【品號名字】不可以為空')
                if (MtlItemName.length > 30) throw new Error('【品號名字】不可以超過30個字元')
                if (MtlItemDesc.length > 100) throw new Error('【品號描述】不可以超過100個字元')
                if (InventoryWarehouseId<=0) throw new Error('【庫別】不可以為空'); 
                if (InventoryUnitId<=0) throw new Error('【單位】不可以為空'); 
                if (Attributes<=0) throw new Error('【屬性】不可以為空'); 
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    let MtlItemStatus
                    checkSql = `SELECT MtlItemId,Status
                                        FROM CM_MtlItem
                                        WHERE 1=1
                                        AND MtlItemId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【品號】不存在請重新確認');
                        resultCheck.forEach((item)=>{
                            MtlItemStatus = item.Status
                        })
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 品號狀態走向
                    switch(MtlItemStatus)
                    {
                        case "A":
                            sql = `UPDATE CM_MtlItem set 
                                     MtlItemName = ?
                                    ,MtlItemDesc = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND MtlItemId = ?
                                    `
                            try {
                                await query(sql, [MtlItemName, MtlItemDesc, currentTime,currentUser, Id]);
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            break;
                        case "S":
                            //#region 檢查段
                            //#region 品號代碼是否重複
                            checkSql = `SELECT MtlItemNo
                                        FROM CM_MtlItem
                                        WHERE 1=1
                                        AND MtlItemNo = ?
                                        AND MtlItemId != ?
                                        LIMIT 1`
                            try {
                                const resultCheck = await query(checkSql, [MtlItemNo,Id]);
                                if (resultCheck.length>0) return SendError(res,'【品號代碼】重複,請重新輸入') 
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 

                            //#region 庫別是否存在
                            checkSql = `SELECT WarehouseId
                                        FROM CM_Warehouse
                                        WHERE 1=1
                                        AND WarehouseId = ?
                                        LIMIT 1`
                            try {
                                const resultCheck = await query(checkSql, [InventoryWarehouseId]);
                                if (resultCheck.length<=0) return SendError(res,'【庫別】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 

                            //#region 單位是否存在
                            checkSql = `SELECT UnitId
                                        FROM CM_Unit
                                        WHERE 1=1
                                        AND UnitId = ?
                                        LIMIT 1`
                            try {
                                const resultCheck = await query(checkSql, [InventoryUnitId]);
                                if (resultCheck.length<=0) return SendError(res,'【單位】不存在,請重新確認') 
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 

                            //#region 屬性是否存在
                            let AttributesNo
                            checkSql = `SELECT TypeNo
                                        FROM BAS_Type
                                        WHERE 1=1
                                        AND TypeId = ?
                                        LIMIT 1`
                            try {
                                const resultCheck = await query(checkSql, [Attributes]);
                                if (resultCheck.length<=0) return SendError(res,'【屬性類別】不存在,請重新確認') 
                                resultCheck.forEach(item => {
                                    AttributesNo = item.TypeNo
                                });
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 

                            //#endregion 

                            //#region 異動段
                            sql = `UPDATE CM_MtlItem set 
                                     MtlItemNo = ?
                                    ,MtlItemName = ?
                                    ,MtlItemDesc = ?
                                    ,InventoryWarehouseId = ?
                                    ,InventoryUnitId = ?
                                    ,Attributes = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND MtlItemId = ?
                                    `
                            try {
                                await query(sql, [MtlItemNo, MtlItemName, MtlItemDesc
                                    , InventoryWarehouseId, InventoryUnitId, AttributesNo
                                    , currentTime,currentUser, Id]);
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 
                            break;
                        default:
                            return SendError(res,'【品號】狀態異常請重新確認');
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

        //#region 更新狀態
        router.post('/UpdateMtlItemStatus', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {MtlItemId} = req.body;
                let sql
                let checkSql
                //#endregion 

                //#region 參數檢查
                if (MtlItemId <= 0) throw new Error('【品號Id】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    let MtlItemStatus
                    checkSql = `SELECT MtlItemId,Status
                                FROM CM_MtlItem
                                WHERE 1=1
                                AND MtlItemId = ?
                                LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [MtlItemId]);
                        if (resultCheck.length <= 0) return SendError(res,'【品號】不存在,請重新確認');
                        resultCheck.forEach((item)=>{
                            MtlItemStatus = item.Status
                        })
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 品號狀態走向
                    switch(MtlItemStatus)
                    {
                        case "A":
                            return SendError(res,'【品號】已啟用了,請重新確認');
                        case "S":
                            //#region 異動段
                            sql = `UPDATE CM_MtlItem set 
                                     Status = ?
                                    ,UpdateDate = ?
                                    ,UpdateUserId = ?
                                    WHERE 1=1
                                    AND MtlItemId = ?
                                    `
                            try {
                                await query(sql, ['A'
                                    , currentTime,currentUser, MtlItemId]);
                            } 
                            catch(err) {
                                return SendError(res,err.message) 
                            }
                            //#endregion 
                            break;
                        default:
                            return SendError(res,'【品號】,狀態異常請重新確認');
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
        router.post('/DeleteMtlItem', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {MtlItemId} = req.body;
                let sql
                let checkSql
                //#endregion 

                //#region 參數檢查
                if (MtlItemId <= 0) throw new Error('【品號】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    let MtlItemStatus
                    checkSql = `SELECT MtlItemId,Status
                                        FROM CM_MtlItem
                                        WHERE 1=1
                                        AND MtlItemId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [MtlItemId]);
                        if (resultCheck.length <= 0) return SendError(res,'【品號不存在】,請重新確認');
                        resultCheck.forEach((item)=>{
                            MtlItemStatus = item.Status
                        })
                        if(MtlItemStatus != "S") return SendError(res,'【品號】,未啟用狀態才可刪除,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    sql = `DELETE FROM CM_MtlItem 
                                WHERE 1=1
                                AND MtlItemId = ? `
                    try {
                        await query(sql, [MtlItemId]);
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

    //#region  Warehouse相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetWarehouse', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, WarehouseNo, WarehouseName,ShowNum,Index} = req.body;
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
                                        ,a.WarehouseId SelectId ,a.WarehouseNo SelectNo ,a.WarehouseName SelectName                 
                                        ,a.* 
                                        FROM CM_Warehouse a
                                        JOIN (
                                            SELECT COUNT('WarehouseId') Total FROM CM_Warehouse 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.WarehouseId = ?");
                        params.push(Id);
                    }
                    if (WarehouseNo) {
                        conditions.push("a.WarehouseNo LIKE ?");
                        params.push('%' + WarehouseNo + '%');
                    }
                    if (WarehouseName) {
                        conditions.push("a.WarehouseName LIKE ?");
                        params.push('%' + WarehouseName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.WarehouseId'`
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
        router.post('/AddWarehouse', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                var connection = CreateDBConnection()
                basic(req,res)
                const {WarehouseNo, WarehouseName, WarehouseDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (WarehouseNo.length > 10) throw new Error('【庫別代碼】不可以超過10個字元')
                if (WarehouseNo.length <= 0) throw new Error('【庫別代碼】不可以為空'); 
                if (WarehouseName.length > 30) throw new Error('【庫別名字】不可以超過30個字元')
                if (WarehouseName.length <= 0) throw new Error('【庫別名字】不可以為空')
                if (WarehouseDesc.length > 100) throw new Error('【庫別描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查庫別代碼是否重複
                    var checkSql = `SELECT WarehouseNo
                                    FROM CM_warehouse
                                    WHERE 1=1
                                    AND WarehouseNo = ?
                                    LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [WarehouseNo]);
                    if (resultCheck.length > 0) return SendError(res,'【庫別代碼】重複,請重新輸入') 
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO CM_warehouse 
                                (WarehouseNo ,WarehouseName ,WarehouseDesc, CompanyId
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?, ?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [WarehouseNo, WarehouseName, WarehouseDesc, currentCompany
                                    ,currentTime,currentTime,currentUser,currentUser]);
                    //#endregion 

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
        router.post('/UpdateWarehouse', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, WarehouseName, WarehouseDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【庫別Id】不可以為空')
                if (WarehouseName.length > 30) throw new Error('【庫別名字】不可以超過30個字元')
                if (WarehouseName.length <= 0) throw new Error('【庫別名字】不可以為空')
                if (WarehouseDesc.length > 100) throw new Error('【庫別描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT WarehouseId
                                        FROM CM_Warehouse
                                        WHERE 1=1
                                        AND WarehouseId = ?
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
                    var sql = `UPDATE CM_Warehouse set 
                                WarehouseName = ?
                                ,WarehouseDesc = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND WarehouseId = ?
                                `
                    try {
                        await query(sql, [WarehouseName, WarehouseDesc, currentTime,currentUser, Id]);
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
        router.post('/DeleteWarehouse', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {WarehouseId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (WarehouseId <= 0) throw new Error('【庫別】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT WarehouseId
                                        FROM CM_Warehouse
                                        WHERE 1=1
                                        AND WarehouseId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [WarehouseId]);
                        if (resultCheck.length <= 0) return SendError(res,'【庫別不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM CM_Warehouse 
                                WHERE 1=1
                                AND WarehouseId = ? `
                    try {
                        await query(sql, [WarehouseId]);
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

    //#region  Unit相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetUnit', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, UnitNo, UnitName,ShowNum,Index} = req.body;
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
                                        ,a.UnitId SelectId ,a.UnitNo SelectNo ,a.UnitName SelectName                 
                                        ,a.* 
                                        FROM CM_Unit a
                                        JOIN (
                                            SELECT COUNT('UnitId') Total FROM CM_Unit 
                                        ) b
                                        WHERE 1=1`
                    //#endregion 

                    //#region 條件
                    if (Id > 0) {
                        conditions.push("a.UnitId = ?");
                        params.push(Id);
                    }
                    if (UnitNo) {
                        conditions.push("a.UnitNo LIKE ?");
                        params.push('%' + UnitNo + '%');
                    }
                    if (UnitName) {
                        conditions.push("a.UnitName LIKE ?");
                        params.push('%' + UnitName + '%');
                    }
                    let sql = baseQuery;
                    if (conditions.length) {
                        sql += " AND " + conditions.join(" AND ");
                    }
                    //#endregion 

                    //#region 列表顯示設定
                    sql += ` ORDER BY 'a.UnitId'`
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
        });
        //#endregion 
        
        //#region 新增
        router.post('/AddUnit', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 參數宣告+資料庫連接
                const {UnitNo, UnitName, UnitDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (UnitNo.length > 10) throw new Error('【單位代碼】不可以超過10個字元')
                if (UnitNo.length <= 0) throw new Error('【單位代碼】不可以為空'); 
                if (UnitName.length > 30) throw new Error('【單位名字】不可以超過30個字元')
                if (UnitName.length <= 0) throw new Error('【單位名字】不可以為空')
                if (UnitDesc.length > 100) throw new Error('【單位描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查單位代碼是否重複
                    var checkSql = `SELECT UnitNo
                                    FROM CM_Unit
                                    WHERE 1=1
                                    AND UnitNo = ?
                                    LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [UnitNo]);
                        if (resultCheck.length > 0) return SendError(res,'【單位代碼】重複,請重新輸入') 
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO CM_Unit 
                                (UnitNo ,UnitName ,UnitDesc, CompanyId
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?, ?
                                    ,? ,? ,? ,?)`;
                    try {
                        await query(sql, [UnitNo, UnitName, UnitDesc, currentCompany
                            ,currentTime,currentTime,currentUser,currentUser]);
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

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
        router.post('/UpdateUnit', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {Id, UnitName, UnitDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【單位Id】不可以為空')
                if (UnitName.length > 30) throw new Error('【單位名字】不可以超過30個字元')
                if (UnitName.length <= 0) throw new Error('【單位名字】不可以為空')
                if (UnitDesc.length > 100) throw new Error('【單位描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT UnitId
                                        FROM CM_Unit
                                        WHERE 1=1
                                        AND UnitId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [Id]);
                        if (resultCheck.length <= 0) return SendError(res,'【單位不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE CM_Unit set 
                                UnitName = ?
                                ,UnitDesc = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND UnitId = ?
                                `
                    try {
                        await query(sql, [UnitName, UnitDesc, currentTime,currentUser, Id]);
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
        router.post('/DeleteUnit', (req, res) => {
            try{
                if(!basic(req,res)) return

                //#region 宣告前端參數
                const {UnitId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (UnitId <= 0) throw new Error('【單位】不可以為空')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT UnitId
                                        FROM CM_Unit
                                        WHERE 1=1
                                        AND UnitId = ?
                                        LIMIT 1`
                    try {
                        const resultCheck = await query(checkSql, [UnitId]);
                        if (resultCheck.length <= 0) return SendError(res,'【單位不存在】,請重新確認');
                    } 
                    catch(err) {
                        return SendError(res,err.message) 
                    }
                    
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM CM_Unit 
                                WHERE 1=1
                                AND UnitId = ? `
                    try {
                        await query(sql, [UnitId]);
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