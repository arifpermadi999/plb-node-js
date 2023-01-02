let pathExcel = "";
let dataInventory = [];

function loadLocation() {
    $('#iLoc').removeClass('fa-hand-o-up').addClass('fa-refresh fa-spin');
    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getLocation',
        type: 'POST',
        dataType: 'json',
        data: {},
        success: function (data) {
            data.forEach(
                function (value) {
                    if (value.status == "OK") {
                        if (value.message == "Success") {
                            value.data.forEach(
                                function (valueData) {
                                    $('#txtLocID').append('<option value="' + valueData.value + '">(' + valueData.value + ') ' + valueData.text + '</option>');
                                }
                            )
                        }
                    }
                }
            )

            $('#iLoc').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#iLoc').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');
        }
    })
};

function loadCustomer() {
    $('#iCust').removeClass('fa-hand-o-up').addClass('fa-refresh fa-spin');
    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getCustomer',
        type: 'POST',
        dataType: 'json',
        data: {},
        success: function (data) {
            data.forEach(
                function (value) {
                    if (value.status == "OK") {
                        if (value.message == "Success") {
                            value.data.forEach(
                                function (valueData) {
                                    if (valueData.disable == "False")
                                        $('#txtCustID').append('<option value="' + valueData.value + '" ispdplb="' + valueData.is_pdplb + '">(' + valueData.value + ') ' + valueData.text + '</option>');
                                    else
                                        $('#txtCustID').append('<option value="' + valueData.value + '" ispdplb="' + valueData.is_pdplb + '"><span style="color:red">[Inactive]</span> (' + valueData.value + ') ' + valueData.text + '</option>');
                                }
                            )
                        }
                    }
                }
            )

            $('#iCust').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#iCust').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');
        }
    })
};
$("#btn-export-test").click(function(){
    exportSummary2();
});
function sn(param) {
    if (!cekconnection()) {
        $('#mdlheader').text('Detail Nomor Serial');
        $('#mdlbody').html('<div class="form-group alert alert-danger"><i class="fa fa-close"> Connection failed, please check your connection settings.</i></div>');

        $('#mdl').modal('show');

        setTimeout(function () {
            $('#mdlbody').html('');

            $('#mdl').modal('hide');
        }, 3000)

        return;
    }

    $('#mdlheader').text('Detail Nomor Serial');

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getSN',
        type: 'POST',
        dataType: 'json',
        data: { "param": param },
        success: function (data) {
            data.forEach(
                function (value) {
                    if (value.status == "OK") {
                        if (value.message == "Success") {
                            var tbody = '';
                            value.data.forEach(
                                function (valueData) {
                                    tbody +=
                                        '<tr>' +
                                        '   <td>' + valueData.no + '</td>' +
                                        '   <td>' + valueData.itmcode + '</td>' +
                                        '   <td>' + valueData.itmname + '</td>' +
                                        '   <td>' + valueData.srlno + '</td>' +
                                        //'   <td>' + valueData.qty + '</td>' +
                                        '</tr>';
                                }
                            )

                            var htmlTbl =
                                '<div class="row" style="max-height:400px;overflow:auto"> ' +
                                '   <div class="col-lg-12">' +
                                '       <table class="table table-responsive table-bordered"> ' +
                                '           <thead class="text-bold"> ' +
                                '               <tr> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Quantity</th> ' +
                                '               </tr> ' +
                                '           </thead> ' +
                                '           <tbody> ' +
                                tbody +
                                '           </tbody> ' +
                                '       </table> ' +
                                '   </div> ' +
                                '</div>';

                            $('#mdlbody').html(htmlTbl);
                        }
                        else if (value.message == "You are can't access") {
                            $('#mdlbody').html('<div class="form-group alert alert-danger"><i class="fa fa-close"> The session has ended.</i></div>');
                            setTimeout(function () {
                                var url = geturl();
                                window.location.href = url + '/auth/Xhoc5AO6w7o';
                            }, 3000);
                        }
                        else if (value.message == "Data not found") {
                            var htmlTbl =
                                '<div class="row" style="max-height:400px;overflow:auto"> ' +
                                '   <div class="col-lg-12">' +
                                '       <table class="table table-responsive table-bordered"> ' +
                                '           <thead class="text-bold"> ' +
                                '               <tr> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Quantity</th> ' +
                                '               </tr> ' +
                                '           </thead> ' +
                                '           <tbody> ' +
                                '               <tr> <td colspan="4" class="text-center">~ Data not found ~</td> </tr>' +
                                '           </tbody> ' +
                                '       </table> ' +
                                '   </div> ' +
                                '</div>';

                            $('#mdlbody').html(htmlTbl);
                        }
                    }
                    else {
                        var htmlTbl =
                            '<div class="row" style="max-height:400px;overflow:auto"> ' +
                            '   <div class="col-lg-12">' +
                            '       <table class="table table-responsive table-bordered"> ' +
                            '           <thead class="text-bold"> ' +
                            '               <tr> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                            //'                   <th class="text-bold info" style="vertical-align:middle;">Quantity</th> ' +
                            '               </tr> ' +
                            '           </thead> ' +
                            '           <tbody> ' +
                            '               <tr> <td colspan="4" class="text-center">~ Data not found ~</td> </tr>' +
                            '           </tbody> ' +
                            '       </table> ' +
                            '   </div> ' +
                            '</div>';

                        $('#mdlbody').html(htmlTbl);
                    }
                }
            )
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var htmlTbl =
                '<div class="row" style="max-height:400px;overflow:auto"> ' +
                '   <div class="col-lg-12">' +
                '       <table class="table table-responsive table-bordered"> ' +
                '           <thead class="text-bold"> ' +
                '               <tr> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                '               </tr> ' +
                '           </thead> ' +
                '           <tbody> ' +
                '               <tr> <td colspan="4" class="text-center">~ Data not found ~</td> </tr>' +
                '           </tbody> ' +
                '       </table> ' +
                '   </div> ' +
                '</div>';

            $('#mdlbody').html(htmlTbl);
        }
    });

    $('#mdl').modal('show');
}

