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
    public class ArrivalTypeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public ArrivalTypeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/ArrivalType
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetArrivalType()
        {
            using (var arrTypeBll = new ArrivalTypeBLL())
            {
                return Json(new { data = await arrTypeBll.GetArrivalType(null) });
            }
        }

        // GET: Master/ArrivalType/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var arrTypeBll = new ArrivalTypeBLL())
            {
                var lstArrType = await arrTypeBll.GetArrivalType(id);
                var m_ArrivalType = lstArrType.First();

                if (m_ArrivalType == null)
                {
                    return NotFound();
                }

                return PartialView(m_ArrivalType);
            }
        }

        // GET: Master/ArrivalType/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/ArrivalType/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ArrivalTypeCode,ArrivalTypeName,ArrivalTypeDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_ArrivalType m_ArrivalType)
        {
            if (ModelState.IsValid)
            {
                m_ArrivalType.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var arrTypeBll = new ArrivalTypeBLL())
                    {
                        resultObj = await arrTypeBll.InsertArrivalType(m_ArrivalType);
                    }

                    return Json(new { success = true, data = (M_ArrivalType)resultObj.ObjectValue, message = "Arrival Type Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_ArrivalType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_ArrivalType, message = "Created Faield" });
        }

        // GET: Master/ArrivalType/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var arrTypeBll = new ArrivalTypeBLL())
            {
                var lstArrType = await arrTypeBll.GetArrivalType(id);

                var m_ArrivalType = lstArrType.First();

                if (m_ArrivalType == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_ArrivalType);
            }
            
        }

        // POST: Master/ArrivalType/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("ArrivalTypeCode,ArrivalTypeName,ArrivalTypeDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_ArrivalType m_ArrivalType)
        {
            if (ModelState.IsValid)
            {
                m_ArrivalType.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var arrTypeBll = new ArrivalTypeBLL())
                    {
                        resultObj = await arrTypeBll.UpdateArrivalType(m_ArrivalType);
                    }

                    return Json(new { success = true, data = (M_ArrivalType)resultObj.ObjectValue, message = "Arrival Type Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_ArrivalType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_ArrivalType, message = "Update Failed" });

        }
        
        // POST: Master/ArrivalType/Delete/5
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
                using (var arrTypeBll = new ArrivalTypeBLL())
                {
                    var lstArrType = await arrTypeBll.GetArrivalType(id);

                    var m_ArrivalType = lstArrType.First();

                    if (m_ArrivalType == null)
                    {
                        return NotFound();
                    }

                    m_ArrivalType.Updated_By = 1;

                    resultObj = await arrTypeBll.DeleteArrivalType(m_ArrivalType);
                }

                return Json(new { success = true, data = (M_ArrivalType)resultObj.ObjectValue, message = "Arrival Type Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            
        }
    }
}
