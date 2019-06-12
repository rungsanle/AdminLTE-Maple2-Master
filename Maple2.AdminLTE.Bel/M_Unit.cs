using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_unit")]
    public class M_Unit : Base_Related_Field
    {
        [Required(ErrorMessage = "UnitCode|UNIT CODE IS REQUIRED!!")]
        [Display(Name = "UNIT CODE")]
        [MaxLength(30)]
        public string UnitCode { get; set; }

        [Required(ErrorMessage = "UnitName|UNIT NAME IS REQUIRED!!")]
        [Display(Name = "UNIT NAME")]
        public string UnitName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string UnitDesc { get; set; }
    }
}
