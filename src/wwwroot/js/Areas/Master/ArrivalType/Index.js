﻿$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    arrTypeVM = {
        dtArrivalType: null,
        init: function () {
            dtArrivalType = $('#tblArrivalType').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Arrival Type Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Arrival Type Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('arrtype-get-url'),    //"/Customer/GetCustomers",
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "ArrivalTypeCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "ArrivalTypeName", "autoWidth": false },
                    { "data": "ArrivalTypeDesc", "autoWidth": false },
                    { "data": "CompanyCode", "className": "boldColumn", "autoWidth": false },
                    {
                        "data": "Is_Active",
                        "autoWidth": false,
                        render: function (data, type, row) {
                            if (type === 'display') {
                                //return '<input type="checkbox" disabled="disabled" class="chkIs_Active">';
                                if (data) {
                                    return '<img src="' + $('#IndexData').data('image-url') + '/mswitch/isavtive_yes.png" />';;
                                } else {
                                    return '<img src="' + $('#IndexData').data('image-url') + '/mswitch/isavtive_no.png" />';
                                }
                            }
                            return data;
                        }
                    },
                    {
                        "autoWidth": true,
                        "render": function (data, type, arrType, meta) {
                            return '<a id="viewArrivalType" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="ArrivalType/Details/' + arrType.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editArrivalType" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="ArrivalType/Edit/' + arrType.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delArrivalType" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="ArrivalType/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "15%", "targets": 0 },
                    { "width": "26%", "targets": 1 },
                    { "width": "29%", "targets": 2 },
                    { "width": "13%", "targets": 3 },
                    { "className": "dt-center", "width": "8%", "targets": 4, "orderable": false },
                    { "width": "9%", "targets": 5, "orderable": false }
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
            dtArrivalType.ajax.reload();
        }
    }

    // initialize the datatables
    arrTypeVM.init();

    //set width of input search.
    //$('.dataTables_filter input[type="search"]').css({ 'width': '350px' });

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add
    $("#btnCreateArrivalType").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            success: function (data) {
                if (data) {
                    $('#newArrivalTypeContainer').html(data);
                    $('#newArrivalTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Create Arrival Type', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });
    });

    $("#newArrivalTypeModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#ArrivalTypeCode').focus();
    });
    //clear html data for create new;
    $("#newArrivalTypeModal").on("hidden.bs.modal", function () {
        $('#newArrivalTypeContainer').html("");
    });

    //View
    $('#tblArrivalType').on("click", "#viewArrivalType", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewArrivalTypeContainer').html(data);
                    $('#viewArrivalTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }

            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'View Arrival Type', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });

    });

    //clear html data for View;
    $("#viewArrivalTypeModal").on("hidden.bs.modal", function () {
        $('#viewArrivalTypeContainer').html("");
    });

    //Edit
    $('#tblArrivalType').on("click", "#editArrivalType", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editArrivalTypeContainer').html(data);
                    $('#editArrivalTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Edit Arrival Type', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });
    });

    //clear html data for edit;
    $("#editArrivalTypeModal").on("hidden.bs.modal", function () {
        $('#editArrivalTypeContainer').html("");
    });

    //Delete
    $('#tblArrivalType').on('click', '#delArrivalType', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var arrTypeData = (dtArrivalType.row(row).data());
        var arrTypeId = arrTypeData["Id"];
        var arrTypeName = arrTypeData["ArrivalTypeName"];
        var con = confirm("Are you sure you want to delete this " + arrTypeName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                async: true,
                data: addRequestVerificationToken({ id: arrTypeId }),
                success: function (response) {

                    if (response.success) {

                        arrTypeVM.refresh();

                        toastr.success(response.message, 'Delete Arrival Type');
                    }
                    else {
                        toastr.error(response.message, 'Delete Arrival Type', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                    }
                },
                error: function (xhr, txtStatus, errThrown) {
                    toastr.error('Error: ' + xhr.statusText, 'Delete Arrival Type', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                }
            });
        }
        else {
            //deptVM.refresh();
        }
    });


});