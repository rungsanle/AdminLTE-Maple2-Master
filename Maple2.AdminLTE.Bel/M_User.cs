using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_user")]
    public class M_User :  Base_Related_Field
    {

        [Display(Name = "USER CODE")]
        [Required(ErrorMessage = "UserCode|USER CODE IS REQUIRED!!")]
        [MaxLength(30)]
        public string UserCode { get; set; }

        [Display(Name = "USER NAME")]
        [Required(ErrorMessage = "UserName|USER NAME IS REQUIRED!!")]
        public string UserName { get; set; }

        [Display(Name = "EMPLOYEE CODE")]
        public string EmpCode { get; set; }

        [Display(Name = "DEPARTMENT ID")]
        public int? DeptId { get; set; }

        [NotMapped]
        [Display(Name = "DEPARTMENT")]
        public string DeptName { get; set; }

        [Display(Name = "POSITION")]
        public string Position { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }

        [Display(Name = "LOGIN USER ID")]
        [MaxLength(255)]
        public string aspnetuser_Id { get; set; }

        [Display(Name = "USER IMAGE")]
        public string UserImagePath { get; set; }

        [NotMapped]
        [Display(Name = "COMPANY LOGO")]
        public string CompanyLogoPath { get; set; }
    }
}
