$(function () {

    //Begin----check clear require---//
    $("#MachineCode").on("focusout", function () {
        if ($("#MachineCode").val() != '') {
            global.removeValidationErrors('MachineCode');
        }
    });

    $("#MachineName").on("focusout", function () {
        if ($("#MachineName").val() != '') {
            global.removeValidationErrors('MachineName');
        }
    });

    $("#MachineProdTypeName").on("change", function () {
        if ($("#MachineProdTypeName").val() != '') {
            global.removeValidationErrors('MachineProdTypeName');
        }
    });
    //End----check clear require---//


    $('#MachineProdTypeName').inputpicker({
        url: $('#CreateData').data('prodtype-get-url'),
        fields: [
            { name: 'ProdTypeCode', text: 'CODE', width: '30%' },
            { name: 'ProdTypeName', text: 'NAME', width: '70%' }
        ],
        width: '350px',
        autoOpen: true,
        selectMode: 'restore',
        headShow: true,
        fieldText: 'ProdTypeName',
        fieldValue: 'Id',
        responsive: true
    });

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

    global.applyBSwitchStyle($("#Is_Active").prop("id"), true, false, "small", "Yes", "No");

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

    global.resetValidationErrors();

    $.ajax({
        async: true,
        type: "POST",
        url: $('#CreateData').data('mc-add-url'),
        data: addRequestVerificationToken({
            MachineCode: $("#MachineCode").val().toUpperCase(),
            MachineName: $("#MachineName").val(),
            MachineProdType: $("#MachineProdTypeName").val(),
            MachineSize: $("#MachineSize").val(),
            MachineSize: $("#MachineSize").val(),
            MachineRemark: $("#MachineRemark").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#newMachineModal').modal('hide');
                $('#newMachineContainer').html("");

                $("#tblMachine").DataTable().ajax.reload(null, false);
                $("#tblMachine").DataTable().page('last').draw('page');

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