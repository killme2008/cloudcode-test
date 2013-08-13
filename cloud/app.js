// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var name = require('cloud/name.js');

// App全局配置
//设置模板目录
if(__production)
	app.set('views', 'cloud/views');
else
	app.set('views', 'cloud/dev_views');
app.set('view engine', 'ejs');    // 设置template引擎
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get('/hello', function(req, res) {
	res.render('hello', { message: 'Congrats, you just set up your app!' });
});

var Visitor = AV.Object.extend('Visitor');
function renderIndex(res, name){
	var query = new AV.Query(Visitor);
	query.skip(0);
	query.limit(10);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('index',{ name: name, visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});

}

app.get('/', function(req, res){
	renderIndex(res, 'AVOSCloud');
});

app.post('/',function(req, res){
	var name = req.body.name;
	if(name && name!=''){
		//Save visitor
		var visitor = new Visitor();
		visitor.set('name', name);
		visitor.save(null, {
			success: function(gameScore) {
				res.redirect('/');
			},
			error: function(gameScore, error) {
				res.render('500', 500);
			}
		});
	}else{
		res.redirect('/');
	}
});

// This line is required to make Express respond to http requests.
app.listen();