using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_process")]
    public class M_Process : Base_Related_Field
    {
        [Required(ErrorMessage = "ProcessCode|PROCESS CODE IS REQUIRED!!")]
        [Display(Name = "PROCESS CODE")]
        [MaxLength(30)]
        public string ProcessCode { get; set; }

        [Required(ErrorMessage = "ProcessName|PROCESS NAME IS REQUIRED!!")]
        [Display(Name = "PROCESS NAME")]
        public string ProcessName { get; set; }

        [Display(Name = "DESCRIPTION")]
        [DataType(DataType.MultilineText)]
        public string ProcessDesc { get; set; }

        [Display(Name = "SEQ")]
        public int? ProcessSeq { get; set; }

        [Display(Name = "COMPANY CODE")]
        [MaxLength(30)]
        public string CompanyCode { get; set; }
    }
}
