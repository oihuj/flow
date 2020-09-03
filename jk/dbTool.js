//导入mysql 模块
var mysql = require('mysql');

//创建数据库连接对象  配置相关信息
var connection = mysql.createConnection({
    host: 'localhost', //主机名
    user: 'root', //用户名
    password: 'root', //密码
    database: 'flower' //数据库名
});




module.exports = (sql, callback) => {
    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        // console.log(results);
        callback(results)
    });
}