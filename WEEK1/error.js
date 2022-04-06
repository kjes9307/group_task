function errorHandle(headerStatus,newMsg,newStatus,data,res,headers){
  res.writeHead(headerStatus,headers);
  data["msg"] = newMsg;
  data["status"] = newStatus;
  res.write(JSON.stringify(data));
  res.end();
}
module.exports  = errorHandle;