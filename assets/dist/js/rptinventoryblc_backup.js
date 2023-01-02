
function handlingindtl(aju, itmcode) {
    $('#mdlheader').text('Detail Nomor Serial');

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getInboundDetail',
        type: 'POST',
        dataType: 'json',
        data: { "aju": aju, "itmcode": itmcode },
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
                                        '   <td class="hidden">' + valueData.regno + '</td>' +
                                        '   <td class="hidden">' + valueData.ajuno + '</td>' +
                                        '   <td class="hidden">' + valueData.bcdocdate + '</td>' +
                                        '   <td class="hidden">' + valueData.grno + '</td>' +
                                        '   <td class="hidden">' + valueData.grdate + '</td>' +
                                        '   <td>' + valueData.itmcode + '</td>' +
                                        '   <td>' + valueData.itmnm + '</td>' +
                                        '   <td>' + valueData.prodsrlno + '</td>' +
                                        '   <td class="hidden">' + valueData.qty + '</td>' +
                                        '   <td class="hidden">' + valueData.custname1 + '</td>' +
                                        '   <td class="hidden">' + valueData.locwh + '</td>' +
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
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                                '               </tr> ' +
                                '           </thead> ' +
                                '           <tbody> ' +
                                tbody +
                                '           </tbody> ' +
                                //'           <tfoot class="text-bold"> ' +
                                //'               <tr> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                                //'               </tr> ' +
                                //'           </tfoot> ' +
                                '       </table> ' +
                                '   </div> ' +
                                '</div>';

                            $('#mdlbody').html(htmlTbl);
                        }
                        else if (value.message == "Data not found") {
                            var htmlTbl =
                                '<div class="row" style="max-height:400px;overflow:auto"> ' +
                                '   <div class="col-lg-12">' +
                                '       <table class="table table-responsive table-bordered"> ' +
                                '           <thead class="text-bold"> ' +
                                '               <tr> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                                '               </tr> ' +
                                '           </thead> ' +
                                '           <tbody> ' +
                                '               <tr> <td colspan="12" class="text-center">~ Data not found ~</td> </tr>' +
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
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                            '               </tr> ' +
                            '           </thead> ' +
                            '           <tbody> ' +
                            '               <tr> <td colspan="12" class="text-center">~ Data not found ~</td> </tr>' +
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
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                '               </tr> ' +
                '           </thead> ' +
                '           <tbody> ' +
                '               <tr> <td colspan="12" class="text-center">~ Data not found ~</td> </tr>' +
                '           </tbody> ' +
                '       </table> ' +
                '   </div> ' +
                '</div>';

            $('#mdlbody').html(htmlTbl);
        }
    });

    $('#mdl').modal('show');


}

function handlingoutdtl(aju, itmcode) {
    $('#mdlheader').text('Detail Nomor Serial');

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getOutboundDetail',
        type: 'POST',
        dataType: 'json',
        data: { "aju": aju, "itmcode": itmcode },
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
                                        '   <td class="hidden">' + valueData.regno + '</td>' +
                                        '   <td class="hidden">' + valueData.ajuno + '</td>' +
                                        '   <td class="hidden">' + valueData.bcdocdate + '</td>' +
                                        '   <td class="hidden">' + valueData.lotexecno + '</td>' +
                                        '   <td class="hidden">' + valueData.dispatchdate + '</td>' +
                                        '   <td>' + valueData.itemcode + '</td>' +
                                        '   <td>' + valueData.itemname + '</td>' +
                                        '   <td>' + valueData.prodserialno + '</td>' +
                                        '   <td class="hidden">' + valueData.qty + '</td>' +
                                        '   <td class="hidden">' + valueData.custname + '</td>' +
                                        '   <td class="hidden">' + valueData.whloc + '</td>' +
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
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                                '               </tr> ' +
                                '           </thead> ' +
                                '           <tbody> ' +
                                tbody +
                                '           </tbody> ' +
                                //'           <tfoot class="text-bold"> ' +
                                //'               <tr> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                //'                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                                //'                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                                //'               </tr> ' +
                                //'           </tfoot> ' +
                                '       </table> ' +
                                '   </div> ' +
                                '</div>';

                            $('#mdlbody').html(htmlTbl);
                        }
                        else if (value.message == "Data not found") {
                            var htmlTbl =
                                '<div class="row" style="max-height:400px;overflow:auto"> ' +
                                '   <div class="col-lg-12">' +
                                '       <table class="table table-responsive table-bordered"> ' +
                                '           <thead class="text-bold"> ' +
                                '               <tr> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                                '               </tr> ' +
                                '           </thead> ' +
                                '           <tbody> ' +
                                '               <tr> <td colspan="12">~ Data Not Found ~</td> </tr>' +
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
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                            '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                            '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                            '               </tr> ' +
                            '           </thead> ' +
                            '           <tbody> ' +
                            '               <tr> <td colspan="12">~ Data Not Found ~</td> </tr>' +
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
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Dokumen Pabean</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Aju</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Dokumen Pabean</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">No Bukti Pengeluaran Barang</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Tanggal Bukti Pengeluaran Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Kode Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Nama Barang</th> ' +
                '                   <th class="text-bold info" style="vertical-align:middle;">Produk Serial No</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Jumlah Barang</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Nama Konsumen</th> ' +
                '                   <th class="text-bold info hidden" style="vertical-align:middle;">Lokasi Gudang</th> ' +
                '               </tr> ' +
                '           </thead> ' +
                '           <tbody> ' +
                '               <tr> <td colspan="12">~ Data Not Found ~</td> </tr>' +
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
    $('#txtLocID').val('');
    $('#txtCustID').val('');

    var vCurrentDate = new Date();

    $('#dateFrom').val(
        ((vCurrentDate.getMonth() + 1).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString())
    );
    $('#dateTo').val(
        ((vCurrentDate.getMonth() + 1)).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString()
    );

    $('#dateFrom').datepicker({
        autoclose: true
    });

    $('#dateTo').datepicker({
        autoclose: true
    });

    loadLocation();

    loadCustomer();
};

