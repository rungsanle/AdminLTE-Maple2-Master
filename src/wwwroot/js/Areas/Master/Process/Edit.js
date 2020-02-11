﻿$(function () {

    //Begin----check clear require---//
    $("#ProcessCode").on("focusout", function () {
        if ($("#ProcessCode").val() != '') {
            global.removeValidationErrors('ProcessCode');
        }
    });

    $("#ProcessName").on("focusout", function () {
        if ($("#ProcessName").val() != '') {
            global.removeValidationErrors('ProcessName');
        }
    });
    //End----check clear require---//
    var compCode = $('#EditData').data('viewbag-compcode');

    global.applyCompanyCodeDropdown();

    if (compCode != 'ALL*') {
        $('#CompanyCode').val(compCode);

        setTimeout(function () {
            $(".inputpicker-input:last").attr("disabled", true);
        }, 100);
    }


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
        url: $('#EditData').data('proc-edit-url'),
        data: addRequestVerificationToken({
            Id: $("#Id").val(),
            ProcessCode: $("#ProcessCode").val().toUpperCase(),
            ProcessName: $("#ProcessName").val(),
            ProcessDesc: $("#ProcessDesc").val(),
            ProcessSeq: $("#ProcessSeq").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#editProcessModal').modal('hide');
                $('#editProcessContainer').html("");

                $("#tblProcess").DataTable().ajax.reload(null, false);

                toastr.success(response.message, 'Edit Process');

            }
            else {
                if (response.errors != null) {
                    global.displayValidationErrors(response.errors);
                } else {
                    toastr.error(response.message, 'Edit Process', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                }
            }

        },
        error: function (xhr, txtStatus, errThrown) {
            toastr.error('Error: ' + xhr.statusText, 'Edit Process', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
        }
    });

};