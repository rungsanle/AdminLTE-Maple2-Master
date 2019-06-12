using Maple2.AdminLTE.Bel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace Maple2.AdminLTE.Dal
{
    public class MasterDbContext : DbContext
    {
        public MasterDbContext(DbContextOptions options) : base(options)
        {
        }
        //public MasterDbContext()
        //{
        //}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    IConfigurationRoot configuration = new ConfigurationBuilder()
        //    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        //    .AddJsonFile("appsettings.json")
        //    .Build();

        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseMySql(configuration.GetConnectionString("DefaultConnection"));
        //    }
        //}

        public DbSet<M_Department> Department { get; set; }
        public DbSet<M_Company> Companies { get; set; }
        public DbSet<M_User> User { get; set; }
        public DbSet<M_Menu> NavBarMenu { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<M_Company>()
                .HasIndex(p => new { p.CompanyCode })
                .IsUnique(true);

            //Department more specifications.
            modelBuilder.Entity<M_Department>()
                .HasIndex(p => new { p.DeptCode, p.CompanyCode })
                .HasName("IX_DEPTANDCOMP")
                .IsUnique(true);

            //User more specifications.
            modelBuilder.Entity<M_User>()
                .HasIndex(u => new { u.UserCode, u.CompanyCode })
                .HasName("IX_USERANDCOMP")
                .IsUnique(true);

            modelBuilder.Query<M_UserObj>();
            modelBuilder.Query<M_MenuObj>();
        }
    }
}
