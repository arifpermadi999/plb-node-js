jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('a, button, :input, [tabindex]');
    }
});

$(document).on('keypress', 'input,select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});

$(document).ready(function () {
    $('#iUsername').focus();

    $('#btnLogin').click(function () {
        var status = navigator.onLine;
        $("#btnLogin").html('<i class="fa fa-refresh fa-spin"></i> Checking user data....');
        if (!status) {
            $('#dvAlert').attr("class", "form-group alert alert-danger");
            $('#dvAlert').html('<i class="fa fa-globe"> Connection failed, please check your connection settings.</i>');

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');
            }, 3000)

            return;
        }

        var vUsername = $('#iUsername').val();
        var vPassword = $('#iPassword').val();        

        if (vUsername == "") {
            $('#dvAlert').attr("class", "form-group alert alert-danger");
            $('#dvAlert').html('<i class="fa fa-close"> "<b>Username</b>" must be entered.</i>');
            $('#iUsername').focus();

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');
            }, 1000);

            return;
        }

        if (vPassword == "") {
            $('#dvAlert').attr("class", "form-group alert alert-danger");
            $('#dvAlert').html('<i class="fa fa-close"> "<b>Password</b>" must be entered.</i>');
            $('#iPassword').focus();

            setTimeout(function () {
                $('#dvAlert').attr("class", "");
                $('#dvAlert').html('');
            }, 1000);

            return;
        }

        $.ajax({
            
            url: window.location.origin + '/doLogin',
            type: 'POST',
            dataType: 'json',
            data: { "username": vUsername, "userpassword": vPassword },
            success: function (data) {
                
                if (data.status == "OK") {
                    if (data.message == "Success") {
                                        
                        $("#btnLogin").html('<b>LOGIN SUCCESSFULL</b>');                                
                        window.location.href = window.location.origin;
                    }
                    else {
                        $("#btnLogin").html('<b>SUBMIT</b>');    
                        $('#dvAlert').attr("class", "form-group alert alert-danger");
                        $('#dvAlert').html('<i class="fa fa-close"> ' + data.message + '.</i>');

                        setTimeout(function () {
                            $('#dvAlert').attr("class", "");
                            $('#dvAlert').html('');
                        }, 3000);
                    }
                }
                    
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#dvAlert').attr("class", "form-group alert alert-danger");
                $('#dvAlert').html('<i class="fa fa-close"> ' + jqXHR.status + ' ' + errorThrown + '.</i>');

                setTimeout(function () {
                    $('#dvAlert').attr("class", "");
                    $('#dvAlert').html('');
                }, 3000);
            }
        });

    });
});