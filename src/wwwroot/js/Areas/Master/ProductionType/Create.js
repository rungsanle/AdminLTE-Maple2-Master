$(function () {

    //Begin----check clear require---//
    $("#ProdTypeCode").on("focusout", function () {
        if ($("#ProdTypeCode").val() != '') {
            global.removeValidationErrors('ProdTypeCode');
        }
    });

    $("#ProdTypeName").on("focusout", function () {
        if ($("#ProdTypeName").val() != '') {
            global.removeValidationErrors('ProdTypeName');
        }
    });
    //End----check clear require---//
    var compCode = $('#CreateData').data('viewbag-compcode');
    //$('#CompanyCode').inputpicker({
    //    url: "@Url.Action("GetCompany", "Company", new { Area = "Master" })",
    //    fields: [
    //        { name: 'CompanyCode', text: 'CODE', width: '30%' },
    //        { name: 'CompanyName', text: 'NAME', width: '70%' }
    //    ],
    //    width: '350px',
    //    autoOpen: true,
    //    selectMode: 'restore',
    //    headShow: true,
    //    fieldText: 'CompanyCode',
    //    fieldValue: 'CompanyCode'
    //});
    global.applyCompanyCodeDropdown();

    if (compCode != 'ALL*') {
        $('#CompanyCode').val(compCode);

        $(function () {
            $(".inputpicker-input:last").attr("disabled", true); // or removeAttr("disabled")
        });
    }

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

    global.resetValidationErrors();

    $.ajax({
        async: true,
        type: "POST",
        url: $('#CreateData').data('prodtype-add-url'),
        data: addRequestVerificationToken({
            ProdTypeCode: $("#ProdTypeCode").val().toUpperCase(),
            ProdTypeName: $("#ProdTypeName").val(),
            ProdTypeDesc: $("#ProdTypeDesc").val(),
            ProdTypeSeq: $("#ProdTypeSeq").val(),
            CompanyCode: $("#CompanyCode").val(),
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                $('#newProdTypeModal').modal('hide');
                $('#newProdTypeContainer').html("");

                $("#tblProdType").DataTable().ajax.reload(null, false);
                $("#tblProdType").DataTable().page('last').draw('page');

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