$(function () {

    $("#success-alert").hide();
    //Grid Table Config
    whVM = {
        dtWh: null,
        init: function () {
            dtWh = $('#tblWH').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Warehouse Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Warehouse Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    url: $('#IndexData').data('wh-get-url'),
                    async: true,
                    type: "GET",
                    datatype: "json"
                },
                columns: [
                    { "data": "WarehouseCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "WarehouseName", "autoWidth": false },
                    { "data": "WarehouseDesc", "autoWidth": false },
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
                        "render": function (data, type, wh, meta) {
                            return '<a id="viewWH" class="btn btn-info btn-sm" data-toggle="tooltip" title="View" href="Warehouse/Details/' + wh.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editWH" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Edit" href="Warehouse/Edit/' + wh.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delWH" class="btn btn-danger btn-sm" data-toggle="tooltip" title="Remove" href="Warehouse/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "15%", "targets": 0 },
                    { "width": "25%", "targets": 1 },
                    { "width": "34%", "targets": 2 },
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
            dtWh.ajax.reload();
        }
    }

    // initialize the datatables
    whVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Machine
    $("#btnCreateWH").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            success: function (data) {
                if (data) {
                    $('#newWHContainer').html(data);
                    $('#newWHModal').modal('show');
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

    $("#newWHModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#WarehouseCode').focus();
    });
    //clear html data for create new;
    $("#newWHModal").on("hidden.bs.modal", function () {
        $('#newWHContainer').html("");
    });

    //view Machine
    $('#tblWH').on("click", "#viewWH", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewWHContainer').html(data);
                    $('#viewWHModal').modal('show');
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
    $("#viewWHModal").on("hidden.bs.modal", function () {
        $('#viewWHContainer').html("");
    });

    //Edit Machine
    $('#tblWH').on("click", "#editWH", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editWHContainer').html(data);
                    $('#editWHModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    //clear html data for edit;
    $("#editWHModal").on("hidden.bs.modal", function () {
        $('#editWHContainer').html("");
    });



    //Delete
    $('#tblWH').on('click', '#delWH', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var whData = (dtWh.row(row).data());
        var whId = whData["Id"];
        var whName = whData["WarehouseName"];
        var con = confirm("Are you sure you want to delete this " + whName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: whId }),
                success: function (response) {

                    if (response.success) {

                        whVM.refresh();

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
            //whVM.refresh();
        }
    });


});