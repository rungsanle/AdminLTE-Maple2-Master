$(function () {
    //To solve Synchronous XMLHttpRequest warning
    global.AjaxPrefilter();

    //Get appSetting.json
    var appSetting = global.getAppSettings('AppSettings');

    //$("#message-alert").hide();
    // Array holding selected row IDs
    var rows_selected = [];
    //Grid Table Config
    selMcVM = {
        dtSelMc: null,
        init: function () {
            dtSelMc = $('#tblSelMachine').DataTable({
                dom: "<'row'<'col-sm-2'l><'col-sm-5'B><'col-sm-5'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                buttons: [
                    {
                        text: '<i class="fa fa-refresh"></i> Reload',
                        action: function (e, dt, node, config) {
                            dt.ajax.reload(null, false);
                        }
                    }
                ],
                processing: true, // for show progress bar
                autoWidth: false,
                ajax: {
                    url: $('#PrintModalData').data('mc-get-url'),     
                    type: "GET",
                    async: true,
                    datatype: "json"
                },
                columns: [
                    {
                        data: null, className: "text-center", searchable: false, orderable: false, autoWidth: false,
                        render: function (data, type, full, meta) {
                            return '<input type="checkbox" id="check_' + data.id + '" class="check" name="check" value="' + data.id + '">';
                        },
                    },
                    { data: "MachineCode", className: "boldColumn", autoWidth: false },
                    { data: "MachineName", autoWidth: false },
                    { data: "MachineProdType", autoWidth: false },
                    { data: "MachineProdTypeName", autoWidth: false },
                    { data: "MachineSize", autoWidth: false },
                    { data: "MachineRemark", autoWidth: false },
                    { data: "CompanyCode", className: "boldColumn", "autoWidth": false },
                    {
                        "data": "Is_Active",
                        "autoWidth": false,
                        render: function (data, type, row) {
                            if (type === 'display') {
                                //return '<input type="checkbox" disabled="disabled" class="chkIs_Active">';
                                if (data) {
                                    return '<img src="' + $('#PrintModalData').data('image-url') + '/mswitch/isavtive_yes.png" />';
                                } else {
                                    return '<img src="' + $('#PrintModalData').data('image-url') + '/mswitch/isavtive_no.png" />';
                                }
                            }
                            return data;
                        }
                    }
                ],
                columnDefs: [
                    {
                        'targets': 0,
                        'searchable': false,
                        'orderable': false,
                        'width': '5%',
                        'className': 'dt-body-center',
                        'render': function (data, type, full, meta) {
                            return '<input type="checkbox">';
                        }
                    },
                    { width: "15%", targets: 1 },
                    { width: "26%", targets: 2 },
                    { width: "0%", targets: 3, visible: false },
                    { width: "15%", targets: 4 },
                    { width: "14%", targets: 5 },
                    { width: "0%", targets: 6, visible: false },
                    { width: "15%", targets: 7 },
                    { width: "10%", targets: 8, className: "dt-center", orderable: false },
                   
                ],
                select: {
                    style: 'multi',
                    selector: 'td:first-child'
                },
                order: [1, 'asc'],
                rowCallback: function (row, data, dataIndex) {
                    // Get row ID
                    var rowId = data[0];

                    // If row ID is in the list of selected row IDs
                    if ($.inArray(rowId, rows_selected) !== -1) {
                        $(row).find('input[type="checkbox"]').prop('checked', true);
                        $(row).addClass('selected');
                    }
                },
                lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
                iDisplayLength: -1,
                stateSave: true,
                stateDuration: -1 //force the use of Session Storage
            });

            //dt.on('draw', function () {
            //    global.applyIcheckStyle();
            //});

            $('div.dataTables_filter input').addClass('form-control');
            $('div.dataTables_length select').addClass('form-control');


        },

        refresh: function () {
            dtSelMc.ajax.reload();
        }
    }

    // initialize the datatables
    selMcVM.init();

    // Handle click on checkbox
    $('#tblSelMachine tbody').on('click', 'input[type="checkbox"]', function (e) {
        var $row = $(this).closest('tr');

        // Get row data
        var data = dtSelMc.row($row).data();

        alert(data);

        // Get row ID
        var rowId = data[0];

        // Determine whether row ID is in the list of selected row IDs 
        var index = $.inArray(rowId, rows_selected);

        // If checkbox is checked and row ID is not in list of selected row IDs
        if (this.checked && index === -1) {
            rows_selected.push(rowId);

            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
        } else if (!this.checked && index !== -1) {
            rows_selected.splice(index, 1);
        }

        if (this.checked) {
            $row.addClass('selected');
        } else {
            $row.removeClass('selected');
        }

        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(dtSelMc);

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // Handle click on table cells with checkboxes
    $('#tblSelMachine').on('click', 'tbody td, thead th:first-child', function (e) {
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    });

    // Handle click on "Select all" control
    $('thead input[name="select_all"]', dtSelMc.table().container()).on('click', function (e) {

        var rows = dtSelMc.rows({ 'search': 'applied' }).nodes();
        $('input[type="checkbox"]', rows).prop('checked', this.checked);

        //if (this.checked) {
        //    $('#tblSelMachine-select-all tbody input[type="checkbox"]:not(:checked)').trigger('click');
        //} else {
        //    $('#tblSelMachine-select-all tbody input[type="checkbox"]:checked').trigger('click');
        //}

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // Handle table draw event
    dtSelMc.on('draw', function () {
        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(dtSelMc);
    });

    //
    // Updates "Select all" control in a data table
    //
    function updateDataTableSelectAllCtrl(table) {
        var $table = table.table().node();
        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
        var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

        // If none of the checkboxes are checked
        if ($chkbox_checked.length === 0) {
            chkbox_select_all.checked = false;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = false;
            }

            // If all of the checkboxes are checked
        } else if ($chkbox_checked.length === $chkbox_all.length) {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = false;
            }

            // If some of the checkboxes are checked
        } else {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = true;
            }
        }
    }

    //// Handle click on "Select all" control
    //$('#tblSelMachine-select-all').on('click', function () {
    //    // Get all rows with search applied
    //    var rows = dtSelMc.rows({ 'search': 'applied' }).nodes();
    //    // Check/uncheck checkboxes for all rows in the table
    //    $('input[type="checkbox"]', rows).prop('checked', this.checked);
    //});

    //$('#tblSelMachine tbody').on('change', 'input[type="checkbox"]', function () {
    //    // If checkbox is not checked
    //    if (!this.checked) {
    //        var el = $('#tblSelMachine-select-all').get(0);
    //        // If "Select all" control is checked and has 'indeterminate' property
    //        if (el && el.checked && ('indeterminate' in el)) {
    //            // Set visual state of "Select all" control
    //            // as 'indeterminate'
    //            el.indeterminate = true;
    //        }
    //    }
    //});

    //// Handle click on table cells with checkboxes
    //$('#tblSelMachine-select-all').on('click', 'tbody td, thead th:first-child', function (e) {
    //    $(this).parent().find('input[type="checkbox"]').trigger('click');
    //});

    $("#btnPrintSelectMc").on("click", PrintMachineLabel);

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    function PrintMachineLabel(event) {

        event.preventDefault();

        var printMachines = new Array();
        var jsonData = JSON.parse(JSON.stringify($('#tblSelMachine').dataTable().fnGetData()));
        //console.log(jsonData);
        // Iterate over all selected checkboxes
        $.each(rows_selected, function (index, rowId) {
            // Create a hidden element 
            alert(rowId);
        });

        //var rows_selected = dtSelMc.column(0).checkboxes.selected();
        //$.each(rows_selected, function (index, rowId) {
        //    alert(rowId);
        //});

        


        for (var obj in jsonData) {
            if (jsonData.hasOwnProperty(obj)) {

                var printMachine = {};
                printMachine.Id = jsonData[obj]['Id'];
                printMachine.MachineCode = jsonData[obj]['MachineCode'];
                printMachine.MachineName = jsonData[obj]['MachineName'];
                printMachine.MachineProdType = jsonData[obj]['MachineProdType'];
                printMachine.MachineProdTypeName = jsonData[obj]['MachineProdTypeName'];
                printMachine.MachineSize = jsonData[obj]['MachineSize'];
                printMachine.MachineRemark = jsonData[obj]['MachineRemark'];
                printMachine.CompanyCode = jsonData[obj]['CompanyCode'];
                printMachine.Is_Active = jsonData[obj]['Is_Active'];;

                printMachines.push(printMachine);
            }
        }

        var api = $('#PrintModalData').data('mc-print-url'); // + '?lstSelMc=' + JSON.stringify(addRequestVerificationToken({ lstSelMc: printMachines }));

        $.ajax({
            async: true,
            cache: false,
            type: 'POST',
            url: api,
            data: addRequestVerificationToken({ lstSelMc: printMachines }),
            //xhrFields is what did the trick to read the blob to pdf
            xhrFields: {
                responseType: 'blob'
            },
            success: function (response, status, xhr) {

                var blob = new Blob([response], { type: 'application/pdf' });

                var fileURL = URL.createObjectURL(blob);

                window.open(fileURL, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');

                $('#printSelectMachineModal').modal('hide');
                $('#printSelectMachineContainer').html("");
            },
            error: function (xhr, txtStatus, errThrown) {

                var reponseErr = JSON.parse(xhr.responseText);

                toastr.error('Error: ' + reponseErr.message, 'Upload Material Type', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
            }
        });
        
    }

    
    
});