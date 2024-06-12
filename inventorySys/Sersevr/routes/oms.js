const express = require('express');
const router = express.Router();
const util = require('util');
const configs = require('../config')
var mysql = require('mysql');

var currentTime = "";
var currentUser = -1



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
    //#region  MtlItem相關 查看,新增,修改,刪除
        //#region 查看
        router.post('/GetMtlItem', (req, res) => {
            try{
                if(!basic(req,res)) return
                
                //#region 宣告前端參數
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
                    var baseQuery = `SELECT b.Total, a.* 
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
        router.post('/AddMtlItem', (req, res) => {
            try{
                if(!basic(req,res)) return
                
                //#region 參數宣告+資料庫連接
                const {MtlItemNo, MtlItemName, MtlItemDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (MtlItemNo.length > 10) throw new Error('【品號代碼】不可以超過10個字元')
                if (MtlItemNo.length <= 0) throw new Error('【品號代碼】不可以為空'); 
                if (MtlItemName.length > 30) throw new Error('【品號名字】不可以超過30個字元')
                if (MtlItemName.length <= 0) throw new Error('【品號名字】不可以為空')
                if (MtlItemDesc.length > 100) throw new Error('【品號描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }

                    //#region 檢查段
                    //#region 檢查品號代碼是否重複
                    var checkSql = `SELECT MtlItemNo
                                    FROM CM_MtlItem
                                    WHERE 1=1
                                    AND MtlItemNo = ?
                                    LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [MtlItemNo]);
                    if (resultCheck.length > 0) return SendError(res,'【品號代碼】重複,請重新輸入') 
                    //#endregion 
                    //#endregion 

                    //#region 異動段
                    var sql = `INSERT INTO CM_MtlItem 
                                (MtlItemNo ,MtlItemName ,MtlItemDesc
                                    ,CreatDate ,UpdateDate ,CreateUserId ,UpdateUserId)
                                VALUES
                                (? ,? ,?
                                    ,? ,? ,? ,?)`;
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [MtlItemNo, MtlItemName, MtlItemDesc
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
        router.post('/UpdateMtlItem', (req, res) => {
            try{
                if(!basic(req,res)) return
                //#region 宣告前端參數
                const {Id, MtlItemName, MtlItemDesc} = req.body;
                //#endregion 

                //#region 參數檢查
                if (Id <= 0) throw new Error('【品號Id】不可以為空')
                if (MtlItemName.length > 30) throw new Error('【品號名字】不可以超過30個字元')
                if (MtlItemName.length <= 0) throw new Error('【品號名字】不可以為空')
                if (MtlItemDesc.length > 100) throw new Error('【品號描述】不可以超過100個字元')
                //#endregion 

                //#region 開始後端交易
                var connection = CreateDBConnection()
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT MtlItemId
                                        FROM CM_MtlItem
                                        WHERE 1=1
                                        AND MtlItemId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [Id]);
                    if (resultCheck.length <= 0) return SendError(res,'【品號不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `UPDATE CM_MtlItem set 
                                MtlItemName = ?
                                ,MtlItemDesc = ?
                                ,UpdateDate = ?
                                ,UpdateUserId = ?
                                WHERE 1=1
                                AND MtlItemId = ?
                                `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [MtlItemName, MtlItemDesc, currentTime,currentUser, Id]);
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
                //#region 宣告前端參數
                var connection = CreateDBConnection()
                basic(req)
                const {MtlItemId} = req.body;
                //#endregion 

                //#region 參數檢查
                if (MtlItemId <= 0) throw new Error('【品號】不可以為空')
                //#endregion 

                //#region 開始後端交易
                connection.beginTransaction(async (transactionError) => {
                    if(transactionError) {
                        console.error("開啟後端交易失敗:", transactionError);
                        return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
                    }
                    //#region 檢查段
                    var checkSql = `SELECT MtlItemId
                                        FROM CM_MtlItem
                                        WHERE 1=1
                                        AND MtlItemId = ?
                                        LIMIT 1`
                    const checkQuery = util.promisify(connection.query).bind(connection);
                    const resultCheck = await checkQuery(checkSql, [MtlItemId]);
                    if (resultCheck.length <= 0) return SendError(res,'【品號不存在】,請重新確認');
                    //#endregion 

                    //#region 異動段
                    var sql = `DELETE FROM CM_MtlItem 
                                WHERE 1=1
                                AND MtlItemId = ? `
                    const query = util.promisify(connection.query).bind(connection);
                    await query(sql, [MtlItemId]);
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