const functions = require("./functions");


// tools.js
// ========
module.exports = {
    spLogin: function(data) {
        return "exec config.sp_login '" + data.username + "','" + data.userpassword + "'"
    },
    spSerialNo: function(data) {
        return "exec sp_apollo_serialnumber '" + data.whcode + "', '" + data.custcode + "', '" + data.grno + "', '" + data.ajuno + "', '" + data.regno + "', '" + data.lotno + "', '" + data.itmcode + "'";
    },
    
    qLocationRamco: function(){
        return "select distinct wms_loc_code,wms_loc_desc from wms_loc_location_hdr (nolock)";
    },
    qLocationUser: function(data){
        return "select c.warehousecode,c.warehousename from [dbo].[useraccess] a " +
        "left outer join[dbo].[useraccesswarehouse] b on a.userid = b.userid " +
        "left outer join[dbo].[warehouse] c on b.warehouseid = c.warehouseid " +
        "where a.userid = '" + data.userid + "'";
    },
    qCustomerRamco: function(){
        return "select distinct wms_customer_id,wms_customer_name from wms_customer_hdr (nolock)";
    },
    qCustomerUser: function(data){
        return "select c.clientcode,c.clientname,c.inactive,isnull(c.is_pdplb,0) as is_pdplb from [dbo].[useraccess] a " +
        "left outer join [dbo].[useraccessclient] b on a.userid = b.userid " +
        "left outer join [dbo].[client] c on b.clientid = c.clientid " +
        "where a.userid = '" + data.userid + "'";
    },
    // ======== handling in ===========
    spHandlingin:function(data){
        return "exec sp_apollo_handlingin '" + data.custid + "', '" + data.locid + "', '" + data.frmdate + " 00:00:00', '" + data.todate + " 23:59:59', '" + data.typedoc + "', '" + data.typedate +"'";
    },
    spHandlinginDetail:function(data){
        return "exec sp_apollo_export_handlingin_dtl '" + data.custid + "', '" + data.locid + "', '" + data.frmdate + " 00:00:00', '" + data.todate + " 23:59:59'";
    },
    //======== end of handling in =======

    // ======== handling out ===========
    spHandlingout:function(data){
        return "exec sp_apollo_handlingout '" + data.custid + "', '" + data.locid + "', '" + data.frmdate + " 00:00:00', '" + data.todate + " 23:59:59', '" + data.typedoc + "', '" + data.typedate +"'";
    },
    spHandlingoutDetail:function(data){
        return "exec sp_apollo_export_handlingout_dtl '" + data.custid + "', '" + data.locid + "', '" + data.frmdate + " 00:00:00', '" + data.todate + " 23:59:59'";
    },
    //======== end of handling out =======

    // ====== inventory =======
    spInventory: function(data) {
        return "exec sp_apollo_inventorystock_new '" + data.location_code + "','" + data.customer_code + "','2022-12-06'"
    },
    qCheckInventory: function(data) {
        return "select count(*) as count_data from plb_apollo_inventory_stock where whcode = '" + data.location_code + "' and custcode = '" + data.customer_code + "'"
    },

    qInsertInventory:function(data){
        return `insert into plb_apollo_inventory_stock (whcode,custcode,custname,itmcode,itmname,pmryrefdocno,ajuno,regno,srlno,batchno,binstgid,grdate,price,currency,weight,uomweight,volume,uomvolume,width,height,length,mnfgdate,expdate,fnlclsstock,uomclsstock,stkstatus,lotno,po_number,case_no,remarks)
        values
        (` + 
        "'" + functions.replaceEnclosedMark(data.whcode) + "'," + 
        "'" + functions.replaceEnclosedMark(data.custcode) + "'," + 
        "'" + functions.replaceEnclosedMark(data.custname) + "'," + 
        "'" + functions.replaceEnclosedMark(data.itmcode) + "'," + 
        "'" + functions.replaceEnclosedMark(data.itmname) + "'," + 
        "'" + functions.replaceEnclosedMark(data.pmryrefdocno) + "'," + 
        "'" + functions.replaceEnclosedMark(data.ajuno) + "'," + 
        "'" + functions.replaceEnclosedMark(data.regno) + "'," + 
        "'" + functions.replaceEnclosedMark(data.srlno) + "'," + 
        "'" + functions.replaceEnclosedMark(data.batchno) + "'," + 
        "'" + functions.replaceEnclosedMark(data.binstgid) + "'," + 
        "'" + functions.replaceEnclosedMark(data.grdate) + "'," + 
        "'" + functions.replaceEnclosedMark(data.price) + "'," + 
        "'" + functions.replaceEnclosedMark(data.currency) + "'," + 
        "'" + functions.replaceEnclosedMark(data.weight) + "'," + 
        "'" + functions.replaceEnclosedMark(data.uomweight) + "'," + 
        "'" + functions.replaceEnclosedMark(data.volume) + "'," + 
        "'" + functions.replaceEnclosedMark(data.uomvolume) + "'," + 
        "'" + functions.replaceEnclosedMark(data.width) + "'," + 
        "'" + functions.replaceEnclosedMark(data.height) + "'," + 
        "'" + functions.replaceEnclosedMark(data.length) + "'," + 
        "'" + functions.replaceEnclosedMark(data.mnfgdate) + "'," + 
        "'" + functions.replaceEnclosedMark(data.expdate) + "'," + 
        "'" + functions.replaceEnclosedMark(data.fnlclsstock) + "'," + 
        "'" + functions.replaceEnclosedMark(data.uomclsstock) + "'," + 
        "'" + functions.replaceEnclosedMark(data.stkstatus) + "'," + 
        "'" + functions.replaceEnclosedMark(data.lotno) + "'," + 
        "'" + functions.replaceEnclosedMark(data.po_number) + "'," + 
        "'" + functions.replaceEnclosedMark(data.case_no) + "'," + 
        "'" + functions.replaceEnclosedMark(data.remarks) + "');";

    },

    //======== end of Inventory =======
};
