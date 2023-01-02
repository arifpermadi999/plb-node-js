const md5 = require("md5");
var database = require('../utils/database');
const sp_repositories = require("../utils/query_repositories");
const authProcess = require('../utils/auth_process')


let data = {
    title:'PLB'
}

exports.viewLogin = function(req,res){
    data.title = 'Login';
    //initDataGlobal(req);
    res.render('login',data);
}


exports.doLogin = function(req,res){
    data.title = 'Login';
    let data_param = req.body;
    data_param.userpassword = md5(data_param.userpassword);
    //initDataGlobal(req);
    let query = sp_repositories.spLogin(data_param);
    
    database.connectionPlbramco(query).then((result)=>{
        //cookieParser.signedCookies('lang', lang)
        let data = result[0];
        console.log(data);
        if(data != null){
            let token = authProcess.createTokenAuth(data,res);
            // Encrypt
            return res.send({
                status: "OK",
                message: "Success",
            });
        }else{
            return res.send({
                status: "OK",
                message: "User Credential Not Found",
            });
        }
    }).catch((err) => {
        return res.send({
            status: "OK",
            message: "Error",
        });
    });
    
}

exports.doLogout = function(req,res){
    authProcess.destroyTokenAuth(res);
    res.redirect("")
    return res.end();
   
}