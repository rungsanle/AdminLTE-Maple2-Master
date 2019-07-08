$(function () {

    $("#success-alert").hide();
    //Grid Table Config
    compVM = {
        dt: null,
        init: function () {
            dt = $('#tblComp').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'Company Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'Company Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('comp-get-url'),
                    "type": "GET",
                    "datatype": "json",
                    "async": true
                },
                columns: [
                    { "data": "CompanyCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "CompanyName", "autoWidth": false },
                    { "data": "CompanyLogoPath", "autoWidth": false },
                    { "data": "AddressL1", "autoWidth": false },
                    { "data": "Telephone", "autoWidth": false },
                    { "data": "Fax", "autoWidth": false },
                    { "data": "CompanyTaxId", "autoWidth": false },
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
                        "render": function (data, type, comp, meta) {
                            return '<a id="viewComp" class="btn btn-info btn-sm" data-toggle="tooltip" title="View" href="Company/Details/' + comp.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editComp" class="btn btn-warning btn-sm" data-toggle="tooltip" title="Edit" href="Company/Edit/' + comp.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delComp" class="btn btn-danger btn-sm" data-toggle="tooltip" title="Remove" href="Company/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "13%", "targets": 0 },
                    { "width": "22%", "targets": 1 },
                    { "width": "12%", "targets": 2 },
                    { "width": "13%", "targets": 3 },
                    { "width": "8%", "targets": 4 },
                    { "width": "8%", "targets": 5 },
                    { "width": "8%", "targets": 6 },
                    { "className": "dt-center", "width": "8%", "targets": 7, "orderable": false },
                    { "width": "8%", "targets": 8, "orderable": false }
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
            dt.ajax.reload();
        }
    }

    // initialize the datatables
    compVM.init();

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add Company
    $("#btnCreateComp").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            success: function (data) {
                if (data) {
                    $('#newCompContainer').html(data);
                    $('#newCompModal').modal('show');
                } else {
                    global.authenExpire();
                }

            },
            error: function (xhr) {
                alert('Create Error : ' + xhr);

            }
        });
    });

    $("#newCompModal").on("shown.bs.modal", function () {
        //$('input[type=text]:visible:first').focus();
        $('#CompanyCode').focus();
    });

    //clear html data for create new;
    $("#newCompModal").on("hidden.bs.modal", function () {
        $('#newCompContainer').html("");
    });

    //view Machine
    $('#tblComp').on("click", "#viewComp", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewCompContainer').html(data);
                    $('#viewCompModal').modal('show');
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
    $("#viewCompModal").on("hidden.bs.modal", function () {
        $('#viewCompContainer').html("");
    });

    //Edit Machine
    $('#tblComp').on("click", "#editComp", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editCompContainer').html(data);
                    $('#editCompModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });
    });

    //clear html data for edit;
    $("#editCompModal").on("hidden.bs.modal", function () {
        $('#editCompContainer').html("");
    });



    //Delete
    $('#tblComp').on('click', '#delComp', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var compData = (dt.row(row).data());
        var compId = compData["Id"];
        var compName = compData["CompanyName"];
        var con = confirm("Are you sure you want to delete this " + compName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                async: true,
                data: addRequestVerificationToken({ id: compId }),
                success: function (response) {

                    if (response.success) {

                        compVM.refresh();

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
            //compVM.refresh();
        }
    });
});