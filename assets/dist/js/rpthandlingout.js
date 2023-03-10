let dataTable = []
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

    //$('#dateFrom').val('08/25/2019');
    $('#dateTo').val(
        ((vCurrentDate.getMonth() + 1)).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString()
    );

    $('#dateFrom').datepicker({
        autoclose: true,
        startDate: new Date($('#dateFrom').val())
    });

    $('#dateTo').datepicker({
        autoclose: true,
        startDate: new Date($('#dateFrom').val())
    });

    loadLocation();

    loadCustomer();
};

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
        '               <tr> ' +
        '                   <td colspan = "4" class="text-center" style="vertical-align:middle;"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
        '               </tr >'
    '           </tbody> ' +
        '       </table> ' +
        '   </div> ' +
        '</div>';
    $('#mdlbody').html(htmlTbl);

    $.ajax({
        url: siteUrl + '/sn_data',
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

function exportsummary() {
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

    
    var headerSummary = $("#table-header-summary").html();

    var htmlTable =
                   "<table border='2px'> " +
                   "   <thead> " +
                   "       <tr> " +
                   "           <th colspan='24' class='text-center'> " +
                   "               <b>" + $("#title-full").text()  + "</b><br/>" +
                   "               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/>" +
                   "           </th>" +
                   "       </tr> " +
                   headerSummary + 
                   "   </thead> " +
                   "   <tbody> ";

    dataTable.data.forEach(function (valueData) {
        htmlTable +=
            "       <tr> " +
            "           <td>" + valueData.no + "</td> " +
            "           <td>" + valueData.bcdoctype + "</td> " +
            "           <td>" + valueData.bcdocno + "</td> " +
            "           <td>'" + valueData.ajuno + "</td> " +
            "           <td>" + valueData.bcdocdate + "</td> " +
            "           <td>" + valueData.docoutno + "</td> " +
            "           <td>'" + valueData.docoutdate + "</td> " +
            "           <td>" + valueData.refregno + "</td> " +
            "           <td>" + valueData.docrefdate + "</td> " +
            "           <td>" + valueData.consigneename + "</td> " +
            "           <td>" + valueData.itmcode + "</td> " +
            "           <td>" + valueData.itmname + "</td> " +
            "           <td>" + valueData.prodbatchno + "</td> " +
            "           <td>" + valueData.qty + "</td> " +
            "           <td>" + valueData.uomqty + "</td> " +
            "           <td>" + valueData.price + "</td> " +
            "           <td>" + valueData.currency + "</td> " +
            "           <td>" + valueData.weight + "</td> " +
            "           <td>" + valueData.uomweight + "</td> " +
            "           <td>" + valueData.volume + "</td> " +
            "           <td>" + valueData.uomvolume + "</td> " +
            "           <td>" + valueData.custname + "</td> " +
            "           <td>" + valueData.whlocation + "</td> " +

            "       </tr> ";
    });

    htmlTable +=
        "   </tbody> " +
        "</table>";

    //exportToExcelHTML(htmlTable, "Laporan Pengeluaran Pusat Logistik Berikat", "PengeluaranBarang_Summary.xls");

    let outerDiv = $('<div></div>')
        .hide()
        .append(htmlTable);

    outerDiv.table2excel({
        exclude: "",
        sheetName: "Laporan Pengeluaran Pusat Logistik Berikat",
        filename: "PengeluaranBarang_Summary.xls", // do include extension
        preserveColors: false // set to true if you want background colors and font colors preserved
    });
                    

            $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
            $('#ExportReporttoExcel').prop('disabled', false);

};

function exportdetail() {
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');
    
        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)
    
        return;
    } 
    
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
    else
        vCust = $('#txtCustID option:selected').val();
    
    let typeDate = $('input[name="opsTypeDate"]:checked').val();
    
    var dateFrom = new Date($('#dateFrom').val());
    var dateTo = new Date($('#dateTo').val());
    if (dateTo < dateFrom) {
        alert('Date From must be greater from Date to!!'); 
        return false;
    }         

    $.ajax({
        url: siteUrl + '/report/handlingout_detail_data',
        type: 'POST',
        timeout: 2147483647,
        dataType: 'json',        
        data: {"filter":"detail", "locid": vLoc, "custid": vCust, "frmdate": $('#dateFrom').val(), "todate": $('#dateTo').val(), "typedoc": $('#docType').val(), "typedate": typeDate },
        success: function (value) {
            if (value.message == "You are can't access") {
                $('#dvAlert').attr("class", "form-group alert alert-danger");
                $('#dvAlert').html('<i class="fa fa-close"> The session has ended.</i>');

                setTimeout(function () {
                    var url = geturl();
                    window.location.href = url + '/auth/Xhoc5AO6w7o';
                }, 3000);
            }
            else {

                var headerDetail = $("#table-header-detail").html();
                var htmlTable =
                    "<table border='2px'> " +
                    "   <thead> " +
                    "       <tr> " +
                    "           <th colspan='25' class='text-center'> " +
                    "               <b>" + $("#title-full").text()  + "</b><br/>" +
                    "               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/>" +
                    "           </th>" +
                    "       </tr> " +
                    headerDetail +
                    "   </thead> " +
                    "   <tbody> ";

                value.data.forEach(function (valueData) {
                    
                    htmlTable +=
                        "       <tr> " +
                        "           <td>" + valueData.no + "</td> " +
                        "           <td>" + valueData.bcdoctype + "</td> " +
                        "           <td>" + "'" + valueData.bcdocno + "</td> " +
                        "           <td>" + "'" + valueData.ajuno + "</td> " +
                        "           <td>" + valueData.bcdocdate + "</td> " +
                        "           <td>" + valueData.docoutno + "</td> " +
                        "           <td>" + valueData.docoutdate + "</td> " +
                        "           <td>" + valueData.refregno + "</td> " +
                        "           <td>" + valueData.docrefdate + "</td> " +
                        "           <td>" + valueData.consigneename + "</td> " +
                        "           <td>" + valueData.containerno + "</td> " +
                        "           <td>" + valueData.itmcode + "</td> " +
                        "           <td>" + valueData.itmname + "</td> " +
                        "           <td>" + valueData.prodserialno + "</td> " +
                        "           <td>" + valueData.prodbatchno + "</td> " +
                        "           <td>" + valueData.qty + "</td> " +
                        "           <td>" + valueData.uomqty + "</td> " +
                        "           <td>" + valueData.price + "</td> " +
                        "           <td>" + valueData.currency + "</td> " +
                        "           <td>" + valueData.weight + "</td> " +
                        "           <td>" + valueData.uomweight + "</td> " +
                        "           <td>" + valueData.volume + "</td> " +
                        "           <td>" + valueData.uomvolume + "</td> " +
                        "           <td>" + valueData.custname + "</td> " +
                        "           <td>" + valueData.whlocation + "</td> " +
                        "           <td>" + valueData.containerno + "</td> " +
                        "       </tr> ";
                });

                htmlTable +=
                    "   </tbody> " +
                    "</table>";

                //exportToExcelHTML(htmlTable, "Laporan Pengeluaran Pusat Logistik Berikat", "PengeluaranBarang_Detail.xls");

                let outerDiv = $('<div></div>')
                    .hide()
                    .append(htmlTable);

                outerDiv.table2excel({
                    exclude: "",
                    sheetName: "Laporan Pengeluaran Pusat Logistik Berikat",
                    filename: "PengeluaranBarang_Detail.xls", // do include extension
                    preserveColors: false // set to true if you want background colors and font colors preserved
                });
            }
        

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
};

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
        else
            vCust = $('#txtCustID option:selected').val();

        // validation for date
        var dateFrom = new Date($('#dateFrom').val());
        var dateTo = new Date($('#dateTo').val()); 
        if (dateTo < dateFrom ) {
            alert('Date From must be greater from Date to!!'); 
            return false;
        }

        $('#btnSearch').prop('disabled', true);

        $('#tbReport').empty().append(
            '<tr> ' +
            '        <td colspan = "27" class="text-center" style="vertical-align:middle;"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
            '</tr >'
        );

        $('#dvTable').attr("class", "form-group overlay");

        $('#dvPeriod').html('<h5>Periode: ' + $('#dateFrom').val() + ' s/d ' + $('#dateTo').val() + '</h5>');

        let typeDate = $('input[name="opsTypeDate"]:checked').val();
        

        $('#tblReport').DataTable({
            ajax: {
                url: "/report/handlingout_data",
                timeout: 300000,
                type: 'post',
                data: { "locid": vLoc, "custid": vCust, "frmdate": $('#dateFrom').val(), "todate": $('#dateTo').val(), "typedoc": $('#docType').val(), "typedate": typeDate },
        
            },
            drawCallback: function(settings) {
                let response = settings.json;
                if(response){
                    dataTable = response;
                }
                $('#btnSearch').prop('disabled', false);
             },

            bDestroy: true,
            columns: [
                        {data:"no"},
                        {data:"bcdoctype"},
                        {data:"bcdocno"},
                        {data:"ajuno"},
                        {data:"bcdocdate"},
                        {data:"docoutno"},
                        {data:"docoutdate"},
                        {data:"refregno"},
                        {data:"docrefdate"},
                        {data:"consigneename"},
                        {data:"containerno"},
                        {data:"itmcode"},
                        {data:"itmname"},
                        { 	data: null, 
                            render: function ( data, type, row ) {
                                //let snParam = data.whcode + "," + data.custcode + "," + data.grno + "," + data.ajuno + "," + data.regno + "," + data.itmcode + "," + data.lotno;
                                let snParam = '';
                           // Combine the first and last names into a single table field
                               return '<a href="javascript:void(0)" onclick="sn(`' + snParam + '`);"><i class="fa fa-eye"></i> detail</a>';
                           } 
                       },
                        {data:"prodbatchno"},
                        {data:"qty"},
                        {data:"uomqty"},
                        {data:"price"},
                        {data:"currency"},
                        {data:"weight"},
                        {data:"uomweight"},
                        {data:"volume"},
                        {data:"uomvolume"},
                        {data:"custname"},
                        {data:"whlocation"},
                        {data:"ob_created_by"},
                        {data:"ob_created_date"},
                        {data:"ob_modified_by"},
                        {data:"ob_modified_date"},
            ],
        });

        $('#dvTable').attr("class", "form-group overlay");
        //$('#iLoading').show();

        $('#dvPeriod').html('<h5>Periode: ' + $('#dateFrom').val() + ' s/d ' + $('#dateTo').val() + '</h5>');
       
    });
});