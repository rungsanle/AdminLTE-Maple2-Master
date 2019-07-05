$(function () {

    //Begin----check clear require---//
    $("#RawMatTypeCode").on("focusout", function () {
        if ($("#RawMatTypeCode").val() != '') {
            global.removeValidationErrors('RawMatTypeCode');
        }
    });

    $("#RawMatTypeName").on("focusout", function () {
        if ($("#RawMatTypeName").val() != '') {
            global.removeValidationErrors('RawMatTypeName');
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

    //global.applyBSwitchStyle($("#Is_Active").prop("id"), $('#Is_Active').is(':checked'), false, "small", "Yes", "No");
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
        url: $('#EditData').data('rawmattype-edit-url'),
        data: addRequestVerificationToken({
            Id: $("#Id").val(),
            RawMatTypeCode: $("#RawMatTypeCode").val().toUpperCase(),
            RawMatTypeName: $("#RawMatTypeName").val(),
            RawMatTypeDesc: $("#RawMatTypeDesc").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#editRawMatTypeModal').modal('hide');
                $('#editRawMatTypeContainer').html("");

                $("#tblRawMatType").DataTable().ajax.reload(null, false);

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
            //alert("error");
            global.dangerAlert("error", 5000);
        }
    });

};