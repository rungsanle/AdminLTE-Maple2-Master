﻿using System;
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
    public class RawMaterialTypeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public RawMaterialTypeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/RawMaterialType
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetRawMaterialType()
        {
            //RawMaterial Type DbContext
            using (var rawMatTypeBll = new RawMaterialTypeBLL())
            {
                return Json(new { data = await rawMatTypeBll.GetRawMaterialType(null) });
            }
        }

        // GET: Master/RawMaterialType/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var rawMatTypeBll = new RawMaterialTypeBLL())
            {
                var lstRawMatType = await rawMatTypeBll.GetRawMaterialType(id);
                var m_RawMaterialType = lstRawMatType.First();

                if (m_RawMaterialType == null)
                {
                    return NotFound();
                }

                return PartialView(m_RawMaterialType);
            }
        }

        // GET: Master/RawMaterialType/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/RawMaterialType/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("RawMatTypeCode,RawMatTypeName,RawMatTypeDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_RawMaterialType m_RawMaterialType)
        {
            if (ModelState.IsValid)
            {
                m_RawMaterialType.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var rawMatTypeBll = new RawMaterialTypeBLL())
                    {
                        resultObj = await rawMatTypeBll.InsertRawMaterialType(m_RawMaterialType);
                    }

                    return Json(new { success = true, data = (M_RawMaterialType)resultObj.ObjectValue, message = "Raw Mat. Type Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_RawMaterialType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_RawMaterialType, message = "Created Faield" });
            
        }

        // GET: Master/RawMaterialType/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var rawMatTypeBll = new RawMaterialTypeBLL())
            {
                var lstRawMatType = await rawMatTypeBll.GetRawMaterialType(id);
                var m_RawMaterialType = lstRawMatType.First();

                if (m_RawMaterialType == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_RawMaterialType);
            }
        }

        // POST: Master/RawMaterialType/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("RawMatTypeCode,RawMatTypeName,RawMatTypeDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_RawMaterialType m_RawMaterialType)
        {
            if (ModelState.IsValid)
            {
                m_RawMaterialType.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var rawMatTypeBll = new RawMaterialTypeBLL())
                    {
                        resultObj = await rawMatTypeBll.UpdateRawMaterialType(m_RawMaterialType);
                    }

                    return Json(new { success = true, data = (M_RawMaterialType)resultObj.ObjectValue, message = "Raw Mat. Type Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_RawMaterialType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_RawMaterialType, message = "Update Failed" });
            
        }

        // POST: Master/RawMaterialType/Delete/5
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
                using (var rawMatTypeBll = new RawMaterialTypeBLL())
                {
                    var lstRawMatType = await rawMatTypeBll.GetRawMaterialType(id);
                    var m_RawMaterialType = lstRawMatType.First();

                    if (m_RawMaterialType == null)
                    {
                        return NotFound();
                    }

                    m_RawMaterialType.Updated_By = 1;

                    resultObj = await rawMatTypeBll.DeleteRawMaterialType(m_RawMaterialType);
                }

                return Json(new { success = true, data = (M_RawMaterialType)resultObj.ObjectValue, message = "Raw Mat. Type Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
        
    }
}
