$(function () {

    $("#message-alert").hide();
    //Grid Table Config
    userVM = {
        dtUser: null,
        init: function () {
            dtUser = $('#tblUser').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        title: 'User Master',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'csvHtml5',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        title: 'User Master',
                        titleAttr: 'CSV'
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    "url": $('#IndexData').data('user-get-url'),
                    "type": "GET",
                    "datatype": "json"
                },
                columns: [
                    { "data": "UserCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "UserName", "autoWidth": false },
                    { "data": "EmpCode", "autoWidth": false },
                    { "data": "DeptId", "autoWidth": false },
                    { "data": "DeptName", "autoWidth": false },
                    { "data": "Position", "autoWidth": false },
                    { "data": "CompanyCode", "className": "boldColumn", "autoWidth": false },
                    { "data": "aspnetuser_Id", "autoWidth": false },
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
                        "render": function (data, type, user, meta) {
                            return '<a id="viewUser" class="btn btn-view btn-sm" data-toggle="tooltip" title="View" href="User/Details/' + user.Id + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="editUser" class="btn btn-edit btn-sm" data-toggle="tooltip" title="Edit" href="User/Edit/' + user.Id + '"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>&nbsp;' +
                                '<a id="delUser" class="btn btn-delete btn-sm" data-toggle="tooltip" title="Remove" href="User/Delete/"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';
                        }
                    }
                ],
                columnDefs: [
                    { "width": "8%", "targets": 0 },
                    { "width": "15%", "targets": 1 },
                    { "width": "10%", "targets": 2 },
                    { "width": "0%", "targets": 3, "visible": false },
                    { "width": "10%", "targets": 4 },
                    { "width": "13%", "targets": 5 },
                    { "width": "10%", "targets": 6 },
                    { "width": "20%", "targets": 7 },
                    { "className": "dt-center", "width": "6%", "targets": 8, "orderable": false },
                    { "width": "8%", "targets": 9, "orderable": false }
                ],
                order: [],
                lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
                iDisplayLength: 10
            });

            //dt.on('draw', function () {
            //    global.applyIcheckStyle();
            //});

            $('div.dataTables_filter input').addClass('form-control input-sm');
            $('div.dataTables_length select').addClass('form-control input-sm');

        },

        refresh: function () {
            dtUser.ajax.reload();
        }
    }

    // initialize the datatables
    userVM.init();


    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    //Add User
    $("#btnCreateUser").on("click", function (event) {
        

        event.preventDefault();

        var api = $(this).data("url");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {

                if (data) {
                    $('#newUserContainer').html(data);
                    $('#newUserModal').modal('show');
                } else {
                    global.authenExpire();
                }

            }, error: function (xhr) {
                alert('Create Error : ' + xhr);
            }
        });

    });

    //Register New User
    $("#btnRegisterUser").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        document.location = api;

    });

    //Viewer
    $("#btnViewer").on("click", function (event) {

        event.preventDefault();

        var api = $(this).data("url");

        //document.location = api;
        //window.open(api, "PopupWindow", 'width=100%,height=100%,top=0,left=0');
        window.open(api, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=700,height=850');

    });

    $("#newUserModal").on("shown.bs.modal", function () {
        $('#UserCode').focus();
    });
    //clear html data for create new;
    $("#newUserModal").on("hidden.bs.modal", function () {
        $('#newUserContainer').html("");
    });

    //view User
    $('#tblUser').on("click", "#viewUser", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#viewUserContainer').html(data);
                    $('#viewUserModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('View Error : ' + xhr);

            }
        });

    });

    //clear html data for View;
    $("#viewUserModal").on("hidden.bs.modal", function () {
        $('#viewUserContainer').html("");
    });

    //Edit User
    $('#tblUser').on("click", "#editUser", function (event) {

        event.preventDefault();

        var api = $(this).attr("href");

        $.ajax({
            type: "GET",
            url: api,
            async: true,
            success: function (data) {
                if (data) {
                    $('#editUserContainer').html(data);
                    $('#editUserModal').modal('show');
                } else {
                    global.authenExpire();
                }
            }, error: function (xhr) {
                alert('Edit Error : ' + xhr);

            }
        });

    });

    //clear html data for edit;
    $("#editUserModal").on("hidden.bs.modal", function () {
        $('#editUserContainer').html("");
    });

    //Delete
    $('#tblUser').on('click', '#delUser', function (event) {

        event.preventDefault();

        var api = $(this).attr("href");
        var row = $(this).parents('tr')[0];
        var userData = (dtUser.row(row).data());
        var userId = userData["Id"];
        var userName = userData["UserName"];
        var con = confirm("Are you sure you want to delete this " + userName)
        if (con) {

            $.ajax({
                type: 'POST',
                url: api,
                data: addRequestVerificationToken({ id: userId }),
                success: function (response) {

                    if (response.success) {

                        userVM.refresh();

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
            //userVM.refresh();
        }
    });
});