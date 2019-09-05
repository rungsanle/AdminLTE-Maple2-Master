$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    rawmatTypeVM = {
        dtRawMatType: null,
        init: function () {
            dtRawMatType = $('#tblRawMatType').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Raw Material Type Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Raw Material Type Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('rawmattype-get-url'),    //"/Customer/GetCustomers",
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "RawMatTypeCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "RawMatTypeName", "autoWidth": false },
                    { "data": "RawMatTypeDesc", "autoWidth": false },
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
                        "render": function (data, type, rawmatType, meta) {
                            return '<a id="viewRawMatType" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="RawMaterialType/Details/' + rawmatType.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editRawMatType" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="RawMaterialType/Edit/' + rawmatType.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delRawMatType" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="RawMaterialType/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "12%", "targets": 0 },
                    { "width": "22%", "targets": 1 },
                    { "width": "28%", "targets": 2 },
                    { "width": "10%", "targets": 3 },
                    { "className": "dt-center", "width": "8%", "targets": 4, "orderable": false },
                    { "width": "10%", "targets": 5, "orderable": false }
                ],
                order: [],
                lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
                iDisplayLength: 10
            });

            $('div.dataTables_filter input').addClass('form-control');
            $('div.dataTables_length select').addClass('form-control');


        },

        refresh: function () {
            dtRawMatType.ajax.reload();
        }
    }

    // initialize the datatables
    rawmatTypeVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Machine
    $("#btnCreateRawMatType").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newRawMatTypeContainer').html(data);
                    $('#newRawMatTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Create Error : ' + xhr);

            }
        });
    });

    $("#newRawMatTypeModal").on("shown.bs.modal", function () {
        $('#RawMatTypeCode').focus();
    });
    //clear html data for create new;
    $("#newRawMatTypeModal").on("hidden.bs.modal", function () {
        $('#newRawMatTypeContainer').html("");
    });

    //view Machine
    $('#tblRawMatType').on("click", "#viewRawMatType", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewRawMatTypeContainer').html(data);
                    $('#viewRawMatTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('View Error : ' + xhr);

            }
        });

        //$.get(url, function (data) {

        //    $('#viewMenuContainer').html(data);
        //    $('#viewMenuModal').modal('show');
        //});

    });

    //clear html data for View;
    $("#viewRawMatTypeModal").on("hidden.bs.modal", function () {
        $('#viewRawMatTypeContainer').html("");
    });

    //Edit Machine
    $('#tblRawMatType').on("click", "#editRawMatType", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editRawMatTypeContainer').html(data);
                    $('#editRawMatTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    //clear html data for edit;
    $("#editRawMatTypeModal").on("hidden.bs.modal", function () {
        $('#editRawMatTypeContainer').html("");
    });

    //Delete
    $('#tblRawMatType').on('click', '#delRawMatType', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var rawmatTypeData = (dtRawMatType.row(row).data());
        var rawmatTypeId = rawmatTypeData["Id"];
        var rawmatTypeName = rawmatTypeData["RawMatTypeName"];
        var con = confirm("Are you sure you want to delete this " + rawmatTypeName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: rawmatTypeId }),
                success: function (response) {

                    if (response.success) {

                        rawmatTypeVM.refresh();

                        global.successAlert(response.message);
                    }
                    else {
                        global.dangerAlert(response.message, 5000);
                    }
                },
                error: function (xhr) {
                    global.dangerAlert("error", 5000);

                }
            });
        }
        else {
            //rawmatTypeVM.refresh();
        }
    });


});