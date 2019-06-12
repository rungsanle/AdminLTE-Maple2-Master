using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_warehouse")]
    public class M_Warehouse : Base_Related_Field
    {
        [Required(ErrorMessage = "WarehouseCode|W/H CODE IS REQUIRED!!")]
        [Display(Name = "W/H CODE")]
        [MaxLength(30)]
        public string WarehouseCode { get; set; }

        [Required(ErrorMessage = "WarehouseName|W/H NAME IS REQUIRED!!")]
        [Display(Name = "W/H NAME")]
        public string WarehouseName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string WarehouseDesc { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }
    }
}