function readyComponent() {
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

    $('#txtLocID').val('');
    $('#txtCustID').val('');

    var vCurrentDate = new Date();

    $('#dateFrom').val(
        ((vCurrentDate.getMonth() + 1).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString())
        // readCookie('transdate')
    );
    $('#dateTo').val(
        ((vCurrentDate.getMonth() + 1)).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString()
    );

    /*$('#dateFrom').datepicker({
        autoclose: true
    });*/

    /*$('#dateTo').datepicker({
        autoclose: true
    });*/

    loadLocation();

    loadCustomer();
};

function exportsummary2() {
    // if(pathExcel != ""){ 
    //  window.location.assign('https://plbreport.ckb.co.id/erp/excel/' + pathExcel);
    //  $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
    //  $('#ExportReporttoExcel').prop('disabled', false);
    //  return;
    // }
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

            var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;
            let data = dataInventory;
            data.forEach(
                function (value) {
                    if (value.message == "You are can't access") {
                        $('#dvAlert').attr("class", "form-group alert alert-danger");
                        $('#dvAlert').html('<i class="fa fa-close"> The session has ended.</i>');

                        setTimeout(function () {
                            var url = geturl();
                            window.location.href = url + '/auth/Xhoc5AO6w7o';
                        }, 3000);
                    }
                    if (value.status == "OK") {

                        if (value.message == "Success") {

                            var headerSummary = $("#table-header-summary").html();
                            htmlTable =
                                '<table border="2px"> ' +
                                '   <thead class="text-bold"> ' +
                                '       <tr> ' +
                                '           <th colspan="22" class="text-center"> ' +
                            '               <b>' + $("#title-full").text() + '</b><br/> ' +
                                '               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/> ' +
                                '           </th> ' +
                            '       </tr> ' +
                                headerSummary +
                                '   </thead> ' +
                                '   <tbody id="tbReport"> ';

                            /*-- loop data -- */ 
                            htmlDtl = '';
                            value.data.forEach(
                                function (valueDtl) {
                                    htmlDtl +=
                                        '<tr>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.no + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loccode + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcode + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmdesc + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueDtl.fnlclsstock + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.btchno + '</td>' + 
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.execdate + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmprice + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcurrency + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmweight + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomweight + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.volume + '</td>' +
                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomvolume + '</td>' +

                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.po_number + '</td>' +
                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.case_no + '</td>' +
                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remarks + '</td>' +
                                        '</tr>';
                                    
                                }
                            );
                            htmlTable +=  htmlDtl;

                            htmlTable +=
                                '    </tbody> ' +
                                '</table>';

                            //exportToExcelHTML(htmlTable, "Laporan Inventory Barang Pusat Logistik Berikat", "InventoryStockBarang_Summary.xls");

                            this.$OuterDiv = $('<div></div>')
                                .hide()
                                .append(htmlTable);

                            $OuterDiv.table2excel({
                                exclude: "",
                                sheetName: $("#title-full").text(),
                                filename: $("#title-report").text()  +"_Summary.xls", // do include extension
                                preserveColors: false // set to true if you want background colors and font colors preserved
                            });
                        }
                    }
                });

            $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
            $('#ExportReporttoExcel').prop('disabled', false);
        
    
}
function exportsummary() {
    // if(pathExcel != ""){ 
    //  window.location.assign('https://plbreport.ckb.co.id/erp/excel/' + pathExcel);
    //  $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
    //  $('#ExportReporttoExcel').prop('disabled', false);
    //  return;
    // }
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getExportInventoryBLC',
        //global: false,
        type: 'POST',
        timeout: 2147483647,
        dataType: 'json',
        data: { "filter": "summary" },
        //async: false,
        success: function (data) {
            var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;

            data.forEach(
                function (value) {
                    if (value.message == "You are can't access") {
                        $('#dvAlert').attr("class", "form-group alert alert-danger");
                        $('#dvAlert').html('<i class="fa fa-close"> The session has ended.</i>');

                        setTimeout(function () {
                            var url = geturl();
                            window.location.href = url + '/auth/Xhoc5AO6w7o';
                        }, 3000);
                    }
                    if (value.status == "OK") {

                        if (value.message == "Success") {

                            var headerSummary = $("#table-header-summary").html();
                            htmlTable =
                                '<table border="2px"> ' +
                                '   <thead class="text-bold"> ' +
                                '       <tr> ' +
                                '           <th colspan="22" class="text-center"> ' +
                            '               <b>' + $("#title-full").text() + '</b><br/> ' +
                                '               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/> ' +
                                '           </th> ' +
                            '       </tr> ' +
                                headerSummary +
                                '   </thead> ' +
                                '   <tbody id="tbReport"> ';

                            /*-- loop data -- */ 
                            htmlDtl = '';
                            value.data.forEach(
                                function (valueDtl) {
                                    htmlDtl +=
                                        '<tr>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.no + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loccode + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcode + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmdesc + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueDtl.fnlclsstock + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.btchno + '</td>' + 
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.execdate + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmprice + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcurrency + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmweight + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomweight + '</td>' +
                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.volume + '</td>' +
                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomvolume + '</td>' +

                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.po_number + '</td>' +
                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.case_no + '</td>' +
                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remarks + '</td>' +
                                        '</tr>';
                                    
                                }
                            );
                            htmlTable +=  htmlDtl;

                            htmlTable +=
                                '    </tbody> ' +
                                '</table>';

                            //exportToExcelHTML(htmlTable, "Laporan Inventory Barang Pusat Logistik Berikat", "InventoryStockBarang_Summary.xls");

                            this.$OuterDiv = $('<div></div>')
                                .hide()
                                .append(htmlTable);

                            $OuterDiv.table2excel({
                                exclude: "",
                                sheetName: $("#title-full").text(),
                                filename: $("#title-report").text()  +"_Summary.xls", // do include extension
                                preserveColors: false // set to true if you want background colors and font colors preserved
                            });
                        }
                    }
                }
            )

            $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
            $('#ExportReporttoExcel').prop('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#dvAlert').attr("class", "form-group alert alert-info");
            $('#dvAlert').html('<i class="fa fa-close"></i> Invalid export summary.');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');

                $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
                $('#ExportReporttoExcel').prop('disabled', false);
            }, 3000)
        }
    });
}

