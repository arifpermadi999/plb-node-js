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
};

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    //Create a HTML Table element.
    var table = $("<table id='tblView' />");
    table[0].border = "1";

    //Add the header row.
    var row = $(table[0].insertRow(-1));

    //Add the header cells.
    var headerCell = $("<th />");
    headerCell.html("Delivery");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Purchasing Document");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Item");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Material");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Description");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Delivery quantity");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Ship-to party");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Name of the ship-to party");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Picking status");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Pick confirmation");
    row.append(headerCell);

    var headerCell = $("<th />");
    headerCell.html("Goods movement stat.");
    row.append(headerCell);

    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = $(table[0].insertRow(-1));

        //Add the data cells.
        var cell = $("<td />");
        cell.html(excelRows[i]["Delivery"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Purchasing Document"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Item"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Material"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Description"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Delivery quantity"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Ship-to party"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Name of the ship-to party"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Picking status"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Pick confirmation"]);
        row.append(cell);

        cell = $("<td />");
        cell.html(excelRows[i]["Goods movement stat."]);
        row.append(cell);
    }

    var dvExcel = $("#dvExcel");
    dvExcel.html("");
    dvExcel.append(table);
};

$(document).ready(function () {
    readyComponent();

    $('#btnView').click(function () {
        if (!cekconnection()) {
            $('#dvAlert').attr("class", "form-group alert alert-danger");
            $('#dvAlert').html('<i class="fa fa-close"> Connection failed, please check your connection settings.</i>');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');
            }, 3000)

            return;
        }

        $('#dvExcel').empty();

        $('#btnView').prop('disabled', true);

        var fileUpload = $("#excelfile")[0];

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }

                $('#btnView').prop('disabled', false);
            } else {
                alert("This browser does not support HTML5.");
                $('#btnView').prop('disabled', false);
            }
        } else {
            alert("Please upload a valid Excel file.");
            $('#btnView').prop('disabled', false);
        }
    });

    $('#btnUpload').click(function () {
        var json = '{';
        var otArr = [];
        var tbl2 =
            $('#tblView tr').each(function (i) {
                x = $(this).children();
                var itArr = [];
                x.each(function () {
                    itArr.push('"' + $(this).text() + '"');
                });
                otArr.push('"value": [' + itArr.join(',') + ']');
            })
            json += otArr.join(",") + '}'

        $.ajax({
            url: window.location.origin + window.location.pathname.toLowerCase().replace('c8d4fc0b4a02f4d11f44fcc0afcd028042feb4830c67810008f5d13d', '') + 'Upload',
            timeout: 300000,
            //global: false,
            type: 'POST',
            dataType: 'json',
            data: { "jsn": json },
            success: function (data) {
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
        console.log(json);
    });
});