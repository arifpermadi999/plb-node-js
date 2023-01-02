const database = require('../utils/database');
const qRepository = require('../utils/query_repositories');
const functions = require('../utils/functions')

exports.setLanguage = function(req,res){
    let lang = req.query.lang;
    //cookieParser.signedCookies('lang', lang)
    res.cookie('lang', lang, { expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365)), secure: true  });
    var onUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    return res.redirect(onUrl)
}

exports.getLocation = async (req,res) => {
    const dataAuth = req.dataAuth;
    const username = dataAuth.username;
    let query = "";
    console.log(username);
    if(username == "admin"){
        query = qRepository.qLocationRamco();
        database.connectionRamco(query).then((result)=>{
            var data = functions.generateOptions(result,"wms_loc_code","wms_loc_desc");
            return res.send({
                status: "OK",
                message: "Success",
                data: data,
            })
        }).catch((err) => {
            return res.send({
                status: "error",
                message: err,
            });
        });
    }else{
        query = qRepository.qLocationRamco(dataAuth);
        database.connectionPlbramco(query).then((result)=>{
            var data = functions.generateOptions(result,"warehousecode","warehousename");
            return res.send({
                status: "OK",
                message: "Success",
                data: data,
            })
        }).catch((err) => {
            return res.send({
                status: "error",
                message: err,
            });
        });
    }  
};

exports.getCustomer = async (req,res) => {
    const dataAuth = req.dataAuth;
    const username = dataAuth.username;
    let query = "";
    console.log(username);
    if(username == "admin"){
        query = qRepository.qCustomerRamco();
        database.connectionRamco(query).then((result)=>{
            var data = functions.generateOptions(result,"wms_customer_id","wms_customer_name");
            return res.send({
                status: "OK",
                message: "Success",
                data: data,
            })
        }).catch((err) => {
            return res.send({
                status: "error",
                message: err,
            });
        });
    }else{
        query = qRepository.qCustomerUser(dataAuth);
        database.connectionPlbramco(query).then((result)=>{
            var data = functions.generateOptions(result,"clientcode","clientname","customer_user");
            return res.send({
                status: "OK",
                message: "Success",
                data: data,
            })
        }).catch((err) => {
            return res.send({
                status: "error",
                message: err,
            });
        });
    }  
};