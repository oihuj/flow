const express = require('express')
const app = express()
const bodyParser = require('body-parser')
    // 处理静态资源
app.use(express.static('public'))
    // 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const query = require('./dbTool')

// 设置允许跨域访问该服务
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'mytoken');
    next();
});


//登录
app.post('/login', (req, res) => {
    const sql = `select*from superadmin where supername='${req.body.supername}' and superpwd='${req.body.superpwd}'`;
    console.log(req.body);

    query(sql, result => {
        console.log(result);

        if (result.length == 0) {
            res.send({
                msg: '用户名或密码错误',
                status: 400
            })
        } else {
            res.send({
                msg: '登录成功',
                status: 200,
                result
            })
        }
    })
})

// 查询所有鲜花
app.get('/flowlist', (req, res) => {
        const sql = `select*from flowlist`;
        query(sql, result => {
            res.send(result)
        })
    })


 //搜索
 app.get('/select',(req,res)=>{
     const sql=`select * from flowlist where flowname like "%${req.query.flowname}%" `;
     console.log(req.query);
     query(sql,result=>{
         res.send(result)
     })
 })


 //删除
 app.get('/del',(req,res)=>{
     console.log(req.query);
     const sql=`delete from  flowlist where id=${req.query.id}`;
     query(sql,result=>{
         res.send({
             msg:'删除成功',
             status:200
         })
     })
 })

    // 启动监听
app.listen(3003, () => {
    console.log('running...')
})