﻿$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    processVM = {
        dtProc: null,
        init: function () {
            dtProc = $('#tblProcess').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Process Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Process Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('proc-get-url'),    //"/Customer/GetCustomers",
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "ProcessCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "ProcessName", "autoWidth": false },
                    { "data": "ProcessDesc", "autoWidth": false },
                    { "data": "ProcessSeq", "autoWidth": false },
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
                        "render": function (data, type, process, meta) {
                            return '<a id="viewProcess" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="Process/Details/' + process.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editProcess" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="Process/Edit/' + process.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delProcess" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="Process/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "12%", "targets": 0 },
                    { "width": "25%", "targets": 1 },
                    { "width": "24%", "targets": 2 },
                    { "className": "dt-center", "width": "10%", "targets": 3 },
                    { "width": "12%", "targets": 4 },
                    { "className": "dt-center", "width": "8%", "targets": 5, "orderable": false },
                    { "width": "9%", "targets": 6, "orderable": false }
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
            dtProc.ajax.reload();
        }
    }

    // initialize the datatables
    processVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Machine
    $("#btnCreateProcess").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newProcessContainer').html(data);
                    $('#newProcessModal').modal('show');
                } else {
                    global.authenExpire();
                }

            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Create Process', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });
    });

    $("#newProcessModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#ProcessCode').focus();
    });
    //clear html data for create new;
    $("#newProcessModal").on("hidden.bs.modal", function () {
        $('#newProcessContainer').html("");
    });

    //view Machine
    $('#tblProcess').on("click", "#viewProcess", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewProcessContainer').html(data);
                    $('#viewProcessModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'View Process', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });
    });

    //clear html data for View;
    $("#viewProcessModal").on("hidden.bs.modal", function () {
        $('#viewProcessContainer').html("");
    });

    //Edit Machine
    $('#tblProcess').on("click", "#editProcess", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editProcessContainer').html(data);
                    $('#editProcessModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Edit Process', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });
    });

    //clear html data for edit;
    $("#editProcessModal").on("hidden.bs.modal", function () {
        $('#editProcessContainer').html("");
    });

    //Delete
    $('#tblProcess').on('click', '#delProcess', function (event) {

        event.preventDefault();
        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var processData = (dtProc.row(row).data());
        var processId = processData["Id"];
        var processName = processData["ProcessName"];
        var con = confirm("Are you sure you want to delete this " + processName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: processId }),
                success: function (response) {

                    if (response.success) {

                        processVM.refresh();

                        toastr.success(response.message, 'Delete Process');
                    }
                    else {
                        toastr.error(response.message, 'Delete Process', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                    }
                },
                error: function (xhr, txtStatus, errThrown) {
                    toastr.error('Error: ' + xhr.statusText, 'Delete Process', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                }
            });
        }
        else {
            //deptVM.refresh();
        }
    });


});