using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Maple2.AdminLTE.Bel;
using Maple2.AdminLTE.Dal;
using Microsoft.AspNetCore.Hosting;
using Maple2.AdminLTE.Bll;
using Microsoft.Extensions.Caching.Memory;
using jsreport.AspNetCore;
using Maple2.AdminLTE.Uil.Areas.Master.Models;
using jsreport.Types;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Maple2.AdminLTE.Uil.Areas.Master.Controllers
{
    [Area("Master")]
    public class MachineController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IMemoryCache _cache;
        public IJsReportMVCService JsReportMVCService { get; }

        public MachineController(IHostingEnvironment hostingEnvironment,
                                 IMemoryCache memoryCache,
                                 IJsReportMVCService jsReportMVCService)
        {
            _hostingEnvironment = hostingEnvironment;
            _cache = memoryCache;
            JsReportMVCService = jsReportMVCService;
        }

        // GET: Master/Machine
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetMachine()
        {
            try
            {
                if (_cache.TryGetValue("CACHE_MASTER_MACHINE", out List<M_Machine> c_lstMac))
                {
                    return Json(new { data = c_lstMac });
                }

                MemoryCacheEntryOptions options = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(300),
                    SlidingExpiration = TimeSpan.FromSeconds(60),
                    Priority = CacheItemPriority.NeverRemove
                };

                using (var mcBll = new MachineBLL())
                {
                    var lstMac = await mcBll.GetMachine(null);

                    _cache.Set("CACHE_MASTER_MACHINE", lstMac, options);

                    return Json(new { data = lstMac });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }

            //using (var mcBll = new MachineBLL())
            //{
            //    return Json(new { data = await mcBll.GetMachine(null) });
            //}
        }

        public async Task<IActionResult> GetMachineByProdType(int? id)
        {
            try
            {
                using (var mcBll = new MachineBLL())
                {
                    return Json(new { data = await mcBll.GetMachineByProdType(id) });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // GET: Master/Machine/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {

                if (_cache.TryGetValue("CACHE_MASTER_MACHINE", out List<M_Machine> c_lstMac))
                {
                    var m_Machine = c_lstMac.Find(m => m.Id == id);

                    if (m_Machine == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_Machine);
                }

                using (var mcBll = new MachineBLL())
                {
                    var lstMc = await mcBll.GetMachine(id);
                    var m_Machine = lstMc.First();

                    if (m_Machine == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_Machine);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // GET: Master/Machine/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/Machine/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("MachineCode,MachineName,MachineProdType,MachineSize,MachineRemark,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Machine m_Machine)
        {
            if (ModelState.IsValid)
            {
                m_Machine.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var mcBll = new MachineBLL())
                    {
                        resultObj = await mcBll.InsertMachine(m_Machine);

                        _cache.Remove("CACHE_MASTER_MACHINE");
                    }

                    return Json(new { success = true, data = (M_Machine)resultObj.ObjectValue, message = "Machine Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Machine, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Machine, message = "Created Faield" });

        }

        // GET: Master/Machine/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ViewBag.CompCode = "ALL*";

            try
            {

                if (_cache.TryGetValue("CACHE_MASTER_MACHINE", out List<M_Machine> c_lstMac))
                {
                    var m_Machine = c_lstMac.Find(m => m.Id == id);

                    if (m_Machine == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_Machine);
                }

                using (var mcBll = new MachineBLL())
                {
                    var lstMc = await mcBll.GetMachine(id);

                    var m_Machine = lstMc.First();

                    if (m_Machine == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_Machine);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }

        }

        // POST: Master/Machine/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("MachineCode,MachineName,MachineProdType,MachineSize,MachineRemark,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Machine m_Machine)
        {
            if (ModelState.IsValid)
            {
                m_Machine.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var mcBll = new MachineBLL())
                    {
                        resultObj = await mcBll.UpdateMachine(m_Machine);

                        _cache.Remove("CACHE_MASTER_MACHINE");
                    }

                    return Json(new { success = true, data = (M_Machine)resultObj.ObjectValue, message = "Machine Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Machine, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Machine, message = "Update Failed" });
            
        }

        // POST: Master/Machine/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ResultObject resultObj;

            try
            {
                if (_cache.TryGetValue("CACHE_MASTER_MACHINE", out List<M_Machine> c_lstMac))
                {
                    var m_Machine = c_lstMac.Find(m => m.Id == id);

                    if (m_Machine == null)
                    {
                        return NotFound();
                    }

                    m_Machine.Updated_By = 1;

                    using (var mcBll = new MachineBLL())
                    {
                        resultObj = await mcBll.DeleteMachine(m_Machine);

                        _cache.Remove("CACHE_MASTER_MACHINE");
                    }

                    return Json(new { success = true, data = (M_Machine)resultObj.ObjectValue, message = "Machine Deleted." });
                }

                using (var mcBll = new MachineBLL())
                {
                    var lstMc = await mcBll.GetMachine(id);

                    var m_Machine = lstMc.First();

                    if (m_Machine == null)
                    {
                        return NotFound();
                    }

                    m_Machine.Updated_By = 1;

                    resultObj = await mcBll.DeleteMachine(m_Machine);

                    _cache.Remove("CACHE_MASTER_MACHINE");
                }

                return Json(new { success = true, data = (M_Machine)resultObj.ObjectValue, message = "Machine Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            
        }

        public async Task<IActionResult> PrintModalData()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => PartialView());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [MiddlewareFilter(typeof(JsReportPipeline))]
        public async Task<IActionResult> PrintMachine(List<M_Machine> lstSelMc)   //List<M_Machine> lstSelMc
        {
            try
            {

                //var lstSelMc = JsonConvert.DeserializeObject<List<M_Machine>>(jlstSelMc);

                //JObject o = JObject.Parse(jlstSelMc);
                //JArray a = (JArray)o["lstSelMc"];


                //List<M_Machine> lstSelMc = a.ToObject<List<M_Machine>>();
                //List<M_Machine> lstSelMc = new List<M_Machine>();
                //lstSelMc.Add(new M_Machine { Id = 1, MachineCode = "V001" });
                

                List<MachineLabelModel> printMcLabel = lstSelMc.ConvertAll(mc => new MachineLabelModel(mc));
                //{
                //                                            Id = mc.Id,
                //                                            MachineCode = mc.MachineCode,
                //                                            MachineName = mc.MachineName,
                //                                            MachineProdType = mc.MachineProdType,
                //                                            MachineProdTypeName = mc.MachineProdTypeName,
                //                                            MachineSize = mc.MachineSize,
                //                                            MachineRemark = mc.MachineRemark,
                //                                            CompanyCode = mc.CompanyCode,
                //                                            Is_Active = mc.Is_Active,
                //                                            Created_By = mc.Created_By,
                //                                            Created_Date = mc.Created_Date,
                //                                            Updated_By = mc.Updated_By,
                //                                            Updated_Date = mc.Updated_Date
                //                                        });

                var header = await JsReportMVCService.RenderViewToStringAsync(HttpContext, RouteData, "HeaderReport", new { });
                var footer = await JsReportMVCService.RenderViewToStringAsync(HttpContext, RouteData, "FooterReport", new { });

                HttpContext.JsReportFeature().Recipe(jsreport.Types.Recipe.ChromePdf)
                    .Configure((r) => r.Template.Chrome = new Chrome
                    {
                        DisplayHeaderFooter = true,
                        HeaderTemplate = header,
                        FooterTemplate = footer,
                        Landscape = true,
                        Format = "A4",
                        MarginTop = "0.5cm",
                        MarginLeft = "0.5cm",
                        MarginBottom = "0.5cm",
                        MarginRight = "0.5cm"
                    });

                return await Task.Run(() => View(printMcLabel));
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

    }
}
