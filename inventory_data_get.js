const database = require('./utils/database');
const qRepository = require('./utils/query_repositories');


let data_param = [];
let query = "";
let customer = [];
let location = [];


//const excelJS = require("exceljs");
//const excelUtil = require('./utils/excel_util');
function dateNow(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;
    return formattedToday;
}
var log4js = require("log4js");
log4js.configure({
    appenders: { inventory: { type: "file", filename: "logs/inventory " + dateNow() + ".log" } },
    categories: { default: { appenders: ["inventory"], level: "info" } },
  });
var logger = log4js.getLogger('inventory'); 

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}
function setLogInfo(message){
    logger.info(message);
    //console.log(message);
}
function setLogError(message){
    logger.error(message);
    //console.log("ERROR " + message);
}

async function getDataInventory(){
    //get customer
    query = qRepository.qCustomerRamco();
    await database.connectionRamco(query).then((dataRes)=>{
        dataRes.forEach(result => {
            customer.push(result.wms_customer_id);
        });
    }).catch((err) => {
        setLogError("customer error : ");
        setLogError(err);
    });

    //get location
    query = qRepository.qLocationRamco();
    await database.connectionRamco(query).then((dataRes)=>{
        dataRes.forEach(result => {
            location.push(result.wms_loc_code);
        });
    }).catch((err) => {
        
        setLogError("location error : ");
        setLogError(err);
    });

    location = ['JKT01BLCCW','JKT01BLCOY'];
    customer = ['WH76PSWHSPDPLB','WH76MKWHSPDPLB','WH76DAWHSPDPLB'];
    await asyncForEach(location, async (locationCode) =>  {
        data_param.location_code = locationCode;
        await asyncForEach(customer, async (customerCode) => {
            data_param.customer_code = customerCode;
            setLogInfo("");
            setLogInfo("======== Mengambil Data dari lokasi : " + customerCode + " dan location : " + locationCode + " =============");
            //cek inventory
            query = qRepository.qCheckInventory(data_param);
            let cekHasInventory = false;
            await database.connectionMirorPlbramco(query).then(async (result)=>{
                if(result[0].count_data > 0){
                    cekHasInventory = true;
                    setLogInfo("Data sudah ada");
                }
            });
            //============
            if(!cekHasInventory){
                query = qRepository.spInventory(data_param);
                setLogInfo("SP : " + query);
                
                await database.connectionRamco(query).then(async (result)=>{
                    setLogInfo("menampilkan baris " + result.length);
                    if(result.length == 0){
                        setLogError("DATA DARI SP INVENTORY KOSONG");
                        message = "Data not found";
                    }else{
                        let queryInsert = "";
                        result.forEach(dataInventory => {
                            queryInsert += qRepository.qInsertInventory(dataInventory);
                        });
        
                        setLogInfo("Processing to save data " + result.length);
                        await database.connectionMirorPlbramco(queryInsert).then((res)=>{
                            setLogInfo("success save data");
                        }).catch((err) => {
                            setLogError("connection interrupt");
                            setLogError(err);
                        });
                        setLogInfo("=========== End of process save data ========");
                        
                    }
                }).catch((err) => {
                    setLogError("ada kesalahan di sp data pada lokasi : " + customerCode + " dan location : " + locationCode);
                    setLogError(err);
                });
            }
        })
        
    });


    process.exit(1);


}
getDataInventory();
