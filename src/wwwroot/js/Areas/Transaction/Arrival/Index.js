$(function () {

    //To solve Synchronous XMLHttpRequest warning
    global.AjaxPrefilter();

    //Get appSetting.json
    var appSetting = global.getAppSettings('AppSettings');

    //Grid Table Config
    arrHdrVM = {
        dtArrHdr: null,
        init: function () {

            dtArrHdr = $('#tblArrival').DataTable({
                dom: "<'row'<'col-sm-4'B><'col-sm-2'l><'col-sm-6'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        text: '<i class="fa fa-refresh">&nbsp;<p class="setfont">Refresh</p></i>',
                        titleAttr: 'Refresh',
                        action: function (e, dt, node, config) {
                            dt.ajax.reload(null, false);
                        }
                    },
                    {
                        extend: 'collection',
                        text: '<i class="fa fa-file-o">&nbsp;<p class="setfont">Export</p></i>',
                        titleAttr: 'Export Option',
                        autoClose: true,
                        buttons: [
                            {
                                extend: 'excelHtml5',
                                text: '<i class="fa fa-file-excel-o">&nbsp;<p class="setfont">Export XLS</p></i>',
                                title: 'Document Arrival',
                                titleAttr: 'Excel'
                            },
                            {
                                extend: 'csvHtml5',
                                text: '<i class="fa fa-file-text-o">&nbsp;<p class="setfont">Export CSV</p></i>',
                                title: 'Document Arrival',
                                titleAttr: 'CSV'
                            }
                        ]
                    }
                ],
                initComplete: function () {
                    var btns = $('.dt-button');
                    btns.addClass('btn btn-default btn-sm');
                    btns.removeClass('dt-button');
                },
                processing: false, // for show progress bar
                autoWidth: false,
                ajax: {
                    url: $('#IndexData').data('arrival-get-url'),    //"/Customer/GetCustomers",
                    type: "GET",
                    async: true,
                    datatype: "json",
                    error: function (xhr, txtStatus, errThrown) {

                        var reponseErr = JSON.parse(xhr.responseText);

                        toastr.error('Error: ' + reponseErr.message, 'Get Arrival Error', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
                    }
                },
                columns: [
                    { "data": "ArrivalNo", "className": "boldColumn", "autoWidth": false },
                    {
                        "data": "ArrivalDate", "autoWidth": false, "type": "date", "render": function (value) {

                            return global.localDate(value);
                            //if (value === null) return "";

                            //var pattern = /Date\(([^)]+)\)/;
                            //var results = pattern.exec(value);
                            //var dt = new Date(parseFloat(results[1]));

                            //return (("0" + dt.getDate()).slice(-2) + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + dt.getFullYear());
                        }
                    },
                    { "data": "RawMatTypeName", "autoWidth": false },
                    { "data": "VendorCode", "autoWidth": false },
                    { "data": "VendorName", "autoWidth": false },
                    { "data": "PurchaseOrderNo", "autoWidth": false },
                    { "data": "DocRefNo", "autoWidth": false },
                    {
                        "data": "DocRefDate", "autoWidth": false, "type": "date", "render": function (value) {

                            return global.localDate(value);
                            //if (value === null) return "";

                            //var pattern = /Date\(([^)]+)\)/;
                            //var results = pattern.exec(value);
                            //var dt = new Date(parseFloat(results[1]));

                            //return (("0" + dt.getDate()).slice(-2) + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + dt.getFullYear());
                        }
                    },
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
                        "render": function (data, type, arr, meta) {
                            return '<a id="viewArrival" class="btn btn-default btn-sm" data-toggle="tooltip" title="View" href="Arrival/Details/' + arr.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editArrival" class="btn btn-default btn-sm" data-toggle="tooltip" title="Edit" href="Arrival/Edit/' + arr.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delArrival" class="btn btn-default btn-sm" data-toggle="tooltip" title="Remove" href="Arrival/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "8%", "targets": 0 },
                    { "className": "dt-center", "width": "8%", "targets": 1 },
                    { "width": "10%", "targets": 2 },
                    { "width": "10%", "targets": 3 },
                    { "width": "13%", "targets": 4 },
                    { "width": "12%", "targets": 5 },
                    { "width": "10%", "targets": 6 },
                    { "width": "8%", "targets": 7 },
                    { "width": "7%", "targets": 8 },
                    { "className": "dt-center", "width": "6%", "targets": 9, "orderable": false },
                    { "width": "8%", "targets": 10, "orderable": false }
                ],
                order: [],
                lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
                iDisplayLength: appSetting.tableDisplayLength,
                scroller: true,
                stateSave: true,
                stateDuration: -1 //force the use of Session Storage
            });

            //dt.on('draw', function () {
            //    global.applyIcheckStyle();
            //});

            $('div.dataTables_filter input').addClass('form-control');
            $('div.dataTables_length select').addClass('form-control');


        },

        refresh: function () {
            dtArrHdr.ajax.reload();
        }
    }

    // initialize the datatables
    arrHdrVM.init();

    if (appSetting.defaultFirstPage == 1) {
        setTimeout(function () {
            if (dtArrHdr.page.info().page != 0) {
                dtArrHdr.page('first').draw('page');
            }
        }, 300);
    }

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Company
    $("#btnCreateArrival").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newArrivalContainer').html(data);
                    $('#newArrivalModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, 
            error: function (xhr, txtStatus, errThrown) {

                var reponseErr = JSON.parse(xhr.responseText);

                toastr.error('Error: ' + reponseErr.message, 'Create Arrival', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
            }
        });
    });

    $("#newArrivalModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#ArrivalNo').focus();
    });
    //clear html data for create new;
    $("#newArrivalModal").on("hidden.bs.modal", function () {
        arrDtlVM.tbdestroy();
        $('#newArrivalContainer').html("");
    });

    ////Upload Purchase Order 
    //$("#btnUpload").on("click", function (event) {

    //    event.preventDefault();

    //    var api = $(this).data("url");

    //    $.get(api, function (data) {

    //        if (data) {
    //            $('#uploadCustContainer').html(data);
    //            $('#uploadCustModal').modal('show');
    //        } else {
    //            global.authenExpire();
    //        }
    //    });

    //});

    //$("#uploadCustModal").on("shown.bs.modal", function () {

    //});
    ////clear html data for create new;
    //$("#uploadCustModal").on("hidden.bs.modal", function () {
    //    $('#uploadCustContainer').html("");
    //});

    //view Machine
    $('#tblArrival').on("click", "#viewArrival", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewArrivalContainer').html(data);
                    $('#viewArrivalModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, 
            error: function (xhr, txtStatus, errThrown) {

                var reponseErr = JSON.parse(xhr.responseText);

                toastr.error('Error: ' + reponseErr.message, 'View Arrival', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
            }
        });
    });

    $("#viewArrivalModal").on("shown.bs.modal", function () {
    });

    //clear html data for edit;
    $("#viewArrivalModal").on("hidden.bs.modal", function () {
        arrDtlVM.tbdestroy();
        $('#viewArrivalContainer').html("");
    });


    //Edit Machine
    $('#tblArrival').on("click", "#editArrival", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editArrivalContainer').html(data);
                    $('#editArrivalModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {

                var reponseErr = JSON.parse(xhr.responseText);

                toastr.error('Error: ' + reponseErr.message, 'Edit Arrival', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
            }
        });
    });

    $("#editArrivalModal").on("shown.bs.modal", function () {
        $('#ProductName').focus();   //.select()
    });

    //clear html data for edit;
    $("#editArrivalModal").on("hidden.bs.modal", function () {
        arrDtlVM.tbdestroy();
        $('#editArrivalContainer').html("");
    });

    //Delete
    $('#tblArrival').on('click', '#delArrival', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var rowSelect = $(this).parents('tr')[0];
        var arrData = (dtArrHdr.row(rowSelect).data());
        var arrId = arrData["Id"];
        var arrNo = arrData["ArrivalNo"];

        $.confirm({
            title: 'Please Confirm!',
            content: 'Are you sure you want to delete this \"' + arrNo + '\"',
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-confirm',
                    keys: ['shift', 'enter'],
                    action: function () {

                        $.ajax({
                            type: 'POST',
                            async: true,
                            url: api,
                            data: addRequestVerificationToken({ id: arrId }),
                            success: function (response) {

                                if (response.success) {

                                    dtArrHdr.row(rowSelect).remove().draw(false);

                                    toastr.success(response.message, 'Delete Arrival', { timeOut: appSetting.toastrSuccessTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
                                }
                                else {
                                    toastr.error(response.message, 'Delete Arrival', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
                                }
                            },
                            error: function (xhr, txtStatus, errThrown) {

                                var reponseErr = JSON.parse(xhr.responseText);

                                toastr.error('Error: ' + reponseErr.message, 'Delete Arrival', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
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