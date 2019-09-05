$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    machineVM = {
        dtMc: null,
        init: function () {
            dtMc = $('#tblMachine').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Machine Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Machine Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('mc-get-url'),      //"/Customer/GetCustomers",
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "MachineCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "MachineName", "autoWidth": false },
                    { "data": "MachineProdType", "autoWidth": false },
                    { "data": "MachineProdTypeName", "autoWidth": false },
                    { "data": "MachineSize", "autoWidth": false },
                    { "data": "MachineRemark", "autoWidth": false },
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
                        "render": function (data, type, mc, meta) {
                            return '<a id="viewMachine" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="Machine/Details/' + mc.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editMachine" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="Machine/Edit/' + mc.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delMachine" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="Machine/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "12%", "targets": 0 },
                    { "width": "18%", "targets": 1 },
                    { "width": "0%", "targets": 2, "visible": false },
                    { "width": "14%", "targets": 3 },
                    { "width": "12%", "targets": 4 },
                    { "width": "16%", "targets": 5 },
                    { "width": "12%", "targets": 6 },
                    { "className": "dt-center", "width": "6%", "targets": 7, "orderable": false },
                    { "width": "10%", "targets": 8, "orderable": false }
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
            dtMc.ajax.reload();
        }
    }

    // initialize the datatables
    machineVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Machine
    $("#btnCreateMachine").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            success: function (data) {
                if (data) {
                    $('#newMachineContainer').html(data);
                    $('#newMachineModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Create Error : ' + xhr);

            }
        });

    });

    $("#newMachineModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#MachineCode').focus();
    });
    //clear html data for create new;
    $("#newMachineModal").on("hidden.bs.modal", function () {
        $('#newMachineContainer').html("");
    });

    //view Machine
    $('#tblMachine').on("click", "#viewMachine", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewMachineContainer').html(data);
                    $('#viewMachineModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('View Error : ' + xhr);

            }
        });

    });

    //clear html data for View;
    $("#viewMachineModal").on("hidden.bs.modal", function () {
        $('#viewMachineContainer').html("");
    });

    //Edit Machine
    $('#tblMachine').on("click", "#editMachine", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editMachineContainer').html(data);
                    $('#editMachineModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });

    });

    //clear html data for edit;
    $("#editMachineModal").on("hidden.bs.modal", function () {
        $('#editMachineContainer').html("");
    });

    //Delete
    $('#tblMachine').on('click', '#delMachine', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var mcData = (dtMc.row(row).data());
        var mcId = mcData["Id"];
        var mcName = mcData["MachineName"];
        var con = confirm("Are you sure you want to delete this " + mcName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: mcId }),
                success: function (response) {

                    if (response.success) {

                        machineVM.refresh();

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
            //machineVM.refresh();
        }
    });


});