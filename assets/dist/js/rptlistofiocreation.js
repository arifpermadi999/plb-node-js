function loadLocation() {    
    $('#iLoc').removeClass('fa-hand-o-up').addClass('fa-refresh fa-spin');
    $.ajax({
        url: window.location.origin + window.location.pathname.toLowerCase().replace('listofiocreation', '') + 'getLocation',
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
        url: window.location.origin + window.location.pathname.toLowerCase().replace('listofiocreation', '') + 'getCustomer',
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
                                    $('#txtCustID').append('<option value="' + valueData.value + '">(' + valueData.value + ') ' + valueData.text + '</option>');
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

    $('#dateFrom').val('08/25/2019');
    $('#dateTo').val(((vCurrentDate.getMonth() + 1)).toString() + "/" + (vCurrentDate.getDate()).toString() + "/" + (vCurrentDate.getFullYear()).toString());

    $('#dateFrom').datepicker({
        autoclose: true,
        //startDate: new Date('2019/08/25')
    });

    $('#dateTo').datepicker({
        autoclose: true,
        //startDate: new Date('2019/08/25')
    });

    loadLocation();

    loadCustomer();
};

$(document).ready(function () {
    readyComponent();

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
            '        <td colspan = "25" class="text-center" style="vertical-align:middle;"><i id="iLoading" class="fa fa-refresh fa-spin"></i> <small>Loading....</small></td > ' +
            '</tr >'
        );;

        $('#dvTable').attr("class", "form-group overlay");
        //$('#iLoading').show();

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
            url: window.location.origin + window.location.pathname.toLowerCase().replace('listofiocreation', '') + 'getInternalOrder',
            timeout: 300000,
            //global: false,
            type: 'POST',
            dataType: 'json',
            data: { "FromDate": $('#dateFrom').val(), "ToDate": $('#dateTo').val(), "Location": vLoc, "OrderType": "", "VendorId": "", "ContractId": "", "CustomerId": vCust },
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
                                            '   <td style="vertical-align:middle;">' + valueData.no + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.IOno + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.OrderType + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.IOdesc + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.IOdate + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.IOstatus + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.VendorIdCustId + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.VendorNameCustName + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.Division + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.Locations + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.ContractID + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.TarifID + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.TarifIdDes + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.TarifType + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.Resources + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.ResourceTypeDesc + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.ActualUnit + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.PlanCost + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.ActualCost + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.IOremark + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.UOM + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.RefDocType + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.RefDocNo + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.RefDocTypeLine + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.RefDocNoLine + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.ActualFromDate + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.ActualToDate + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.Reimbursable + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.IOhistory + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.IOcreatedby + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DrafBillNo + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DrafBillDate + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DrafBillStatus + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DrafBillQty + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DrafBillRate + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.Currency + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.ProposedValue + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.AcceptedValue + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DiscountLine + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.MarginLine + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DiscountDoc + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.MarginDoc + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.BaseAmount + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.TotalTransaction + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.DrafBillRemarks + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.TransferInvNo + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.TransferInvDate + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.TransferInvCreatedby + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.InvNo + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.InvDate + '</td>' +
                                            '   <td style="vertical-align:middle;">' + valueData.InvStatus + '</td>' +                                            
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
                                        '              <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">IO No</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Order Type</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">IO Desc</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">IO date</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">IO status</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Vendor ID / Customer ID</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Vendor Name / Customer Name</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Divison</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Location</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Contract ID</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Tariff ID</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Tariff ID desc</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Tariff type</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Resource</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Resource Type desc</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Actual unit</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Planned Cost</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Actual Cost</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">IO Remarks</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc type (Doc Level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc no (Doc Level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc type (Line Level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc no (Line Level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Actual From date</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Actual To date</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Reimbursable</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">IO History</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">IO Created By</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill no</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Draft bill date</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Draft bill status</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Draft bill qty</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill Rate</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Proposed Value</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Accepted Value</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Discount % (Line level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Margin % (Line level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Discount % (Doc level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Margin % (Doc level)</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Base Amount</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Total Transaction</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill Remarks</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice No</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice date</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice Created by</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Invoice no</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Invoice date</th> ' +
                                        '              <th class="text-bold info" style="vertical-align:middle;">Invoice status</th> ' +
                                        '        </tr> ' +
                                        '    </thead> ' +
                                        '    <tbody id="tbReport"> ' +
                                        '        <tr id="trNoRecord"> ' +
                                        '            <td colspan="25" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
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
                                    '              <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">IO No</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Order Type</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">IO Desc</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">IO date</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">IO status</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Vendor ID / Customer ID</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Vendor Name / Customer Name</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Divison</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Location</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Contract ID</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Tariff ID</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Tariff ID desc</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Tariff type</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Resource</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Resource Type desc</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Actual unit</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Planned Cost</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Actual Cost</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">IO Remarks</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Ref doc type (Doc Level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Ref doc no (Doc Level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Ref doc type (Line Level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Ref doc no (Line Level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Actual From date</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Actual To date</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Reimbursable</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">IO History</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">IO Created By</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill no</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Draft bill date</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Draft bill status</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Draft bill qty</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill Rate</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Proposed Value</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Accepted Value</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Discount % (Line level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Margin % (Line level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Discount % (Doc level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Margin % (Doc level)</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Base Amount</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Total Transaction</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill Remarks</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice No</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice date</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice Created by</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Invoice no</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Invoice date</th> ' +
                                    '              <th class="text-bold info" style="vertical-align:middle;">Invoice status</th> ' +
                                    '        </tr> ' +
                                    '    </thead> ' +
                                    '    <tbody id="tbReport"> ' +
                                    '        <tr id="trNoRecord"> ' +
                                    '            <td colspan="25" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
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
                        '              <th class="text-bold info" style="vertical-align:middle;">No</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">IO No</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Order Type</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">IO Desc</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">IO date</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">IO status</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Vendor ID / Customer ID</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Vendor Name / Customer Name</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Divison</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Location</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Contract ID</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Tariff ID</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Tariff ID desc</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Tariff type</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Resource</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Resource Type desc</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Actual unit</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Planned Cost</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Actual Cost</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">IO Remarks</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">UOM</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc type (Doc Level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc no (Doc Level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc type (Line Level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Ref doc no (Line Level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Actual From date</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Actual To date</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Reimbursable</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">IO History</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">IO Created By</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill no</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Draft bill date</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Draft bill status</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Draft bill qty</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill Rate</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Currency</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Proposed Value</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Accepted Value</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Discount % (Line level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Margin % (Line level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Discount % (Doc level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Margin % (Doc level)</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Base Amount</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Total Transaction</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Draft Bill Remarks</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice No</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice date</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Transfer Invoice Created by</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Invoice no</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Invoice date</th> ' +
                        '              <th class="text-bold info" style="vertical-align:middle;">Invoice status</th> ' +
                        '        </tr> ' +
                        '    </thead> ' +
                        '    <tbody id="tbReport"> ' +
                        '        <tr id="trNoRecord"> ' +
                        '            <td colspan="25" class="text-center" style="vertical-align:middle;"><small>~ Data not found ~</small></td> ' +
                        '        </tr> ' +
                        '    </tbody> ' +
                        '</table>'
                    );
                }, 3000)
            }
        })
    });
});