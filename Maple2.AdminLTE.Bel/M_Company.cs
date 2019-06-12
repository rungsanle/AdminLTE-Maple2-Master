using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_company")]
    public class M_Company : Base_Related_Field
    {
        [Display(Name = "COMPANY CODE")]
        [Required(ErrorMessage = "CompanyCode|COMPANY CODE IS REQUIRED!!")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }

        [Display(Name = "COMPANY NAME")]
        [Required(ErrorMessage = "CompanyName|COMPANY NAME IS REQUIRED!!")]
        public string CompanyName { get; set; }

        [Display(Name = "LOGO FILE")]
        public string CompanyLogoPath { get; set; }

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

        [Display(Name = "TAX ID")]
        public string CompanyTaxId { get; set; }

    }
}
