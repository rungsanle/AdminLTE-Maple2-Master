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
    //End----check clear require---//

    $('#MachineProdTypeName').inputpicker({
        url: $('#EditData').data('prodtype-get-url'),
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

    $('#MachineProdTypeName').val($("#MachineProdType").val());

    /*-------------- BEGIN COMPANY CODE --------------*/
    var compCode = $('#EditData').data('viewbag-compcode');

    global.applyCompanyCodeDropdown();

    if (compCode != 'ALL*') {
        $('#CompanyCode').val(compCode);

        setTimeout(function () {
            $(".inputpicker-input:last").attr("disabled", true);
        }, 100);
    }
    /*-------------- END COMPANY CODE --------------*/

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
        url: $('#EditData').data('mc-edit-url'),
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

                $('#editMachineModal').modal('hide');
                $('#editMachineContainer').html("");

                $("#tblMachine").DataTable().ajax.reload(null, false);

                toastr.success(response.message, 'Edit Machine');
            }
            else {
                if (response.errors != null) {
                    global.displayValidationErrors(response.errors);
                } else {
                    toastr.error(response.message, 'Edit Machine', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                }
            }

        },
        error: function (xhr, txtStatus, errThrown) {
            toastr.error('Error: ' + xhr.statusText, 'Edit Machine', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
        }
    });

};