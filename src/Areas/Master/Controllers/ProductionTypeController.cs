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
    public class ProductionTypeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public ProductionTypeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/ProductionType
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetProductionType()
        {
            using (var prodTypeBll = new ProductionTypeBLL())
            {
                return Json(new { data = await prodTypeBll.GetProductionType(null) });
            }
        }

        // GET: Master/ProductionType/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var prodTypeBll = new ProductionTypeBLL())
            {
                var lstProdType = await prodTypeBll.GetProductionType(id);
                var m_ProductionType = lstProdType.First();

                if (m_ProductionType == null)
                {
                    return NotFound();
                }

                return PartialView(m_ProductionType);
            }
        }

        // GET: Master/ProductionType/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/ProductionType/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProdTypeCode,ProdTypeName,ProdTypeDesc,ProdTypeSeq,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_ProductionType m_ProductionType)
        {
            if (ModelState.IsValid)
            {
                m_ProductionType.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var prodTypeBll = new ProductionTypeBLL())
                    {
                        resultObj = await prodTypeBll.InsertProductionType(m_ProductionType);
                    }

                    return Json(new { success = true, data = (M_ProductionType)resultObj.ObjectValue, message = "Production Type Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_ProductionType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_ProductionType, message = "Created Faield" });
            
        }

        // GET: Master/ProductionType/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var prodTypeBll = new ProductionTypeBLL())
            {
                var lstProdType = await prodTypeBll.GetProductionType(id);
                var m_ProductionType = lstProdType.First();

                if (m_ProductionType == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_ProductionType);
            }
        }

        // POST: Master/ProductionType/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("ProdTypeCode,ProdTypeName,ProdTypeDesc,ProdTypeSeq,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_ProductionType m_ProductionType)
        {
            if (ModelState.IsValid)
            {
                m_ProductionType.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var prodTypeBll = new ProductionTypeBLL())
                    {
                        resultObj = await prodTypeBll.UpdateProductionType(m_ProductionType);
                    }

                    return Json(new { success = true, data = (M_ProductionType)resultObj.ObjectValue, message = "Production Type Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_ProductionType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_ProductionType, message = "Update Failed" });
            
        }

        // POST: Master/ProductionType/Delete/5
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
                using (var prodTypeBll = new ProductionTypeBLL())
                {
                    var lstProdType = await prodTypeBll.GetProductionType(id);
                    var m_ProductionType = lstProdType.First();

                    if (m_ProductionType == null)
                    {
                        return NotFound();
                    }

                    m_ProductionType.Updated_By = 1;

                    resultObj = await prodTypeBll.DeleteProductionType(m_ProductionType);
                }

                return Json(new { success = true, data = (M_ProductionType)resultObj.ObjectValue, message = "Production Type Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }

        }
    }
}
