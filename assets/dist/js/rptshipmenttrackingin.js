function readyComponent() {
    $('#txtAjuNo').val('');
    $('#txtRegNo').val('');

    var vCurrentDate = new Date();

    $('#dateFrom').val(
        (vCurrentDate.getFullYear()).toString() + "-" +
        ((vCurrentDate.getMonth())[1] ? vCurrentDate.getMonth() : "0" + vCurrentDate.getMonth()).toString() + "-" +
        (vCurrentDate.getDate()).toString()
    );
    $('#dateTo').val(
        (vCurrentDate.getFullYear()).toString() + "-" +
        ((vCurrentDate.getMonth() + 1)[1] ? (vCurrentDate.getMonth() + 1) : "0" + (vCurrentDate.getMonth() + 1)).toString() + "-" +
        (vCurrentDate.getDate()).toString()
    );
};

$(document).ready(function () {
    readyComponent();

    $('#btnSearch').click(function () {
        //$('#btnSearch').prop('disabled', true);

        //$('#tbReport').empty().append(
        //    '<tr> ' +
        //    '        <td colspan = "18" class="text-center"> <small>Loading....</small></td > ' +
        //    '</tr >'
        //);;

        //$('#dvTable').attr("class", "form-group overlay");
        //$('#iLoading').show();

        //$.ajax({
        //    url: window.location.origin + window.location.pathname.toLowerCase().replace('shipmenttrackingin', '') + 'getShipmentTracking',
        //    type: 'POST',
        //    dataType: 'json',
        //    data: { "ajuno": $('#txtAjuNo').val(), "regno": $('#txtRegNo').val(), "custno": $('#txtCustID').val() },
        //    success: function (data) {
        //        var htmlTable = '';

        //        data.forEach(
        //            function (value) {
        //                if (value.status == "OK") {
        //                    if (value.message == "Success") {
        //                        value.data.forEach(
        //                            function (valueData) {
        //                                htmlTable +=
        //                                    '<tr>' +
        //                                    '   <td>' + valueData.wmsitem + '</td>' +
        //                                    '   <td>' + valueData.wmsitmlongdesc + '</td>' +
        //                                    '   <td>' + valueData.wmsthusno + '</td>' +
        //                                    '   <td>' + valueData.wmssno + '</td>' +
        //                                    '   <td>' + valueData.wmsbatchno + '</td>' +
        //                                    '   <td>' + valueData.wmsregno + '</td>' +
        //                                    '   <td>' + valueData.wmsajuno + '</td>' +
        //                                    '   <td>' + valueData.wmscountry + '</td>' +
        //                                    '   <td>' + valueData.wmslocdesc + '</td>' +
        //                                    '   <td>' + valueData.wmsloc + '</td>' +
        //                                    '   <td>' + valueData.wmscustomer + '</td>' +
        //                                    '   <td>' + valueData.wmsplnno + '</td>' +
        //                                    '   <td>' + valueData.wmsgrdate + '</td>' +
        //                                    '   <td>' + valueData.wmsrecept + '</td>' +
        //                                    '   <td>' + valueData.wmsloadexecno + '</td>' +
        //                                    '   <td>' + valueData.wmsloaddate + '</td>' +
        //                                    '   <td>' + valueData.wmsdispatches + '</td>' +
        //                                    '   <td>' + valueData.wmsclsstk + '</td>' +
        //                                    '</tr>';
        //                            })

        //                        //alert(htmlTable);
        //                    }
        //                    else if (value.message == "Data not found") {
        //                        htmlTable = '' +
        //                            '<tr> ' +
        //                            '        <td colspan = "18" class="text-center"> <small>~ Data not found ~</small></td > ' +
        //                            '</tr >';
        //                    }

        //                    $('#dvTable').attr("class", "form-group");
        //                    $('#iLoading').hide();

        //                    $('#tbReport').empty().append(htmlTable);

        //                    $('#btnSearch').prop('disabled', false);
        //                }
        //                else {
        //                    $('#dvAlert').attr("class", "form-group alert alert-danger");
        //                    $('#dvAlert').html('<i class="fa fa-close"> ' + value.message + '.</i>');

        //                    setTimeout(function () {
        //                        $('#dvAlert').attr("class", "");
        //                        $('#dvAlert').html('');

        //                        $('#dvTable').attr("class", "form-group");
        //                        $('#iLoading').hide();

        //                        htmlTable = '' +
        //                            '<tr> ' +
        //                            '        <td colspan = "18" class="text-center"> <small>~ Data not found ~</small></td > ' +
        //                            '</tr >';

        //                        $('#tbReport').empty().append(htmlTable);

        //                        $('#btnSearch').prop('disabled', false);
        //                    }, 3000)
        //                }
        //            }
        //        )
        //    },
        //    error: function (jqXHR, textStatus, errorThrown) {
        //        $('#dvAlert').attr("class", "form-group alert alert-danger");
        //        $('#dvAlert').html('<i class="fa fa-close"> ' + jqXHR.status + ' ' + errorThrown + '.</i>');

        //        setTimeout(function () {
        //            $('#dvAlert').attr("class", "");
        //            $('#dvAlert').html('');

        //            $('#dvTable').attr("class", "form-group");
        //            $('#iLoading').hide();

        //            htmlTable = '' +
        //                '<tr> ' +
        //                '        <td colspan = "18" class="text-center"> <small>~ Data not found ~</small></td > ' +
        //                '</tr >';

        //            $('#tbReport').empty().append(htmlTable);

        //            $('#btnSearch').prop('disabled', false);
        //        }, 3000)
        //    }
        //})
    });
});