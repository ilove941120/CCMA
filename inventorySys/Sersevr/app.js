const express = require('express')
const session = require('express-session');
const sysRoutes = require('./routes/sys');  // 导入路由模块
const omsRoutes = require('./routes/oms');  // 导入路由模块
const webRoutes = require('./routes/web');  // 导入路由模块
const app = express()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(session({
    secret: 'secret-key',  // 用于签名session ID的字符串，可以是任何字符串
    resave: false,  // 强制将 session 存回至 session store，即使在请求期间 session 没有被修改
    saveUninitialized: false,  // 强制保存未初始化的 session 到 store
    cookie: { secure: false }  // 确保 cookie 在 HTTPS 连接下发送
  }));
const port = 3000
const configs = require('./config')

app.use('/sys', sysRoutes);  // 使用导入的路由模块为路由 '/system' 设置结果处理器
app.use('/oms', omsRoutes);  // 使用导入的路由模块为路由 '/system' 设置结果处理器
app.use('/web', webRoutes);  // 使用导入的路由模块为路由 '/system' 设置结果处理器


var mysql = require('mysql')
var connection = mysql.createConnection(configs.mysql)


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

    //#region 回傳成功
    function SendSuccess(res,success,result) {
        return res.status(200).send({ status: 'success', msg:success, data:result });
     }
    //#endregion 

    //#region 回傳錯誤
    function SendError(res,err) {
        console.log("A1")
         res.status(400).send({ status: 'error', msg:err });
        throw new Error(err); 
    }
    //#endregion 
//#endregion 

