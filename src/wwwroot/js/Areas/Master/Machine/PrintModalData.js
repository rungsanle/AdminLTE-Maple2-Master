$(function () {
    //To solve Synchronous XMLHttpRequest warning
    global.AjaxPrefilter();

    //Get appSetting.json
    var appSetting = global.getAppSettings('AppSettings');

    //$("#message-alert").hide();
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
                        orderable: false,
                        className: 'select-checkbox',
                        width: "5%",
                        targets: 0
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
                order: [],
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

    // Handle click on "Select all" control
    $('#tblSelMachine-select-all').on('click', function () {
        // Get all rows with search applied
        var rows = dtSelMc.rows({ 'search': 'applied' }).nodes();
        // Check/uncheck checkboxes for all rows in the table
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    });

    $('#tblSelMachine tbody').on('change', 'input[type="checkbox"]', function () {
        // If checkbox is not checked
        if (!this.checked) {
            var el = $('#tblSelMachine-select-all').get(0);
            // If "Select all" control is checked and has 'indeterminate' property
            if (el && el.checked && ('indeterminate' in el)) {
                // Set visual state of "Select all" control
                // as 'indeterminate'
                el.indeterminate = true;
            }
        }
    });

    
});