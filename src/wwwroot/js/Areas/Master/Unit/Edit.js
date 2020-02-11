﻿$(function () {

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

    global.applyIsActiveSwitch($('#Is_Active').is(':checked'), false);

    $("#btnSaveEdit").on("click", SaveEdit);
});

function addRequestVerificationToken(data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
};

function SaveEdit(event) {

    event.preventDefault();

    global.resetValidationErrors();

    //var info = $('#tblMenu').DataTable().page.info();

    $.ajax({
        async: true,
        type: "POST",
        url: $('#EditData').data('unit-edit-url'),
        data: addRequestVerificationToken({
            UnitCode: $("#UnitCode").val().toUpperCase(),
            UnitName: $("#UnitName").val(),
            UnitDesc: $("#UnitDesc").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#editUnitModal').modal('hide');
                $('#editUnitContainer').html("");

                $("#tblUnit").DataTable().ajax.reload(null, false);

                toastr.success(response.message, 'Edit Unit');

            }
            else {
                if (response.errors != null) {
                    global.displayValidationErrors(response.errors);
                } else {
                    toastr.error(response.message, 'Edit Unit', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                }
            }

        },
        error: function (xhr, txtStatus, errThrown) {
            toastr.error('Error: ' + xhr.statusText, 'Edit Unit', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
        }
    });

};