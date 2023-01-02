function loadSource() {
    $('#iSource').removeClass('fa-hand-o-up').addClass('fa-refresh fa-spin');
    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('west/report', '') + 'west/getSource',
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
                                    $('#sSource').append('<option value="' + valueData.value + '">' + valueData.text + '</option>');
                                }
                            )

                            $('#sSource').select2().on('change', function () {
                                loadtable();
                            })
                        }
                    }
                }
            )

            $('#iSource').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');

            loadtable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#iSource').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');
        }
    })
};

function loadtable() {
    actioncomponent('lock');

    var sourcetitle = $('#sSource option:selected').text();
    var sourcevalue = $('#sSource option:selected').val();
    var datefrom = $('#dateFrom').val();
    var dateto = $('#dateTo').val();
    var noAju = $('#txtAjuNo').val();
    var noPendaftaran = $('#txtRegNo').val();


    $('#tblReport').DataTable({
        destroy: true,
        "scrollX": true,
        "processing": true, // for show progress bar
        "serverSide": true, // for process server side
        "filter": false, // this is for disable filter (search box)
        //"orderMulti": false, // for disable multiple column at once
        ajax: ({
            url: window.location.origin + window.location.pathname.toLowerCase().replace('report', '') + "getPLB",
            type: 'POST',
            dataType: 'json',
            data: { "source": (sourcetitle + '#' + sourcevalue), "fromdate": datefrom, "todate": dateto, "ajuno": noAju, "regno": noPendaftaran },
            timeout: 2147483647,
            async: false,
            dataSrc: function (d) {
                if (d.message === "You are can't access") {
                    $('#dvAlert').attr("class", "form-group alert alert-danger");
                    $('#dvAlert').html('<i class="fa fa-close"> The session has ended.</i>');

                    setTimeout(function () {
                        var url = geturl();
                        window.location.href = url + '/auth/Xhoc5AO6w7o';
                    }, 3000);
                }

                return d.data;                
            }
        }),
        order: [[0, "asc"]],
        columns: [
            { "data": "NOMOR_AJU", "name": "NOMOR_AJU", "autoWidth": true },
            { "data": "NOMOR_DAFTAR", "name": "NOMOR_DAFTAR", "autoWidth": true },
            { "data": "TANGGAL_AJU", "name": "TANGGAL_AJU", "autoWidth": true },
            { "data": "KODE_DOKUMEN_PABEAN", "name": "KODE_DOKUMEN_PABEAN", "autoWidth": true },
            { "data": "NAMA_PENGIRIM", "name": "NAMA_PENGIRIM", "autoWidth": true },
            { "data": "NAMA_PEMILIK", "name": "NAMA_PEMILIK", "autoWidth": true },
            { "data": "KODE_BARANG", "name": "KODE_BARANG", "autoWidth": true },
            { "data": "TIPE", "name": "TIPE", "autoWidth": true },
            { "data": "URAIAN", "name": "URAIAN", "autoWidth": true },
            { "data": "POS_TARIF", "name": "POS_TARIF", "autoWidth": true },
            { "data": "NILAI_INCOTERM", "name": "NILAI_INCOTERM", "autoWidth": true },
            { "data": "JUMLAH_SATUAN", "name": "JUMLAH_SATUAN", "autoWidth": true },
            { "data": "KODE_SATUAN", "name": "KODE_VALUTA", "autoWidth": true }
        ]
    });

    actioncomponent('unlock');
}

function actioncomponent(action) {
    if (action.toLowerCase() === "lock") {
        $('#btnSearch').prop('disabled', true);
        $('#sSource').prop('disabled', true);
        $('#txtAjuNo').prop('disabled', true);
        $('#txtRegNo').prop('disabled', true);
        $('#dateFrom').prop('disabled', true);
        $('#dateTo').prop('disabled', true);
    }
    else if (action.toLowerCase() === "unlock") {
        $('#btnSearch').prop('disabled', false);
        $('#sSource').prop('disabled', false);
        $('#txtAjuNo').prop('disabled', false);
        $('#txtRegNo').prop('disabled', false);
        $('#dateFrom').prop('disabled', false);
        $('#dateTo').prop('disabled', false);
    }
    else if (action.toLowerCase() === "clear") {
        $('#txtAjuNo').val('');
        $('#txtRegNo').val('');
        $('#dateFrom').val('');
        $('#dateTo').val('');
    }
}

