$(function () {
    //To solve Synchronous XMLHttpRequest warning
    global.AjaxPrefilter();

    //Get appSetting.json
    var appSetting = global.getAppSettings('AppSettings');

    //$("#message-alert").hide();
    //Grid Table Config
    selMcVM = {
        dtMc: null,
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
                    url: $('#PrintModalData').data('mc-get-url'),      //"/Customer/GetCustomers",
                    type: "GET",
                    async: true,
                    datatype: "json"
                },
                columnDefs: [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    },
                    { "width": "12%", "targets": 1 },
                    { "width": "18%", "targets": 2 },
                    { "width": "0%", "targets": 3, "visible": false },
                    { "width": "14%", "targets": 4 },
                    { "width": "12%", "targets": 5 },
                    { "width": "16%", "targets": 6 },
                    { "className": "dt-center", "width": "5%", "targets": 7, "orderable": false }
                ],
                select: {
                    style: 'multi'
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

    
});