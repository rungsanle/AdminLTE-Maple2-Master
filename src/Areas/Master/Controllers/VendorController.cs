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
using Microsoft.AspNetCore.Http;
using System.IO;
using Maple2.AdminLTE.Uil.Extensions;

namespace Maple2.AdminLTE.Uil.Areas.Master.Controllers
{
    [Area("Master")]
    [RequestFormLimits(ValueCountLimit = int.MaxValue)]
    public class VendorController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public VendorController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/Vendor
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        // GET: Master/Vendor
        public async Task<IActionResult> GetVendor()
        {
            using (var vendBll = new VendorBLL())
            {
                return Json(new { data = await vendBll.GetVendor(null) });
            }
        }

        // GET: Master/Vendor/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var vendBll = new VendorBLL())
            {
                var lstVend = await vendBll.GetVendor(id);
                var m_Vendor = lstVend.First();

                if (m_Vendor == null)
                {
                    return NotFound();
                }

                return PartialView(m_Vendor);
            }
        }

        // GET: Master/Vendor/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/Vendor/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("VendorCode,VendorName,AddressL1,AddressL2,AddressL3,AddressL4,Telephone,Fax,VendorEmail,VendorContact,CreditTerm,PriceLevel,VendorTaxId,Remark,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Vendor m_Vendor)
        {
            if (ModelState.IsValid)
            {
                m_Vendor.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var vendBll = new VendorBLL())
                    {
                        resultObj = await vendBll.InsertVendor(m_Vendor);
                    }

                    return Json(new { success = true, data = (M_Vendor)resultObj.ObjectValue, message = "Vendor Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Vendor, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Vendor, message = "Created Faield" });
            
        }

        // GET: Master/Vendor/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var vendBll = new VendorBLL())
            {
                var lstVend = await vendBll.GetVendor(id);
                var m_Vendor = lstVend.First();

                if (m_Vendor == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_Vendor);
            }
        }

        // POST: Master/Vendor/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("VendorCode,VendorName,AddressL1,AddressL2,AddressL3,AddressL4,Telephone,Fax,VendorEmail,VendorContact,CreditTerm,PriceLevel,VendorTaxId,Remark,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Vendor m_Vendor)
        {
            if (ModelState.IsValid)
            {
                m_Vendor.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var vendBll = new VendorBLL())
                    {
                        resultObj = await vendBll.UpdateVendor(m_Vendor);
                    }

                    return Json(new { success = true, data = (M_Vendor)resultObj.ObjectValue, message = "Vendor Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Vendor, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Vendor, message = "Update Failed" });
            
        }

        // POST: Master/Vendor/Delete/5
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
                using (var vendBll = new VendorBLL())
                {
                    var lstVend = await vendBll.GetVendor(id);
                    var m_Vendor = lstVend.First();

                    if (m_Vendor == null)
                    {
                        return NotFound();
                    }

                    m_Vendor.Updated_By = 1;

                    resultObj = await vendBll.DeleteVendor(m_Vendor);
                }

                return Json(new { success = true, data = (M_Vendor)resultObj.ObjectValue, message = "Vendor Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        public async Task<IActionResult> UploadData()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => PartialView());
        }

        [HttpPost]
        public async Task<IActionResult> UploadFiles(List<IFormFile> files)
        {
            string jsonData = string.Empty;
            string filePath = string.Empty;
            string path = $"{this._hostingEnvironment.WebRootPath}\\uploads\\Vendors\\";

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
        public async Task<IActionResult> UploadModelData(List<M_Vendor> lstVend)
        {

            lstVend.ForEach(m =>
            {
                m.Created_By = 1;
            });

            try
            {
                using (var vendBll = new VendorBLL())
                {
                    var rowaffected = await vendBll.BulkInsertVendor(lstVend);
                }

                return Json(new { success = true, data = lstVend, message = "Import Success." });
            }
            catch (Exception ex)
            {
                return Json(new { success = true, data = lstVend, message = ex.Message });
            }
        }
    }
}
