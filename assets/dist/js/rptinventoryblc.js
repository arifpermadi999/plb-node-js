let pathExcel = "";
let dataInventory = [];

let titleFullPrefix = $("#title-full").text();

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

function exportSummary() {

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
    if(vLoc == "JKT01BLCCW" && vCust == "WH76PTWHS"){
		//alert(pathExcel);
      window.location.assign('https://plbreport.ckb.co.id/erp/excel/' + pathExcel);
      $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
      $('#ExportReporttoExcel').prop('disabled', false);
      return;
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

    var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;
    let value = dataInventory;

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

                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whcode + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcode + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmname + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlclsstock + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.regno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ajuno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.srlno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.price + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.currency + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.weight + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomweight + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.volume + '</td>' +
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



function exportDetail() {

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
    // if(vLoc == "JKT01BLCCW" && vCust == "WH76PTWHS"){
	// 	//alert(pathExcel);
    //   window.location.assign('https://plbreport.ckb.co.id/erp/excel/' + pathExcel);
    //   $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
    //   $('#ExportReporttoExcel').prop('disabled', false);
    //   return;
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
    let value = dataInventory;

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
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whcode + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmcode + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.itmname + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlclsstock + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.pmryrefdocno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.regno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ajuno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.srlno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.price + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.currency + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.weight + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.uomweight + '</td>' +
                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.volume + '</td>' +
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





$(document).ready(function () {
    readyComponent();
    

    $("#ExportReporttoExcel").on("click", function () {
        var vTr = $('#trNoRecord').text();
        if (vTr == "") {
            $('#ExportReporttoExcel').prop('disabled', true);
            $('#ExportReporttoExcel').html('<i class="fa fa-refresh fa-spin"></i> Exporting....');

            exportSummary();
            
                    
            $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
            $('#ExportReporttoExcel').prop('disabled', false);
        }
    });

    $("#ExportReporttoExcelDtl").on("click", function () {
        var vTr = $('#trNoRecord').text();
        if (vTr == "") {
            $('#ExportReporttoExcelDtl').prop('disabled', true);
            $('#ExportReporttoExcelDtl').html('<i class="fa fa-refresh fa-spin"></i> Exporting....');

            //exportdetail();
            
            exportDetail();
            
            $('#ExportReporttoExcelDtl').prop('disabled', false);
            $('#ExportReporttoExcelDtl').html('<i class="fa fa-file-excel-o"></i> Export Detail');
        }
    });
    function wordInString(s, words, replacement) {
        var re = new RegExp('\\b' + words.join('|') + '\\b', 'gi');
        return s.replace(re, replacement);
    }
    
    titleFullPrefix = wordInString(titleFullPrefix, ['Pusat ', 'Logistik ', 'Berikat'], '');
    titleFullPrefix = wordInString(titleFullPrefix, ['Bonded ', 'Logistics ', 'Center'], '');


    $('#btnSearch').click(function () {
        loadData();
       
    });
    function  loadData(){
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
            $('#tblReport').DataTable({
                ajax: {
                    url: "/report/inventory_data",
                    timeout: 300000,
                    type: 'post',
                    data:{
                        location_code:vLoc,
                        customer_code:vCust,
                    }
                },
                drawCallback: function(settings) {
                    let response = settings.json;
                    if(response){
                        dataInventory = response;
                    }
                 },

                bDestroy: true,
                columns: [
                    {data:"no"},
                    {data:"whcode"},
                    {data:"custname"},
                    {data:"itmcode"},
                    {data:"itmname"},
                    {data:"fnlclsstock"},
                    {data:"binstgid"},
                    {data:"pmryrefdocno"},
                    {data:"regno"},
                    {data:"ajuno"},
                    {data:"srlno"},
                    {data:"batchno"},
                    {data:"grdate"},
                    {data:"price"},
                    {data:"currency"},
                    {data:"weight"},
                    {data:"uomweight"},
                    {data:"volume"},
                    {data:"uomvolume"},
                    {data:"po_number"},
                    {data:"case_no"},
                    {data:"remarks"}
                ],
            });
            //So, to get all data do:
            // var form_data  = table.rows().data().toArray;
            // console.log(form_data);
            $('#btnSearch').prop('disabled', false);
    }
});