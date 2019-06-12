$(function () {

    //Begin----check clear require---//
    //$("#Mc_No").on("focusout", function () {
    //    if ($("#Mc_No").val() != '') {
    //        $('#Mc_No_validationMessage li').remove();
    //    }
    //});

    //$("#Mc_Name").on("focusout", function () {
    //    if ($("#Mc_Name").val() != '') {
    //        $('#Mc_Name_validationMessage li').remove();
    //    }
    //});
    //End----check clear require---//
    $('#parentName').inputpicker({
        url: $('#CreateData').data('menu-parent-url'),
        fields: [
            { name: 'nameOption', text: 'NAME', width: '100%' }
        ],
        selectMode: 'restore',
        headShow: false,
        fieldText: 'nameOption',
        fieldValue: 'Id',
        autoOpen: true,
        width: '200px',
    });

    //global.applyIcheckStyle();
    global.applyBSwitchStyle($("#status").prop("id"), true, false, "small", "Yes", "No");
    global.applyBSwitchStyle($("#isParent").prop("id"), false, false, "small", "Yes", "No");

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
        url: $('#CreateData').data('menu-add-url'),
        data: addRequestVerificationToken({
            nameOption: $("#nameOption").val(),
            controller: $("#controller").val(),
            action: $("#action").val(),
            imageClass: $("#imageClass").val(),
            status: $('#status').is(':checked'),
            isParent: $('#isParent').is(':checked'),
            parentId: $("#parentName").val() || 0,
            area: $("#area").val(),
            menuseq: $("#menuseq").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#newMenuModal').modal('hide');
                $('#newMenuContainer').html("");

                $("#tblMenu").DataTable().ajax.reload(null, false);
                $("#tblMenu").DataTable().page('last').draw('page');

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