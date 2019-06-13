$(function () {

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

function addRequestVerificationToken(data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
};

function SaveCrate(event) {

    event.preventDefault();

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
