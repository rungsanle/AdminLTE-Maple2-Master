#pragma checksum "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "66f6079ec22c906b6cde65c84c240636c8ae5e8a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(Maple2.AdminLTE.Uil.Pages.Settings.Pages_Settings_Security), @"mvc.1.0.razor-page", @"/Pages/Settings/Security.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.RazorPageAttribute(@"/Pages/Settings/Security.cshtml", typeof(Maple2.AdminLTE.Uil.Pages.Settings.Pages_Settings_Security), null)]
namespace Maple2.AdminLTE.Uil.Pages.Settings
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"66f6079ec22c906b6cde65c84c240636c8ae5e8a", @"/Pages/Settings/Security.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b83b8604af3dec70e6aa296e940b002dbdec8fc0", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Settings_Security : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "LoginProvider", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", "hidden", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "ProviderKey", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-page-handler", "RemoveLogin", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-page-handler", "LinkLogin", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontal"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-page", "./TwoFactorAuth/RecoveryCodes", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_8 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-page-handler", "Disable2FA", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_9 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-group"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 3 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
  
    ViewData["Title"] = "Security";

#line default
#line hidden
            BeginContext(108, 592, true);
            WriteLiteral(@"
<!-- Content Header (Page header) -->
<section class=""content-header"">
    <h1>
        My Profile
    </h1>
    <ol class=""breadcrumb"">
        <li><a href=""/""><i class=""fa fa-dashboard""></i> Home</a></li>
        <li><a href=""#"">Settings</a></li>
        <li class=""active"">My Profile</li>
    </ol>
</section>


<!-- Main content -->
<section class=""content"">

    <div class=""row"">
        <div class=""col-lg-2"">

        </div>
        <!-- /.col -->

        <div class=""col-lg-8"">

            <h4>External Logins</h4>

            <ul class=""list-group"">
");
            EndContext();
#line 34 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                 foreach (var login in Model.CurrentLogins)
                {

#line default
#line hidden
            BeginContext(780, 199, true);
            WriteLiteral("                    <li class=\"list-group-item\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-4 text-left nowrap\">\r\n                                <span");
            EndContext();
            BeginWriteAttribute("class", " class=\"", 979, "\"", 1041, 4);
            WriteAttributeValue("", 987, "btn", 987, 3, true);
            WriteAttributeValue(" ", 990, "btn-social-icon", 991, 16, true);
            WriteAttributeValue(" ", 1006, "btn-", 1007, 5, true);
#line 39 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
WriteAttributeValue("", 1011, login.LoginProvider.ToLower(), 1011, 30, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(1042, 41, true);
            WriteLiteral(">\r\n                                    <i");
            EndContext();
            BeginWriteAttribute("class", " class=\"", 1083, "\"", 1127, 3);
            WriteAttributeValue("", 1091, "fa", 1091, 2, true);
            WriteAttributeValue(" ", 1093, "fa-", 1094, 4, true);
#line 40 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
WriteAttributeValue("", 1097, login.LoginProvider.ToLower(), 1097, 30, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(1128, 88, true);
            WriteLiteral("></i>\r\n                                </span>\r\n                                <strong>");
            EndContext();
            BeginContext(1217, 25, false);
#line 42 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                                   Write(login.ProviderDisplayName);

#line default
#line hidden
            EndContext();
            BeginContext(1242, 161, true);
            WriteLiteral("</strong> <span class=\"label label-primary\">Connected</span>\r\n                            </div>\r\n                            <div class=\"col-xs-8 text-right\">\r\n");
            EndContext();
#line 45 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                                 if (Model.ShowRemoveButton)
                                {

#line default
#line hidden
            BeginContext(1500, 36, true);
            WriteLiteral("                                    ");
            EndContext();
            BeginContext(1536, 729, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66f6079ec22c906b6cde65c84c240636c8ae5e8a10390", async() => {
                BeginContext(1587, 93, true);
                WriteLiteral("\r\n                                        <div>\r\n                                            ");
                EndContext();
                BeginContext(1680, 75, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "66f6079ec22c906b6cde65c84c240636c8ae5e8a10868", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
#line 49 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => login.LoginProvider);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.Name = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.InputTypeName = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1755, 46, true);
                WriteLiteral("\r\n                                            ");
                EndContext();
                BeginContext(1801, 71, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "66f6079ec22c906b6cde65c84c240636c8ae5e8a12948", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
#line 50 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => login.ProviderKey);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.Name = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.InputTypeName = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1872, 90, true);
                WriteLiteral("\r\n                                            <button type=\"submit\" class=\"btn btn-danger\"");
                EndContext();
                BeginWriteAttribute("title", " title=\"", 1962, "\"", 2026, 7);
                WriteAttributeValue("", 1970, "Remove", 1970, 6, true);
                WriteAttributeValue(" ", 1976, "this", 1977, 5, true);
#line 51 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
WriteAttributeValue(" ", 1981, login.LoginProvider, 1982, 20, false);

#line default
#line hidden
                WriteAttributeValue(" ", 2002, "login", 2003, 6, true);
                WriteAttributeValue(" ", 2008, "from", 2009, 5, true);
                WriteAttributeValue(" ", 2013, "your", 2014, 5, true);
                WriteAttributeValue(" ", 2018, "account", 2019, 8, true);
                EndWriteAttribute();
                BeginContext(2027, 231, true);
                WriteLiteral(">\r\n                                                <i class=\"fa fa-remove\"></i> Disconnect\r\n                                            </button>\r\n                                        </div>\r\n                                    ");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.PageHandler = (string)__tagHelperAttribute_3.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(2265, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 56 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                                }

#line default
#line hidden
            BeginContext(2302, 95, true);
            WriteLiteral("                            </div>\r\n                        </div>\r\n                    </li>\r\n");
            EndContext();
#line 60 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                }

#line default
#line hidden
            BeginContext(2416, 16, true);
            WriteLiteral("                ");
            EndContext();
#line 61 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                 foreach (var provider in Model.OtherLogins)
                {

#line default
#line hidden
            BeginContext(2497, 199, true);
            WriteLiteral("                    <li class=\"list-group-item\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-4 text-left nowrap\">\r\n                                <span");
            EndContext();
            BeginWriteAttribute("class", " class=\"", 2696, "\"", 2759, 4);
            WriteAttributeValue("", 2704, "btn", 2704, 3, true);
            WriteAttributeValue(" ", 2707, "btn-social-icon", 2708, 16, true);
            WriteAttributeValue(" ", 2723, "btn-", 2724, 5, true);
#line 66 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
WriteAttributeValue("", 2728, provider.DisplayName.ToLower(), 2728, 31, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(2760, 41, true);
            WriteLiteral(">\r\n                                    <i");
            EndContext();
            BeginWriteAttribute("class", " class=\"", 2801, "\"", 2846, 3);
            WriteAttributeValue("", 2809, "fa", 2809, 2, true);
            WriteAttributeValue(" ", 2811, "fa-", 2812, 4, true);
#line 67 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
WriteAttributeValue("", 2815, provider.DisplayName.ToLower(), 2815, 31, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(2847, 88, true);
            WriteLiteral("></i>\r\n                                </span>\r\n                                <strong>");
            EndContext();
            BeginContext(2936, 20, false);
#line 69 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                                   Write(provider.DisplayName);

#line default
#line hidden
            EndContext();
            BeginContext(2956, 142, true);
            WriteLiteral("</strong>\r\n                            </div>\r\n                            <div class=\"col-xs-8 text-right\">\r\n                                ");
            EndContext();
            BeginContext(3098, 360, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66f6079ec22c906b6cde65c84c240636c8ae5e8a20631", async() => {
                BeginContext(3171, 99, true);
                WriteLiteral("\r\n                                    <button type=\"submit\" class=\"btn btn-primary\" name=\"provider\"");
                EndContext();
                BeginWriteAttribute("value", " value=\"", 3270, "\"", 3292, 1);
#line 73 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
WriteAttributeValue("", 3278, provider.Name, 3278, 14, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(3293, 158, true);
                WriteLiteral(">\r\n                                        <i class=\"fa fa-plus\"></i> Connect\r\n                                    </button>\r\n                                ");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.PageHandler = (string)__tagHelperAttribute_5.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(3458, 97, true);
            WriteLiteral("\r\n                            </div>\r\n                        </div>\r\n                    </li>\r\n");
            EndContext();
#line 80 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                }

#line default
#line hidden
            BeginContext(3574, 69, true);
            WriteLiteral("            </ul>\r\n\r\n            <h4>Two-factor authentication</h4>\r\n");
            EndContext();
#line 84 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
             if (Model.Is2faEnabled)
            {
                

#line default
#line hidden
#line 86 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                 if (Model.RecoveryCodesLeft == 0)
                {

#line default
#line hidden
            BeginContext(3767, 165, true);
            WriteLiteral("                    <div class=\"alert alert-danger\">\r\n                        <strong>You have no recovery codes left.</strong>\r\n                        <p>You must ");
            EndContext();
            BeginContext(3932, 84, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66f6079ec22c906b6cde65c84c240636c8ae5e8a24351", async() => {
                BeginContext(3976, 36, true);
                WriteLiteral("generate a new set of recovery codes");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Page = (string)__tagHelperAttribute_7.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(4016, 78, true);
            WriteLiteral(" before you can log in with a recovery code.</p>\r\n                    </div>\r\n");
            EndContext();
#line 92 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                }
                else if (Model.RecoveryCodesLeft == 1)
                {

#line default
#line hidden
            BeginContext(4188, 162, true);
            WriteLiteral("                    <div class=\"alert alert-danger\">\r\n                        <strong>You have 1 recovery code left.</strong>\r\n                        <p>You can ");
            EndContext();
            BeginContext(4350, 84, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66f6079ec22c906b6cde65c84c240636c8ae5e8a26322", async() => {
                BeginContext(4394, 36, true);
                WriteLiteral("generate a new set of recovery codes");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Page = (string)__tagHelperAttribute_7.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(4434, 35, true);
            WriteLiteral(".</p>\r\n                    </div>\r\n");
            EndContext();
#line 99 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                }
                else if (Model.RecoveryCodesLeft <= 3)
                {

#line default
#line hidden
            BeginContext(4563, 96, true);
            WriteLiteral("                    <div class=\"alert alert-warning\">\r\n                        <strong>You have ");
            EndContext();
            BeginContext(4660, 23, false);
#line 103 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                                    Write(Model.RecoveryCodesLeft);

#line default
#line hidden
            EndContext();
            BeginContext(4683, 70, true);
            WriteLiteral(" recovery codes left.</strong>\r\n                        <p>You should ");
            EndContext();
            BeginContext(4753, 84, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66f6079ec22c906b6cde65c84c240636c8ae5e8a28621", async() => {
                BeginContext(4797, 36, true);
                WriteLiteral("generate a new set of recovery codes");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Page = (string)__tagHelperAttribute_7.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(4837, 35, true);
            WriteLiteral(".</p>\r\n                    </div>\r\n");
            EndContext();
#line 106 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                }

#line default
#line hidden
#line 106 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                 
            }

#line default
#line hidden
            BeginContext(4906, 126, true);
            WriteLiteral("\r\n            <ul class=\"list-group\">\r\n\r\n                <li class=\"list-group-item\">\r\n                    <div class=\"row\">\r\n");
            EndContext();
#line 113 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                         if (Model.Is2faEnabled)
                        {

#line default
#line hidden
            BeginContext(5109, 326, true);
            WriteLiteral(@"                            <div class=""col-xs-4 text-left nowrap"">
                                Status: <span class=""text-green""><strong>Enabled</strong> <i class=""fa fa-check""></i></span>
                            </div>
                            <div class=""col-xs-8 text-right"">
                                ");
            EndContext();
            BeginContext(5435, 477, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66f6079ec22c906b6cde65c84c240636c8ae5e8a31252", async() => {
                BeginContext(5504, 401, true);
                WriteLiteral(@"
                                    <a href=""./TwoFactorAuth"" class=""btn btn-primary"">
                                        <i class=""fa fa-edit""></i> Edit
                                    </a>

                                    <button class=""btn btn-danger"" type=""submit"" title=""Disable two-factor authentication""><i class=""fa fa-remove""></i></button>
                                ");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.PageHandler = (string)__tagHelperAttribute_8.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_8);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_9);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(5912, 38, true);
            WriteLiteral("\r\n                            </div>\r\n");
            EndContext();
#line 127 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                        }
                        else
                        {

#line default
#line hidden
            BeginContext(6034, 544, true);
            WriteLiteral(@"                            <div class=""col-xs-4 text-left nowrap"">
                                Status: <span class=""text-red""><strong>Off</strong> <i class=""fa fa-remove""></i></span>
                            </div>
                            <div class=""col-xs-8 text-right"">
                                <a href=""./TwoFactorAuth"" class=""btn btn-primary"">
                                    <i class=""fa fa-lock""></i> Set up two-factor authentication
                                </a>
                            </div>
");
            EndContext();
#line 138 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                        }

#line default
#line hidden
            BeginContext(6605, 51, true);
            WriteLiteral("                    </div>\r\n                </li>\r\n");
            EndContext();
#line 141 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                 if (Model.Is2faEnabled)
                {

#line default
#line hidden
            BeginContext(6717, 260, true);
            WriteLiteral(@"                    <li class=""list-group-item"">
                        Save your <a href=""./TwoFactorAuth/RecoveryCodes"">recovery codes</a> in a safe place. They will allow you to access your account if you ever lose your phone.
                    </li>
");
            EndContext();
#line 146 "D:\Learning\Repositories\AdminLTE-Maple2-Master\src\Pages\Settings\Security.cshtml"
                }

#line default
#line hidden
            BeginContext(6996, 203, true);
            WriteLiteral("            </ul>\r\n\r\n        </div>\r\n        <!-- /.col -->\r\n\r\n        <div class=\"col-lg-2\">\r\n\r\n        </div>\r\n        <!-- /.col -->\r\n    </div>\r\n    <!-- /.row -->\r\n\r\n</section>\r\n<!-- /.content -->\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Maple2.AdminLTE.Uil.Pages.Settings.SecurityModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Maple2.AdminLTE.Uil.Pages.Settings.SecurityModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Maple2.AdminLTE.Uil.Pages.Settings.SecurityModel>)PageContext?.ViewData;
        public Maple2.AdminLTE.Uil.Pages.Settings.SecurityModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
