$(function () {

    $("#success-alert").hide();
    //Grid Table Config
    unitVM = {
        dtUnit: null,
        init: function () {
            dtUnit = $('#tblUnit').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Unit Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Unit Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('unit-get-url'),
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "UnitCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "UnitName", "autoWidth": false },
                    { "data": "UnitDesc", "autoWidth": false },
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
                            return '<a id="viewUnit" class="btn btn-default btn-sm" data-toggle="tooltip" title="View" href="Unit/Details/' + wh.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editUnit" class="btn btn-default btn-sm" data-toggle="tooltip" title="Edit" href="Unit/Edit/' + wh.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delUnit" class="btn btn-default btn-sm" data-toggle="tooltip" title="Remove" href="Unit/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "15%", "targets": 0 },
                    { "width": "25%", "targets": 1 },
                    { "width": "44%", "targets": 2 },
                    { "className": "dt-center", "width": "8%", "targets": 3, "orderable": false },
                    { "width": "8%", "targets": 4, "orderable": false }
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
            dtUnit.ajax.reload();
        }
    }

    // initialize the datatables
    unitVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Machine
    $("#btnCreateUnit").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            success: function (data) {
                if (data) {
                    $('#newUnitContainer').html(data);
                    $('#newUnitModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Create Error : ' + xhr);

            }
        });

    });

    $("#newUnitModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#UnitCode').focus();
    });
    //clear html data for create new;
    $("#newUnitModal").on("hidden.bs.modal", function () {
        $('#newUnitContainer').html("");
    });

    //view Machine
    $('#tblUnit').on("click", "#viewUnit", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewUnitContainer').html(data);
                    $('#viewUnitModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('View Error : ' + xhr);

            }
        });

    });

    //clear html data for View;
    $("#viewUnitModal").on("hidden.bs.modal", function () {
        $('#viewUnitContainer').html("");
    });

    //Edit Machine
    $('#tblUnit').on("click", "#editUnit", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editUnitContainer').html(data);
                    $('#editUnitModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    //clear html data for edit;
    $("#editUnitModal").on("hidden.bs.modal", function () {
        $('#editUnitContainer').html("");
    });



    //Delete
    $('#tblUnit').on('click', '#delUnit', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var unitData = (dtUnit.row(row).data());
        var unitId = unitData["Id"];
        var unitName = unitData["UnitName"];
        var con = confirm("Are you sure you want to delete this " + unitName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: unitId }),
                success: function (response) {

                    if (response.success) {

                        unitVM.refresh();

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
            //unitVM.refresh();
        }
    });
});