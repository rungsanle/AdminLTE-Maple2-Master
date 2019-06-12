using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_product")]
    public class M_Product : Base_Related_Field
    {
        [Required(ErrorMessage = "ProductCode|PRODUCT CODE IS REQUIRED!!")]
        [Display(Name = "PRODUCT CODE")]
        [MaxLength(30)]
        public string ProductCode { get; set; }

        [Required(ErrorMessage = "ProductName|PRODUCT NAME IS REQUIRED!!")]
        [Display(Name = "PRODUCT NAME")]
        public string ProductName { get; set; }

        [Display(Name = "NAME REF")]
        public string ProductNameRef { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string ProductDesc { get; set; }

        [Display(Name = "MATERIAL TYPE")]
        public int? MaterialTypeId { get; set; }

        [NotMapped]
        [Display(Name = "MAT. TYPE")]
        public string MaterialType { get; set; }

        [Display(Name = "PRODUCTION TYPE")]
        public int? ProductionTypeId { get; set; }

        [NotMapped]
        [Display(Name = "PROD. TYPE")]
        public string ProductionType { get; set; }

        [Display(Name = "MACHINE")]
        public int? MachineId { get; set; }

        [NotMapped]
        [Display(Name = "MACHINE")]
        public string Machine { get; set; }

        [Display(Name = "UNIT")]
        public int? UnitId { get; set; }

        [NotMapped]
        [Display(Name = "UNIT")]
        public string Unit { get; set; }

        [Display(Name = "PACKAGE")]
        public decimal? PackageStdQty { get; set; }

        [Display(Name = "SALES PRICE 1")]
        public decimal? SalesPrice1 { get; set; }

        [Display(Name = "SALES PRICE 2")]
        public decimal? SalesPrice2 { get; set; }

        [Display(Name = "SALES PRICE 3")]
        public decimal? SalesPrice3 { get; set; }

        [Display(Name = "SALES PRICE 4")]
        public decimal? SalesPrice4 { get; set; }

        [Display(Name = "SALES PRICE 5")]
        public decimal? SalesPrice5 { get; set; }

        [Required(ErrorMessage = "GLSalesAccount|G/L Sales Account IS REQUIRED!!")]
        [Display(Name = "G/L Sales Account")]
        public string GLSalesAccount { get; set; }

        [Display(Name = "G/L Inventory Account")]
        public string GLInventAccount { get; set; }

        [Required(ErrorMessage = "GLCogsAccount|G/L COGS/Salary Acct IS REQUIRED!!")]
        [Display(Name = "G/L COGS/Salary Acct")]
        public string GLCogsAccount { get; set; }

        [Display(Name = "Revision Number")]
        public int? RevisionNo { get; set; }

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

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }

        [Display(Name = "PRODUCT IMAGE")]
        public string ProductImagePath { get; set; }

        [NotMapped]
        public List<M_Product_Process> ProdProcess { get; set; }

    }
}
