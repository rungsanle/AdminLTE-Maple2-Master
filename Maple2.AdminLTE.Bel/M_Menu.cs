using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    [Table("m_menu")]
    public class M_Menu : Base_Related_Field
    {
        [Display(Name = "MENU NAME")]
        public string nameOption { get; set; }

        [Display(Name = "CONTROLLER")]
        public string controller { get; set; }

        [Display(Name = "ACTION")]
        public string action { get; set; }

        [Display(Name = "MENU IMAGE")]
        public string imageClass { get; set; }

        [Display(Name = "STATUS")]
        public bool status { get; set; }

        [Display(Name = "PARENT")]
        public bool isParent { get; set; }

        [Display(Name = "parentId")]
        public int? parentId { get; set; }

        [NotMapped]
        [Display(Name = "PARENT NAME")]
        public string parentName { get; set; }

        [Display(Name = "AREA")]
        public string area { get; set; }

        [Display(Name = "SEQ")]
        public int menuseq { get; set; }

    }
}
