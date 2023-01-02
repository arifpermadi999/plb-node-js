
function actioncomponent(action) {
    if (action.toLowerCase() === "lock") {
        $('#btnSearch').prop('disabled', true)
        
        $('#dateFrom').prop('disabled', true);
        $('#dateTo').prop('disabled', true);
    }
    else if (action.toLowerCase() === "unlock") {
        $('#btnSearch').prop('disabled', false);
        $('#dateFrom').prop('disabled', false);
        $('#dateTo').prop('disabled', false);
    }
}

function loadtable() {
    actioncomponent('lock');

    var datefrom = $('#dateFrom').val();
    var dateto = $('#dateTo').val();

    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('ed2a7c1d5593193b9b886fd1ec8bb201', '') + "getActivity",
        timeout: 300000,
        //global: false,
        type: 'POST',
        dataType: 'json',
        data: { "fromdate": datefrom, "todate": dateto },
        //async: false,
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
                                        '   <td style="vertical-align:middle;">' + valueData.USERNAME + '</td>' +
                                        '   <td style="vertical-align:middle;">' + valueData.DATE + '</td>' +
                                        '   <td style="vertical-align:middle;max-width:250px;">' + valueData.ACTIVITY + '</td>' +
                                        '</tr>';
                                })

                            $('#dvTable').attr("class", "form-group");
                            //$('#iLoading').hide();

                            $('#tbReport').empty().append(htmlTable);

                            $('#btnSearch').prop('disabled', false);

                            $('#tblReport').DataTable({
                                retrieve: true,
                                paging: true,
                                lengthChange: false,
                                searching: false,
                                ordering: false,
                                info: false,
                                autoWidth: false
                            });
                        }
                        else if (value.message == "Data not found") {

                            setTimeout(function () {
                                $('#dvTable').attr("class", "form-group");

                                $('#btnSearch').prop('disabled', false);

                                $('#dvTable').empty().html(
                                    '<table id="tblReport" class="table table-bordered table-hover"> ' +
                                    '    <thead> ' +
                                    '        <tr> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Nama Pengguna</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Tanggal</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;max-width:250px;">Aktivitas</th> ' +
                                    '        </tr> ' +
                                    '    </thead> ' +
                                    '    <tbody id="tbReport"> ' +
                                    '        <tr id="trNoRecord"> ' +
                                    '            <td colspan="3" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
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
                                '              <th class="text-bold info" style="vertical-align:middle;">Nama Pengguna</th> ' +
                                '              <th class="text-bold info" style="vertical-align:middle;">Tanggal</th> ' +
                                '              <th class="text-bold info" style="vertical-align:middle;max-width:250px;">Aktivitas</th> ' +
                                '        </tr> ' +
                                '    </thead> ' +
                                '    <tbody id="tbReport"> ' +
                                '        <tr id="trNoRecord"> ' +
                                '            <td colspan="3" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
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
                    '              <th class="text-bold info" style="vertical-align:middle;">Nama Pengguna</th> ' +
                    '              <th class="text-bold info" style="vertical-align:middle;">Tanggal</th> ' +
                    '              <th class="text-bold info" style="vertical-align:middle;max-width:250px;">Aktivitas</th> ' +
                    '        </tr> ' +
                    '    </thead> ' +
                    '    <tbody id="tbReport"> ' +
                    '        <tr id="trNoRecord"> ' +
                    '            <td colspan="3" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                    '        </tr> ' +
                    '    </tbody> ' +
                    '</table>'
                );
            }, 3000)
        }
    })

    actioncomponent('unlock');
}


function readyComponent() {
    var vCurrentDate = new Date();

    $('#dateFrom').val(((vCurrentDate.getMonth() + 1)).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString());
    $('#dateTo').val(((vCurrentDate.getMonth() + 1)).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString());

    $('#dateFrom').datepicker({
        autoclose: true,
        //startDate: new Date('2019/08/25')
    });

    $('#dateTo').datepicker({
        autoclose: true,
        //startDate: new Date('2019/08/25')
    });

    console.log(window.location.origin + window.location.pathname.toLowerCase().replace('ed2a7c1d5593193b9b886fd1ec8bb201', ''));
}

$(document).ready(function () {
    if (!cekconnection()) {
        $('#dvAlert').attr("class", "form-group alert alert-danger");
        $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

        setTimeout(function () {
            $('#dvAlert').attr("class", "");
            $('#dvAlert').html('');
        }, 3000)

        return;
    }

    readyComponent();

    loadtable();
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
        '        <td colspan = "3" class="text-center" style="vertical-align:middle;"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
        '</tr >'
    );;

    $('#dvTable').attr("class", "form-group overlay");
    //$('#iLoading').show();

    loadtable()
});