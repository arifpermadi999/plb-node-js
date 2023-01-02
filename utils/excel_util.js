const path = "./excel/"

const excelJS = require('exceljs');

module.exports = {
    init:async function(sheetName = "Data"){
        return worksheetDetail;  
    },
    exportInventory:async function(dataResult,filename = "data.xlsx"){
        const workbookDetail = new excelJS.Workbook();  // Create a new workbook
        const worksheetDetail = workbookDetail.addWorksheet("data"); // New Worksheet
        const pathDetail = "./excel/" + filename;  // Path to download excel
        worksheetDetail.columns = [
            { header: "no", key: "no", width: 10 },
            { header: "loccode", key: "loccode", width: 10 },
            { header: "custname", key: "custname", width: 10 },
            { header: "itmcode", key: "itmcode", width: 10 },
            { header: "itmdesc", key: "itmdesc", width: 10 },
            { header: "fnlclsstock", key: "fnlclsstock", width: 10 },
            { header: "binno", key: "binno", width: 10 },
            { header: "pmryrefdocno", key: "pmryrefdocno", width: 10 },
            { header: "regno", key: "regno", width: 10 },
            { header: "ajuno", key: "ajuno", width: 10 },
            { header: "btchno", key: "btchno", width: 10 },
            { header: "execdate", key: "execdate", width: 10 },
            { header: "itmprice", key: "itmprice", width: 10 },
            { header: "itmcurrency", key: "itmcurrency", width: 10 },
            { header: "itmweight", key: "itmweight", width: 10 },
            { header: "uomweight", key: "uomweight", width: 10 },
            { header: "volume", key: "volume", width: 10 },
            { header: "uomvolume", key: "uomvolume", width: 10 },
            { header: "po_number", key: "po_number", width: 10 },
            { header: "case_no", key: "case_no", width: 10 },
            { header: "remarks", key: "remarks", width: 10 },

        ];


        worksheetDetail.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
        let data = [];
        let limitData = 30;
        let counter = 1;
        
        dataResult.forEach((dataRes) => {
            let newData = {
                "no" : dataRes.no,
                "loccode" : dataRes.whcode,
                "custname" : dataRes.custname,
                "itmcode" : dataRes.itmcode,
                "itmdesc" : dataRes.itmname,
                "pmryrefdocno" : dataRes.pmryrefdocno,
                "regno" : dataRes.regno,
                "ajuno" : dataRes.ajuno,
                "srlno" : dataRes.srlno,
                "btchno" : dataRes.batchno,
                "binno" : dataRes.binstgid,
                "execdate" : dataRes.grdate,
                "itmprice" : dataRes.price,
                "itmcurrency" : dataRes.currency,
                "itmweight" : dataRes.weight,
                "uomweight" : dataRes.uomweight,
                "volume" : dataRes.volume,
                "uomvolume" : dataRes.uomvolume,
                "itmwidth" : dataRes.width,
                "itmheight" : dataRes.height,
                "lgth" : dataRes.length,
                "manufctgdate" : dataRes.mnfgdate,
                "expdate" : dataRes.expdate,
                "fnlclsstock" : dataRes.fnlclsstock,
                "uomfnlclsstock" : dataRes.uomclsstock,
                "stkstatus" : dataRes.stkstatus,
                "po_number" : dataRes.po_number,
                "case_no" : dataRes.case_no,
                "remarks" : dataRes.remarks,
            };
            if(counter <= limitData){
                data.push(newData);
            }
            worksheetDetail.addRow(newData); // Add data in worksheet
            counter++;
        });
        // Making first line in excel bold
        worksheetDetail.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
        
        try {
            console.log("creating excel data");
            await workbookDetail.xlsx.writeFile(pathDetail)
            .then(() => {
                console.log("success create excel data");
            });
            return {
                status:"success",
                filename:filename,
                data:data,
            }
        } catch (err) {
            return {
                status:"error",
                filename:null,
                data:err,
            }
        }

    },
}