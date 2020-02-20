$(function () {

    $("#UserName").on("focusout", function () {
        if ($("#UserName").val().length >= 6) {
            $('#UserName_validationMessage li').remove();
        }
    });

    $("#Email").on("focusout", function () {
        if (isValidEmailAddress($("#Email").val())) {
            $('#Email_validationMessage li').remove();
        }
    });

    $("#Password").on("focusout", function () {
        if ($("#Password").val().length >= 6 && $('#Password_validationMessage li').text() === 'PASSWORD must be at least 6 characters.') {
            $('#Password_validationMessage li').remove();
        }
    });

    var tblUserRole = $('#tblUserRole').DataTable({
        processing: true,
        autoWidth: false,
        paging: false,
        searching: false,
        ordering: false,
        info: false,
        lengthChange: false,
        responsive: true
    });

    $('#AddRole').val('');

    //$('#btnAddRole').on('click', function (event) {

    //    event.preventDefault();

    //    tblUserRole.row.add([
    //        'Office',
    //        '<a id="delUserRole" class="btn btn-default btn-sm" data-toggle="tooltip" title="Remove" href="UserRole/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>'
    //    ]).draw();
    //});

    $('#tblUserRole').on("click", "#btnAddRole", function (event) {

        event.preventDefault();

        var rolen = $("#AddRole").val();

        if (rolen) {

            $.ajax({
                async: true,
                type: "POST",
                url: $('#EditData').data('appu-editrole-url'),
                data: addRequestVerificationToken({
                    Id: $("#Id").val(),
                    RoleName: rolen
                }),
                success: function (response) {

                    if (response.success) {

                        tblUserRole.row.add([
                            rolen,
                            '<a id="delUserRole" class="btn btn-default btn-sm" data-toggle="tooltip" title="Remove" href="AppUser/DeleteAppUserRole/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>'
                        ]).draw();

                        $('#AddRole').empty();

                        $.each(response.data, function (index, value) {
                            $('#AddRole').append('<option value="' + value.Text + '">' + value.Text + '</option>');
                        });

                        $('#AddRole').val('');

                    } else {
                        global.dangerAlert(response.message, 5000);
                    }

                },
                error: function () {
                    global.dangerAlert("error", 5000);
                }
            });

        }
        else {
            $('#AddRole').focus();
        }

    });

    $('#tblUserRole').on("click", "#delUserRole", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var appRoleData = (tblUserRole.row(row).data());

       // alert(appRoleData);

        var appuId = $("#Id").val();
        var rName = appRoleData[0];

        var con = confirm("Are you sure you want to delete this " + rName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ Id: appuId, RoleName: rName}),
                success: function (response) {

                    if (response.success) {

                        tblUserRole.row(row).remove().draw();

                        $('#AddRole').empty();

                        $.each(response.data, function (index, value) {
                            $('#AddRole').append('<option value="' + value.Text + '">' + value.Text + '</option>');
                        });

                        $('#AddRole').val('');
                    }
                    else {
                        global.dangerAlert(response.message, 5000);
                    }
                },
                error: function (xhr) {
                    global.dangerAlert("error", 5000);
                }
            });
        }
        else {
            //roleVM.refresh();
        }
        



    });

    $("#btnSaveEdit").on("click", SaveEdit);

});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

function addRequestVerificationToken(data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
};

function SaveEdit(event) {

    event.preventDefault();

    resetValidationErrors();

    $.ajax({
        async: true,
        type: "POST",
        url: $('#EditData').data('appu-edit-url'),
        data: addRequestVerificationToken({
            Id: $("#Id").val(),
            UserName: $("#UserName").val(),
            Email: $("#Email").val(),
            Password: $("#Password").val(),
            PhoneNumber: $("#PhoneNumber").val()
        }),
        success: function (response) {

            if (response.success) {

                $('#editAppUserModal').modal('hide');
                $('#editAppUserContainer').html("");

                $("#tblAppUser").DataTable().ajax.reload(null, false);

                global.successAlert(response.message);
            }
            else {
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
}

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

}
