using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_vendor")]
    public class M_Vendor : Base_Related_Field
    {

        [Display(Name = "VENDOR CODE")]
        [Required(ErrorMessage = "VendorCode|VENDOR CODE IS REQUIRED!!")]
        [MaxLength(30)]
        public string VendorCode { get; set; }

        [Display(Name = "VENDOR NAME")]
        [Required(ErrorMessage = "VendorName|VENDOR NAME IS REQUIRED!!")]
        public string VendorName { get; set; }

        [Display(Name = "ADDRESS LINE 1")]
        public string AddressL1 { get; set; }

        [Display(Name = "ADDRESS LINE 2")]
        public string AddressL2 { get; set; }

        [Display(Name = "ADDRESS LINE 3")]
        public string AddressL3 { get; set; }

        [Display(Name = "ADDRESS LINE 4")]
        public string AddressL4 { get; set; }

        [Display(Name = "TELEPHONE")]
        public string Telephone { get; set; }

        [Display(Name = "FAX")]
        public string Fax { get; set; }

        [Display(Name = "EMAIL")]
        public string VendorEmail { get; set; }

        [Display(Name = "CONTACT")]
        public string VendorContact { get; set; }

        [Display(Name = "CREDIT TERM")]
        [DefaultValue(0)]
        public int? CreditTerm { get; set; }

        [Display(Name = "PRICE LEVEL")]
        [DefaultValue(0)]
        public int? PriceLevel { get; set; }

        [Display(Name = "TAX ID")]
        public string VendorTaxId { get; set; }

        [Display(Name = "REMARK")]
        public string Remark { get; set; }

        [Display(Name = "COMPANY")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }

    }
}
