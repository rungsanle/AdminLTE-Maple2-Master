using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_materialtype")]
    public class M_MaterialType : Base_Related_Field
    {

        [Required(ErrorMessage = "MatTypeCode|MAT. TYPE CODE IS REQUIRED!!")]
        [Display(Name = "MAT. TYPE CODE")]
        [MaxLength(30)]
        public string MatTypeCode { get; set; }

        [Required(ErrorMessage = "MatTypeName|MAT. TYPE NAME IS REQUIRED!!")]
        [Display(Name = "MAT. TYPE NAME")]
        public string MatTypeName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string MatTypeDesc { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }
    }
}
