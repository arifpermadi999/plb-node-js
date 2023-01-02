const database = require('../utils/database');
const qRepository = require('../utils/query_repositories');
const excelJS = require("exceljs");
const excelUtil = require('../utils/excel_util');



// =========== HANDLING IN =================
exports.getHandlinginData = async (req,res) => {
    let data_param = req.body;
    let query = qRepository.spHandlingin(data_param);
    //const filenameDetail = "data_"  + data_param.location_code + "_" + data_param.customer_code + ".xlsx"
    database.connectionMirorPlbramco(query).then((result)=>{
        let message = "Success";
        if(result.length == 0){
            message = "Data not found";
        }
        return res.send({
            status: "OK",
            message: message,
            data: result
        })
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });
};

exports.getExportHandlinginDataDetail = async (req,res) => {
    let data_param = req.body;
    let query = qRepository.spHandlinginDetail(data_param);
    //const filenameDetail = "data_"  + data_param.location_code + "_" + data_param.customer_code + ".xlsx"
    database.connectionMirorPlbramco(query).then((result)=>{
        let message = "Success";
        if(result.length == 0){
            message = "Data not found";
        }
        return res.send({
            status: "OK",
            message: message,
            data: result
        })
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });
};
// =========== END OF HANDLING IN =================

// =========== HANDLING OUT =================
exports.getHandlingoutData = async (req,res) => {
    let data_param = req.body;
    let query = qRepository.spHandlingout(data_param);
    //const filenameDetail = "data_"  + data_param.location_code + "_" + data_param.customer_code + ".xlsx"
    database.connectionMirorPlbramco(query).then((result)=>{
        let message = "Success";
        if(result.length == 0){
            message = "Data not found";
        }
        return res.send({
            status: "OK",
            message: message,
            data: result
        })
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });
};
exports.getExportHandlingoutDataDetail = async (req,res) => {
    let data_param = req.body;
    let query = qRepository.spHandlingoutDetail(data_param);
    //const filenameDetail = "data_"  + data_param.location_code + "_" + data_param.customer_code + ".xlsx"
    database.connectionMirorPlbramco(query).then((result)=>{
        let message = "Success";
        if(result.length == 0){
            message = "Data not found";
        }
        return res.send({
            status: "OK",
            message: message,
            data: result
        })
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });
};
// =========== END OF HANDLING OUT =================


exports.getSnData = async (req,res) => {
    let data_param = req.body;
    let query = qRepository.spSerialNo(data_param);
    //const filenameDetail = "data_"  + data_param.location_code + "_" + data_param.customer_code + ".xlsx"
    database.connectionMirorPlbramco(query).then((result)=>{
        let message = "Success";
        if(result.length == 0){
            message = "Data not found";
        }
        return res.send({
            status: "OK",
            message: message,
            data: result
        })
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });
};


// =========== INVENTORY =================
exports.getInventoryDataToDatabase = async (req,res) => {
    let data_param = req.body;
    let query = "";
    let customer = [];
    let location = [];
    //get customer
    query = qRepository.qCustomerRamco();
    await database.connectionRamco(query).then((dataRes)=>{
        dataRes.forEach(result => {
            customer.push(result.wms_customer_id);
        });
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });

    //get location
    query = qRepository.qLocationRamco();
    await database.connectionRamco(query).then((dataRes)=>{
        dataRes.forEach(result => {
            location.push(result.wms_loc_code);
        });
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });
    
    location = ['JKT01BLCCW'];
    customer = ['WH76PSWHSPDPLB'];
    customer.forEach(customerCode => {
        data_param.customer_code = customerCode;
        location.forEach(async locationCode => {
            data_param.location_code = locationCode;
            query = qRepository.qCheckInventory(data_param);
            let cekHasInventory = false;
            await database.connectionMirorPlbramco(query).then(async (result)=>{
                console.log(result[0].count_data)
                if(result[0].count_data > 0){
                    cekHasInventory = true;
                }
            });
            if(!cekHasInventory){
                query = qRepository.spInventory(data_param);
                await database.connectionRamco(query).then(async (result)=>{
                    let message = "Success";
                    let filename = "";
                    //console.log("hasil");
                    //console.log(result.length);
                    if(result.length == 0){
                        message = "Data not found";
                    }else{
                        let queryInsert = "";
                        result.forEach(dataInventory => {
                            queryInsert += qRepository.qInsertInventory(dataInventory);
                        });
                        await database.connectionMirorPlbramco(queryInsert)
                    }
                    return res.send({
                        status: "OK",
                    })
                }).catch((err) => {
                    return res.send({
                        status: "error",
                        message: err,
                    });
                });
            }

            
        });
    });


    //const filenameDetail = "inventory_"  + data_param.location_code + "_" + data_param.customer_code + ".xlsx"

    
};
exports.getInventoryData = async (req,res) => {
    let data_param = req.body;
    let query = qRepository.spInventory(data_param);
    //const filenameDetail = "inventory_"  + data_param.location_code + "_" + data_param.customer_code + ".xlsx"

    database.connectionRamco(query).then((result)=>{
        let message = "Success";
        let filename = "";
        if(result.length == 0){
            message = "Data not found";
        }else if(result.length > 30){
            //  excelUtil.exportInventory(result,filenameDetail).then((exportResult) => {
            //     //console.log(exportResult);
            //     filename = exportResult.filename;
            // });
        }
        return res.send({
            status: "OK",
            message: message,
            data: result,
            filename:filename,
        })
    }).catch((err) => {
        return res.send({
            status: "error",
            message: err,
        });
    });
};
// =========== END OF INVENTORY =================
