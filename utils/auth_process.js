const CryptoJS = require("crypto-js");

module.exports = {
    createTokenAuth:function(data,res){
        var jsonStringEncrypt = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.KEY_ENCRYPT).toString();    
        res.cookie('token', jsonStringEncrypt, { expires: new Date(new Date().getTime() + (1000 * 60 * process.env.SESS_MINUTE)), secure: true  });
        return jsonStringEncrypt;
    },destroyTokenAuth:function(res){
        res.clearCookie("token");
    }
}