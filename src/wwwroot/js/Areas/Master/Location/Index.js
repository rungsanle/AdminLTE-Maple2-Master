$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    locationVM = {
        dtLoc: null,
        init: function () {
            dtLoc = $('#tblLocation').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Production Type Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Production Type Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    url: $('#IndexData').data('loc-get-url'),    //"/Customer/GetCustomers",
                    async: true,
                    type: "GET",
                    datatype: "json"
                },
                columns: [
                    { "data": "LocationCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "LocationName", "autoWidth": false },
                    { "data": "LocationDesc", "autoWidth": false },
                    { "data": "WarehouseId", "autoWidth": false },
                    { "data": "WarehouseName", "autoWidth": false },
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
                        "render": function (data, type, location, meta) {
                            return '<a id="viewLocation" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="Location/Details/' + location.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editLocation" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="Location/Edit/' + location.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delLocation" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="Location/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "12%", "targets": 0 },
                    { "width": "20%", "targets": 1 },
                    { "width": "22%", "targets": 2 },
                    { "width": "0%", "targets": 3, "visible": false },
                    { "width": "12%", "targets": 4 },
                    { "width": "14%", "targets": 5 },
                    { "className": "dt-center", "width": "8%", "targets": 6, "orderable": false },
                    { "width": "12%", "targets": 7, "orderable": false }
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
            dtLoc.ajax.reload();
        }
    }

    // initialize the datatables
    locationVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Machine
    $("#btnCreateLocation").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            success: function (data) {
                if (data) {
                    $('#newLocationContainer').html(data);
                    $('#newLocationModal').modal('show');
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

    $("#newLocationModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#LocationCode').focus();
    });
    //clear html data for create new;
    $("#newLocationModal").on("hidden.bs.modal", function () {
        $('#newLocationContainer').html("");
    });

    //view Machine
    $('#tblLocation').on("click", "#viewLocation", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewLocationContainer').html(data);
                    $('#viewLocationModal').modal('show');
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
    $("#viewLocationModal").on("hidden.bs.modal", function () {
        $('#viewLocationContainer').html("");
    });

    //Edit Machine
    $('#tblLocation').on("click", "#editLocation", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editLocationContainer').html(data);
                    $('#editLocationModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    //clear html data for edit;
    $("#editLocationModal").on("hidden.bs.modal", function () {
        $('#editLocationContainer').html("");
    });

    //Delete
    $('#tblLocation').on('click', '#delLocation', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var locationData = (dtLoc.row(row).data());
        var locationId = locationData["Id"];
        var locationName = locationData["LocationName"];
        var con = confirm("Are you sure you want to delete this " + locationName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: locationId }),
                success: function (response) {

                    if (response.success) {

                        locationVM.refresh();

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