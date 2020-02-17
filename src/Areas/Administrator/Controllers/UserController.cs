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
using Microsoft.Extensions.Caching.Memory;
using Maple2.AdminLTE.Bll;
using Maple2.AdminLTE.Uil.Extensions;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace Maple2.AdminLTE.Uil.Areas.Administrator.Controllers
{
    [Area("Administrator")]
    public class UserController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IMemoryCache _cache;

        public UserController(IHostingEnvironment hostingEnvironment,
                                    IMemoryCache memoryCache)
        {
            _hostingEnvironment = hostingEnvironment;
            _cache = memoryCache;
        }

        // GET: Administrator/User
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetUser()
        {
            try
            {
                if (_cache.TryGetValue("CACHE_ADMINISTRATOR_USER", out List<M_User> c_lstUser))
                {
                    return Json(new { data = c_lstUser });
                }

                MemoryCacheEntryOptions options = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(300),
                    SlidingExpiration = TimeSpan.FromSeconds(60),
                    Priority = CacheItemPriority.NeverRemove
                };

                using (var userBll = new UserBLL())
                {
                    var lstUser = await userBll.GetUser(null);

                    _cache.Set("CACHE_ADMINISTRATOR_USER", lstUser, options);

                    return Json(new { data = lstUser });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // GET: Administrator/User/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {

                if (_cache.TryGetValue("CACHE_ADMINISTRATOR_USER", out List<M_User> c_lstUser))
                {
                    var m_User = c_lstUser.Find(m => m.Id == id);

                    if (m_User == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_User);
                }

                using (var userBll = new UserBLL())
                {
                    var lstUser = await userBll.GetUser(id);
                    var m_User = lstUser.First();

                    if (m_User == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_User);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // GET: Administrator/User/Create
        public async Task<IActionResult> Create()
        {
            ViewBag.CompCode = "ALL*";
            return await Task.Run(() => View());
        }

        // POST: Administrator/User/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("UserCode,UserName,EmpCode,DeptId,Position,CompanyCode,aspnetuser_Id,UserImagePath,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_User m_User)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    m_User.Created_By = 1;

                    ResultObject resultObj;

                    try
                    {
                        using (var userBll = new UserBLL())
                        {
                            resultObj = await userBll.InsertUser(m_User);

                            _cache.Remove("CACHE_ADMINISTRATOR_USER");
                        }

                        return Json(new { success = true, data = (M_User)resultObj.ObjectValue, message = "User Created." });
                    }
                    catch (Exception ex)
                    {
                        return Json(new { success = false, data = m_User, message = ex.Message });
                    }
                }

                var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                return Json(new { success = false, errors = err, data = m_User, message = "Created Faield" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult UploadUserImage(List<IFormFile> files)
        {
            //string fileName = string.Empty;
            try
            {
                string fileName = Request.Form["fileName"];

                var filesPath = $"{this._hostingEnvironment.WebRootPath}\\img\\users\\";

                if (!Directory.Exists(filesPath))
                {
                    Directory.CreateDirectory(filesPath);
                }

                foreach (var file in files)
                {
                    var fullFilePath = Path.Combine(filesPath, fileName);

                    if (file.Length <= 0)
                    {
                        continue;
                    }

                    GlobalFunction.SaveThumbnails(0.5, file.OpenReadStream(), fullFilePath);
                }

                return Json(new { success = true, data = fileName, message = files.Count + " Files Uploaded!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // GET: Administrator/User/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ViewBag.CompCode = "ALL*";

            try
            {

                if (_cache.TryGetValue("CACHE_ADMINISTRATOR_USER", out List<M_User> c_lstUser))
                {
                    var m_User = c_lstUser.Find(m => m.Id == id);

                    if (m_User == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_User);
                }

                using (var userBll = new UserBLL())
                {
                    var lstUser = await userBll.GetUser(id);
                    var m_User = lstUser.First();

                    if (m_User == null)
                    {
                        return NotFound();
                    }

                    return PartialView(m_User);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }

        }

        // POST: Administrator/User/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("UserCode,UserName,EmpCode,DeptId,Position,CompanyCode,aspnetuser_Id,UserImagePath,Id,Is_Active,Created_Date,Created_By,Updated_Date,Updated_By")] M_User m_User)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    m_User.Updated_By = 1;

                    ResultObject resultObj;

                    try
                    {
                        using (var userBll = new UserBLL())
                        {
                            resultObj = await userBll.UpdateUser(m_User);

                            _cache.Remove("CACHE_ADMINISTRATOR_USER");
                        }

                        return Json(new { success = true, data = (M_User)resultObj.ObjectValue, message = "User Update." });
                    }
                    catch (Exception ex)
                    {
                        return Json(new { success = false, data = m_User, message = ex.Message });
                    }
                }

                var err = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                return Json(new { success = false, errors = err, data = m_User, message = "Update Failed" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }

        }

        // POST: Administrator/User/Delete/5
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
                if (_cache.TryGetValue("CACHE_ADMINISTRATOR_USER", out List<M_User> c_lstUser))
                {
                    var m_User = c_lstUser.Find(m => m.Id == id);

                    if (m_User == null)
                    {
                        return NotFound();
                    }

                    m_User.Updated_By = 1;

                    using (var userBll = new UserBLL())
                    {
                        resultObj = await userBll.DeleteUser(m_User);

                        _cache.Remove("CACHE_ADMINISTRATOR_USER");
                    }

                    return Json(new { success = true, data = (M_User)resultObj.ObjectValue, message = "User Deleted." });
                }

                using (var userBll = new UserBLL())
                {
                    var lstUser = await userBll.GetUser(id);
                    var m_User = lstUser.First();

                    if (m_User == null)
                    {
                        return NotFound();
                    }

                    m_User.Updated_By = 1;

                    resultObj = await userBll.DeleteUser(m_User);

                    _cache.Remove("CACHE_ADMINISTRATOR_USER");
                }

                return Json(new { success = true, data = (M_User)resultObj.ObjectValue, message = "User Deleted." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

    }
}