$(document).ready(function () {
    loadSource();

    var d = new Date(); 
    $('#dateFrom').val((d.getMonth() + 1) + "/01/" + d.getFullYear());
    $('#dateTo').val((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());

    $('#dateFrom').datepicker({
        autoclose: true, 
        orientation: "bottom"
    });

    $('#dateTo').datepicker({
        autoclose: true, 
        orientation: "bottom"
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

    loadtable();
});

$('#ExportReporttoExcel').click(function () {
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

    var sourcetitle = $('#sSource option:selected').text();
    var sourcevalue = $('#sSource option:selected').val();
    var datefrom = $('#dateFrom').val();
    var dateto = $('#dateTo').val();
    var noAju = $('#txtAjuNo').val();
    var noPendaftaran = $('#txtRegNo').val();

    if (noAju === "" && noPendaftaran === "" && (datefrom === "" && dateto === ""))
        return;

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('report', '') + 'getExportExcel',
        timeout: 2147483647,
        //global: false,
        type: 'POST',
        dataType: 'json',
        data: { "source": (sourcetitle + '#' + sourcevalue), "fromdate": datefrom, "todate": dateto, "ajuno": noAju, "regno": noPendaftaran },
        async: true,
        success: function (data) {
            var htmlTable = '';

            data.forEach(
                function (value) {
                    if (value.status == "OK") {
                        if (value.message == "Success") {
                            exportToExcelHTML(value.data, sourcetitle, sourcetitle.replace(' ','_') + ".xls");
                        }
                        else if (value.message == "Data not found") {
                            $('#dvAlert').attr("class", "form-group alert alert-danger");
                            $('#dvAlert').html('<i class="fa fa-close"> ' + value.message + '.</i>');

                            setTimeout(function () {
                                $('#dvAlert').attr("class", "");
                                $('#dvAlert').html('');
                            }, 3000)                            
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
            }, 3000)
        }
    })
});

$('#ExportReporttoCSV').click(function () {
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

    $('#btnExportFile').prop('disabled', true);
    $('#btnExportFile').html('<i class="fa fa-refresh fa-spin"></i> Exporting to CSV....');

    var sourcetitle = $('#sSource option:selected').text();
    var sourcevalue = $('#sSource option:selected').val();
    var datefrom = $('#dateFrom').val();
    var dateto = $('#dateTo').val();
    var noAju = $('#txtAjuNo').val();
    var noPendaftaran = $('#txtRegNo').val();

    if (noAju === "" && noPendaftaran === "" && (datefrom === "" && dateto === ""))
        return;

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('report', '') + 'getExportCSV',
        timeout: 2147483647,
        //global: false,
        type: 'POST',
        dataType: 'json',
        data: { "source": (sourcetitle + '#' + sourcevalue), "fromdate": datefrom, "todate": dateto, "ajuno": noAju, "regno": noPendaftaran },
        async: true,
        success: function (data) {
            var htmlTable = '';

            data.forEach(
                function (value) {
                    if (value.status == "OK") {
                        if (value.message == "Success") {
                            exportTableToCSV(value.data, sourcetitle.replace(' ', '_') + '_' + datefrom.replace('/g', '') + '-' + dateto.replace('/g','') + '.csv');
                            $('#dvDwnld').show();
                        }
                        else if (value.message == "Data not found") {
                            $('#dvAlert').attr("class", "form-group alert alert-danger");
                            $('#dvAlert').html('<i class="fa fa-close"> ' + value.message + '.</i>');

                            setTimeout(function () {
                                $('#dvAlert').attr("class", "");
                                $('#dvAlert').html('');
                            }, 3000)
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
                        }, 3000)
                    }
                }
            )

            $('#btnExportFile').html('<i class="fa fa-files-o"></i> Export <span class="caret"></span>');
            $('#btnExportFile').prop('disabled', false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#dvAlert').attr("class", "form-group alert alert-danger");
            $('#dvAlert').html('<i class="fa fa-close"> ' + jqXHR.status + ' ' + errorThrown + '.</i>');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');

                $('#btnExportFile').html('<i class="fa fa-files-o"></i> Export <span class="caret"></span>');
                $('#btnExportFile').prop('disabled', false);
            }, 3000)
        }
    })
});