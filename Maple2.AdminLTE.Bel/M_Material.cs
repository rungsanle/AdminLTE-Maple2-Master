using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_material")]
    public class M_Material : Base_Related_Field
    {

        [Required(ErrorMessage = "MaterialCode|MATERIAL CODE IS REQUIRED!!")]
        [Display(Name = "MATERIAL CODE")]
        [MaxLength(30)]
        public string MaterialCode { get; set; }

        [Required(ErrorMessage = "MaterialName|MATERIAL NAME IS REQUIRED!!")]
        [Display(Name = "MATERIAL NAME")]
        public string MaterialName { get; set; }

        [Display(Name = "DESCRIPTION 1")]
        public string MaterialDesc1 { get; set; }

        [Display(Name = "DESCRIPTION 2")]
        public string MaterialDesc2 { get; set; }

        [Display(Name = "RAW MAT. TYPE")]
        public int? RawMatTypeId { get; set; }

        [NotMapped]
        [Display(Name = "RAW MAT. TYPE")]
        public string RawMatType { get; set; }

        [Display(Name = "UNIT")]
        public int? UnitId { get; set; }

        [NotMapped]
        [Display(Name = "UNIT")]
        public string Unit { get; set; }


        [Display(Name = "PACKAGE")]
        [DisplayFormat(DataFormatString = "{0:#,##0.00}", ApplyFormatInEditMode = true)]
        public decimal? PackageStdQty { get; set; }

        [Display(Name = "W/H")]
        public int? WarehouseId { get; set; }

        [NotMapped]
        [Display(Name = "W/H")]
        public string Warehouse { get; set; }

        [Display(Name = "LOCATION")]
        public int? LocationId { get; set; }

        [NotMapped]
        [Display(Name = "LOCATION")]
        public string Location { get; set; }


        [Display(Name = "COMPANY")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }

        [Display(Name = "MATERIAL IMAGE")]
        public string MaterialImagePath { get; set; }
    }
}
