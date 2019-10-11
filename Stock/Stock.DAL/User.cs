using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;
namespace Stock.DAL
{
    public class User
    {
        public int Add(Model.User model)
        {
            //把数据存入数据库
            //ado.net插入数据库
            SqlConnection co = new SqlConnection();
            co.ConnectionString = ConfigurationManager.ConnectionStrings["sqlconnection"].ToString();
            co.Open();

            SqlCommand cm = new SqlCommand();
            cm.CommandText = "insert into t_base_user (LoginName,PWD,NickName,Role) values (@LoginName,@PWD,@NickName,@Role)";
            cm.Parameters.AddWithValue("@LoginName", model.LoginName);
            cm.Parameters.AddWithValue("@PWD", model.PWD);
            cm.Parameters.AddWithValue("@NickName", model.NickName);
            cm.Parameters.AddWithValue("@Role", model.Role);



            cm.Connection = co;
            int result = cm.ExecuteNonQuery();
            co.Close();
            return result;

        }
        public List<Model.User> GetAllList()
        {
            SqlConnection co = new SqlConnection();
            co.ConnectionString = ConfigurationManager.ConnectionStrings["sqlconnection"].ToString();
            co.Open();
            SqlCommand cm = new SqlCommand();
            cm.CommandText = "select * from T_Base_User";
            cm.Connection = co;
            List<Model.User> lst = new List<Model.User>();
            SqlDataReader dr = cm.ExecuteReader();
            while (dr.Read())
            {
                Model.User user = new Model.User();
                user.Id = Convert.ToInt32(dr["Id"]);
                user.LoginName = Convert.ToString(dr["LoginName"]);
                user.PWD=Convert.ToString(dr["PWD"]);
                user.NickName = Convert.ToString(dr["NickName"]);
                user.Role = Convert.ToInt32(dr["Role"]);
                lst.Add(user);
            }
            dr.Close();
            co.Close();
            return lst;
        }
    }
}
