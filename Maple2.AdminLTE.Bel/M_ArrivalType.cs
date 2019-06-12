using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_arrivaltype")]
    public class M_ArrivalType : Base_Related_Field
    {

        [Display(Name = "ARR. TYPE CODE")]
        [Required(ErrorMessage = "ArrivalTypeCode|ARRIVAL TYPE CODE IS REQUIRED!!")]
        [MaxLength(30)]
        public string ArrivalTypeCode { get; set; }

        [Display(Name = "ARR. TYPE NAME")]
        [Required(ErrorMessage = "ArrivalTypeName|ARRIVAL TYPE NAME IS REQUIRED!!")]
        public string ArrivalTypeName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string ArrivalTypeDesc { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }
    }
}
