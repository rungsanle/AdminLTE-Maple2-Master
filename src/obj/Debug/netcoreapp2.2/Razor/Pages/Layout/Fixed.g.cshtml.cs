#pragma checksum "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Layout\Fixed.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "60b7eb3bd6a4b441bbfc8ddf986f68a9d56c3552"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(Maple2.AdminLTE.Uil.Pages.Layout.Pages_Layout_Fixed), @"mvc.1.0.razor-page", @"/Pages/Layout/Fixed.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.RazorPageAttribute(@"/Pages/Layout/Fixed.cshtml", typeof(Maple2.AdminLTE.Uil.Pages.Layout.Pages_Layout_Fixed), null)]
namespace Maple2.AdminLTE.Uil.Pages.Layout
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\_ViewImports.cshtml"
using Microsoft.AspNetCore.Identity;

#line default
#line hidden
#line 2 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\_ViewImports.cshtml"
using Maple2.AdminLTE.Uil;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"60b7eb3bd6a4b441bbfc8ddf986f68a9d56c3552", @"/Pages/Layout/Fixed.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b83b8604af3dec70e6aa296e940b002dbdec8fc0", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Layout_Fixed : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 3 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Layout\Fixed.cshtml"
  
    ViewData["Title"] = "Fixed";
    Layout = "~/Views/Shared/_LayoutFixed.cshtml";

#line default
#line hidden
            BeginContext(152, 1715, true);
            WriteLiteral(@"
<!-- Content Wrapper. Contains page content -->

<!-- Content Header (Page header) -->
<section class=""content-header"">
    <h1>
        Fixed Layout
        <small>Blank example to the fixed layout</small>
    </h1>
    <ol class=""breadcrumb"">
        <li><a href=""#""><i class=""fa fa-dashboard""></i> Home</a></li>
        <li><a href=""#"">Layout</a></li>
        <li class=""active"">Fixed</li>
    </ol>
</section>
<!-- Main content -->
<section class=""content"">
    <div class=""callout callout-info"">
        <h4>Tip!</h4>
        <p>
            Add the fixed class to the body tag to get this layout. The fixed layout is your best option if your sidebar
            is bigger than your content because it prevents extra unwanted scrolling.
        </p>
    </div>
    <!-- Default box -->
    <div class=""box"">
        <div class=""box-header with-border"">
            <h3 class=""box-title"">Title</h3>
            <div class=""box-tools pull-right"">
                <button type=""button"" class=");
            WriteLiteral(@"""btn btn-box-tool"" data-widget=""collapse"" data-toggle=""tooltip"" title=""Collapse"">
                    <i class=""fa fa-minus""></i>
                </button>
                <button type=""button"" class=""btn btn-box-tool"" data-widget=""remove"" data-toggle=""tooltip"" title=""Remove"">
                    <i class=""fa fa-times""></i>
                </button>
            </div>
        </div>
        <div class=""box-body"">
            Start creating your amazing application!
        </div>
        <!-- /.box-body -->
        <div class=""box-footer"">
            Footer
        </div>
        <!-- /.box-footer-->
    </div>
    <!-- /.box -->
</section>
<!-- /.content -->

");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Maple2.AdminLTE.Uil.Pages.Layout.FixedModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Maple2.AdminLTE.Uil.Pages.Layout.FixedModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Maple2.AdminLTE.Uil.Pages.Layout.FixedModel>)PageContext?.ViewData;
        public Maple2.AdminLTE.Uil.Pages.Layout.FixedModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
