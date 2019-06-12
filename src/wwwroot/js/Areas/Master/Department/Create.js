$(function () {

    //Begin----check clear require---//
    $("#DeptCode").on("focusout", function () {
        if ($("#DeptCode").val() != '') {
            $('#DeptCode_validationMessage li').remove();
        }
    });

    $("#DeptName").on("focusout", function () {
        if ($("#DeptName").val() != '') {
            $('#DeptName_validationMessage li').remove();
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
    //global.applyBSwitchStyle($("#Is_Active").prop("id"), true, false, "small", "Yes", "No");

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
        url: $('#CreateData').data('dept-add-url'),
        data: addRequestVerificationToken({
            DeptCode: $("#DeptCode").val().toUpperCase(),
            DeptName: $("#DeptName").val(),
            DeptDesc: $("#DeptDesc").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#newDeptModal').modal('hide');
                $('#newDeptContainer').html("");

                $("#tblDept").DataTable().ajax.reload(null, false);
                $("#tblDept").DataTable().page('last').draw('page');

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

}

function displayValidationErrors(errors) {

    $.each(errors, function (idx, errorMessage) {
        var res = errorMessage.split("|");
        $("[data-valmsg-for='" + res[0] + "']").append('<li>' + res[1] + '</li>');
    });
}

function resetValidationErrors() {

    var listItems = document.querySelectorAll('.text-danger li');
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent != null)
            listItems[i].remove();
    };
}