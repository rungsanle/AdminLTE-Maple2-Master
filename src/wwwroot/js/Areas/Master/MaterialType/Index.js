﻿$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    matTypeVM = {
        dtMatType: null,
        init: function () {
            dtMatType = $('#tblMatType').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Material Type Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Material Type Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('mattype-get-url'),    //"/Customer/GetCustomers",
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "MatTypeCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "MatTypeName", "autoWidth": false },
                    { "data": "MatTypeDesc", "autoWidth": false },
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
                        "render": function (data, type, matType, meta) {
                            return '<a id="viewMatType" class="btn btn-default btn-sm" data-toggle="tooltip" title="View" href="MaterialType/Details/' + matType.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editMatType" class="btn btn-default btn-sm" data-toggle="tooltip" title="Edit" href="MaterialType/Edit/' + matType.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delMatType" class="btn btn-default btn-sm" data-toggle="tooltip" title="Remove" href="MaterialType/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "12%", "targets": 0 },
                    { "width": "24%", "targets": 1 },
                    { "width": "28%", "targets": 2 },
                    { "width": "10%", "targets": 3 },
                    { "className": "dt-center", "width": "8%", "targets": 4, "orderable": false },
                    { "width": "8%", "targets": 5, "orderable": false }
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
            dtMatType.ajax.reload();
        }
    }

    // initialize the datatables
    matTypeVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add
    $("#btnCreateMatType").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newMatTypeContainer').html(data);
                    $('#newMatTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Create Error : ' + xhr);

            }
        });

        //$.get(api, function (data) {
        //    $('#newMenuContainer').html(data);

        //    $('#newMenuModal').modal('show');
        //});

    });

    $("#newMatTypeModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#MatTypeCode').focus();
    });
    //clear html data for create new;
    $("#newMatTypeModal").on("hidden.bs.modal", function () {
        $('#newMatTypeContainer').html("");
    });

    //Upload
    $("#btnUpload").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.get(api, function (data) {
            if (data) {
                $('#uploadMatTypeContainer').html(data);
                $('#uploadMatTypeModal').modal('show');
            } else {
                global.authenExpire();
            }
             
        });
    });

    $("#uploadMatTypeModal").on("shown.bs.modal", function () {

    });
    //clear html data for create new;
    $("#uploadMatTypeModal").on("hidden.bs.modal", function () {
        $('#uploadMatTypeContainer').html("");
    });

    //View
    $('#tblMatType').on("click", "#viewMatType", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewMatTypeContainer').html(data);
                    $('#viewMatTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('View Error : ' + xhr);

            }
        });

    });

    //clear html data for View;
    $("#viewMatTypeModal").on("hidden.bs.modal", function () {
        $('#viewMatTypeContainer').html("");
    });

    //Edit
    $('#tblMatType').on("click", "#editMatType", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editMatTypeContainer').html(data);
                    $('#editMatTypeModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    //clear html data for edit;
    $("#editMatTypeModal").on("hidden.bs.modal", function () {
        $('#editMatTypeContainer').html("");
    });

    //Delete
    $('#tblMatType').on('click', '#delMatType', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var matTypeData = (dtMatType.row(row).data());
        var matTypeId = matTypeData["Id"];
        var matTypeName = matTypeData["MatTypeName"];
        var con = confirm("Are you sure you want to delete this " + matTypeName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: matTypeId }),
                success: function (response) {

                    if (response.success) {

                        matTypeVM.refresh();

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
            //deptVM.refresh();
        }
    });


});