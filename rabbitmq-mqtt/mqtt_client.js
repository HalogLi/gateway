#本代码应用于rabbitmq转mqtt，根据rabbitmq传送的消息发送到不同的相应的主题


var mqtt = require('mqtt')
//var sd = require('silly-datetime');
//var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
var options ={
	keepalive:60,
	clientId:'lhl',
	username:'test1',
	password:'test1'
	}

client = mqtt.connect("mqtt://118.24.212.149",options);

client.on('connect', function () {
	client.subscribe('hello1');  
  })
  
  
  
})
client.on('message', function (topic, message) {
  // message is Buffer
  //message 是JSON格式，消息获取后 转化成需要的形式发给主机相对应的主题
	var stringdata = message.toString();//buf-string
    var jsondata=JSON.parse(stringdata);//string-JSON
	name=jsondata.custName;   
	console.log(message.toString())
	var options={
	qos:0,
	retain:true  
	}
	var topic = jsondata.custCode; 
	client.publish(topic,stringdata,options);
	//var mytime=myDate.toLocaleTimeString(); //获取当前时间
	//console.log(mytime+'\n');
})