$(function () {

    $("#success-alert").hide();
    //Grid Table Config
    vendVM = {
        dtVend: null,
        init: function () {
            dtVend = $('#tblVend').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Vendor Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Vendor Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('vend-get-url'),
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "VendorCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "VendorName", "autoWidth": false },
                    { "data": "AddressL1", "autoWidth": false },
                    { "data": "AddressL2", "autoWidth": false },
                    { "data": "VendorEmail", "autoWidth": false },
                    { "data": "VendorContact", "autoWidth": false },
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
                        "render": function (data, type, vend, meta) {
                            return '<a id="viewVend" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="Vendor/Details/' + vend.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editVend" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="Vendor/Edit/' + vend.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delVend" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="Vendor/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "13%", "targets": 0 },
                    { "width": "18%", "targets": 1 },
                    { "width": "12%", "targets": 2 },
                    { "width": "12%", "targets": 3 },
                    { "width": "10%", "targets": 4 },
                    { "width": "9%", "targets": 5 },
                    { "width": "8%", "targets": 6 },
                    { "className": "dt-center", "width": "6%", "targets": 7, "orderable": false },
                    { "width": "12%", "targets": 8, "orderable": false }
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
            dtVend.ajax.reload();
        }
    }

    // initialize the datatables
    vendVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add
    $("#btnCreateVend").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newVendContainer').html(data);
                    $('#newVendModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Create Error : ' + xhr);

            }
        });
    });

    $("#newVendModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#VendorCode').focus();
    });
    //clear html data for create new;
    $("#newVendModal").on("hidden.bs.modal", function () {
        $('#newVendContainer').html("");
    });

    //Upload
    $("#btnUpload").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.get(api, function (data) {
            if (data) {
                $('#uploadVendContainer').html(data);
                $('#uploadVendModal').modal('show');
            } else {
                global.authenExpire();
            }
        });
    });

    $("#uploadVendModal").on("shown.bs.modal", function () {

    });
    //clear html data for create new;
    $("#uploadVendModal").on("hidden.bs.modal", function () {
        $('#uploadVendContainer').html("");
    });

    //View
    $('#tblVend').on("click", "#viewVend", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewVendContainer').html(data);
                    $('#viewVendModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('View Error : ' + xhr);

            }
        });

    });

    //clear html data for View;
    $("#viewVendModal").on("hidden.bs.modal", function () {
        $('#viewVendContainer').html("");
    });

    //Edit
    $('#tblVend').on("click", "#editVend", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editVendContainer').html(data);
                    $('#editVendModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    $("#editVendModal").on("shown.bs.modal", function () {
        $('#VendorName').focus();   //.select()
    });

    //clear html data for edit;
    $("#editVendModal").on("hidden.bs.modal", function () {
        $('#editVendContainer').html("");
    });



    //Delete
    $('#tblVend').on('click', '#delVend', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var vendData = (dtVend.row(row).data());
        var vendId = vendData["Id"];
        var vendName = vendData["VendorName"];
        var con = confirm("Are you sure you want to delete this " + vendName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: vendId }),
                success: function (response) {

                    if (response.success) {

                        vendVM.refresh();

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
            //vendVM.refresh();
        }
    });


});