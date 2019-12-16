$(function () {

    $("#success-alert").hide();
    //Grid Table Config
    custVM = {
        dtCust: null,
        init: function () {
            dtCust = $('#tblCust').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Customer Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Customer Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('cust-get-url'),
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "CustomerCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "CustomerName", "autoWidth": false },
                    { "data": "AddressL1", "autoWidth": false },
                    { "data": "AddressL2", "autoWidth": false },
                    { "data": "CustomerEmail", "autoWidth": false },
                    { "data": "CustomerContact", "autoWidth": false },
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
                        "render": function (data, type, cust, meta) {
                            return '<a id="viewCust" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="Customer/Details/' + cust.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editCust" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="Customer/Edit/' + cust.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delCust" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="Customer/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "12%", "targets": 0 },
                    { "width": "18%", "targets": 1 },
                    { "width": "13%", "targets": 2 },
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
            dtCust.ajax.reload();
        }
    }

    // initialize the datatables
    custVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Company
    $("#btnCreateCust").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#newCustContainer').html(data);
                    $('#newCustModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Create Error : ' + xhr);

            }
        });
    });

    $("#newCustModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#CustomerCode').focus();
    });
    //clear html data for create new;
    $("#newCustModal").on("hidden.bs.modal", function () {
        $('#newCustContainer').html("");
    });

    //Upload Customer
    $("#btnUpload").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.get(api, function (data) {

            if (data) {
                $('#uploadCustContainer').html(data);
                $('#uploadCustModal').modal('show');
            } else {
                global.authenExpire();
            }
        });

    });

    $("#uploadCustModal").on("shown.bs.modal", function () {

    });
    //clear html data for create new;
    $("#uploadCustModal").on("hidden.bs.modal", function () {
        $('#uploadCustContainer').html("");
    });

    //view Machine
    $('#tblCust').on("click", "#viewCust", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewCustContainer').html(data);
                    $('#viewCustModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('View Error : ' + xhr);

            }
        });
    });

    //clear html data for View;
    $("#viewCustModal").on("hidden.bs.modal", function () {
        $('#viewCustContainer').html("");
    });

    //Edit Machine
    $('#tblCust').on("click", "#editCust", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editCustContainer').html(data);
                    $('#editCustModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    $("#editCustModal").on("shown.bs.modal", function () {
        $('#CustomerName').focus();   //.select()
    });

    //clear html data for edit;
    $("#editCustModal").on("hidden.bs.modal", function () {
        $('#editCustContainer').html("");
    });



    //Delete
    $('#tblCust').on('click', '#delCust', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var custData = (dtCust.row(row).data());
        var custId = custData["Id"];
        var custName = custData["CustomerName"];
        var con = confirm("Are you sure you want to delete this " + custName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: custId }),
                success: function (response) {

                    if (response.success) {

                        custVM.refresh();

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