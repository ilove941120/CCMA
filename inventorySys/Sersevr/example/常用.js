        //#region 開始後端交易
        connection.beginTransaction(async (transactionError) => {
            if(transactionError) {
                console.error("開啟後端交易失敗:", transactionError);
                return res.status(500).send({ msg: 'error', err: '開啟後端交易失敗!!!' });
            }
            try{
            }
            catch(queryError){
                console.error("Query Error:", queryError);
                connection.rollback(() => {
                    res.status(500).send({ msg: 'error', err: queryError});
                });
            }
            finally {
                connection.end();
            }
        });
        //#endregion 