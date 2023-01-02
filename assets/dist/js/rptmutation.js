function loadLocation() {
    $('#iLoc').removeClass('fa-hand-o-up').addClass('fa-refresh fa-spin');
    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('mutation', '') + 'getLocation',
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
        url: window.location.origin + window.location.pathname.toLowerCase().replace('mutation', '') + 'getCustomer',
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
                                        $('#txtCustID').append('<option value="' + valueData.value + '">(' + valueData.value + ') ' + valueData.text + '</option>');
                                    else
                                        $('#txtCustID').append('<option value="' + valueData.value + '"><span style="color:red">[Inactive]</span> (' + valueData.value + ') ' + valueData.text + '</option>');
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
        url: window.location.origin + window.location.pathname.toLowerCase().replace('mutation', '') + 'getSN',
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

    //$('#dateFrom').val(
    //    '08/25/2019'
    //);
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
        url: window.location.origin + window.location.pathname.toLowerCase().replace('mutation', '') + 'getExportMutation',
        timeout: 2147483647,
        type: 'POST',
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
                    if (value.status == "OK") {
                        if (value.message == "Success") {
                            var htmlTable =
                                "<table border='2px'> " +
                                "   <thead> " +
                                "       <tr> " +
                                "           <th colspan='21' class='text-center'> " +
                                "               <b>Laporan Mutasi Barang Pusat Logistik Berikat</b><br/>" +
                                "               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/>" +
                                "           </th>" +
                                "       </tr> " +
                                "       <tr bgcolor='#87AFC6'> " +
                                '            <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Urian Barang</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Saldo Awal</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                                /*'            <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +*/
                                '            <th class="text-bold info" style="vertical-align:middle;">Thu Id</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Total Dispatched</th> ' +
                                //'            <th class="text-bold info" style="vertical-align:middle;">Final Qty Received</th> ' +
                                /*'            <th class="text-bold info" style="vertical-align:middle;">Stock</th> ' +*/
                                '            <th class="text-bold info" style="vertical-align:middle;">Stock Opname</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Selisih</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Keterangan</th> ' +                                
                                "       </tr> " +
                                "   </thead> " +
                                "   <tbody> ";

                            /*-- loop data group --*/
                            value.group.forEach(
                                function (valueGroup) {
                                    var vDtl = '';
                                    htmlDtl = '', htmlGroup = '';

                                    vDtl = value.data.filter(element => element.itmcode === valueGroup.itmcode);

                                    if (value.data.filter(element => element.itmcode === valueGroup.itmcode).length <= 0) {
                                        htmlDtl +=
                                            '<tr>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                            //'   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)"><i class="fa fa-eye"></i> detail</a></td>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">0.00</td> ' +
                                            //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '</tr> ';
                                    }
                                    else {
                                        var vRwSpan = 0;
                                        if (vDtl.length > 1) {
                                            vRwSpan = vDtl.length + 1;

                                            htmlGroup =
                                                '<tr> ' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                                '   <td class="text-right" rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                                '   <td class="text-right" rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                                '</tr>';
                                        }

                                        vDtl.forEach(function (valueDtl) {
                                            if (vDtl.length > 1) {
                                                htmlDtl +=
                                                    '<tr>' +
                                                    //'   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)" onclick="handlingindtl(\'' + valueDtl.grno + '\',\'' + valueDtl.itmcode + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.country + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whlocation + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loaddate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ttldispatches + '</td> ' +
                                                    //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlqtyreceive + '</td> ' +
                                                    /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.stkopname + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.slsh + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remark + '</td> ' +
                                                    '</tr> ';
                                            }
                                            else if (vDtl.length = 1) {
                                                htmlDtl =
                                                    '<tr>' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                                    //'   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)" onclick="handlingindtl(\'' + valueDtl.grno + '\',\'' + valueDtl.itmcode + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.country + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whlocation + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loaddate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">0.00</td> ' +
                                                    //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlqtyreceive + '</td> ' +
                                                    /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.stkopname + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.slsh + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remark + '</td> ' +
                                                    '</tr> ';
                                            }
                                        });
                                    }

                                    htmlTable += htmlGroup + htmlDtl;
                                }
                            );

                            htmlTable +=
                                "   </tbody> " +
                                "</table>";

                            //exportToExcelHTML(htmlTable, "Laporan Mutasi Barang Pusat Logistik Berikat", "MutasiBarang_Summary.xls");

                            this.$OuterDiv = $('<div></div>')
                                .hide()
                                .append(htmlTable);

                            $OuterDiv.table2excel({
                                exclude: "",
                                sheetName: "Laporan Mutasi Barang Pusat Logistik Berikat",
                                filename: "MutasiBarang_Summary.xls", // do include extension
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

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('mutation', '') + 'getExportMutation',
        timeout: 2147483647,
        type: 'POST',
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
                            var htmlTable =
                                "<table border='2px'> " +
                                "   <thead> " +
                                "       <tr> " +
                                "           <th colspan='22' class='text-center'> " +
                                "               <b>Laporan Mutasi Barang Pusat Logistik Berikat</b><br/>" +
                                "               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/>" +
                                "           </th>" +
                                "       </tr> " +
                                "       <tr bgcolor='#87AFC6'> " +
                                '            <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Urian Barang</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Saldo Awal</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Thu Id</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Total Dispatched</th> ' +
                                //'            <th class="text-bold info" style="vertical-align:middle;">Final Qty Received</th> ' +
                                /*'            <th class="text-bold info" style="vertical-align:middle;">Stock</th> ' +*/
                                '            <th class="text-bold info" style="vertical-align:middle;">Stock Opname</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Selisih</th> ' +
                                '            <th class="text-bold info" style="vertical-align:middle;">Keterangan</th> ' +
                                "       </tr> " +
                                "   </thead> " +
                                "   <tbody> ";

                            /*-- loop data group --*/
                            value.group.forEach(
                                function (valueGroup) {
                                    var vDtl = '';
                                    htmlDtl = '', htmlGroup = '';

                                    vDtl = value.data.filter(element => element.itmcode === valueGroup.itmcode);

                                    if (value.data.filter(element => element.itmcode === valueGroup.itmcode).length <= 0) {
                                        htmlDtl +=
                                            '<tr>' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">0.00</td> ' +
                                            //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                            '</tr> ';
                                    }
                                    else {
                                        var vRwSpan = 0;
                                        if (vDtl.length > 1) {
                                            vRwSpan = vDtl.length + 1;

                                            htmlGroup =
                                                '<tr> ' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                                '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                                '   <td class="text-right" rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                                '   <td class="text-right" rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                                '</tr>';
                                        }

                                        vDtl.forEach(function (valueDtl) {
                                            if (vDtl.length > 1) {
                                                htmlDtl +=
                                                    '<tr>' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.srlno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.country + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whlocation + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loaddate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ttldispatches + '</td> ' +
                                                    //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlqtyreceive + '</td> ' +
                                                    /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.stkopname + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.slsh + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remark + '</td> ' +
                                                    '</tr> ';
                                            }
                                            else if (vDtl.length = 1) {
                                                htmlDtl =
                                                    '<tr>' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.srlno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.regno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + "'" + valueDtl.ajuno + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.country + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whlocation + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loaddate + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">0.00</td> ' +
                                                    //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlqtyreceive + '</td> ' +
                                                    /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.stkopname + '</td> ' +
                                                    '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.slsh + '</td> ' +
                                                    '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remark + '</td> ' +
                                                    '</tr> ';
                                            }
                                        });
                                    }

                                    htmlTable += htmlGroup + htmlDtl;
                                }
                            );

                            htmlTable +=
                                "   </tbody> " +
                                "</table>";

                            //exportToExcelHTML(htmlTable, "Laporan Mutasi Barang Pusat Logistik Berikat", "MutasiBarang_Detail.xls");

                            this.$OuterDiv = $('<div></div>')
                                .hide()
                                .append(htmlTable);

                            $OuterDiv.table2excel({
                                exclude: "",
                                sheetName: "Laporan Mutasi Barang Pusat Logistik Berikat",
                                filename: "MutasiBarang_Detail.xls", // do include extension
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

        $('#btnSearch').prop('disabled', true);

        $('#tbReport').empty().append(
            '<tr> ' +
            '        <td colspan = "23" class="text-center"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
            '</tr >'
        );        

        $('#dvTable').attr("class", "form-group overlay");

        $('#dvPeriod').html('<h5>Periode: ' + $('#dateFrom').val() + ' s/d ' + $('#dateTo').val() + '</h5>');

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

        $.ajax({
            url: window.location.origin + window.location.pathname.toLowerCase().replace('mutation', '') + 'getMutation',
            timeout: 2147483647,
            type: 'POST',
            dataType: 'json',
            data: { "locid": vLoc, "custid": vCust, "frmdate": $('#dateFrom').val(), "todate": $('#dateTo').val() },
            success: function (data) {
                var htmlTable = '', htmlGroup = '', htmlDtl = '', rwspanoub;

                data.forEach(
                    function (value) {
                        if (value.status == "OK") {
                            if (value.message == "Success") {

                                /*-- loop data group --*/
                                value.group.forEach(
                                    function (valueGroup) {
                                        var vDtl = '';
                                        htmlDtl = '', htmlGroup = '';

                                        vDtl = value.data.filter(element => element.itmcode === valueGroup.itmcode);

                                        if (value.data.filter(element => element.itmcode === valueGroup.itmcode).length <= 0) {
                                            htmlDtl +=
                                                '<tr>' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                                '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                                '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                                '   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)"><i class="fa fa-eye"></i> detail</a></td>' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">0.00</td> ' +
                                                //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                                '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '   <td style="vertical-align:middle; border-top-width:3px;"></td> ' +
                                                '</tr> ';
                                        }
                                        else {
                                            var vRwSpan = 0;
                                            if (vDtl.length > 1) {
                                                vRwSpan = vDtl.length + 1;

                                                htmlGroup =
                                                    '<tr> ' +
                                                    '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                                    '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                                    '   <td rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                                    '   <td class="text-right" rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                                    '   <td class="text-right" rowspan="' + vRwSpan + '" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                                    '</tr>';
                                            }

                                            vDtl.forEach(function (valueDtl) {
                                                if (vDtl.length > 1) {
                                                    htmlDtl +=
                                                        '<tr>' +
                                                        '   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)" onclick="sn(\'' + valueDtl.encryptparam +'\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.regno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ajuno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.country + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whlocation + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loaddate + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ttldispatches + '</td> ' +
                                                        //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlqtyreceive + '</td> ' +
                                                        /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.stkopname + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.slsh + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remark + '</td> ' +
                                                        '</tr> ';
                                                }
                                                else if (vDtl.length = 1) {
                                                    htmlDtl =
                                                        '<tr>' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.no + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmname + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueGroup.itmcode + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.opnbalance + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueGroup.clsstk + '</td> ' +
                                                        '   <td class="text-center" style="vertical-align:middle; border-top-width:3px;"><a href="javascript:void(0)" onclick="sn(\'' + valueDtl.encryptparam +'\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thuid + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.thusrlno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.batchno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.regno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.ajuno + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.country + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.whlocation + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.binstgid + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.custname + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.grdate + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.rcptqty + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.loaddate + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">0.00</td> ' +
                                                        //'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.fnlqtyreceive + '</td> ' +
                                                        /*'   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueData.clsStock + '</td> ' +*/
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.stkopname + '</td> ' +
                                                        '   <td class="text-right" style="vertical-align:middle; border-top-width:3px;">' + valueDtl.slsh + '</td> ' +
                                                        '   <td style="vertical-align:middle; border-top-width:3px;">' + valueDtl.remark + '</td> ' +
                                                        '</tr> ';
                                                }
                                            });
                                        }

                                        htmlTable += htmlGroup + htmlDtl;
                                    }
                                );

                                $('#dvTable').attr("class", "form-group");

                                $('#tbReport').empty().append(htmlTable);

                                $('#btnSearch').prop('disabled', false);
                            }
                            else if (value.message == "Data not found") {

                                setTimeout(function () {
                                    $('#dvTable').attr("class", "form-group");

                                    $('#btnSearch').prop('disabled', false);

                                    $('#dvTable').empty().html(
                                        '<table id="tblReport" class="table table-bordered table-hover"> ' +
                                        '    <thead> ' +
                                        '        <tr> ' +
                                        //'            <th class="text-bold info" style="vertical-align:middle;">#</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Urian Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Saldo Awal</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Thu Id</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Total Dispatched</th> ' +
                                        //'			<th class="text-bold info" style="vertical-align:middle;">Final Qty Received</th> ' +
                                        //'			<th class="text-bold info" style="vertical-align:middle;">Stock</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Stock Opname</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Selisih</th> ' +
                                        '			<th class="text-bold info" style="vertical-align:middle;">Keterangan</th> ' +                                        
                                        '        </tr> ' +
                                        '    </thead> ' +
                                        '    <tbody id="tbReport"> ' +
                                        '        <tr id="trNoRecord"> ' +
                                        '            <td colspan="22" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
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
                                    '<table id="tblReport" class="table table-bordered table-hover"> ' +
                                    '    <thead> ' +
                                    '        <tr> ' +
                                    //'            <th class="text-bold info" style="vertical-align:middle;">#</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Urian Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Saldo Awal</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Thu Id</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Total Dispatched</th> ' +
                                    //'			<th class="text-bold info" style="vertical-align:middle;">Final Qty Received</th> ' +
                                    //'			<th class="text-bold info" style="vertical-align:middle;">Stock</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Stock Opname</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Selisih</th> ' +
                                    '			<th class="text-bold info" style="vertical-align:middle;">Keterangan</th> ' +
                                    '        </tr> ' +
                                    '    </thead> ' +
                                    '    <tbody id="tbReport"> ' +
                                    '        <tr id="trNoRecord"> ' +
                                    '            <td colspan="22" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                    '        </tr> ' +
                                    '    </tbody> ' +
                                    '</table>'
                                );
                            }, 3000)
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
                        '<table id="tblReport" class="table table-bordered table-hover"> ' +
                        '    <thead> ' +
                        '        <tr> ' +
                        //'            <th class="text-bold info" style="vertical-align:middle;">#</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Urian Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Saldo Awal</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Closing Stock</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Thu Id</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">No Pendaftaran</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Office</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Nama Warehouse</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Lokasi</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Pemilik Barang</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Masuk</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Total Receipts</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Tanggal Keluar</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Total Dispatched</th> ' +
                        //'			<th class="text-bold info" style="vertical-align:middle;">Final Qty Received</th> ' +
                        //'			<th class="text-bold info" style="vertical-align:middle;">Stock</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Stock Opname</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Selisih</th> ' +
                        '			<th class="text-bold info" style="vertical-align:middle;">Keterangan</th> ' +
                        '        </tr> ' +
                        '    </thead> ' +
                        '    <tbody id="tbReport"> ' +
                        '        <tr id="trNoRecord"> ' +
                        '            <td colspan="22" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                        '        </tr> ' +
                        '    </tbody> ' +
                        '</table>'
                    );
                }, 3000)
            }
        })
    });
});