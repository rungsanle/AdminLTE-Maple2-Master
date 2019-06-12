using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Maple2.AdminLTE.Bel
{
    public abstract class Base_Related_Field
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Display(Name = "ACTIVE")]
        public bool Is_Active { get; set; }

        [Display(Name = "CREATED DATE")]
        public DateTime? Created_Date { get; set; }

        [Display(Name = "CREATED BY")]
        public int? Created_By { get; set; }

        [Display(Name = "UPDATED DATE")]
        public DateTime? Updated_Date { get; set; }

        [Display(Name = "UPDATED BY")]
        public int? Updated_By { get; set; }
    }
}
