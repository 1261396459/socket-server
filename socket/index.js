var users = require("../storage/users");
var myio = {
    init:function(server){
        var io=require('socket.io')(server,{
            cors: {
                //origin: ["http://127.0.0.1:8080","http://localhost:8080"],
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
        io.on("connection", (socket) => {
            //连接加入子房间
                //socket.join( socket.id );//分组
                //socket.leave( socket.id );//离开分组
            function sendRes(req,data){//发回给发送者
                socket.emit(req,data);
            }
            function sendTo(id,req,data){//单独发给id
                socket.to(id).emit(req,data);
            }
            function sendAll(req,data){//发给除发送者以外所有人
                socket.broadcast.emit(req,data);
            }
            function recv(req,res){
                socket.on(req,res);
            }
            console.log("a user connected " + socket.id);
        
            recv("disconnect", () => {//某个用户断开连接的时告诉所有还在线的用户
                console.log(socket.id+" disconnected");               
                users.deleteUser(socket.id);
                sendAll('update userlist',users.userList);
            });
            
            recv("chat message",(msg) => {//转发聊天消息
                let id = socket.id;
                let name = users.findName(id);
                console.log(name + " say: " + msg);
                sendAll("chat message",{id,name,msg});
                sendRes("chat message",{id,name:"我",msg});
            });
            
            recv('update userlist', () => {//当有新用户加入告知所有在线用户。
                sendAll('update userlist',users.userList);
                sendRes('update userlist',users.userList);
            });
            
            recv( 'sdp', ( data ) => {//sdp 消息的转发
                    console.log('sdp: ' + data.sender + ' to: ' + data.to);
                    sendTo( data.to , 'sdp', {
                        description: data.description,
                        sender: data.sender
                    } );
            } );
            
            recv( 'ice candidates', ( data ) => {//candidates 消息的转发
                console.log('ice candidates: ' + data.sender + ' to: ' + data.to);
                sendTo( data.to , 'ice candidates', {
                    candidate: data.candidate,
                    sender: data.sender
                    } );
            } );
            
        });
        return io;
    }
}

module.exports = myio;
