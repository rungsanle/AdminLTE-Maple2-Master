using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_location")]
    public class M_Location : Base_Related_Field
    {
        [Required(ErrorMessage = "LocationCode|LOCATION CODE IS REQUIRED!!")]
        [Display(Name = "LOCATION CODE")]
        [MaxLength(30)]
        public string LocationCode { get; set; }

        [Required(ErrorMessage = "LocationName|LOCATION NAME IS REQUIRED!!")]
        [Display(Name = "LOCATION NAME")]
        public string LocationName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string LocationDesc { get; set; }

        [Display(Name = "W/H")]
        public int? WarehouseId { get; set; }

        [NotMapped]
        [Display(Name = "W/H NAME")]
        public string WarehouseName { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }
    }
}
