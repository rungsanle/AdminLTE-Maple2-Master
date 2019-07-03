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
    public class WarehouseController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public WarehouseController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/Warehouse
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetWarehouse()
        {
            //Warehouse DbContext
            using (var whBll = new WarehouseBLL())
            {
                return Json(new { data = await whBll.GetWarehouse(null) });
            }
        }

        // GET: Master/Warehouse/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var whBll = new WarehouseBLL())
            {
                var lstWh = await whBll.GetWarehouse(id);
                var m_Warehouse = lstWh.First();

                if (m_Warehouse == null)
                {
                    return NotFound();
                }

                return PartialView(m_Warehouse);
            }
        }

        // GET: Master/Warehouse/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/Warehouse/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("WarehouseCode,WarehouseName,WarehouseDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Warehouse m_Warehouse)
        {
            if (ModelState.IsValid)
            {
                m_Warehouse.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var whBll = new WarehouseBLL())
                    {
                        resultObj = await whBll.InsertWarehouse(m_Warehouse);
                    }

                    return Json(new { success = true, data = (M_Warehouse)resultObj.ObjectValue, message = "Warehouse Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Warehouse, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Warehouse, message = "Created Faield" });
            
        }

        // GET: Master/Warehouse/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var whBll = new WarehouseBLL())
            {
                var lstWh = await whBll.GetWarehouse(id);

                var m_Warehouse = lstWh.First();

                if (m_Warehouse == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_Warehouse);
            }
            
        }

        // POST: Master/Warehouse/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("WarehouseCode,WarehouseName,WarehouseDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Warehouse m_Warehouse)
        {
            if (ModelState.IsValid)
            {
                m_Warehouse.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var whBll = new WarehouseBLL())
                    {
                        resultObj = await whBll.UpdateWarehouse(m_Warehouse);
                    }

                    return Json(new { success = true, data = (M_Warehouse)resultObj.ObjectValue, message = "Warehouse Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Warehouse, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Warehouse, message = "Update Failed" });
            
        }

        // POST: Master/Warehouse/Delete/5
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
                using (var whBll = new WarehouseBLL())
                {
                    var lstWh = await whBll.GetWarehouse(id);

                    var m_Warehouse = lstWh.First();

                    if (m_Warehouse == null)
                    {
                        return NotFound();
                    }

                    m_Warehouse.Updated_By = 1;

                    resultObj = await whBll.DeleteWarehouse(m_Warehouse);
                }

                return Json(new { success = true, data = (M_Location)resultObj.ObjectValue, message = "Warehouse Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
        
    }
}
