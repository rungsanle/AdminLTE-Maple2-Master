using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_department")]
    public class M_Department : Base_Related_Field
    {
        [Display(Name = "DEPT. CODE")]
        [Required(ErrorMessage = "DeptCode|DEPT. CODE IS REQUIRED!!")]
        [MaxLength(30)]
        public string DeptCode { get; set; }

        [Display(Name = "DEPT. NAME")]
        [Required(ErrorMessage = "DeptName|DEPT. NAME IS REQUIRED!!")]
        public string DeptName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string DeptDesc { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }
    }
}
