function cekconnection() {
    var status = navigator.onLine;
    return status;
}
function geturl() {
    return window.location.origin +
            window.location.pathname.toLowerCase()
            .replace('/u2fsdgvkx1827r2y8stfurkep2adgpsc', '')
            .replace('/report/a732d4be5f7cb73d0b0644398dde7c5bc9bd5e0c', '')
            .replace('/report/inventoryblc', '')
            .replace('/report/shipmenttracking', '')
            .replace('/report/shipmenttrackingin', '')
            .replace('/report/shipmenttrackingout', '')
            .replace('/report/mutation', '')
            .replace('/report/handlingin', '')
            .replace('/report/handlingout', '')
            .replace('/lgtreports/listofiocreation', '')
            .replace('/west/report', '')
            .replace('/tools/ed2a7c1d5593193b9b886fd1ec8bb201', '')
            .replace('/vl06ozmimod/c8d4fc0b4a02f4d11f44fcc0afcd028042feb4830c67810008f5d13d', '')
            .replace('/vl06ozmimod/f735fba8cbdf033c781e56019873f7b16418b533b8380d0554efdaad', '');
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}



function clickmodule(destination) {
    let url = geturl() + destination;
    url = url.replace("//report/","/report/")
            .replace("//lgtreports/","/lgtreports/")
            .replace("//tools/","/tools/")
            .replace("//west/","/west/");
    //alert(url);
    window.location.href = url;
}
function loadLocation() {
    $('#iLoc').removeClass('fa-hand-o-up').addClass('fa-refresh fa-spin');
    $.ajax({
        url: siteUrl + '/getLocation',
        type: 'POST',
        dataType: 'json',
        data: {},
        success: function (value) {

                if (value.status == "OK") {
                    if (value.message == "Success") {
                        value.data.forEach(
                            function (valueData) {
                                $('#txtLocID').append('<option value="' + valueData.value + '">(' + valueData.value + ') ' + valueData.text + '</option>');
                            }
                        )
                    }
                }
            
        

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
        url: siteUrl + '/getCustomer',
        type: 'POST',
        dataType: 'json',
        data: {},
        success: function (value) {

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
        

            $('#iCust').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#iCust').removeClass('fa-refresh fa-spin').addClass('fa-hand-o-up');
        }
    })
};