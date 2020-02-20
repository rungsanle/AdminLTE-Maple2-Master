$(function () {

    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    setTimeout(function () {

        $('#NameIdentifier').val('');
        $('#Email').val('');
        $('#Password').val('');

    }, 500);

    $("#NameIdentifier").on("focusout", function () {
        if ($("#NameIdentifier").val().length >= 6) {
            $('#NameIdentifier_validationMessage li').remove();
        }
    });

    $("#Email").on("focusout", function () {
        if (isValidEmailAddress($("#Email").val())) {
            $('#Email_validationMessage li').remove();
        }
    });

    $("#Password").on("focusout", function () {
        if ($("#Password").val().length >= 6) {
            $('#Password_validationMessage li').remove();
        }
    });

    $("#ConfirmPassword").on("focusout", function () {
        if ($("#Password").val() == $("#ConfirmPassword").val()) {
            $('#ConfirmPassword_validationMessage li').remove();
        }
    });
   

    $("#btnRegister").on("click", Register);

});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

function addRequestVerificationToken(data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
};

function Register(event) {

    event.preventDefault();

    resetValidationErrors();

    $.ajax({
        async: true,
        type: "POST",
        url: $('#RegisterData').data('user-regis-url'),
        data: addRequestVerificationToken({
            NameIdentifier: $("#NameIdentifier").val(),
            Email: $("#Email").val(),
            Password: $("#Password").val(),
            ConfirmPassword: $('#ConfirmPassword').val()
        }),
        success: function (response) {

            if (response.success) {

                $('#newAppUserModal').modal('hide');
                $('#newAppUserContainer').html("");

                $("#tblAppUser").DataTable().ajax.reload(null, false);
                $("#tblAppUser").DataTable().page('last').draw('page');

                global.successAlert(response.message);

            } else {

                if (response.errors != null) {
                    displayValidationErrors(response.errors);
                } else {
                    global.dangerAlert(response.message, 5000);
                }
            }

        },
        error: function () {

            global.dangerAlert("error", 5000);
        }
    });

};

function displayValidationErrors(errors) {
    $.each(errors, function (idx, errorMessage) {
        var res = errorMessage.split("|");
        $("#" + res[0] + "_validationMessage").append('<li>' + res[1] + '</li>');
    });

};

function resetValidationErrors() {

    var listItems = document.querySelectorAll('.text-danger li');
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent != null)
            listItems[i].remove();
    };

};