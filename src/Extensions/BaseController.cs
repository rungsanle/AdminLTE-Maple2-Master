using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Maple2.AdminLTE.Bel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Maple2.AdminLTE.Uil.Extensions
{
    public abstract partial class BaseController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public BaseController(SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
        }


        public async Task<int?> GetCurUserIdAsync()
        {
            ClaimsPrincipal currentUser = this.User;
            var appUser = await _signInManager.UserManager.GetUserAsync(currentUser);

            return appUser.UserId;

        }




    }
}