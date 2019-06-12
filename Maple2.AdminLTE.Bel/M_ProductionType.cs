using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_productiontype")]
    public class M_ProductionType : Base_Related_Field
    {
        [Required(ErrorMessage = "ProdTypeCode|PROD. TYPE CODE IS REQUIRED!!")]
        [Display(Name = "PROD. TYPE CODE")]
        [MaxLength(30)]
        public string ProdTypeCode { get; set; }

        [Required(ErrorMessage = "ProdTypeName|PROD. TYPE NAME IS REQUIRED!!")]
        [Display(Name = "PROD. TYPE NAME")]
        public string ProdTypeName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string ProdTypeDesc { get; set; }

        [Display(Name = "SEQ")]
        public int? ProdTypeSeq { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }

    }
}
