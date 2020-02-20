using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maple2.AdminLTE.Bel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.EntityFrameworkCore;

namespace Maple2.AdminLTE.Uil.Areas.Administrator.Controllers
{
    [Area("Administrator")]
    [RequestFormLimits(ValueCountLimit = int.MaxValue)]
    public class AppUserController : Controller
    {

        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IMemoryCache _cache;

        public AppUserController(IHostingEnvironment hostingEnvironment,
                                 UserManager<ApplicationUser> userManager,
                                 RoleManager<ApplicationRole> roleManager,
                                 IMemoryCache memoryCache)
        {
            _hostingEnvironment = hostingEnvironment;
            _userManager = userManager;
            _roleManager = roleManager;
            _cache = memoryCache;
        }

        // GET: Administrator/AppUser
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        public async Task<IActionResult> GetApplicationUser()
        {
            try
            {

                if (_cache.TryGetValue("CACHE_ADMINISTRATOR_APPUSER", out List<ApplicationUser> c_lstAppUser))
                {
                    return Json(new { data = c_lstAppUser });
                }

                MemoryCacheEntryOptions options = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(300),
                    SlidingExpiration = TimeSpan.FromSeconds(60),
                    Priority = CacheItemPriority.NeverRemove
                };


                var lstAppUser = await _userManager.Users.ToListAsync();

                _cache.Set("CACHE_ADMINISTRATOR_APPUSER", lstAppUser, options);


                return Json(new { data = lstAppUser });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}