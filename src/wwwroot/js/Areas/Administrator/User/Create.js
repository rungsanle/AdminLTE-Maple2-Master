﻿$(function () {

    //Begin----check clear require---//
    $("#UserCode").on("focusout", function () {
        if ($("#UserCode").val() != '') {
            global.removeValidationErrors('UserCode');
        }
    });

    $("#UserName").on("focusout", function () {
        if ($("#UserName").val() != '') {
            global.removeValidationErrors('UserName');
        }
    });
    //End----check clear require---//
    $('#DeptName').inputpicker({
        url: $('#CreateData').data('dept-get-url'),
        fields: [
            { name: 'DeptCode', text: 'CODE', width: '30%' },
            { name: 'DeptName', text: 'NAME', width: '70%' }
        ],
        width: '350px',
        autoOpen: true,
        selectMode: 'restore',
        headShow: true,
        fieldText: 'DeptName',
        fieldValue: 'Id'
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
    global.applyDraggable();

    global.applyIsActiveSwitch(true, false);

    $("#btnSearchId").on("click", function (event) {

        event.preventDefault();

        //$('#searchIdContainer').html('');
        $('#searchIdModal').modal('show');

        //Initial Datatable
        appUserVM.init();

    });

    $("#btnRemoveId").on("click", function (event) {

        event.preventDefault();

        $('#aspnetuser_Id').val('');


    });

    //Hidden modal dialog
    $("#searchIdModal").on("hidden.bs.modal", function (event) {

        event.preventDefault();

        var value = $('#hdSelectAppUser').val();

        if (isNaN(value)) {
            $("#aspnetuser_Id").val(value);
        }

        //Destroy Datatable
        appUserVM.tbdestroy();

        return false;
    });

    $("#btnSaveCreate").on("click", SaveCrate);

    appUserVM = {
        dtAppUser: null,
        init: function () {

            dtAppUser = $('#tblAppUser').DataTable({
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#CreateData').data('appu-get-url'),
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "Id", "autoWidth": false },
                    { "data": "UserName", "autoWidth": false },
                    { "data": "Email", "autoWidth": false },
                    {
                        "render": function (data, type, appuser, meta) {
                            return '<a id="selectAppUser" class="btn btn-default btn-sm" data-toggle="tooltip" title="Select" onclick="selectAppUser(\'' + appuser.Id + '\');" href="javascript:void(0);"><span class="glyphicon glyphicon-hand-up" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "className": "dt-header-center", "width": "45%", "targets": 0 },
                    { "className": "dt-header-center", "width": "20%", "targets": 1 },
                    { "className": "dt-header-center", "width": "30%", "targets": 2 },
                    { "className": "dt-header-center", "width": "5%", "targets": 3, "orderable": false }
                ],
                order: [[0, "Id"]],
                lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
                iDisplayLength: 5
            });

            $('div.dataTables_filter input').addClass('form-control');
            $('div.dataTables_length select').addClass('form-control');


        },

        tbdestroy: function () {
            dtAppUser.destroy();
        },

        refresh: function () {
            dtAppUser.ajax.reload();
        }
    }

});

function selectAppUser(id) {

    $("#hdSelectAppUser").val(id);
    $('#searchIdModal').modal('hide');

}

function closePopup() {
    $('#searchIdModal').modal('hide');
}

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

    var strUserCode = $("#UserCode").val().toUpperCase();
    var strCompanyCode = $("#CompanyCode").val();
    var userFileName;

    var fileLength = $("#fileImage").get(0).files.length;
    if (fileLength > 0) {

        var selFilename = $("#fileImage").get(0).files[0].name;
        var extension = selFilename.substring(selFilename.lastIndexOf('.') + 1);

        userFileName = strUserCode + strCompanyCode + '.' + extension;
    }

    $.ajax({
        async: true,
        type: "POST",
        url: $('#CreateData').data('user-add-url'),
        data: addRequestVerificationToken({
            UserCode: strUserCode,
            UserName: $("#UserName").val(),
            EmpCode: $("#EmpCode").val(),
            DeptId: $("#DeptName").val(),
            Position: $("#Position").val(),
            CompanyCode: strCompanyCode,
            aspnetuser_Id: $("#aspnetuser_Id").val(),
            UserImagePath: userFileName,
            Is_Active: $('#Is_Active').is(':checked')
        }),
        success: function (response) {

            if (response.success) {

                if (fileLength > 0) {
                    UploadUserImage(userFileName);
                }

                $('#newUserModal').modal('hide');
                $('#newUserContainer').html("");

                $("#tblUser").DataTable().ajax.reload(null, false);
                $("#tblUser").DataTable().page('last').draw('page');

                //global.successAlert(response.message);
                toastr.success(response.message, 'Create User');
            }
            else {

                if (response.errors != null) {
                    global.displayValidationErrors(response.errors);
                } else {
                    toastr.error(response.message, 'Edit Department', { timeOut: 10000 });
                }
            }

        },
        error: function () {
            global.dangerAlert("error", 5000);
        }
    });

}

function UploadUserImage(strName) {

    var files = $("#imgUser").get(0).files;
    var fileData = new FormData();
    fileData.append("fileName", strName);
    for (var i = 0; i < files.length; i++) {
        fileData.append("files", files[i]);
    }

    $.ajax({
        async: true,
        type: "POST",
        url: $('#CreateData').data('user-upload-url'),
        dataType: "json",
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        data: fileData,
        success: function (response) {
            if (response.success) {
                //file name = response.data
            }
        },
        error: function (xhr, status, error) {
            alert(status);
        }
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageUser')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}