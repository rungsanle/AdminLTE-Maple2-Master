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
using System.IO;
using Microsoft.AspNetCore.Http;
using Maple2.AdminLTE.Uil.Extensions;

namespace Maple2.AdminLTE.Uil.Areas.Master.Controllers
{
    [Area("Master")]
    [RequestFormLimits(ValueCountLimit = int.MaxValue)]
    public class MaterialTypeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public MaterialTypeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/MaterialType
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetMaterialType()
        {
            using (var matTypeBll = new MaterialTypeBLL())
            {
                return Json(new { data = await matTypeBll.GetMaterialType(null) });
            }
        }

        // GET: Master/MaterialType/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var matTypeBll = new MaterialTypeBLL())
            {
                var lstMatType = await matTypeBll.GetMaterialType(id);
                var m_MaterialType = lstMatType.First();

                if (m_MaterialType == null)
                {
                    return NotFound();
                }

                return PartialView(m_MaterialType);
            }
            
        }

        // GET: Master/MaterialType/Create
        public IActionResult Create()
        {
            ViewBag.CompCode = "ALL*";
            return View();
        }

        // POST: Master/MaterialType/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("MatTypeCode,MatTypeName,MatTypeDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_MaterialType m_MaterialType)
        {
            if (ModelState.IsValid)
            {
                m_MaterialType.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var matTypeBll = new MaterialTypeBLL())
                    {
                        resultObj = await matTypeBll.InsertMaterialType(m_MaterialType);
                    }

                    return Json(new { success = true, data = (M_MaterialType)resultObj.ObjectValue, message = "Material Type Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_MaterialType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_MaterialType, message = "Created Faield" });
            
        }

        // GET: Master/MaterialType/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var matTypeBll = new MaterialTypeBLL())
            {
                var lstMatType = await matTypeBll.GetMaterialType(id);

                var m_MaterialType = lstMatType.First();

                if (m_MaterialType == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_MaterialType);
            }
            
        }

        // POST: Master/MaterialType/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("MatTypeCode,MatTypeName,MatTypeDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_MaterialType m_MaterialType)
        {
            if (ModelState.IsValid)
            {
                m_MaterialType.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var matTypeBll = new MaterialTypeBLL())
                    {
                        resultObj = await matTypeBll.UpdateMaterialType(m_MaterialType);
                    }

                    return Json(new { success = true, data = (M_MaterialType)resultObj.ObjectValue, message = "Material Type Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_MaterialType, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_MaterialType, message = "Update Failed" });
            
        }

        // POST: Master/MaterialType/Delete/5
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
                using (var matTypeBll = new MaterialTypeBLL())
                {
                    var lstMatType = await matTypeBll.GetMaterialType(id);

                    var m_MaterialType = lstMatType.First();

                    if (m_MaterialType == null)
                    {
                        return NotFound();
                    }

                    m_MaterialType.Updated_By = 1;

                    resultObj = await matTypeBll.DeleteMaterialType(m_MaterialType);
                }

                return Json(new { success = true, data = (M_MaterialType)resultObj.ObjectValue, message = "Material Type Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        public ActionResult UploadData()
        {
            ViewBag.CompCode = 1;
            return PartialView();
        }

        [HttpPost]
        public async Task<IActionResult> UploadFiles(List<IFormFile> files)
        {
            string jsonData = string.Empty;
            string filePath = string.Empty;
            string path = $"{this._hostingEnvironment.WebRootPath}\\uploads\\MaterialType\\";

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            foreach (var file in files)
            {
                filePath = Path.Combine(path, file.FileName);

                if (file.Length <= 0)
                {
                    continue;
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }


                jsonData = GlobalFunction.ConvertCsvFileToJsonObject(filePath);
            }

            return Json(new { success = true, data = jsonData, message = files.Count + "Files Uploaded!" });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UploadModelData(List<M_MaterialType> lstMatType)
        {

            lstMatType.ForEach(m =>
            {
                m.Created_By = 1;
            });

            try
            {
                using (var matTypeBll = new MaterialTypeBLL())
                {
                    var rowaffected = await matTypeBll.BulkInsertMaterialType(lstMatType);
                }

                return Json(new { success = true, data = lstMatType, message = "Import Success." });
            }
            catch (Exception ex)
            {
                return Json(new { success = true, data = lstMatType, message = ex.Message });
            }
        }
    }
}
