using Maple2.AdminLTE.Bel;
using Maple2.AdminLTE.Dal;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Maple2.AdminLTE.Bll
{
    public class UserBLL : IDisposable
    {
        #region IDisposable Members

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected void Dispose(bool Disposing)
        {
            if (!IsDisposed)
            {
                if (Disposing)
                {

                }
            }

            IsDisposed = true;
        }

        ~UserBLL()
        {
            this.Dispose(false);
        }

        #endregion

        #region Private Member

        private bool IsDisposed = false;
        private AppConfiguration appSetting;
        private DbContextOptions contextOptions;

        #endregion

        public UserBLL()
        {
            appSetting = new AppConfiguration();

            contextOptions = new DbContextOptionsBuilder()
                            .UseMySql(appSetting.ConnectionString)
                            .Options;
        }

        #region Method Member

        public async Task<List<M_User>> GetUser(int? id)
        {
            try
            {
                using (var context = new MasterDbContext(contextOptions))
                {
                    MySqlParameter[] sqlParams = new MySqlParameter[] {
                                             new MySqlParameter("strId", id)
                    };

                    var objList = await context.Query<M_UserObj>().FromSql("call sp_user_get(?)", parameters: sqlParams).ToListAsync();

                    return objList.ConvertAll(user => new M_User {
                        Id = user.Id,
                        UserCode = user.UserCode,
                        UserName = user.UserName,
                        EmpCode = user.EmpCode,
                        DeptId = user.DeptId,
                        DeptName = user.DeptName,
                        Position = user.Position,
                        CompanyCode = user.CompanyCode,
                        aspnetuser_Id = user.aspnetuser_Id,
                        UserImagePath = user.UserImagePath,
                        Is_Active = user.Is_Active,
                        Created_By = user.Created_By,
                        Created_Date = user.Created_Date,
                        Updated_By = user.Updated_By,
                        Updated_Date = user.Updated_Date
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public int InsertUser(M_User user, out int? newId)
        //{
        //    newId = null;
        //    int rowaffected = -1;

        //    using (DbContextTransaction transaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            MySqlParameter[] sqlParams = new MySqlParameter[] {
        //                            new MySqlParameter("strUserCode", user.UserCode),
        //                            new MySqlParameter("strUserName", user.UserName),
        //                            new MySqlParameter("strEmpCode", user.EmpCode),
        //                            new MySqlParameter("strDeptId", user.DeptId),
        //                            new MySqlParameter("strPosition", user.Position),
        //                            new MySqlParameter("strCompanyCode", user.CompanyCode),
        //                            new MySqlParameter("straspnetuser_Id", user.aspnetuser_Id),
        //                            new MySqlParameter("strIs_Active", user.Is_Active),
        //                            new MySqlParameter("strCreated_By", user.Created_By),
        //                            new MySqlParameter("strUserImagePath", user.UserImagePath)
        //            };

        //            //Output Parameter no need to define. @`strId`
        //            rowaffected = db.Database.ExecuteSqlCommand("call sp_user_insert(@`strId`, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", parameters: sqlParams);

        //            //Get Output Parameter Value.
        //            newId = db.Database.SqlQuery<int>("SELECT @`strId`;").First();

        //            transaction.Commit();

        //            return rowaffected;
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            throw ex;
        //        }
        //    }
        //}

        //public int UpdateUser(M_User user)
        //{
        //    int rowaffected = -1;

        //    using (DbContextTransaction transaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            db.Entry(user).State = EntityState.Modified;

        //            MySqlParameter[] sqlParams = new MySqlParameter[] {
        //                            new MySqlParameter("strId", user.Id),
        //                            new MySqlParameter("strUserCode", user.UserCode),
        //                            new MySqlParameter("strUserName", user.UserName),
        //                            new MySqlParameter("strEmpCode", user.EmpCode),
        //                            new MySqlParameter("strDeptId", user.DeptId),
        //                            new MySqlParameter("strPosition", user.Position),
        //                            new MySqlParameter("strCompanyCode", user.CompanyCode),
        //                            new MySqlParameter("straspnetuser_Id", user.aspnetuser_Id),
        //                            new MySqlParameter("strIs_Active", user.Is_Active),
        //                            new MySqlParameter("strUpdated_By", user.Updated_By),
        //                            new MySqlParameter("strUserImagePath", user.UserImagePath)
        //            };

        //            rowaffected = db.Database.ExecuteSqlCommand("call sp_user_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", parameters: sqlParams);

        //            transaction.Commit();

        //            return rowaffected;
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            throw ex;
        //        }
        //    }
        //}

        //public int DeleteUser(M_User user)
        //{
        //    int rowaffected = -1;

        //    using (DbContextTransaction transaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            MySqlParameter[] sqlParams = new MySqlParameter[] {
        //                            new MySqlParameter("strId", user.Id),
        //                            new MySqlParameter("strDelete_By", user.Updated_By)
        //            };

        //            rowaffected = db.Database.ExecuteSqlCommand("call sp_user_delete( ?, ?)", parameters: sqlParams);

        //            transaction.Commit();

        //            return rowaffected;
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            throw ex;
        //        }
        //    }
        //}

        //public M_User GetSystemUser(string id)
        //{
        //    try
        //    {
        //        MySqlParameter[] sqlParams = new MySqlParameter[] {
        //                                     new MySqlParameter("strId", id)
        //        };

        //        return db.Database.SqlQuery<M_UserObj>("call sp_systemuser_get(?)", parameters: sqlParams)
        //                     .Select(user => new M_User
        //                     {
        //                         Id = user.Id,
        //                         UserCode = user.UserCode,
        //                         UserName = user.UserName,
        //                         EmpCode = user.EmpCode,
        //                         DeptId = user.DeptId,
        //                         DeptName = user.DeptName,
        //                         Position = user.Position,
        //                         CompanyCode = user.CompanyCode,
        //                         aspnetuser_Id = user.aspnetuser_Id,
        //                         UserImagePath = user.UserImagePath,
        //                         CompanyLogoPath = user.CompanyLogoPath,
        //                         Is_Active = user.Is_Active,
        //                         Created_By = user.Created_By,
        //                         Created_Date = user.Created_Date,
        //                         Updated_By = user.Updated_By,
        //                         Updated_Date = user.Updated_Date
        //                     }).FirstOrDefault();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        #endregion
    }
}
