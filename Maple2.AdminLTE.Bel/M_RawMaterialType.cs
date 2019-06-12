using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_rawmaterialtype")]
    public class M_RawMaterialType : Base_Related_Field
    {
        [Required(ErrorMessage = "RawMatTypeCode|RAW MAT. TYPE CODE IS REQUIRED!!")]
        [Display(Name = "RAW MAT. TYPE CODE")]
        [MaxLength(30)]
        public string RawMatTypeCode { get; set; }

        [Required(ErrorMessage = "RawMatTypeName|RAW MAT. TYPE NAME IS REQUIRED!!")]
        [Display(Name = "RAW MAT. TYPE NAME")]
        public string RawMatTypeName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string RawMatTypeDesc { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }

    }
}