function exportsummary() {
    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getExportInventoryBLC',
        type: 'POST',
        dataType: 'json',
        data: { "filter": "summary" },
        success: function (data) {
            var htmlTable = '';
            var no = 1;

            data.forEach(
                function (value) {
                    if (value.message == "You are can't access") {
                        $('#dvAlert').attr("class", "form-group alert alert-danger");
                        $('#dvAlert').html('<i class="fa fa-close"> Session was expired.</i>');

                        setTimeout(function () {
                            var url = geturl();
                            window.location.href = url + '/auth/Xhoc5AO6w7o';
                        }, 3000);
                    }
                    else {
                        htmlTable =
                            '<table border="2px"> ' +
                            '   <thead class="text-bold"> ' +
                            '       <tr> ' +
                            '           <th colspan="27" class="text-center"> ' +
                            '               <b>Laporan Inventory Barang Pusat Logistik Berikat</b><br/> ' +
                            '               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/> ' +
                            '           </th> ' +
                            '       </tr> ' +
                            '       <tr bgcolor="#87AFC6"> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">GHS No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Bin No / Staging ID</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Width</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Height</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Length</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Manufacturing Date</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Expiry Date</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Qty Received</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Qty Out</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Stock Status</th> ' +
                            '       </tr> ' +
                            '   </thead> ' +
                            '   <tbody id="tbReport"> ';                        

                        value.data.forEach(function (valueData) {
                            htmlTable +=
                                '<tr>' +
                                '   <td style="vertical-align:middle;">' + no + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.loccode + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.custname + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.itmcode + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.itmdesc + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.pmryrefdocno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.btchno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.ghsno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.binno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.thuid + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.thusrlno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.execdate + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmprice + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmweight + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.uomweight + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.volume + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.uomvolume + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmwidth + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmheight + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.lgth + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.manufctgdate + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.expdate + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.rcptqty + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.outqty + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.fnlclsstock + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.uomfnlclsstock + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.stkstatus + '</td>' +
                                '</tr>';

                            no += 1;
                        });

                        htmlTable +=
                            '    </tbody> ' +
                            '</table>';

                        exportToExcelHTML(htmlTable, "Laporan Inventory Barang Pusat Logistik Berikat", "InventoryStockBarang.xls");
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
            }, 3000)
        }
    });
}

