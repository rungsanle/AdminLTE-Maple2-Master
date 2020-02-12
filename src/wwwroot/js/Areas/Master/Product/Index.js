$(function () {
    
    $("#message-alert").hide();
    //Grid Table Config
    productVM = {
        dtProd: null,
        init: function () {
            dtProd = $('#tblProduct').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Product Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Product Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('prod-get-url'),    //"/Customer/GetCustomers",
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "ProductCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "ProductName", "autoWidth": false },
                    { "data": "MaterialTypeId", "autoWidth": false },
                    { "data": "MaterialType", "autoWidth": false },
                    { "data": "ProductionTypeId", "autoWidth": false },
                    { "data": "ProductionType", "autoWidth": false },
                    { "data": "MachineId", "autoWidth": false },
                    { "data": "Machine", "autoWidth": false },
                    { "data": "PackageStdQty", "autoWidth": false, render: $.fn.dataTable.render.number(',', '.', 2, '') },
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
                        "render": function (data, type, prod, meta) {
                            return '<a id="viewProduct" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="Product/Details/' + prod.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editProduct" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="Product/Edit/' + prod.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delProduct" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="Product/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "14%", "targets": 0 },
                    { "width": "20%", "targets": 1 },
                    { "width": "0%", "targets": 2, "visible": false },
                    { "width": "14%", "targets": 3 },
                    { "width": "0%", "targets": 4, "visible": false },
                    { "width": "6%", "targets": 5 },
                    { "width": "0%", "targets": 6, "visible": false },
                    { "width": "8%", "targets": 7 },
                    { "className": "dt-right", "width": "7%", "targets": 8 },
                    { "width": "0%", "targets": 9, "visible": false },
                    { "width": "5%", "targets": 10 },
                    { "width": "8%", "targets": 11 },
                    { "className": "dt-center", "width": "6%", "targets": 12, "orderable": false },
                    { "width": "12%", "targets": 13, "orderable": false }
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
            dtProd.ajax.reload();
        }
    }

    // initialize the datatables
    productVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add
    $("#btnCreateProduct").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newProdContainer').html(data);
                    $('#newProdModal').modal('show');
                } else {
                    global.authenExpire();
                }
            },
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Create Product', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });

    });

    $("#newProdModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#ProductCode').focus();
    });
    //clear html data for create new;
    $("#newProdModal").on("hidden.bs.modal", function () {
        prodProcessVM.tbdestroy();
        $('#newProdContainer').html("");
    });

    //Upload Customer
    $("#btnUpload").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.get(api, function (data) {
            if (data) {
                $('#uploadProdContainer').html(data);
                $('#uploadProdModal').modal('show');
            } else {
                global.authenExpire();
            }
        });

    });

    $("#uploadProdModal").on("shown.bs.modal", function () {

    });
    //clear html data for create new;
    $("#uploadProdModal").on("hidden.bs.modal", function () {
        $('#uploadCustContainer').html("");
    });

    //View
    $('#tblProduct').on("click", "#viewProduct", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewProdContainer').html(data);
                    $('#viewProdModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, 
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'View Product', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });

    });

    //clear html data for View;
    $("#viewProdModal").on("hidden.bs.modal", function () {
        $('#viewProdContainer').html("");
    });

    //Edit
    $('#tblProduct').on("click", "#editProduct", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editProdContainer').html(data);
                    $('#editProdModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, 
            error: function (xhr, txtStatus, errThrown) {
                toastr.error('Error: ' + xhr.statusText, 'Edit Product', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
            }
        });

    });

    $("#editProdModal").on("shown.bs.modal", function () {
        $('#ProductName').focus();   //.select()
    });

    //clear html data for edit;
    $("#editProdModal").on("hidden.bs.modal", function () {
        prodProcessVM.tbdestroy();
        $('#editProdContainer').html("");
    });

    //Delete
    $('#tblProduct').on('click', '#delProduct', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var rowSelect = $(this).parents('tr')[0];
        var productData = (dtProd.row(rowSelect).data());
        var productId = productData["Id"];
        var productName = productData["ProductName"];


        $.confirm({
            title: 'Please Confirm!',
            content: 'Are you sure you want to delete this ' + productName,
            buttons: {
                confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-confirm',
                    keys: ['shift', 'enter'],
                    action: function () {

                        $.ajax({
                            type: 'POST',
                            url: api,
                            data: addRequestVerificationToken({ id: productId }),
                            success: function (response) {

                                if (response.success) {

                                    productVM.refresh();

                                    toastr.success(response.message, 'Delete Product');
                                }
                                else {
                                    toastr.error(response.message, 'Delete Product', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
                                }
                            },
                            error: function (xhr, txtStatus, errThrown) {
                                toastr.error('Error: ' + xhr.statusText, 'Delete Product', { closeButton: true, timeOut: 0, extendedTimeOut: 0 });
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