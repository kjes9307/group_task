var http = require("http");
const {v4 : uuidv4} = require('uuid');
const {headers} = require("./lib");
const {reponseHandle,errorHandle} = require("./responseError")
let data = [];

const service = function(req,res){
    let url = req.url;
    let result = {"msg" : "","subject" : data, "status" : "good"};
    let body ='';
    req.on('data',chunk =>{body+=chunk});
    if(req.method ==='GET'){
        let regex = /^\/todos$/gi;
        switch (true){
            case regex.test(url):
                reponseHandle(200,"TODO API (GET)","Good",result,res);
                break;
            default:
                errorHandle(400,"TODO API (GET)","Failed,Not Found",result,res);
                break;
        }
    }else if (req.method ==='POST'){
        let newItem = {"id":uuidv4(),"todos":""};
        let regex = /^\/todos$/gi;
        switch (true){
            case regex.test(url):
                req.on('end',()=>{
                    // receive request 
                    try{
                        let addTodos = JSON.parse(body).todos ? JSON.parse(body).todos : "failed"
                        if(addTodos !== "failed"){
                            newItem["todos"] = addTodos;
                            data.push(newItem);
                            reponseHandle(200,"TODO API (POST)","Good",result,res);
                        }else{
                            errorHandle(400,"TODO API (POST)","Input Error",result,res);
                        }
                    }catch(err){
                        errorHandle(400,"TODO API (POST)","Failed",result,res);
                    }
                });
            break;
        default:
            errorHandle(400,"TODO API (POST)","Failed,Not Found",result,res);
            break;
        }
    }else if (req.method ==='DELETE'){
        let regex = /^\/todos$/gi;
        let regex2 = /^\/todos\//gi;
        switch(true){
            case regex.test(url):
                data.length=0;
                reponseHandle(200,"TODO API (DELETE ALL)","Good",result,res);
                break;
            case regex2.test(url):
                req.on("end",()=>{
                    try{
                        let deleteID = url.split("/").pop();
                        let isIdExist = data.findIndex(x=> x.id=== deleteID);
                        console.log(deleteID, isIdExist);
                        data = data.filter(x=> x.id !== deleteID);
                        if(isIdExist === -1){
                            errorHandle(400,"TODO API (DELETE)","Failed,ID not found",result,res);
                        }else{
                            result['subject'] = data;
                            reponseHandle(200,"TODO API (DELETE ALL)","Good",result,res);
                        }
                    }catch(err){
                        errorHandle(400,"TODO API (DELETE)","Input Error",result,res);
                        console.log(err)
                    };
                });
                break;
            default:
                errorHandle(400,"TODO API (DELETE)","Failed,Not Found",result,res);
                break;
        }
    }else if (req.method ==='PATCH'){
        let regex = /^\/todos$/gi;
        let regex2 = /^\/todos\//gi;
        switch(true){ //123
            case regex2.test(url): //test123
                req.on("end",()=>{
                    try{
                        let editTodo = JSON.parse(body).todos ? JSON.parse(body).todos : "not found";
                        let editID = url.split("/").pop();
                        let isIdExist = data.findIndex(x=> x.id=== editID);
                        if(isIdExist !== -1 && editTodo !== "not found"){
                            data[isIdExist].todos = editTodo;
                            reponseHandle(200,"TODO API (PATCH)","Good",result,res);
                        }else{
                            errorHandle(400,"TODO API (PATCH)","ID not found",result,res);
                        }
                    }catch(err){
                        errorHandle(400,"TODO API (PATCH)","Todo Intput Error",result,res);
                    };
                });
                break;
            default:
                errorHandle(400,"TODO API (PATCH)","Failed,Not Found",result,res);
                break;
        }
    }
   
   }

let server = http.createServer(service);
server.listen(process.env.PORT || 8080);