function exportdetail() {
    if(pathExcel != ""){
        //window.location.assign('https://plbreport.ckb.co.id/erp/excel/' + pathExcel);
    
        //$('#ExportReporttoExcelDtl').html('<i class="fa fa-file-excel-o"></i> Export Detail');
        //$('#ExportReporttoExcelDtl').prop('disabled', false);
        //return;
    }
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getExportInventoryBLC',
        type: 'POST',
        timeout: 2147483647,
        dataType: 'json',
        data: { "filter": "detail" },
        success: function (data) {
            var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;

            data.forEach(
                function (value) {
                    if (value.message == "You are can't access") {
                        $('#dvAlert').attr("class", "form-group alert alert-danger");
                        $('#dvAlert').html('<i class="fa fa-close"> The session has ended.</i>');

                        setTimeout(function () {
                            var url = geturl();
                            window.location.href = url + '/auth/Xhoc5AO6w7o';
                        }, 3000);
                    }
                    if (value.status == "OK") {
                        if (value.message == "Success") {
                            console.log('yes');
                            htmlTable =
                                '<table border="2px"> ' +
                                '   <thead class="text-bold"> ' +
                                '       <tr> ' +
                                '           <th colspan="15" class="text-center"> ' +
                            '               <b>' + $("#title-full").text() + '</b><br/> ' +
                                '               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/> ' +
                                '           </th> ' +
                                '       </tr> ' +
                                '       <tr bgcolor="#87AFC6"> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Bin</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Doc No</th> ' +
                                '            <th class="text-bold info hidden" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                                '            <th class="text-bold info hidden" style="vertical-align:middle;">Nomor Aju</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Qty</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                '       </tr> ' +
                                '   </thead> ' +
                                '   <tbody id="tbReport"> ';

                            /*-- loop data group -- */
                            value.group.forEach(
                                function (valueGroup) {

                                    htmlDtl = '';
                                    var vDtl = value.data.filter(element => element.itmcode === valueGroup.itmcode);

                                    htmlGroup = '';
                                    var vRwSpan = 0;
                                    if (vDtl.length > 1) {
                                        vRwSpan = vDtl.length + 1;

                                        htmlGroup =
                                            '<tr>' +
                                            '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td>' + //1
                                            '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.loccode + '</td>' + //2
                                            '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.custname + '</td>' + //3
                                            '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td>' + //4
                                            '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmdesc + '</td>' + //5
                                            '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueGroup.fnlclsstk + '</td>' + //6
                                            '</tr>';
                                    }

                                    vDtl.forEach(function (valueDtl) {
                                        if (vDtl.length > 1) {
                                            htmlDtl +=
                                                '<tr>' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binno + '</td>' + //7
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' + //8
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td>' + //9
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td>' + //10
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.srlno + '</td>' + //11
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.btchno + '</td>' + //12
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td>' + //13
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td>' + //14
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td>' + //15
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uom + '</td>' + //16
                                                '</tr>';
                                        }
                                        else {
                                            htmlDtl +=
                                                '<tr>' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td>' + //1
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.loccode + '</td>' + //2
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.custname + '</td>' + //3
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td>' + //4
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmdesc + '</td>' + //5
                                                '   <td style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueGroup.fnlclsstk + '</td>' + //6
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binno + '</td>' + //7
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' + //8
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td>' + //9
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td>' + //10
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.srlno + '</td>' +//11
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.btchno + '</td>' + //12
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td>' + //13
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td>' + //14
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td>' + //15
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uom + '</td>' + //16
                                                '</tr>';
                                        }
                                    });

                                    htmlTable += htmlGroup + htmlDtl;
                                }
                            );

                            htmlTable +=
                                '    </tbody> ' +
                                '</table>';

                            //exportToExcelHTML(htmlTable, "Laporan Inventory Barang Pusat Logistik Berikat", "InventoryStockBarang_Detail.xls");

                            this.$OuterDiv = $('<div></div>')
                                .hide()
                                .append(htmlTable);

                            $OuterDiv.table2excel({
                                exclude: "",
                                sheetName: "Laporan Inventory Barang Pusat Logistik Berikat",
                                filename: "InventoryStockBarang_Detail.xls", // do include extension
                                preserveColors: false // set to true if you want background colors and font colors preserved
                            });
                        }
                    }
                }
            )

            $('#ExportReporttoExcelDtl').html('<i class="fa fa-file-excel-o"></i> Export Detail');
            $('#ExportReporttoExcelDtl').prop('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#dvAlert').attr("class", "form-group alert alert-info");
            $('#dvAlert').html('<i class="fa fa-close"></i> Invalid export detail.');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');

                $('#ExportReporttoExcelDtl').html('<i class="fa fa-file-excel-o"></i> Export Detail');
                $('#ExportReporttoExcelDtl').prop('disabled', false);
            }, 3000)
        }
    });
}

