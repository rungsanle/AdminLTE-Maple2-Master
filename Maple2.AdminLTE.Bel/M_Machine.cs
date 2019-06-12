using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_machine")]
    public class M_Machine : Base_Related_Field
    {

        [Display(Name = "MACHINE CODE")]
        [Required(ErrorMessage = "MachineCode|MACHINE CODE IS REQUIRED!!")]
        [MaxLength(30)]
        public string MachineCode { get; set; }

        [Display(Name = "MACHINE NAME")]
        [Required(ErrorMessage = "MachineName|MACHINE NAME IS REQUIRED!!")]
        public string MachineName { get; set; }

        [Display(Name = "MACHINE PROD TYPE")]
        [Required(ErrorMessage = "MachineProdType|MACHINE PROD. TYPE IS REQUIRED!!")]
        public int MachineProdType { get; set; }

        [NotMapped]
        [Display(Name = "PROD. TYPE")]
        public string MachineProdTypeName { get; set; }

        [Display(Name = "MACHINE SIZE")]
        public string MachineSize { get; set; }

        [Display(Name = "MACHINE REMARK")]
        [DataType(DataType.MultilineText)]
        public string MachineRemark { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }
    }
}
