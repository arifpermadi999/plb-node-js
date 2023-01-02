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
        url: window.location.origin + window.location.pathname.toLowerCase().replace('shipmenttracking', '') + 'getSN',
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

    $('#txtAjuNo').val('');
    $('#txtRegNo').val('');

    //var vCurrentDate = new Date();

    //$('#dateFrom').val(
    //    (vCurrentDate.getFullYear()).toString() + "-" +
    //    ((vCurrentDate.getMonth())[1] ? vCurrentDate.getMonth() : "0" + vCurrentDate.getMonth()).toString() + "-" +
    //    (vCurrentDate.getDate()).toString()
    //);
    //$('#dateTo').val(
    //    (vCurrentDate.getFullYear()).toString() + "-" +
    //    ((vCurrentDate.getMonth() + 1)[1] ? (vCurrentDate.getMonth() + 1) : "0" + (vCurrentDate.getMonth() + 1)).toString() + "-" +
    //    (vCurrentDate.getDate()).toString()
    //);
};

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

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('shipmenttracking', '') + 'getExportShipmentTracking',
        type: 'POST',
        timeout: 300000,
        dataType: 'json',
        data: { "filter": "summary" },
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
                    else {
                        htmlTable =
                            "<table border='2px'> " +
                            "   <thead class='text-bold'> " +
                            "       <tr> " +
                            "           <th colspan='18' class='text-center'> " +
                            "               <b>Laporan Tracking Dokumen Barang Pusat Logistik Berikat</b><br/> " +
                            "               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/> " +
                            "           </th> " +
                            "       </tr> " +
                            "       <tr bgcolor='#87AFC6'> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>No</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Uraian Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Kode Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Closing Stock</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>THU Serial No</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Batch No</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>No Pendaftaran</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nomor Aju</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Office</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nama Warehouse</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Lokasi</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Pemilik Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nomor Bukti Penerimaan Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Tanggal Masuk</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Total Receipts</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nomor Bukti Pengeluaran Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Tanggal Keluar</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Total Dispatches</th> " +                            
                            "       </tr> " +
                            "   </thead> " +
                            "   <tbody> ";

                        

                        if (value.status == "OK") {
                            if (value.message == "Success") {

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
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td>' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmdesc + '</td>' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td>' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueGroup.fnlclsstk + '</td>' +
                                                '</tr>';
                                        }

                                        var vloop = 1;
                                        vDtl.forEach(function (valueDtl) {
                                            if (vloop == 1 || vloop == vRwSpan) {
                                                htmlDtl +=
                                                    '<tr>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.thusrlno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.batchno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.regno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.ajuno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.country + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.whlocation + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.binstaging + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.custname + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.grno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.grdate + '</td>' +
                                                    '   <td style="text-align:right;vertical-align:middle;border-top-width:3px;">' + valueDtl.ttlreceipt.replace('0.00', '') + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.lotexecno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.lotexecdate + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.ttldispatches.replace('0.00', '') + '</td>' +
                                                    '</tr>';
                                            }
                                            else {
                                                htmlDtl +=
                                                    '<tr>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.thusrlno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.batchno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.regno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.ajuno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.country + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.whlocation + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.binstaging + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.custname + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.grno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.grdate + '</td>' +
                                                    '   <td style="text-align:right;vertical-align:middle;">' + valueDtl.ttlreceipt.replace('0.00', '') + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.lotexecno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.lotexecdate + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.ttldispatches.replace('0.00', '') + '</td>' +
                                                    '</tr>';
                                            }

                                            vloop += 1;
                                        });

                                        htmlTable += htmlGroup + htmlDtl;
                                    }
                                );
                            }
                            else if (value.message == "Data not found") {
                                setTimeout(function () {                                    
                                    $('#ExportReporttoExcel').prop('disabled', false);
                                    $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
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

                                $('#ExportReporttoExcel').prop('disabled', false);
                                $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
                            }, 3000);
                        }

                        //exportToExcelHTML(htmlTable, "Laporan Tracking Dokumen Barang Pusat Logistik Berikat", "TrackingBarang_Summary.xls");

                        this.$OuterDiv = $('<div></div>')
                            .hide()
                            .append(htmlTable);

                        $OuterDiv.table2excel({
                            exclude: "",
                            sheetName: "Laporan Tracking Dokumen Barang Pusat Logistik Berikat",
                            filename: "TrackingBarang_Summary.xls", // do include extension
                            preserveColors: false // set to true if you want background colors and font colors preserved
                        });

                        $('#ExportReporttoExcel').prop('disabled', false);
                        $('#ExportReporttoExcel').html('<i class="fa fa-file-excel-o"></i> Export Summary');
                    }
                }
            )
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#dvAlert').attr("class", "form-group alert alert-info");
            $('#dvAlert').html('<i class="fa fa-close"></i> Invalid export summary.');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');
            }, 3000)
        }
    });
}

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

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('shipmenttracking', '') + 'getExportShipmentTracking',
        type: 'POST',
        timeout: 300000,
        dataType: 'json',
        data: { "filter": "detail" },
        success: function (data) {
            var htmlTable = '';
            var no = 1;

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
                    else {
                        htmlTable =
                            "<table border='2px'> " +
                            "   <thead class='text-bold'> " +
                            "       <tr> " +
                            "           <th colspan='19' class='text-center'> " +
                            "               <b>Laporan Tracking Dokumen Barang Pusat Logistik Berikat</b><br/> " +
                            "               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/> " +
                            "           </th> " +
                            "       </tr> " +
                            "       <tr bgcolor='#87AFC6'> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>No</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Uraian Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Kode Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>THU Serial No</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Serial No</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Batch No</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>No Pendaftaran</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nomor Aju</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Office</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nama Warehouse</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Lokasi</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Pemilik Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nomor Bukti Penerimaan Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Tanggal Masuk</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Total Receipts</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Nomor Bukti Pengeluaran Barang</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Tanggal Keluar</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Total Dispatches</th> " +
                            "           <th class='text-bold text-info warning' style='vertical-align:middle;'>Closing Stock</th> " +
                            "       </tr> " +
                            "   </thead> " +
                            "   <tbody> ";

                        value.data.forEach(function (valueData) {
                            htmlTable +=
                                "       <tr> " +
                                "           <td style='vertical-align:middle;'>" + valueData.no + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.itmnm + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.itmcode + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.thusrlno + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.srlno + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.batchno + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.regno + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.ajuno + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.country + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.whlocation + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.binstaging + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.custname + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.grno + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.grdate + "</td> " +
                                "           <td style='text-align:right;vertical-align:middle;'>" + valueData.ttlreceipt + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.lotexecno + "</td> " +
                                "           <td style='vertical-align:middle;'>" + valueData.lotexecdate + "</td> " +
                                "           <td style='text-align:right;vertical-align:middle;'>" + valueData.ttldispatches + "</td> " +
                                "           <td style='text-align:right;vertical-align:middle;'>" + valueData.clsstk + "</td> " +
                                "       </tr>";
                        });

                        htmlTable +=
                            "    </tbody> " +
                            "</table>";

                        //exportToExcelHTML(htmlTable, "Laporan Tracking Dokumen Barang Pusat Logistik Berikat", "TrackingBarang_Detail.xls");

                        this.$OuterDiv = $('<div></div>')
                            .hide()
                            .append(htmlTable);

                        $OuterDiv.table2excel({
                            exclude: "",
                            sheetName: "Laporan Tracking Dokumen Barang Pusat Logistik Berikat",
                            filename: "TrackingBarang_Detail.xls", // do include extension
                            preserveColors: false // set to true if you want background colors and font colors preserved
                        });
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
            '        <td colspan = "21" class="text-center"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>loading....</small></td > ' +
            '</tr >'
        );        

        $('#dvTable').attr("class", "form-group overlay");

        //$('#dvPeriod').html('<h5>Periode: ' + $('#dateFrom').val() + ' s/d ' + $('#dateTo').val() + '</h5>');

        $.ajax({
            url: window.location.origin + window.location.pathname.toLowerCase().replace('shipmenttracking', '') + 'getShipmentTracking',
            timeout: 300000,
            //global: false,
            type: 'post',
            datatype: 'json',
            data: { "ajuno": $('#txtAjuNo').val(), "regno": $('#txtRegNo').val() },
            //async: false,
            success: function (data) {
                var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;

                data.forEach(
                    function (value) {
                        if (value.status == "OK") {
                            if (value.message == "Success") {

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
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td>' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmdesc + '</td>' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td>' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;" class="text-right">' + valueGroup.fnlclsstk + '</td>' +
                                                '</tr>';
                                        }

                                        var vloop = 1;
                                        vDtl.forEach(function (valueDtl) {
                                            if (vloop == 1 || vloop == vRwSpan) {
                                                htmlDtl +=
                                                    '<tr>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.thusrlno + '</td>' +
                                                '   <td class="text-center" style="vertical-align:middle;border-top-width:3px;"><a href="javascript:void(0)" onclick="sn(\'' + valueDtl.encryptparam +'\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.batchno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.regno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.ajuno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.country + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.whlocation + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.binstaging + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.custname + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.grno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.grdate + '</td>' +
                                                    '   <td style="text-align:right;vertical-align:middle;border-top-width:3px;">' + valueDtl.ttlreceipt.replace('0.00', '') + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.lotexecno + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.lotexecdate + '</td>' +
                                                    '   <td style="vertical-align:middle;border-top-width:3px;">' + valueDtl.ttldispatches.replace('0.00', '') + '</td>' +
                                                    '</tr>';
                                            }
                                            else {
                                                htmlDtl +=
                                                    '<tr>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.thusrlno + '</td>' +
                                                    '   <td class="text-center" style="vertical-align:middle;"><a href="javascript:void(0)" onclick="sn(\'' + valueDtl.encryptparam +'\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.batchno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.regno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.ajuno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.country + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.whlocation + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.binstaging + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.custname + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.grno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.grdate + '</td>' +
                                                    '   <td style="text-align:right;vertical-align:middle;">' + valueDtl.ttlreceipt.replace('0.00', '') + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.lotexecno + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.lotexecdate + '</td>' +
                                                    '   <td style="vertical-align:middle;">' + valueDtl.ttldispatches.replace('0.00', '') + '</td>' +
                                                    '</tr>';
                                            }

                                            vloop += 1;
                                        });

                                        htmlTable += htmlGroup + htmlDtl;
                                    }
                                );

                                $('#dvTable').attr("class", "form-group");

                                $('#btnSearch').prop('disabled', false);

                                $('#tbReport').empty();
                                $('#tbReport').append(htmlTable);                                
                            }
                            else if (value.message == "Data not found") {

                                setTimeout(function () {
                                    $('#dvTable').attr("class", "form-group");

                                    $('#btnSearch').prop('disabled', false);

                                    $('#dvTable').empty().html(
                                        '<table id="tblReport" class="table table-responsive table-bordered"> ' +
                                        '   <thead class= "text-bold"> ' +
                                        '       <tr> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Uraian Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Bukti Penerimaan Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Bukti Pengeluaran Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Total Dispatches</th> ' +                                        
                                        '       </tr> ' +
                                        '   </thead> ' +
                                        '   <tbody id="tbReport"> ' +
                                        '       <tr id="trNoRecord"> ' +
                                        '           <td colspan="19" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                        '       </tr> ' +
                                        '   </tbody> ' +
                                        '   <tfoot id="tf"></tfoot> ' +
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
                                    '   <thead class= "text-bold"> ' +
                                    '       <tr> ' +
                                    //'           <th class="text-bold info" style="vertical-align:middle;">#</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Uraian Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Nomor Bukti Penerimaan Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Nomor Bukti Pengeluaran Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Total Dispatches</th> ' +                                    
                                    '       </tr> ' +
                                    '   </thead> ' +
                                    '   <tbody id="tbReport"> ' +
                                    '       <tr id="trNoRecord"> ' +
                                    '           <td colspan="19" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                    '       </tr> ' +
                                    '   </tbody> ' +
                                    '   <tfoot id="tf"></tfoot> ' +
                                    '</table>'
                                );
                            }, 3000);                            
                        }
                    }
                )
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
                        '   <thead class= "text-bold"> ' +
                        '       <tr> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Uraian Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Bukti Penerimaan Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Bukti Pengeluaran Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Total Dispatches</th> ' +                        
                        '       </tr> ' +
                        '   </thead> ' +
                        '   <tbody id="tbReport"> ' +
                        '       <tr id="trNoRecord"> ' +
                        '           <td colspan="19" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                        '       </tr> ' +
                        '   </tbody> ' +
                        '   <tfoot id="tf"></tfoot> ' +
                        '</table>'
                    );
                }, 3000);                
            }
        })
    });
});