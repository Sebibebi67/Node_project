var hostname = 'localhost'; 
var port = 3000;  

var app = express();

var myRouter = express.Router();

myRouter.route('/')
.get(function(req, res){ 
	res.sendFile(path.join(__dirname + '/index.html'));
})

myRouter.route('/message')
.get(function(req, res){
	res.json({
		message: "test",
	})
})

app.use(myRouter);

app.listen(port, hostname, function(){
	console.log("Pour utiliser l'API sur : http://"+ hostname +":"+port+"\n");
});
 