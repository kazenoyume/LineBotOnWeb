var connection=require('./dbConnect.js');

module.exports =custQuery;

function custQuery(){


}

custQuery.query=function(custNo, callback){
    connection.query('select cust_no   from cloud_user_account where CUST_NO='+custNo,function(error, rows, fields){
        //檢查是否有錯誤
        if(error){
            callback(new Error(error));

        }
        callback(null,rows);
    });

};

 custQuery.querywWithPromise = function(custNo){
    return new Promise(function (resolve, reject) {
        connection.query('select cust_no   from cloud_user_account where CUST_NO='+custNo,function(error, rows, fields){
            //檢查是否有錯誤
            if(error){
                reject(error);
                throw error;
            }
            resolve(rows);
        });

    });
}











