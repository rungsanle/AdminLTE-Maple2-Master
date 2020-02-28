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
        console.log(jsonData);



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

        //console.log(api);

        //window.open(api, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');
      
        //var mapForm = document.createElement("form");
        //mapForm.target = "Map";
        //mapForm.method = "POST"; // or "post" if appropriate
        //mapForm.action = api;

        //var mapInput = document.createElement("input");
        //mapInput.type = "json";
        //mapInput.name = "data";
        //mapInput.value = JSON.stringify(addRequestVerificationToken({ lstSelMc: printMachines }));   //JSON.stringify(addRequestVerificationToken({ lstSelMc: printMachines }));
        //mapForm.appendChild(mapInput);

        //document.body.appendChild(mapForm);

        //map = window.open("", "Map", "status=0,title=0,height=600,width=800,scrollbars=1");

        //if (map) {
        //    mapForm.submit();
        //} else {
        //    alert('You must allow popups for this map to work.');
        //}





        //window.open(api, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');

        //var param = JSON.stringify(printMachines);

        //console.log(JSON.stringify(addRequestVerificationToken({ lstSelMc: printMachines })));

        //OpenWindowWithPost(api,
        //    "width=730,height=345,left=100,top=100,resizable=yes,scrollbars=yes",
        //    "data", JSON.stringify(addRequestVerificationToken({ lstSelMc: printMachines })));

        //alert(api);

        //var wpopup = window.open(api, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');

        //$.ajax({
        //    type: "POST",
        //    url: api,
        //    //contentType: "application/json; charset=UTF-8",
        //    data: { lstSelMc: printMachines }, 
        //    success: function (response) {


        //        //window.open("data:application/pdf," + encodeURI(response.data), 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');

        //        //if (response.success) {
        //        //Here it is:
        //        //Gets the model state

        //        console.log('success!!');

        //        alert('Success!!');
        //        //open new tab or window - according to configs of browser
        //        //window.open('data:application/pdf;base64,' + response, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');


                    

        //            $('#printSelectMachineModal').modal('hide');
        //            $('#printSelectMachineContainer').html("");

        //        //}
        //        //else {

        //        //    if (response.errors != null) {
        //        //        displayValidationErrors(response.errors);
        //        //    } else {
        //        //        toastr.error(response.message, 'Print Machine Label', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
        //        //    }
        //        //}

        //    },
        //    error: function (xhr, txtStatus, errThrown) {

        //        var reponseErr = JSON.parse(xhr.responseText);

        //        toastr.error('Error: ' + reponseErr.message, 'Print Machine Label', { timeOut: appSetting.toastrErrorTimeout, extendedTimeOut: appSetting.toastrExtenTimeout });
        //    }

        //});

        //$.ajax({
        //    url: api,
        //    type: 'POST',
        //    cache: false,
        //    async: true,
        //    dataType: "html",
        //    data: { lstSelMc: printMachines }
        //})
        //    .done(function (result) {

        //        console.log(result);

        //        window.open("data:application/octet-stream;charset=utf-16le;base64," + result, 'PopupWindow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=0,width=850,height=700');

        //}).fail(function (xhr) {
        //    console.log('error : ' + xhr.status + ' - ' + xhr.statusText + ' - ' + xhr.responseText);
        //    });

        

    }

    
    
});