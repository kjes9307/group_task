const { headers }=require('./lib')

const reponseHandle = (headerStatus,newMsg,newStatus,data,res)=>{
  res.writeHead(headerStatus,headers)
  data["msg"] = newMsg;
  data["status"] = newStatus;
  res.write(JSON.stringify(data));
  res.end()
}


const errorHandle=(headerStatus,newMsg,newStatus,data,res)=>{
  res.writeHead(headerStatus,headers);
  data["msg"] = newMsg;
  data["status"] = newStatus;
  res.write(JSON.stringify(data));
  res.end();
}
module.exports  = {
  reponseHandle,
  errorHandle
};