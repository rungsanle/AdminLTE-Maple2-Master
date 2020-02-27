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

    $("#btnPrintSelectMc").on("click", PrintMachineLabel);

    function addRequestVerificationToken(data) {
        data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
        return data;
    };

    function PrintMachineLabel(event) {

        event.preventDefault();

        var printMachines = new Array();
        var jsonData = JSON.parse(JSON.stringify($('#tblSelMachine').dataTable().fnGetData()));

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

        var api = $('#PrintModalData').data('mc-print-url');  // + '?data=' + JSON.stringify(addRequestVerificationToken({ lstSelMc: printMachines }));

        //alert(api);

        var wpopup = window.open(api, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');

        $.ajax({
            async: true,
            type: "POST",
            url: api,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: addRequestVerificationToken({ lstSelMc: printMachines }), 
            success: function (response) {

                if (wpopup) {
                    wpopup.focus();
                }
                //var w = window.open(null, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');
                //window.open("data:application/pdf," + escape(response));
                //window.open("data:application/pdf," + response, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');
                //window.open("data:application/pdf," + response, 'PopupWindow', "width=800,height=600,location=no,menubar=no,status=no,titilebar=no,resizable=no")
                //window.open("data:application/pdf," + response, '_blank');



                //if (response.success) {

                //    $('#printSelectMachineModal').modal('hide');
                //    $('#printSelectMachineContainer').html("");

                //}
                //else {

                //    if (response.errors != null) {
                //        displayValidationErrors(response.errors);
                //    } else {
                //        toastr.error(response.message, 'Print Machine Label', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
                //    }
                //}

            },
            error: function (xhr, txtStatus, errThrown) {

                var reponseErr = JSON.parse(xhr.responseText);

                toastr.error('Error: ' + reponseErr.message, 'Print Machine Label', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
            }

        });

    }

    
});