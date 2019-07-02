$(function () {

    //Begin----check clear require---//
    $("#MatTypeCode").on("focusout", function () {
        if ($("#MatTypeCode").val() != '') {
            $('#MatTypeCode_validationMessage li').remove();
        }
    });

    $("#MatTypeName").on("focusout", function () {
        if ($("#MatTypeName").val() != '') {
            $('#MatTypeName_validationMessage li').remove();
        }
    });
    //End----check clear require---//

    /*-------------- BEGIN COMPANY CODE --------------*/
    var compCode = $('#CreateData').data('viewbag-compcode');

    global.applyCompanyCodeDropdown();

    if (compCode != 'ALL*') {
        $('#CompanyCode').val(compCode);

        setTimeout(function () {
            $(".inputpicker-input:last").attr("disabled", true);
        }, 100);
    }
    /*-------------- END COMPANY CODE --------------*/

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
};

function SaveCrate(event) {

    event.preventDefault();

    resetValidationErrors();

    $.ajax({
        async: true,
        type: "POST",
        url: $('#CreateData').data('mattype-add-url'),
        data: addRequestVerificationToken({
            MatTypeCode: $("#MatTypeCode").val().toUpperCase(),
            MatTypeName: $("#MatTypeName").val(),
            MatTypeDesc: $("#MatTypeDesc").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#newMatTypeModal').modal('hide');
                $('#newMatTypeContainer').html("");

                $("#tblMatType").DataTable().ajax.reload(null, false);
                $("#tblMatType").DataTable().page('last').draw('page');

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
}

function resetValidationErrors() {

    var listItems = document.querySelectorAll('.text-danger li');
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent != null)
            listItems[i].remove();
    };

}