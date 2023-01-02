
const CryptoJS = require("crypto-js");

exports.isAuthorized =  (req,res,next) => {
    const auth = req.cookies.token;
    if(auth === undefined){   
       return res.status(401).redirect("/login")
    }else{
        const encryptAuth = decodeURIComponent(auth);
        // Decrypt
        var bytes  = CryptoJS.AES.decrypt(encryptAuth, process.env.KEY_ENCRYPT);
        var dataAuth = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        req.dataAuth = dataAuth;
        return next();
    }
}
exports.isLoginAuthorized =  (req,res,next) => {
    const auth = req.cookies.auth;
    if(auth === undefined){   
        return next()
    }else{
        return res.redirect("")
    }
}