$(document).ready(function () {
    readyComponent();

    $("#ExportReporttoExcel").on("click", function () {
        var vTr = $('#trNoRecord').text();
        if (vTr == "") {
            $('#ExportReporttoExcel').prop('disabled', true);
            $('#ExportReporttoExcel').html('<i class="fa fa-refresh fa-spin"></i> Exporting....');

            exportsummary();
        }
    });

    $("#ExportReporttoExcelDtl").on("click", function () {
        var vTr = $('#trNoRecord').text();
        if (vTr == "") {
            $('#ExportReporttoExcelDtl').prop('disabled', true);
            $('#ExportReporttoExcelDtl').html('<i class="fa fa-refresh fa-spin"></i> Exporting....');

            exportdetail();
        }
    });
    function wordInString(s, words, replacement) {
        var re = new RegExp('\\b' + words.join('|') + '\\b', 'gi');
        return s.replace(re, replacement);
    }

    let titleFullPrefix = $("#title-full").text();
    titleFullPrefix = wordInString(titleFullPrefix, ['Pusat ', 'Logistik ', 'Berikat'], '');
    titleFullPrefix = wordInString(titleFullPrefix, ['Bonded ', 'Logistics ', 'Center'], '');

    $('#btn-load').click(function () {
        if (!cekconnection()) {
            $('#dvAlert').attr("class", "form-group alert alert-danger");
            $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');
            }, 3000)

            return;
        }

        $('#btnSearch').prop('disabled', true);

        $('#tbReport').empty().append(
            '<tr> ' +
            '        <td colspan = "31" class="text-center" style="vertical-align:middle;"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
            '</tr >'
        );

        $('#dvTable').attr("class", "form-group overlay");

        var vLoc = '', vCust = '';
        if ($('#txtLocID option:selected').val().toLowerCase() === "all") {
            $('#txtLocID > option').each(function () {
                vLoc += this.value + ',';
            });

            vLoc = vLoc.substring(0, (vLoc.length - 1));
        }
        else
            vLoc = $('#txtLocID option:selected').val();

        if ($('#txtCustID option:selected').val().toLowerCase() === "all") {
            $('#txtCustID > option').each(function () {
                vCust += this.value + ',';
            });

            vCust = vCust.substring(0, (vCust.length - 1))
        }
        else {
            vCust = $('#txtCustID option:selected').val();
            let isPdplb = $('#txtCustID option:selected').attr("ispdplb");
            if (isPdplb == "True") {
                let pdplb_title = $("#title_header_pdplb_ucfirst").text();
                $("#title-full").text(titleFullPrefix + pdplb_title);
            } else {
                let title = $("#title_header_ucfirst").text();
                $("#title-full").text(titleFullPrefix + title);
            }
        }
        let url = "https://tca.ckb.co.id/plb_api/index.php?location_code=" + vLoc + "&customer_code=" + vCust;
        
        
        //alert("test");
        $.ajax({
            url: url,
            timeout: 2147483647,
            //global: false,
            type: 'get',
            //crossDomain:true,
            dataType: 'json',
            
            //async: false,
            success: function (data) {
                //console.log(data)
                var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;
                dataInventory = data;

                data.forEach(
                    function (value) {
                        if (value.status == "OK") {
                            if (value.message == "Success") { 
                                /*-- loop data -- */
                                htmlDtl = '';
                                value.data.forEach(
                                    function (valueDtl) {
                                        htmlDtl +=
                                            '<tr>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.no + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loccode + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcode + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmdesc + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueDtl.fnlclsstock + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binno + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.regno + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ajuno + '</td>' +
                                            '   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)" onclick="sn(\'' + valueDtl.encryptparam + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.btchno + '</td>' + 
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.execdate + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmprice + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcurrency + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmweight + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomweight + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.volume + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomvolume + '</td>' +

                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.po_number + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.case_no + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remarks + '</td>' +
                                            '</tr>';
                                    }
                                );

                                htmlTable += htmlDtl;

                                $('#dvTable').attr("class", "form-group");

                                $('#tbReport').empty().append(htmlTable);

                                $('#btnSearch').prop('disabled', false);
                            }
                            else if (value.message == "Data not found") {

                                setTimeout(function () {
                                    $('#dvTable').attr("class", "form-group");

                                    $('#btnSearch').prop('disabled', false);

                                    $('#dvTable').empty().html(
                                        '<table id="tblReport" class="table table-responsive table-bordered"> ' +
                                        '    <thead class="text-bold"> ' +
                                        '        <tr> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Bin</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +  
                                        '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' + 
                                        '        </tr> ' +
                                        '    </thead> ' +
                                        '    <tbody id="tbReport"> ' +
                                        '        <tr id="trNoRecord"> ' +
                                        '            <td colspan="31" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                        '        </tr> ' +
                                        '    </tbody> ' +
                                        '</table>'
                                    );
                                }, 1000);
                            }
                            else if (value.message == "You are can't access") {
                                $('#dvAlert').attr("class", "form-group alert alert-danger");
                                $('#dvAlert').html('<i class="fa fa-close"> The session has ended.</i>');

                                setTimeout(function () {
                                    var url = geturl();
                                    window.location.href = url + '/auth/Xhoc5AO6w7o';
                                }, 3000);
                            }
                        }
                        else {
                            $('#dvAlert').attr("class", "form-group alert alert-danger");
                            $('#dvAlert').html('<i class="fa fa-close"> ' + value.message + '.</i>');

                            setTimeout(function () {
                                $('#dvAlert').attr("class", "");
                                $('#dvAlert').html('');

                                $('#dvTable').attr("class", "form-group");

                                $('#btnSearch').prop('disabled', false);

                                $('#dvTable').empty().html(
                                    '<table id="tblReport" class="table table-responsive table-bordered"> ' +
                                    '    <thead class="text-bold"> ' +
                                    '        <tr> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Bin</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' + 
                                    '           <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' + 
                                    '        </tr> ' +
                                    '    </thead> ' +
                                    '    <tbody id="tbReport"> ' +
                                    '        <tr id="trNoRecord"> ' +
                                    '            <td colspan="30" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                    '        </tr> ' +
                                    '    </tbody> ' +
                                    '</table>'
                                );
                            }, 3000)
                        }
                    }
                );
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#dvAlert').attr("class", "form-group alert alert-danger");
                $('#dvAlert').html('<i class="fa fa-close"> ' + jqXHR.status + ' ' + errorThrown + '.</i>');

                setTimeout(function () {
                    $('#dvAlert').attr("class", "");
                    $('#dvAlert').html('');

                    $('#dvTable').attr("class", "form-group");

                    $('#btnSearch').prop('disabled', false);

                    $('#dvTable').empty().html(
                        '<table id="tblReport" class="table table-responsive table-bordered"> ' +
                        '    <thead class="text-bold"> ' +
                        '        <tr> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Bin</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' + 
                        '           <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' + 
                        '        </tr> ' +
                        '    </thead> ' +
                        '    <tbody id="tbReport"> ' +
                        '        <tr id="trNoRecord"> ' +
                        '            <td colspan="31" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                        '        </tr> ' +
                        '    </tbody> ' +
                        '</table>'
                    );
                }, 3000)
            }
        });
    });
    $('#btnSearch').click(function () {
        if (!cekconnection()) {
            $('#dvAlert').attr("class", "form-group alert alert-danger");
            $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');
            }, 3000)

            return;
        }

        $('#btnSearch').prop('disabled', true);

        $('#tbReport').empty().append(
            '<tr> ' +
            '        <td colspan = "31" class="text-center" style="vertical-align:middle;"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
            '</tr >'
        );

        $('#dvTable').attr("class", "form-group overlay");

        var vLoc = '', vCust = '';
        if ($('#txtLocID option:selected').val().toLowerCase() === "all") {
            $('#txtLocID > option').each(function () {
                vLoc += this.value + ',';
            });

            vLoc = vLoc.substring(0, (vLoc.length - 1));
        }
        else
            vLoc = $('#txtLocID option:selected').val();

        if ($('#txtCustID option:selected').val().toLowerCase() === "all") {
            $('#txtCustID > option').each(function () {
                vCust += this.value + ',';
            });

            vCust = vCust.substring(0, (vCust.length - 1))
        }
        else {
            vCust = $('#txtCustID option:selected').val();
            let isPdplb = $('#txtCustID option:selected').attr("ispdplb");
            if (isPdplb == "True") {
                let pdplb_title = $("#title_header_pdplb_ucfirst").text();
                $("#title-full").text(titleFullPrefix + pdplb_title);
            } else {
                let title = $("#title_header_ucfirst").text();
                $("#title-full").text(titleFullPrefix + title);
            }
        }
        let url = window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getInventoryBLC';
        if(vLoc == "JKT01BLCCW" && vCust == "WH76PTWHS"){
            url = "https://tca.ckb.co.id/plb_api/index.php?location_code=" + vLoc + "&customer_code=" + vCust;
        }
        
        $.ajax({
            url: url,
            timeout: 2147483647,
            //global: false,
            type: 'POST',
            dataType: 'json',
            data: { "locid": vLoc, "custid": vCust, "frmDate": $('#dateFrom').val() },
            //async: false,
            success: function (data) {
                var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;

                data.forEach(
                    function (value) {
                        if (value.status == "OK") {
                            if (value.message == "Success") { 
                                /*-- loop data -- */
                                pathExcel = value.path_detail;
                                htmlDtl = '';
                                value.data.forEach(
                                    function (valueDtl) {
                                        htmlDtl +=
                                            '<tr>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.no + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loccode + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcode + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmdesc + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueDtl.fnlclsstock + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binno + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.regno + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ajuno + '</td>' +
                                            '   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)" onclick="sn(\'' + valueDtl.encryptparam + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.btchno + '</td>' + 
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.execdate + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmprice + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcurrency + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmweight + '</td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomweight + '</td>' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.volume + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomvolume + '</td>' +

                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.po_number + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.case_no + '</td>' +
                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remarks + '</td>' +
                                            '</tr>';
                                    }
                                );

                                htmlTable += htmlDtl;

                                $('#dvTable').attr("class", "form-group");

                                $('#tbReport').empty().append(htmlTable);

                                $('#btnSearch').prop('disabled', false);
                            }
                            else if (value.message == "Data not found") {

                                setTimeout(function () {
                                    $('#dvTable').attr("class", "form-group");

                                    $('#btnSearch').prop('disabled', false);

                                    $('#dvTable').empty().html(
                                        '<table id="tblReport" class="table table-responsive table-bordered"> ' +
                                        '    <thead class="text-bold"> ' +
                                        '        <tr> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Bin</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +  
                                        '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' + 
                                        '        </tr> ' +
                                        '    </thead> ' +
                                        '    <tbody id="tbReport"> ' +
                                        '        <tr id="trNoRecord"> ' +
                                        '            <td colspan="31" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                        '        </tr> ' +
                                        '    </tbody> ' +
                                        '</table>'
                                    );
                                }, 1000);
                            }
                            else if (value.message == "You are can't access") {
                                $('#dvAlert').attr("class", "form-group alert alert-danger");
                                $('#dvAlert').html('<i class="fa fa-close"> The session has ended.</i>');

                                setTimeout(function () {
                                    var url = geturl();
                                    window.location.href = url + '/auth/Xhoc5AO6w7o';
                                }, 3000);
                            }
                        }
                        else {
                            $('#dvAlert').attr("class", "form-group alert alert-danger");
                            $('#dvAlert').html('<i class="fa fa-close"> ' + value.message + '.</i>');

                            setTimeout(function () {
                                $('#dvAlert').attr("class", "");
                                $('#dvAlert').html('');

                                $('#dvTable').attr("class", "form-group");

                                $('#btnSearch').prop('disabled', false);

                                $('#dvTable').empty().html(
                                    '<table id="tblReport" class="table table-responsive table-bordered"> ' +
                                    '    <thead class="text-bold"> ' +
                                    '        <tr> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Bin</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' + 
                                    '           <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                                    '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' + 
                                    '        </tr> ' +
                                    '    </thead> ' +
                                    '    <tbody id="tbReport"> ' +
                                    '        <tr id="trNoRecord"> ' +
                                    '            <td colspan="30" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                    '        </tr> ' +
                                    '    </tbody> ' +
                                    '</table>'
                                );
                            }, 3000)
                        }
                    }
                );
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#dvAlert').attr("class", "form-group alert alert-danger");
                $('#dvAlert').html('<i class="fa fa-close"> ' + jqXHR.status + ' ' + errorThrown + '.</i>');

                setTimeout(function () {
                    $('#dvAlert').attr("class", "");
                    $('#dvAlert').html('');

                    $('#dvTable').attr("class", "form-group");

                    $('#btnSearch').prop('disabled', false);

                    $('#dvTable').empty().html(
                        '<table id="tblReport" class="table table-responsive table-bordered"> ' +
                        '    <thead class="text-bold"> ' +
                        '        <tr> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Bin</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' + 
                        '           <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                        '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' + 
                        '        </tr> ' +
                        '    </thead> ' +
                        '    <tbody id="tbReport"> ' +
                        '        <tr id="trNoRecord"> ' +
                        '            <td colspan="31" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                        '        </tr> ' +
                        '    </tbody> ' +
                        '</table>'
                    );
                }, 3000)
            }
        });
    });
});