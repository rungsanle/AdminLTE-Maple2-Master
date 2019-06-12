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
    public class MenuController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public MenuController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: Master/Menu
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetMenu()
        {
            using (var menuBll = new MenuBLL())
            {
                return Json(new { data = await menuBll.GetMenu(null) });
            }
        }

        public async Task<IActionResult> GetParrentMenu()
        {
            using (var menuBll = new MenuBLL())
            {
                var lstMenu = await menuBll.GetMenu(null);

                var parrentList = lstMenu
                                  .OrderBy(pm => pm.Id)
                                  .Where(pm => pm.isParent == true)
                                  .Select(pm => new M_Menu
                                  {
                                      Id = pm.Id,
                                      nameOption = pm.nameOption
                                  }).ToList();

                parrentList.Insert(0, new M_Menu { Id = 0, nameOption = "Home" });

                return Json(new { data = parrentList });
            }
        }

        // GET: Master/Menu/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var menuBll = new MenuBLL())
            {
                var lstMenu = await menuBll.GetMenu(id);
                var m_Menu = lstMenu.First();

                if (m_Menu == null)
                {
                    return NotFound();
                }

                return PartialView(m_Menu);
            }
        }

        // GET: Master/Menu/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Master/Menu/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("nameOption,controller,action,imageClass,status,isParent,parentId,area,menuseq,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Menu m_Menu)
        {
            if (ModelState.IsValid)
            {
                m_Menu.Created_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var menuBll = new MenuBLL())
                    {
                        resultObj = await menuBll.InsertMenu(m_Menu);
                    }

                    return Json(new { success = true, data = (M_Menu)resultObj.ObjectValue, message = "Menu Created." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Menu, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Menu, message = "Created Faield" });
        }

        // GET: Master/Menu/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            using (var menuBll = new MenuBLL())
            {
                var lstMenu = await menuBll.GetMenu(id);

                var m_Menu = lstMenu.First();

                if (m_Menu == null)
                {
                    return NotFound();
                }

                ViewBag.CompCode = "ALL*";

                return PartialView(m_Menu);
            }
        }

        // POST: Master/Menu/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("nameOption,controller,action,imageClass,status,isParent,parentId,area,menuseq,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_Menu m_Menu)
        {
            if (ModelState.IsValid)
            {
                m_Menu.Updated_By = 1;

                ResultObject resultObj;

                try
                {
                    using (var menuBll = new MenuBLL())
                    {
                        resultObj = await menuBll.UpdateMenu(m_Menu);
                    }

                    return Json(new { success = true, data = (M_Menu)resultObj.ObjectValue, message = "Menu Update." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, data = m_Menu, message = ex.Message });
                }
            }

            var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
            return Json(new { success = false, errors = err, data = m_Menu, message = "Update Failed" });
        }
        
        // POST: Master/Menu/Delete/5
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
                using (var menuBll = new MenuBLL())
                {
                    var lstMenu = await menuBll.GetMenu(id);

                    var m_Menu = lstMenu.First();

                    if (m_Menu == null)
                    {
                        return NotFound();
                    }

                    m_Menu.Updated_By = 1;

                    resultObj = await menuBll.DeleteMenu(m_Menu);
                }

                return Json(new { success = true, data = (M_Menu)resultObj.ObjectValue, message = "Menu Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
            
        }

    }
}
