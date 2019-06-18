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

namespace Maple2.AdminLTE.Uil.Areas.Master.Controllers
{
    [Area("Master")]
    public class MachineController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public MachineController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/Machine
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetMachine()
        {
            using (var mcBll = new MachineBLL())
            {
                return Json(new { data = await mcBll.GetMachine(null) });
            }
        }

        public async Task<IActionResult> GetMachineByProdType(int? id)
        {
            using (var mcBll = new MachineBLL())
            {
                return Json(new { data = await mcBll.GetMachineByProdType(id) });
            }
        }

        // GET: Master/Machine/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
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

        // GET: Master/Machine/Create
        public IActionResult Create()
        {
            ViewBag.CompCode = "ALL*";
            return View();
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

            using (var mcBll = new MachineBLL())
            {
                var lstMc = await mcBll.GetMachine(id);

                var m_Machine = lstMc.First();

                if (m_Machine == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_Machine);
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
                }

                return Json(new { success = true, data = (M_Machine)resultObj.ObjectValue, message = "Machine Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            
        }

    }
}
