#pragma checksum "D:\Learning\Active Programming\AdminLTE-Maple2-Master\src\Pages\Calendar.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bf795cc80ca508444551ab3f1879fe5ce2538f17"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(Maple2.AdminLTE.Uil.Pages.Pages_Calendar), @"mvc.1.0.razor-page", @"/Pages/Calendar.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.RazorPageAttribute(@"/Pages/Calendar.cshtml", typeof(Maple2.AdminLTE.Uil.Pages.Pages_Calendar), null)]
namespace Maple2.AdminLTE.Uil.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "D:\Learning\Active Programming\AdminLTE-Maple2-Master\src\Pages\_ViewImports.cshtml"
using Microsoft.AspNetCore.Identity;

#line default
#line hidden
#line 2 "D:\Learning\Active Programming\AdminLTE-Maple2-Master\src\Pages\_ViewImports.cshtml"
using Maple2.AdminLTE.Uil;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bf795cc80ca508444551ab3f1879fe5ce2538f17", @"/Pages/Calendar.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"53f0106785151316f4b253740706ad0e41a5734c", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Calendar : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/bower_components/fullcalendar/dist/fullcalendar.min.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/bower_components/fullcalendar/dist/fullcalendar.print.min.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("media", new global::Microsoft.AspNetCore.Html.HtmlString("print"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/bower_components/jquery-ui/jquery-ui.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/bower_components/moment/moment.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/bower_components/fullcalendar/dist/fullcalendar.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 3 "D:\Learning\Active Programming\AdminLTE-Maple2-Master\src\Pages\Calendar.cshtml"
  
    ViewData["Title"] = "Calendar";

#line default
#line hidden
            BeginContext(68, 1, true);
            WriteLiteral("\n");
            EndContext();
            DefineSection("Styles", async() => {
                BeginContext(86, 31, true);
                WriteLiteral("\n    <!-- fullCalendar -->\n    ");
                EndContext();
                BeginContext(117, 88, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "bf795cc80ca508444551ab3f1879fe5ce2538f176270", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(205, 5, true);
                WriteLiteral("\n    ");
                EndContext();
                BeginContext(210, 108, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "bf795cc80ca508444551ab3f1879fe5ce2538f177602", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(318, 1, true);
                WriteLiteral("\n");
                EndContext();
            }
            );
            BeginContext(321, 1, true);
            WriteLiteral("\n");
            EndContext();
            DefineSection("Scripts", async() => {
                BeginContext(340, 35, true);
                WriteLiteral("\n    <!-- jQuery UI 1.11.4 -->\n    ");
                EndContext();
                BeginContext(375, 69, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bf795cc80ca508444551ab3f1879fe5ce2538f179348", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(444, 31, true);
                WriteLiteral("\n    <!-- fullCalendar -->\n    ");
                EndContext();
                BeginContext(475, 59, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bf795cc80ca508444551ab3f1879fe5ce2538f1710627", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(534, 5, true);
                WriteLiteral("\n    ");
                EndContext();
                BeginContext(539, 80, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bf795cc80ca508444551ab3f1879fe5ce2538f1711879", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(619, 6887, true);
                WriteLiteral(@"

    <!-- Page specific script -->
    <script>
        $(function () {

            /* initialize the external events
             -----------------------------------------------------------------*/
            function init_events(ele) {
                ele.each(function () {

                    // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                    // it doesn't need to have a start or end
                    var eventObject = {
                        title: $.trim($(this).text()) // use the element's text as the event title
                    }

                    // store the Event Object in the DOM element so we can get to it later
                    $(this).data('eventObject', eventObject)

                    // make the event draggable using jQuery UI
                    $(this).draggable({
                        zIndex: 1070,
                        revert: true, // will cause the event to go back to its
                        revertDurat");
                WriteLiteral(@"ion: 0  //  original position after the drag
                    })

                })
            }

            init_events($('#external-events div.external-event'))

            /* initialize the calendar
             -----------------------------------------------------------------*/
            //Date for the calendar events (dummy data)
            var date = new Date()
            var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear()
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                buttonText: {
                    today: 'today',
                    month: 'month',
                    week: 'week',
                    day: 'day'
                },
                //Random default events
                events: [
                    {
                        title: 'A");
                WriteLiteral(@"ll Day Event',
                        start: new Date(y, m, 1),
                        backgroundColor: '#f56954', //red
                        borderColor: '#f56954' //red
                    },
                    {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2),
                        backgroundColor: '#f39c12', //yellow
                        borderColor: '#f39c12' //yellow
                    },
                    {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                        backgroundColor: '#0073b7', //Blue
                        borderColor: '#0073b7' //Blue
                    },
                    {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false,
  ");
                WriteLiteral(@"                      backgroundColor: '#00c0ef', //Info (aqua)
                        borderColor: '#00c0ef' //Info (aqua)
                    },
                    {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        allDay: false,
                        backgroundColor: '#00a65a', //Success (green)
                        borderColor: '#00a65a' //Success (green)
                    },
                    {
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: 'http://google.com/',
                        backgroundColor: '#3c8dbc', //Primary (light-blue)
                        borderColor: '#3c8dbc' //Primary (light-blue)
                    }
                ],
                editable: true,
                droppable: true, // this allo");
                WriteLiteral(@"ws things to be dropped onto the calendar !!!
                drop: function (date, allDay) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject')

                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject)

                    // assign it the date that was reported
                    copiedEventObject.start = date
                    copiedEventObject.allDay = allDay
                    copiedEventObject.backgroundColor = $(this).css('background-color')
                    copiedEventObject.borderColor = $(this).css('border-color')

                    // render the event on the calendar
                    // the last `true` argument determines if the event ""sticks"" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
 ");
                WriteLiteral(@"                   $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)

                    // is the ""remove after drop"" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the ""Draggable Events"" list
                        $(this).remove()
                    }

                }
            })

            /* ADDING EVENTS */
            var currColor = '#3c8dbc' //Red by default
            //Color chooser button
            var colorChooser = $('#color-chooser-btn')
            $('#color-chooser > li > a').click(function (e) {
                e.preventDefault()
                //Save color
                currColor = $(this).css('color')
                //Add color effect to button
                $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
            })
            $('#add-new-event').click(function (e) {
                e.preventDefault()
                //Get ");
                WriteLiteral(@"value and make sure it is not null
                var val = $('#new-event').val()
                if (val.length == 0) {
                    return
                }

                //Create events
                var event = $('<div />')
                event.css({
                    'background-color': currColor,
                    'border-color': currColor,
                    'color': '#fff'
                }).addClass('external-event')
                event.html(val)
                $('#external-events').prepend(event)

                //Add draggable funtionality
                init_events(event)

                //Remove event from text input
                $('#new-event').val('')
            })
        })
    </script>
");
                EndContext();
            }
            );
            BeginContext(7508, 4467, true);
            WriteLiteral(@"
<!-- Content Header (Page header) -->
<section class=""content-header"">
    <h1>
        Calendar
        <small>Control panel</small>
    </h1>
    <ol class=""breadcrumb"">
        <li><a href=""#""><i class=""fa fa-dashboard""></i> Home</a></li>
        <li class=""active"">Calendar</li>
    </ol>
</section>

<!-- Main content -->
<section class=""content"">
    <div class=""row"">
        <div class=""col-md-3"">
            <div class=""box box-solid"">
                <div class=""box-header with-border"">
                    <h4 class=""box-title"">Draggable Events</h4>
                </div>
                <div class=""box-body"">
                    <!-- the events -->
                    <div id=""external-events"">
                        <div class=""external-event bg-green"">Lunch</div>
                        <div class=""external-event bg-yellow"">Go home</div>
                        <div class=""external-event bg-aqua"">Do homework</div>
                        <div class=""external-event bg-light-blue"">Work on UI design<");
            WriteLiteral(@"/div>
                        <div class=""external-event bg-red"">Sleep tight</div>
                        <div class=""checkbox"">
                            <label for=""drop-remove"">
                                <input type=""checkbox"" id=""drop-remove"">
                                remove after drop
                            </label>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /. box -->
            <div class=""box box-solid"">
                <div class=""box-header with-border"">
                    <h3 class=""box-title"">Create Event</h3>
                </div>
                <div class=""box-body"">
                    <div class=""btn-group"" style=""width: 100%; margin-bottom: 10px;"">
                        <!--<button type=""button"" id=""color-chooser-btn"" class=""btn btn-info btn-block dropdown-toggle"" data-toggle=""dropdown"">Color <span class=""caret""></span></button>-->
                        <u");
            WriteLiteral(@"l class=""fc-color-picker"" id=""color-chooser"">
                            <li><a class=""text-aqua"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-blue"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-light-blue"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-teal"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-yellow"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-orange"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-green"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-lime"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-red"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-purple"" href=""#""><i c");
            WriteLiteral(@"lass=""fa fa-square""></i></a></li>
                            <li><a class=""text-fuchsia"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-muted"" href=""#""><i class=""fa fa-square""></i></a></li>
                            <li><a class=""text-navy"" href=""#""><i class=""fa fa-square""></i></a></li>
                        </ul>
                    </div>
                    <!-- /btn-group -->
                    <div class=""input-group"">
                        <input id=""new-event"" type=""text"" class=""form-control"" placeholder=""Event Title"">

                        <div class=""input-group-btn"">
                            <button id=""add-new-event"" type=""button"" class=""btn btn-primary btn-flat"">Add</button>
                        </div>
                        <!-- /btn-group -->
                    </div>
                    <!-- /input-group -->
                </div>
            </div>
        </div>
        <!-- /.col -->
        <div class=""col-md-9"">
            ");
            WriteLiteral(@"<div class=""box box-primary"">
                <div class=""box-body no-padding"">
                    <!-- THE CALENDAR -->
                    <div id=""calendar""></div>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /. box -->
        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->
</section>
<!-- /.content -->");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<CalendarModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<CalendarModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<CalendarModel>)PageContext?.ViewData;
        public CalendarModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