//#region  OMS相關
    //#region  Department相關 查看,新增,修改,刪除
        //#region 查看
        app.post('/GetDepartment', (req, res) => {
            var sql = `SELECT b.Total, a.* FROM CM_Department a
                        JOIN (
                            SELECT COUNT('DepartmentId') Total FROM CM_Department 
                        ) b
                        WHERE 1=1`
            if (req.body.Id > 0) {
                sql += ` AND a.DepartmentId = '${req.body.Id}'`
            }
            if (req.body.DepartmentNo != "" && req.body.DepartmentNo != undefined) {
                sql += ` AND a.DepartmentNo LIKE '%${req.body.DepartmentNo}%'`
            }
            sql += ` ORDER BY 'a.DepartmentId'`
            if(req.body.ShowNum >0 && req.body.Index >=0){
                sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
            }
            connection.query(sql, (err, rows) => {
                if (!err) { res.send(rows) }
                else {
                    res.send(err)
                }
            })
            //connection.end()
        })
        //#endregion 

        //#region 新增
        app.post('/AddDepartment', (req, res) => {
            var sql = `INSERT INTO CM_Department 
                        (DepartmentNo, DepartmentName, DepartmentDesc, CompanyId)
                    VALUES
                        ('${req.body.DepartmentNo}','${req.body.DepartmentName}','${req.body.DepartmentDesc}', '2')
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
                } else {
                    console.error("Error deleting Department:", err);
                    res.status(500).send({ msg: 'error', err: '新增　Department 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 更新
        app.post('/UpdateDepartment', (req, res) => {
            var sql = `UPDATE CM_Department set 
                        DepartmentName= '${req.body.DepartmentName}',
                        DepartmentDesc= '${req.body.DepartmentDesc}'
                        WHERE DepartmentId=${req.body.Id}
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
                } else {
                    console.error("Error deleting Department:", err);
                    res.status(500).send({ msg: 'error', err: '更新　Department 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 刪除
        app.post('/DeleteDepartment', (req, res) => {
            var sql = `DELETE FROM CM_Department 
                        WHERE DepartmentId =${req.query.DepartmentId} `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
                } else {
                    console.error("Error deleting Department:", err);
                    res.status(500).send({ msg: 'error', err: '删除 Department 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 
    //#endregion 

    //#region  Staff相關 查看,新增,修改,刪除
        //#region 查看
        app.post('/GetStaff', (req, res) => {
            var sql = `SELECT b.Total
                        , a.* 
                        , DATE_FORMAT(a.JoiningDate, '%Y-%m-%d') JoiningDate
                        , a1.DepartmentName
                        , c.StatusName
                        FROM CM_Staff a
                        INNER JOIN CM_Department a1 on a.DepartmentId = a1.DepartmentId
                        JOIN (
                            SELECT COUNT('StaffId') Total FROM CM_Staff 
                        ) b
                        INNER JOIN BAS_Status c on a.Status = c.StatusNo
                        WHERE 1=1
                        AND a1.CompanyId = 2
                        AND c.UseFrom = 'CM_Staff_Status'`
            if (req.body.Id > 0) {
                sql += ` AND a.StaffId = '${req.body.Id}'`
            }
            if (req.body.StaffNo != "" && req.body.StaffNo != undefined) {
                sql += ` AND a.StaffNo LIKE '%${req.body.StaffNo}%'`
            }
            sql += ` ORDER BY 'a.StaffId'`
            if(req.body.ShowNum >0 && req.body.Index >=0){
                sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
            }
            connection.query(sql, (err, rows) => {
                if (!err) { res.send(rows) }
                else {
                    res.send(err)
                }
            })
            //connection.end()
        })
        //#endregion 

        //#region 新增
        app.post('/AddStaff', (req, res) => {
            var sql = `INSERT INTO CM_Staff 
                        (StaffNo, StaffName, StaffDesc, Position, JoiningDate, Status, DepartmentId)
                    VALUES
                        ('${req.body.StaffNo}','${req.body.StaffName}','${req.body.StaffDesc}','${req.body.Position}'
                        ,'${req.body.JoiningDate}','${req.body.Status}','${req.body.DepartmentId}')
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
                } else {
                    console.error("Error deleting Staff:", err);
                    res.status(500).send({ msg: 'error', err: '新增　Staff 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 更新
        app.post('/UpdateStaff', (req, res) => {
            var sql = `UPDATE CM_Staff set 
                        StaffName= '${req.body.StaffName}',
                        StaffDesc= '${req.body.StaffDesc}',
                        Position= '${req.body.Position}',
                        JoiningDate= '${req.body.JoiningDate}',
                        Status= '${req.body.Status}'
                        WHERE StaffId=${req.body.Id}
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
                } else {
                    console.error("Error deleting Staff:", err);
                    res.status(500).send({ msg: 'error', err: '更新　Staff 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 刪除
        app.post('/DeleteStaff', (req, res) => {
            var sql = `DELETE FROM CM_Staff 
                        WHERE StaffId =${req.query.StaffId} `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
                } else {
                    console.error("Error deleting Staff:", err);
                    res.status(500).send({ msg: 'error', err: '删除 Staff 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 
    //#endregion 

    //#region  Warehouse相關 查看,新增,修改,刪除
        //#region 查看
        app.post('/GetWarehouse', (req, res) => {
            var sql = `SELECT b.Total, a.* FROM CM_Warehouse a
                        JOIN (
                            SELECT COUNT('WarehouseId') Total FROM CM_Warehouse 
                        ) b
                        WHERE 1=1`
            if (req.body.Id > 0) {
                sql += ` AND a.WarehouseId = '${req.body.Id}'`
            }
            if (req.body.WarehouseNo != "" && req.body.WarehouseNo != undefined) {
                sql += ` AND a.WarehouseNo LIKE '%${req.body.WarehouseNo}%'`
            }
            sql += ` ORDER BY 'a.WarehouseId'`
            if(req.body.ShowNum >0 && req.body.Index >=0){
                sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
            }
            connection.query(sql, (err, rows) => {
                if (!err) { res.send(rows) }
                else {
                    res.send(err)
                }
            })
            //connection.end()
        })
        //#endregion 

        //#region 新增
        app.post('/AddWarehouse', (req, res) => {
            var sql = `INSERT INTO CM_Warehouse 
                        (WarehouseNo, WarehouseName, WarehouseDesc, CompanyId)
                    VALUES
                        ('${req.body.WarehouseNo}','${req.body.WarehouseName}','${req.body.WarehouseDesc}', '2')
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
                } else {
                    console.error("Error deleting Warehouse:", err);
                    res.status(500).send({ msg: 'error', err: '新增　Warehouse 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 更新
        app.post('/UpdateWarehouse', (req, res) => {
            var sql = `UPDATE CM_Warehouse set 
                        WarehouseName= '${req.body.WarehouseName}',
                        WarehouseDesc= '${req.body.WarehouseDesc}'
                        WHERE WarehouseId=${req.body.Id}
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
                } else {
                    console.error("Error deleting Warehouse:", err);
                    res.status(500).send({ msg: 'error', err: '更新　Warehouse 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 刪除
        app.post('/DeleteWarehouse', (req, res) => {
            var sql = `DELETE FROM CM_Warehouse 
                        WHERE WarehouseId =${req.query.WarehouseId} `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
                } else {
                    console.error("Error deleting Warehouse:", err);
                    res.status(500).send({ msg: 'error', err: '删除 Warehouse 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 
    //#endregion 

    //#region  Unit相關 查看,新增,修改,刪除
        //#region 查看
        app.post('/GetUnit', (req, res) => {
            var sql = `SELECT b.Total, a.* FROM CM_Unit a
                        JOIN (
                            SELECT COUNT('UnitId') Total FROM CM_Unit 
                        ) b
                        WHERE 1=1`
            if (req.body.Id > 0) {
                sql += ` AND a.UnitId = '${req.body.Id}'`
            }
            if (req.body.UnitNo != "" && req.body.UnitNo != undefined) {
                sql += ` AND a.UnitNo LIKE '%${req.body.UnitNo}%'`
            }
            sql += ` ORDER BY 'a.UnitId'`
            if(req.body.ShowNum >0 && req.body.Index >=0){
                sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
            }
            connection.query(sql, (err, rows) => {
                if (!err) { res.send(rows) }
                else {
                    res.send(err)
                }
            })
            //connection.end()
        })
        //#endregion 

        //#region 新增
        app.post('/AddUnit', (req, res) => {
            var sql = `INSERT INTO CM_Unit 
                        (UnitNo, UnitName, UnitDesc, CompanyId)
                    VALUES
                        ('${req.body.UnitNo}','${req.body.UnitName}','${req.body.UnitDesc}', '2')
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
                } else {
                    console.error("Error deleting Unit:", err);
                    res.status(500).send({ msg: 'error', err: '新增　Unit 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 更新
        app.post('/UpdateUnit', (req, res) => {
            var sql = `UPDATE CM_Unit set 
                        UnitName= '${req.body.UnitName}',
                        UnitDesc= '${req.body.UnitDesc}'
                        WHERE UnitId=${req.body.Id}
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
                } else {
                    console.error("Error deleting Unit:", err);
                    res.status(500).send({ msg: 'error', err: '更新　Unit 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 刪除
        app.post('/DeleteUnit', (req, res) => {
            var sql = `DELETE FROM CM_Unit 
                        WHERE UnitId =${req.query.UnitId} `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
                } else {
                    console.error("Error deleting Unit:", err);
                    res.status(500).send({ msg: 'error', err: '删除 Unit 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 
    //#endregion 

    //#region  MtlItem相關 查看,新增,修改,刪除
        //#region 查看
        app.post('/GetMtlItem', (req, res) => {
            var sql = `SELECT b.Total, a.* FROM CM_MtlItem a
                        JOIN (
                            SELECT COUNT('MtlItemId') Total FROM CM_MtlItem 
                        ) b
                        WHERE 1=1`
            if (req.body.Id > 0) {
                sql += ` AND a.MtlItemId = '${req.body.Id}'`
            }
            if (req.body.MtlItemNo != "" && req.body.MtlItemNo != undefined) {
                sql += ` AND a.MtlItemNo LIKE '%${req.body.MtlItemNo}%'`
            }
            sql += ` ORDER BY 'a.MtlItemId'`
            if(req.body.ShowNum >0 && req.body.Index >=0){
                sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
            }
            connection.query(sql, (err, rows) => {
                if (!err) { res.send(rows) }
                else {
                    res.send(err)
                }
            })
            //connection.end()
        })
        //#endregion 

        //#region 新增
        app.post('/AddMtlItem', (req, res) => {
            var sql = `INSERT INTO CM_MtlItem 
                        (MtlItemNo, MtlItemName, MtlItemDesc, CompanyId)
                    VALUES
                        ('${req.body.MtlItemNo}','${req.body.MtlItemName}','${req.body.MtlItemDesc}', '2')
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
                } else {
                    console.error("Error deleting MtlItem:", err);
                    res.status(500).send({ msg: 'error', err: '新增　MtlItem 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 更新
        app.post('/UpdateMtlItem', (req, res) => {
            var sql = `UPDATE CM_MtlItem set 
                        MtlItemName= '${req.body.MtlItemName}',
                        MtlItemDesc= '${req.body.MtlItemDesc}'
                        WHERE MtlItemId=${req.body.Id}
                        `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
                } else {
                    console.error("Error deleting MtlItem:", err);
                    res.status(500).send({ msg: 'error', err: '更新　MtlItem 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 

        //#region 刪除
        app.post('/DeleteMtlItem', (req, res) => {
            var sql = `DELETE FROM CM_MtlItem 
                        WHERE MtlItemId =${req.query.MtlItemId} `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
                } else {
                    console.error("Error deleting MtlItem:", err);
                    res.status(500).send({ msg: 'error', err: '删除 MtlItem 时发生了错误' });
                }
            });
            //connection.end()
        })
        //#endregion 
    //#endregion 

//#endregion 

//#region  MtlItem相關 查看,新增,修改,刪除
app.post('/GetMtlItem', (req, res) => {
    var sql = `SELECT b.Total, a.* FROM mtlitem a
                JOIN (
                    SELECT COUNT('MtlItemId') Total FROM MtlItem 
                ) b
                WHERE 1=1`
    if (req.body.Id > 0) {
        sql += ` AND a.MtlitemId = '${req.body.Id}'`
    }
    if (req.body.MtlitemNo != "" && req.body.MtlitemNo != undefined) {
        sql += ` AND a.MtlitemNo LIKE '%${req.body.MtlitemNo}%'`
    }
    sql += ` ORDER BY 'a.MtlItemId'`
    if(req.body.ShowNum >0 && req.body.Index >=0){
        sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
    }
    connection.query(sql, (err, rows) => {
        if (!err) { res.send(rows) }
        else {
            res.send(err)
        }
    })
    //connection.end()
})
app.post('/AddMtlItem', (req, res) => {
    var sql = `INSERT INTO MtlItem 
                (MtlItemNo, MtlItemName, MtlItemSpec)
              VALUES
                ('${req.body.MtlItemNo}','${req.body.MtlItemName}','${req.body.MtlItemSpec}')
                `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
        } else {
            console.error("Error deleting MtlItem:", err);
            res.status(500).send({ msg: 'error', err: '新增　MtlItem 时发生了错误' });
        }
    });
    //connection.end()
})
app.post('/UpdateMtlItem', (req, res) => {
    var sql = `UPDATE MtlItem set 
                MtlItemName= '${req.body.MtlItemName}',
                MtlItemSpec= '${req.body.MtlItemSpec}'
                WHERE MtlItemId=${req.body.Id}
                `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
        } else {
            console.error("Error deleting MtlItem:", err);
            res.status(500).send({ msg: 'error', err: '更新　MtlItem 时发生了错误' });
        }
    });
    //connection.end()
})

app.post('/DeleteMtlItem', (req, res) => {
    var sql = `DELETE FROM MtlItem 
                WHERE MtlItemId =${req.query.MtlItemId} `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
        } else {
            console.error("Error deleting MtlItem:", err);
            res.status(500).send({ msg: 'error', err: '删除 MtlItem 时发生了错误' });
        }
    });
    //connection.end()
})
//#endregion 

//#region  交易相關 查看,新增
app.get('/GetTransaction', (req, res) => {
    var sql = `SELECT a.MtId,a.MtlItemId,
                DATE_FORMAT(a.TransactionDate, '%Y-%m-%d') AS TransactionDate,
                CASE 
                    WHEN a.TransactionType = 'B' THEN '採購'
                    WHEN a.TransactionType = 'S' THEN '銷售'
                    ELSE '其他'
                END AS TransactionType,
                a.Quantity,a.Price,a.Amount
                FROM MtlItemTransaction a
                WHERE 1=1`
    if (req.query.MtlItemId) {
        sql += ` AND a.MtlItemId = '${req.query.MtlItemId}'`
    }
    connection.query(sql, (err, rows) => {
        if (!err) { res.send(rows) }
        else {
            res.send(err)
        }
    })
    //connection.end()
})
app.post('/AddTransaction', (req, res) => {
    var TransactionDate = req.body.TransactionDate;
    var TransactionType = req.body.TransactionType;
    var MtlItemId = req.body.MtlItemId;
    var Quantity = req.body.Quantity;
    var Price = req.body.Price;
    var Amount = req.body.Amount;
    var sql = `INSERT INTO MtlItemTransaction 
                (TransactionDate, TransactionType, MtlItemId,Quantity,Price,Amount)
              VALUES
                ('${TransactionDate}','${TransactionType}','${MtlItemId}','${Quantity}','${Price}','${Amount}')
                `
    connection.query(sql, (err, rows) => {
        if (!err) {
            if (req.body.TransactionType == "B") {
                Quantity = Quantity * 1
                Amount = Amount * 1
            }
            else if (req.body.TransactionType == "S") {
                Quantity = Quantity * -1
                Amount = Amount * -1
            }
            sql = `UPDATE MtlItem SET
                                Quantity = Quantity + ${Quantity},
                                InventoryAmount = InventoryAmount + ${Amount}
                                WHERE  MtlItemId = ${MtlItemId}
                            `
            connection.query(sql, (err, result) => {
                if (!err) {
                    res.status(200).send({ msg: 'success', affectedRows: '交易成功!!!!' });
                } else {
                    console.error("Error deleting MtlItem:", err);
                    res.status(500).send({ msg: 'error', err: '交易失敗！！！' });
                }
            });
        }
        else {
            res.send(err)
        }
    })
    //connection.end()
})
//#endregion 

//#region  Inventory--庫別相關 查看,新增,修改,刪除
app.post('/GetInventory', (req, res) => {
    var sql = `SELECT b.Total, a.* FROM Inventory a
                JOIN (
                    SELECT COUNT('InventoryId') Total FROM Inventory 
                ) b
                WHERE 1=1`
    if (req.body.Id > 0) {
        sql += ` AND InventoryId = '${req.body.Id}'`
    }
    if (req.body.InventoryNo != "" && req.body.InventoryNo != undefined) {
        sql += ` AND InventoryNo LIKE '%${req.body.InventoryNo}%'`
    }
    sql += ` ORDER BY 'InventoryId'`
    if(req.body.ShowNum >0 && req.body.Index >=0){
        sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
    }
    
    connection.query(sql, (err, rows) => {
        if (!err) { res.send(rows) }
        else {
            res.send(err)
        }
    })
    //connection.end()
})
app.post('/AddInventory', (req, res) => {
    var sql = `INSERT INTO Inventory 
                (InventoryNo, InventoryName, InventorySpec)
              VALUES
                ('${req.body.InventoryNo}','${req.body.InventoryName}','${req.body.InventorySpec}')
                `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
        } else {
            console.error("Error deleting Inventory:", err);
            res.status(500).send({ msg: 'error', err: '新增　Inventory 时发生了错误' });
        }
    });
    //connection.end()
})
app.post('/UpdateInventory', (req, res) => {
    var sql = `UPDATE Inventory set 
                InventoryName= '${req.body.InventoryName}',
                InventorySpec= '${req.body.InventorySpec}'
                WHERE InventoryId=${req.body.Id}
                `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
        } else {
            console.error("Error deleting Inventory:", err);
            res.status(500).send({ msg: 'error', err: '更新　Inventory 时发生了错误' });
        }
    });
    //connection.end()
})
app.post('/DeleteInventory', (req, res) => {
    var sql = `DELETE FROM Inventory 
                WHERE InventoryId =${req.query.InventoryId} `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
        } else {
            console.error("Error deleting Inventory:", err);
            res.status(500).send({ msg: 'error', err: '删除 Inventory 时发生了错误' });
        }
    });
    //connection.end()
})
//#endregion 

//#region  Unit--單位相關 查看,新增,修改,刪除
app.post('/GetUnit', (req, res) => {
    var sql = `SELECT b.Total, a.* FROM Unit a
                JOIN (
                    SELECT COUNT('UnitId') Total FROM MtlItem 
                ) b
                WHERE 1=1`
    if (req.body.Id > 0) {
        sql += ` AND a.UnitId = '${req.body.Id}'`
    }
    if (req.body.UnitNo != "" && req.body.UnitNo != undefined) {
        sql += ` AND a.UnitNo LIKE '%${req.body.UnitNo}%'`
    }
    sql += ` ORDER BY 'a.UnitId'`
    if(req.body.ShowNum >0 && req.body.Index >=0){
        sql += ` LIMIT ${req.body.ShowNum } OFFSET ${req.body.Index}`
    }
    connection.query(sql, (err, rows) => {
        if (!err) { res.send(rows) }
        else {
            res.send(err)
        }
    })
    //connection.end()
})
app.post('/AddUnit', (req, res) => {
    var sql = `INSERT INTO Unit 
                (UnitNo, UnitName, UnitSpec)
              VALUES
                ('${req.body.UnitNo}','${req.body.UnitName}','${req.body.UnitSpec}')
                `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '新增成功!!!!' });
        } else {
            console.error("Error deleting Inventory:", err);
            res.status(500).send({ msg: 'error', err: '新增　Inventory 时发生了错误' });
        }
    });
    //connection.end()
})
app.post('/UpdateUnit', (req, res) => {
    var sql = `UPDATE Unit set 
                UnitName= '${req.body.UnitName}',
                UnitSpec= '${req.body.UnitSpec}'
                WHERE UnitId=${req.body.id}
                `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '更新成功!!!!' });
        } else {
            console.error("Error deleting Inventory:", err);
            res.status(500).send({ msg: 'error', err: '更新　Inventory 时发生了错误' });
        }
    });
    //connection.end()
})
app.post('/DeleteUnit', (req, res) => {
    var sql = `DELETE FROM Unit 
                WHERE UnitId =${req.query.UnitId} `
    connection.query(sql, (err, result) => {
        if (!err) {
            res.status(200).send({ msg: 'success', affectedRows: '刪除成功!!!!' });
        } else {
            console.error("Error deleting Inventory:", err);
            res.status(500).send({ msg: 'error', err: '删除 Inventory 时发生了错误' });
        }
    });
    //connection.end()
})
//#endregion




app.listen(port, () => {
    console.log(`Test Runnuing`)
})
