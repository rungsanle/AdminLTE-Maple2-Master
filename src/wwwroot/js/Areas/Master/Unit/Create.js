$(function () {

    //Begin----check clear require---//
    $("#UnitCode").on("focusout", function () {
        if ($("#UnitCode").val() != '') {
            global.removeValidationErrors('UnitCode');
        }
    });

    $("#UnitName").on("focusout", function () {
        if ($("#UnitName").val() != '') {
            global.removeValidationErrors('UnitName');
        }
    });
    //End----check clear require---//

    global.applyIsActiveSwitch(true, false);

    $("#btnSaveCreate").on("click", SaveCrate);

});

function onFocusOut(ctl) {

    if (ctl.val() != '') {
        document.querySelectorAll('.text-danger li')[0].remove();
    }

}

function addRequestVerificationToken(data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
}

function SaveCrate(event) {

    event.preventDefault();

    global.resetValidationErrors();

    $.ajax({
        async: true,
        type: "POST",
        url: $('#CreateData').data('unit-add-url'),
        data: addRequestVerificationToken({
            UnitCode: $("#UnitCode").val().toUpperCase(),
            UnitName: $("#UnitName").val(),
            UnitDesc: $("#UnitDesc").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#newUnitModal').modal('hide');
                $('#newUnitContainer').html("");

                $("#tblUnit").DataTable().ajax.reload(null, false);
                $("#tblUnit").DataTable().page('last').draw('page');

                global.successAlert(response.message);
            }
            else {

                if (response.errors != null) {
                    global.displayValidationErrors(response.errors);
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