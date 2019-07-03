using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Maple2.AdminLTE.Bel;
using Maple2.AdminLTE.Dal;
using Maple2.AdminLTE.Bll;
using Microsoft.AspNetCore.Hosting;

namespace Maple2.AdminLTE.Uil.Areas.Master.Controllers
{
    [Area("Master")]
    public class DepartmentController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public DepartmentController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/Department
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetDepartment()
        {
            using (var deptBll = new DepartmentBLL())
            {
                return Json(new { data = await deptBll.GetDepartment(null) });
            }
        }

        // GET: Master/Department/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var deptBll = new DepartmentBLL())
            {
                var lstDept = await deptBll.GetDepartment(id);
                var m_Department = lstDept.First();

                if (m_Department == null)
                {
                    return NotFound();
                }

                return PartialView(m_Department);
            }
        }

        // GET: Master/Department/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/Department/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public IActionResult Create([Bind("DeptCode,DeptName,DeptDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Department m_Department)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        m_Department.Created_By = 1;

        //        try
        //        {
        //            using (var deptBll = new DepartmentBLL())
        //            {
        //                var rowaffected = deptBll.InsertDepartment(ref m_Department);
        //            }

        //            return Json(new { success = true, data = m_Department, message = "Department Created." });
        //        }
        //        catch (Exception ex)
        //        {
        //            return Json(new { success = false, data = m_Department, message = ex.Message });
        //        }
        //    }

        //    var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
        //    return Json(new { success = false, errors = err, data = m_Department, message = "Created Faield" });
        //}

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("DeptCode,DeptName,DeptDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Department m_Department)
        {
            if (ModelState.IsValid)
            {
                m_Department.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var deptBll = new DepartmentBLL())
                    {
                        resultObj = await deptBll.InsertDepartment(m_Department);
                    }

                    return Json(new { success = true, data = (M_Department)resultObj.ObjectValue, message = "Department Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Department, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Department, message = "Created Faield" });
        }

        // GET: Master/Department/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var deptBll = new DepartmentBLL())
            {
                var lstDept = await deptBll.GetDepartment(id);

                var m_Department = lstDept.First();

                if (m_Department == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_Department);
            }
        }

        // POST: Master/Department/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public IActionResult Edit([Bind("DeptCode,DeptName,DeptDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Department m_Department)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        m_Department.Updated_By = 1;

        //        try
        //        {
        //            using (var deptBll = new DepartmentBLL())
        //            {
        //                var rowaffected = deptBll.UpdateDepartment(m_Department);
        //            }

        //            return Json(new { success = true, data = m_Department, message = "Department Update." });
        //        }
        //        catch (Exception ex)
        //        {
        //            return Json(new { success = false, data = m_Department, message = ex.Message });
        //        }
        //    }

        //    var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
        //    return Json(new { success = false, errors = err, data = m_Department, message = "Update Failed" });
        //}

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("DeptCode,DeptName,DeptDesc,CompanyCode,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Department m_Department)
        {
            if (ModelState.IsValid)
            {
                m_Department.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var deptBll = new DepartmentBLL())
                    {
                        resultObj = await deptBll.UpdateDepartment(m_Department);
                    }

                    return Json(new { success = true, data = (M_Department)resultObj.ObjectValue, message = "Department Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Department, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Department, message = "Update Failed" });
        }

        //// GET: Master/Department/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var m_Department = await _context.Department
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (m_Department == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(m_Department);
        //}

        // POST: Master/Department/Delete/5
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
                using (var deptBll = new DepartmentBLL())
                {
                    var lstDept = await deptBll.GetDepartment(id);

                    var m_Department = lstDept.First();

                    if (m_Department == null)
                    {
                        return NotFound();
                    }

                    m_Department.Updated_By = 1;

                    resultObj = await deptBll.DeleteDepartment(m_Department);
                }

                return Json(new { success = true, data = (M_Department)resultObj.ObjectValue, message = "Department Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
           
        }

    }
}
