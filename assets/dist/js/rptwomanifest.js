function readyComponent() {
    var vCurrentDate = new Date();

    $('#dateFrom').val(
        ((vCurrentDate.getMonth())[1] ? vCurrentDate.getMonth() : "0" + vCurrentDate.getMonth()).toString() + "/" +
        ((vCurrentDate.getDate())[1] ? vCurrentDate.getDate() : "0" + vCurrentDate.getDate()).toString() + "/" +
        (vCurrentDate.getFullYear()).toString()
    );
    $('#dateTo').val(
        ((vCurrentDate.getMonth() + 1)[1] ? (vCurrentDate.getMonth() + 1) : "0" + (vCurrentDate.getMonth() + 1)).toString() + "/" +
        ((vCurrentDate.getDate())[1] ? vCurrentDate.getDate() : "0" + vCurrentDate.getDate()).toString() + "/" +
        (vCurrentDate.getFullYear()).toString()
    );

    $('#dateFrom').datepicker({
        autoclose: true
    });

    $('#dateTo').datepicker({
        autoclose: true
    });
};

$(document).ready(function () {
    readyComponent();

    $("#ExportReporttoExcel").on("click", function () {
        exportToExcel("tblReport", "Report Manifest No WO", "ReportManifestNoWO_" + $('#dateFrom').val().replace('/', '').replace('/', '') + "-" + $('#dateTo').val().replace('/', '').replace('/', '') + ".xls");
    });

    $('#btnSearch').click(function () {
        $('#btnSearch').prop('disabled', true);

        $('#tbReport').empty().append(
            '<tr> ' +
            '        <td colspan = "13" class="text-center"> <small>Loading....</small></td > ' +
            '</tr >'
        );;

        $('#dvTable').attr("class", "form-group overlay");
        $('#iLoading').show();

        $.ajax({
            url: window.location.origin + window.location.pathname.toLowerCase().replace('a732d4be5f7cb73d0b0644398dde7c5bc9bd5e0c', '').replace('manifestnowo', '') + 'getWOManifest',
            type: 'POST',
            dataType: 'json',
            data: { "fromDate": $('#dateFrom').val(), "toDate": $('#dateTo').val() },
            success: function (data) {
                var htmlTable = '';

                data.forEach(
                    function (value) {
                        if (value.status == "OK") {
                            if (value.message == "Success") {
                                value.data.forEach(
                                    function (valueData) {
                                        htmlTable +=
                                            '<tr>' +
                                            '   <td>' + valueData.manifestno + '</td>' +
                                            '   <td>' + valueData.shipdate + '</td>' +
                                            '   <td>' + valueData.actualshipdate + '</td>' +
                                            '   <td>' + valueData.manifestdate + '</td>' +
                                            '   <td>' + valueData.moda + '</td>' +
                                            '   <td>' + valueData.carrierno + '</td>' +
                                            '   <td>' + valueData.carrierownershipid + '</td>' +
                                            '   <td>' + valueData.origin + '</td>' +
                                            '   <td>' + valueData.destination + '</td>' +
                                            '   <td>' + valueData.manifeststatus + '</td>' +
                                            '   <td>' + valueData.wono + '</td>' +
                                            '   <td>' + valueData.vendorname + '</td>' +
                                            '   <td>' + valueData.usercreated + '</td>' +
                                            '</tr>';
                                    }
                                )
                            }
                            else if (value.message == "Data not found") {
                                htmlTable = '' +
                                    '<tr> ' +
                                    '        <td colspan = "13" class="text-center"> <small>~ Data not found ~</small></td > ' +
                                    '</tr >';
                            }

                            $('#dvTable').attr("class", "form-group");
                            $('#iLoading').hide();

                            $('#tbReport').empty().append(htmlTable);

                            $('#btnSearch').prop('disabled', false);
                        }
                        else {
                            $('#dvAlert').attr("class", "form-group alert alert-danger");
                            $('#dvAlert').html('<i class="fa fa-close"> ' + value.message + '.</i>');

                            setTimeout(function () {
                                $('#dvAlert').attr("class", "");
                                $('#dvAlert').html('');                                

                                $('#dvTable').attr("class", "form-group");
                                $('#iLoading').hide();

                                htmlTable = '' +
                                    '<tr> ' +
                                    '        <td colspan = "13" class="text-center"> <small>~ Data not found ~</small></td > ' +
                                    '</tr >';

                                $('#tbReport').empty().append(htmlTable);

                                $('#btnSearch').prop('disabled', false);
                            }, 3000)
                        }
                    }                    
                )
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status + ' ' + errorThrown);
            }
        })
    });
});