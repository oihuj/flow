const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// const cors = require('koa2-cors');
//  app.use(cors());

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

//根据id查询
app.get('/flowid', (req, res) => {
    const sql = `select*from flowlist where id=${req.query.id}`;
    query(sql, result => {
        res.send(result)
    })
})


//搜索
app.get('/select', (req, res) => {
    const sql = `select * from flowlist where flowname like "%${req.query.flowname}%" `;
    console.log(req.query);
    query(sql, result => {
        res.send(result)
    })
})

//修改
app.post('/xiugai', (req, res) => {
    console.log(req.body);

    const sql = `update flowlist set flowname='${req.body.flowname}',flowimg='${req.body.flowimg}',flownum='${req.body.flownum}',flowcategory='${req.body.flowcategory}',price='${req.body.flowprice}' where id=${req.body.id}`;
    query(sql, result => {
        console.log(sql);
        res.send({
            msg: '修改成功',
            status: 200
        })
    })
})


//添加
app.post('/addflow', (req, res) => {
    console.log(req.body);
    const sql = `insert into flowlist(flowname,flowimg,flownum,flowid,flowcategory,price) values('${req.body.flowname}','${req.body.flowimg}','${req.body.flownum}','${req.body.flowid}','${req.body.flowcategory}','${req.body.flowprice}')`
    query(sql, result => {
        res.send({
            msg: '添加成功',
            status: 200
        })
    })
})


//删除
app.get('/del', (req, res) => {
    console.log(req.query);
    const sql = `delete from  flowlist where id=${req.query.id}`;
    query(sql, result => {
        res.send({
            msg: '删除成功',
            status: 200
        })
    })
})


//普通用户 ------
app.get('/userlist', (req, res) => {
    const sql = `select*from userlist`;
    query(sql, result => {
        res.send(result)
    })
})


//修改用户vip
app.post('/usxiug',(req,res)=>{
    const sql=`update userlist set isvip=${req.body.isvip} where id=${req.body.id}`
    query(sql,result=>{
        res.send({
            status:200
        })
    })
    console.log(req.body);
    
})

//删除用户
app.get('/userdel',(req,res)=>{
    const sql=`delete from userlist where id=${req.body.id}`
    query(sql,result=>{
        res.send({
            status:200,
            msg:'删除成功'
        })
    })
})

//批量删除
app.post('/userplsc',(req,res)=>{
    console.log(req.body);
    var str='';
    for (const key in req.body) {
    //    console.log(key);
       console.log(req.body[key]);
       str+=req.body[key]+','
        
    }
    str=str.substring(0,str.length-1);
    var sql=`delete from userlist where id in(${str})`;
    query(sql,result=>{
        res.send({
            msg:'删除成功',
            status:200
        })
    })
})

//根据用户id查询来进行修改
app.get('/userid', (req, res) => {
    const sql = `select*from userlist where id=${req.query.id}`;
    console.log(req.query);
    
    query(sql, result => {
        res.send(result)
    })
})

//修改用户
app.post('/userupdate',(req,res)=>{
    const sql= `update userlist set useremail='${req.body.usemail}',userpwd=${req.body.uspwd} where id=${req.body.id}`
    console.log(req.body);
    query(sql,result=>{
        res.send({
            status:200,
            msg:'修改成功'
        })
    })
    
})

// 启动监听
app.listen(3003, () => {
    console.log('running...')
})