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

namespace Maple2.AdminLTE.Uil.Areas.Master.Controllers
{
    [Area("Master")]
    public class UnitController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IMemoryCache _cache;

        public UnitController(IHostingEnvironment hostingEnvironment,
                              IMemoryCache memoryCache)
        {
            _hostingEnvironment = hostingEnvironment;
            _cache = memoryCache;
        }

        // GET: Master/Unit
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetUnit()
        {
            if (_cache.TryGetValue("CACHE_MASTER_UNIT", out List<M_Unit> c_lstUnit))
            {
                return Json(new { data = c_lstUnit });
            }

            MemoryCacheEntryOptions options = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(300),
                SlidingExpiration = TimeSpan.FromSeconds(60),
                Priority = CacheItemPriority.NeverRemove
            };

            using (var unitBll = new UnitBLL())
            {
                var lstUnit = await unitBll.GetUnit(null);

                _cache.Set("CACHE_MASTER_UNIT", lstUnit, options);

                return Json(new { data = lstUnit });
            }

            //using (var unitBll = new UnitBLL())
            //{
            //    return Json(new { data = await unitBll.GetUnit(null) });
            //}
        }

        // GET: Master/Unit/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            if (_cache.TryGetValue("CACHE_MASTER_UNIT", out List<M_Unit> c_lstUnit))
            {
                var m_Unit = c_lstUnit.Find(u => u.Id == id);

                if (m_Unit == null)
                {
                    return NotFound();
                }

                return PartialView(m_Unit);
            }

            using (var unitBll = new UnitBLL())
            {
                var lstUnit = await unitBll.GetUnit(id);
                var m_Unit = lstUnit.First();

                if (m_Unit == null)
                {
                    return NotFound();
                }

                return PartialView(m_Unit);
            }
            
        }

        // GET: Master/Unit/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Master/Unit/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("UnitCode,UnitName,UnitDesc,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Unit m_Unit)
        {
            if (ModelState.IsValid)
            {
                m_Unit.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var unitBll = new UnitBLL())
                    {
                        resultObj = await unitBll.InsertUnit(m_Unit);

                        _cache.Remove("CACHE_MASTER_UNIT");
                    }

                    return Json(new { success = true, data = (M_Unit)resultObj.ObjectValue, message = "Unit Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Unit, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Unit, message = "Created Faield" });
            
        }

        // GET: Master/Unit/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            if (_cache.TryGetValue("CACHE_MASTER_UNIT", out List<M_Unit> c_lstUnit))
            {
                var m_Unit = c_lstUnit.Find(u => u.Id == id);

                if (m_Unit == null)
                {
                    return NotFound();
                }

                return PartialView(m_Unit);
            }

            ViewBag.CompCode = "ALL*";

            using (var unitBll = new UnitBLL())
            {
                var lstUnit = await unitBll.GetUnit(id);
                var m_Unit = lstUnit.First();

                if (m_Unit == null)
                {
                    return NotFound();
                }

                return PartialView(m_Unit);
            }
        }

        // POST: Master/Unit/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("UnitCode,UnitName,UnitDesc,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Unit m_Unit)
        {
            if (ModelState.IsValid)
            {
                m_Unit.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var unitBll = new UnitBLL())
                    {
                        resultObj = await unitBll.UpdateUnit(m_Unit);

                        _cache.Remove("CACHE_MASTER_UNIT");
                    }

                    return Json(new { success = true, data = (M_Unit)resultObj.ObjectValue, message = "Unit Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Unit, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Unit, message = "Update Failed" });
        }

        // POST: Master/Unit/Delete/5
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
                if (_cache.TryGetValue("CACHE_MASTER_UNIT", out List<M_Unit> c_lstUnit))
                {
                    var m_Unit = c_lstUnit.Find(u => u.Id == id);

                    if (m_Unit == null)
                    {
                        return NotFound();
                    }

                    m_Unit.Updated_By = 1;

                    using (var unitBll = new UnitBLL())
                    {
                        resultObj = await unitBll.DeleteUnit(m_Unit);

                        _cache.Remove("CACHE_MASTER_UNIT");
                    }

                    return Json(new { success = true, data = (M_Unit)resultObj.ObjectValue, message = "Unit Deleted." });
                }

                using (var unitBll = new UnitBLL())
                {
                    var lstUnit = await unitBll.GetUnit(id);
                    var m_Unit = lstUnit.First();

                    if (m_Unit == null)
                    {
                        return NotFound();
                    }

                    m_Unit.Updated_By = 1;

                    resultObj = await unitBll.DeleteUnit(m_Unit);

                    _cache.Remove("CACHE_MASTER_UNIT");
                }

                return Json(new { success = true, data = (M_Unit)resultObj.ObjectValue, message = "Unit Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            
        }
        
    }
}