function exportdetail() {
    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getExportInventoryBLC',
        type: 'POST',
        dataType: 'json',
        data: { "filter": "detail" },
        success: function (data) {
            var htmlTable = '';

            data.forEach(
                function (value) {
                    if (value.message == "You are can't access") {
                        $('#dvAlert').attr("class", "form-group alert alert-danger");
                        $('#dvAlert').html('<i class="fa fa-close"> Session was expired.</i>');

                        setTimeout(function () {
                            var url = geturl();
                            window.location.href = url + '/auth/Xhoc5AO6w7o';
                        }, 3000);
                    }
                    else {
                        htmlTable =
                            '<table border="2px"> ' +
                            '   <thead class="text-bold"> ' +
                            '       <tr> ' +
                            '           <th colspan="27" class="text-center"> ' +
                            '               <b>Laporan Inventory Barang Pusat Logistik Berikat</b><br/> ' +
                            '               <small><b>PT. CIPTA KRIDA BAHARI</b></small><br/> ' +
                            '           </th> ' +
                            '       </tr> ' +
                            '       <tr bgcolor="#87AFC6"> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">GHS No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Bin No / Staging ID</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Width</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Height</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Length</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Manufacturing Date</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Expiry Date</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Qty Received</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Qty Out</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                            '           <th class="text-bold info" style="vertical-align:middle;">Stock Status</th> ' +
                            '       </tr> ' +
                            '   </thead> ' +
                            '   <tbody id="tbReport"> ';

                        value.data.forEach(function (valueData) {
                            htmlTable +=
                                '<tr>' +
                                '   <td style="vertical-align:middle;">' + valueData.no + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.loccode + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.custname + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.itmcode + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.itmdesc + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.pmryrefdocno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.srlno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.btchno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.ghsno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.binno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.thuid + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.thusrlno + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.execdate + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmprice + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmweight + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.uomweight + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.volume + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.uomvolume + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmwidth + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmheight + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.lgth + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.manufctgdate + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.expdate + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.rcptqty + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.outqty + '</td>' +
                                '   <td class="text-right" style="vertical-align:middle;">' + valueData.fnlclsstock + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.uomfnlclsstock + '</td>' +
                                '   <td style="vertical-align:middle;">' + valueData.stkstatus + '</td>' +
                                '</tr>';
                        });

                        htmlTable +=
                            '    </tbody> ' +
                            '</table>';

                        exportToExcelHTML(htmlTable, "Laporan Inventory Barang Pusat Logistik Berikat", "InventoryStockBarang.xls");
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
        $('#btnSearch').prop('disabled', true);

        $('#tbReport').empty().append(
            '<tr> ' +
            '        <td colspan = "31" class="text-center" style="vertical-align:middle;"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
            '</tr >'
        );        

        $('#dvTable').attr("class", "form-group overlay");

        $.ajax({
            url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getInventoryBLC',
            global: false,
            type: 'POST',
            dataType: 'json',
            data: { "locid": $('#txtLocID').val(), "custid": $('#txtCustID').val(), "frmDate": $('#dateFrom').val() },
            async: false,
            success: function (data) {
                var htmlTable = '';

                data.forEach(
                    function (value) {
                        if (value.status == "OK") {
                            if (value.message == "Success") {

                                value.data.forEach(
                                    function (valueData) {

                                        $.ajax({
                                            url: window.location.origin + window.location.pathname.toLowerCase().replace('inventoryblc', '') + 'getOutbound',
                                            global: false,
                                            type: 'POST',
                                            dataType: 'json',
                                            data: { "aju": valueData.ajuno, "nopen": valueData.regno, "itmcode": valueData.itmcode },
                                            async: false,
                                            success: function (dataOutbound) {                                               

                                                dataOutbound.forEach(
                                                    function (valueOutbound) {
                                                        if (valueOutbound.status == "OK") {
                                                            if (valueOutbound.message == "Success") {
                                                                if (valueOutbound.data.length > 0) {
                                                                    var rwspan = valueOutbound.data.length + 1;

                                                                    htmlTable +=
                                                                        '<tr>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.no + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.loccode + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.custname + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.itmcode + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.itmdesc + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.pmryrefdocno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.regno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.ajuno + '</td>' +
                                                                        '   <td class="text-center" style="vertical-align:middle;"><a href="javascript:void(0)" onclick="handlingindtl(\'' + valueData.pmryrefdocno + '\',\'' + valueData.itmcode + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.btchno + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.ghsno + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.binno + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.thuid + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.thusrlno + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.execdate + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" class="text-right" style="vertical-align:middle;">' + valueData.itmprice + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" class="text-right" style="vertical-align:middle;">' + valueData.itmweight + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.uomweight + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" class="text-right" style="vertical-align:middle;">' + valueData.volume + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.uomvolume + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" class="text-right" style="vertical-align:middle;">' + valueData.itmwidth + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" class="text-right" style="vertical-align:middle;">' + valueData.itmheight + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" class="text-right" style="vertical-align:middle;">' + valueData.lgth + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.manufctgdate + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.expdate + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.rcptqty + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">-</td>' +
                                                                        '   <td rowspan="' + rwspan + '" class="text-right" style="vertical-align:middle;">' + valueData.fnlclsstock + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.uomfnlclsstock + '</td>' +
                                                                        '   <td rowspan="' + rwspan + '" style="vertical-align:middle;">' + valueData.stkstatus + '</td>' +
                                                                        '</tr>';

                                                                    valueOutbound.data.forEach(
                                                                        function (valueDataOutbound) {
                                                                            htmlTable +=
                                                                                '<tr>' +
                                                                                '   <td style="vertical-align:middle;">' + valueDataOutbound.lotexecno + '</td>' +
                                                                                '   <td style="vertical-align:middle;">' + valueDataOutbound.regno + '</td>' +
                                                                                '   <td style="vertical-align:middle;">' + valueDataOutbound.ajuno + '</td>' +
                                                                                '   <td class="text-center" style="vertical-align:middle;"><a href="javascript:void(0)" onclick="handlingoutdtl(\'' + valueDataOutbound.lotexecno + '\',\'' + valueData.itmcode + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                                                '   <td class="text-right" style="vertical-align:middle;">-</td>' +
                                                                                '   <td class="text-right" style="vertical-align:middle;">' + valueDataOutbound.qty + '</td>' +
                                                                                '</tr>';
                                                                        }
                                                                    )
                                                                }
                                                                else {
                                                                    htmlTable +=
                                                                        '<tr>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.no + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.loccode + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.custname + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.itmcode + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.itmdesc + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.pmryrefdocno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.regno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.ajuno + '</td>' +
                                                                        '   <td class="text-center" style="vertical-align:middle;"><a href="javascript:void(0)" onclick="handlingindtl(\'' + valueData.pmryrefdocno + '\',\'' + valueData.itmcode + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.btchno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.ghsno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.binno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.thuid + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.thusrlno + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.execdate + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmprice + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmweight + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.uomweight + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.volume + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.uomvolume + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmwidth + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmheight + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.lgth + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.manufctgdate + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.expdate + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.rcptqty + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.outqty + '</td>' +
                                                                        '   <td class="text-right" style="vertical-align:middle;">' + valueData.fnlclsstock + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.uomfnlclsstock + '</td>' +
                                                                        '   <td style="vertical-align:middle;">' + valueData.stkstatus + '</td>' +
                                                                        '</tr>';
                                                                }
                                                            }
                                                            else {
                                                                htmlTable +=
                                                                    '<tr>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.no + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.loccode + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.custname + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.itmcode + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.itmdesc + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.pmryrefdocno + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.regno + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.ajuno + '</td>' +
                                                                    '   <td class="text-center" style="vertical-align:middle;"><a href="javascript:void(0)" onclick="handlingindtl(\'' + valueData.pmryrefdocno + '\',\'' + valueData.itmcode + '\');"><i class="fa fa-eye"></i> detail</a></td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.btchno + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.ghsno + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.binno + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.thuid + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.thusrlno + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.execdate + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmprice + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmweight + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.uomweight + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.volume + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.uomvolume + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmwidth + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.itmheight + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.lgth + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.manufctgdate + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.expdate + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.rcptqty + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.outqty + '</td>' +
                                                                    '   <td class="text-right" style="vertical-align:middle;">' + valueData.fnlclsstock + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.uomfnlclsstock + '</td>' +
                                                                    '   <td style="vertical-align:middle;">' + valueData.stkstatus + '</td>' +
                                                                    '</tr>';
                                                            }
                                                        }
                                                    }
                                                )
                                            }
                                        })

                                        
                                    })

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
                                        //'            <th class="text-bold info" style="vertical-align:middle;">#</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">GHS No</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Bin No / Staging ID</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Width</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Height</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Length</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Manufacturing Date</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Expiry Date</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Qty Received</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Qty Out</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                        '            <th class="text-bold info" style="vertical-align:middle;">Stock Status</th> ' +
                                        '        </tr> ' +
                                        '    </thead> ' +
                                        '    <tbody id="tbReport"> ' +
                                        '        <tr id="trNoRecord"> ' +
                                        '            <td colspan="30" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                                        '        </tr> ' +
                                        '    </tbody> ' +
                                        '</table>'
                                    );
                                }, 1000);
                            }
                            else if (value.message == "You are can't access") {
                                $('#dvAlert').attr("class", "form-group alert alert-danger");
                                $('#dvAlert').html('<i class="fa fa-close"> Session was expired.</i>');

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
                                    //'            <th class="text-bold info" style="vertical-align:middle;">#</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Nomor Aju</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">GHS No</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Bin No / Staging ID</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Width</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Height</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Length</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Manufacturing Date</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Expiry Date</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Qty Received</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Qty Out</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                    '            <th class="text-bold info" style="vertical-align:middle;">Stock Status</th> ' +
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
                        '    <thead class="text-bold"> ' +
                        '        <tr> ' +
                        //'            <th class="text-bold info" style="vertical-align:middle;">#</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Warehouse Code</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Customer Name</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Item Code</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Item Description</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Primary Reff Doc No</th> ' +
                        '            <th class="text-bold info hidden" style="vertical-align:middle;">Nomor Pendaftaran</th> ' +
                        '            <th class="text-bold info hidden" style="vertical-align:middle;">Nomor Aju</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Serial No</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Batch No</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">GHS No</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Bin No / Staging ID</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">THU ID</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">THU Serial No</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Receipt Date</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Price</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Weight</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Volume</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Width</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Height</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Length</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Manufacturing Date</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Expiry Date</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Qty Received</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Qty Out</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Final Closing Stock</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                        '            <th class="text-bold info" style="vertical-align:middle;">Stock Status</th> ' +
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
        })
    });
});