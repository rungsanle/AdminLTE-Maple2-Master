$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    productVM = {
        dtMat: null,
        init: function () {
            dtMat = $('#tblMaterial').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Material Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Material Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('mat-get-url'),
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "MaterialCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "MaterialName", "autoWidth": false },
                    { "data": "MaterialDesc1", "autoWidth": false },
                    { "data": "MaterialDesc2", "autoWidth": false },
                    { "data": "RawMatTypeId", "autoWidth": false },
                    { "data": "RawMatType", "autoWidth": false },
                    { "data": "PackageStdQty", "autoWidth": false, render: $.fn.dataTable.render.number(',', '.', 2, '')},
                    { "data": "UnitId", "autoWidth": false },
                    { "data": "Unit", "autoWidth": false },
                    { "data": "CompanyCode", "className": "boldColumn", "autoWidth": false },
                    {
                        "data": "Is_Active",
                        "autoWidth": false,
                        render: function (data, type, row) {
                            if (type === 'display') {
                                //return '<input type="checkbox" disabled="disabled" class="chkIs_Active">';
                                if (data) {
                                    return '<img src="' + $('#IndexData').data('image-url') + '/mswitch/isavtive_yes.png" />';
                                } else {
                                    return '<img src="' + $('#IndexData').data('image-url') + '/mswitch/isavtive_no.png" />';
                                }
                            }
                            return data;
                        }
                    },
                    {
                        "autoWidth": true,
                        "render": function (data, type, mat, meta) {
                            return '<a id="viewMaterial" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="Material/Details/' + mat.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editMaterial" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="Material/Edit/' + mat.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delMaterial" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="Material/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "12%", "targets": 0 },
                    { "width": "18%", "targets": 1 },
                    { "width": "15%", "targets": 2 },
                    { "width": "0%", "targets": 3, "visible": false },
                    { "width": "0%", "targets": 4, "visible": false },
                    { "width": "12%", "targets": 5 },
                    { "className": "dt-right", "width": "10%", "targets": 6 },
                    { "width": "0%", "targets": 7, "visible": false },
                    { "width": "8%", "targets": 8 },
                    { "width": "10%", "targets": 9 },
                    { "className": "dt-center", "width": "6%", "targets": 10, "orderable": false },
                    { "width": "9%", "targets": 11, "orderable": false }
                ],
                order: [],
                lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
                iDisplayLength: 10
            });

            //dt.on('draw', function () {
            //    global.applyIcheckStyle();
            //});

            $('div.dataTables_filter input').addClass('form-control');
            $('div.dataTables_length select').addClass('form-control');


        },

        refresh: function () {
            dtMat.ajax.reload();
        }
    }

    // initialize the datatables
    productVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add
    $("#btnCreateMaterial").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newMatContainer').html(data);
                    $('#newMatModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Create Material', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });

    });

    $("#newMatModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#MaterialCode').focus();
    });
    //clear html data for create new;
    $("#newMatModal").on("hidden.bs.modal", function () {
        $('#newMatContainer').html("");
    });

    //Upload Customer
    $("#btnUpload").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.get(api, function (data) {
            if (data) {
                $('#uploadMatContainer').html(data);
                $('#uploadMatModal').modal('show');
            } else {
                global.authenExpire();
            }
        });

    });

    $("#uploadMatModal").on("shown.bs.modal", function () {

    });
    //clear html data for create new;
    $("#uploadMatModal").on("hidden.bs.modal", function () {
        $('#uploadCustContainer').html("");
    });

    //View
    $('#tblMaterial').on("click", "#viewMaterial", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewMatContainer').html(data);
                    $('#viewMatModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'View Material', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });

    });

    //clear html data for View;
    $("#viewMatModal").on("hidden.bs.modal", function () {
        $('#viewMatContainer').html("");
    });

    //Edit
    $('#tblMaterial').on("click", "#editMaterial", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editMatContainer').html(data);
                    $('#editMatModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Edit Material', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });

    });

    $("#editMatModal").on("shown.bs.modal", function () {
        $('#MaterialName').focus();   //.select()
    });

    //clear html data for edit;
    $("#editMatModal").on("hidden.bs.modal", function () {
        $('#editMatContainer').html("");
    });

    //Delete
    $('#tblMaterial').on('click', '#delMaterial', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var rowSelect = $(this).parents('tr')[0];
        var materialData = (dtMat.row(rowSelect).data());
        var materialId = materialData["Id"];
        var materialName = materialData["MaterialName"];

        $.confirm({
            title: 'Please Confirm!',
            content: 'Are you sure you want to delete this ' + materialName,
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-confirm',
                    keys: ['shift', 'enter'],
                    action: function () {

                        $.ajax({
                            type: 'POST',
                            url: api,
                            data: addRequestVerificationToken({ id: materialId }),
                            success: function (response) {

                                if (response.success) {

                                    productVM.refresh();

                                    toastr.success(response.message, 'Delete Material');
                                }
                                else {
                                    toastr.error(response.message, 'Delete Material', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                                }
                            },
                            error: function (xhr, txtStatus, errThrown) {
                                toastr.error('Error: ' + xhr.statusText, 'Delete Material', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                            }
                        });

                    }
                },
                cancel: {
                    text: 'Cancel',
                    btnClass: 'btn-cancel',
                    keys: ['enter'],
                    action: function () {
                    }
                }
            }
        });

    });


});