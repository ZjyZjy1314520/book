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
        public int GetCount()
        {
            SqlConnection co = new SqlConnection();
            co.ConnectionString = ConfigurationManager.ConnectionStrings["sqlconnection"].ToString();
            co.Open();
            SqlCommand cm = new SqlCommand();
            cm.CommandText = "select count(*) from t_base_user";
            cm.Connection = co;

            Object count = cm.ExecuteScalar();
            co.Close();
            return (Int32)count;

        }
        public List<Model.User> GetlistByPage(int Id, int pageSize, int pageNumber, int role, string search, string sortName, string sortOrder, string loginName, string nickName)
        {
            SqlConnection co = new SqlConnection();
            co.ConnectionString = ConfigurationManager.ConnectionStrings["sqlconnection"].ToString();
            co.Open();
            SqlCommand cm = new SqlCommand();
            cm.Connection = co;
            int skipcount = (pageNumber - 1) * pageSize;
            string order = " order by " + sortName + " " + sortOrder + " ";

            string whereId = "";
            string whereRole = "";
            if (Id != -1)
            {
                whereId = " and cast(Id as char) like '%" + Id + "%'";
            }
            if (role != -1)
            {
                whereRole = " and role=" + role;

            }
            string where = "  (LoginName like '%" + loginName + "%' and  NickName like '%" + nickName + "%'" + whereId + whereRole + " ) ";
            if (search == "")
            {
                string subtable = "(select top " + skipcount + " Id from t_base_user where " + where + " " + order + "  )";
                cm.CommandText = "select top " + pageSize + " * from t_base_user where  " + where + " and id not in " + subtable + " " + order;
            }
            else
            {

                string temp_table = "(select * from t_base_user where" + " LoginName like '%" + search + "%' or  NickName like '%" + search + "%') as temp_table";
                string subtable = "(select top " + skipcount + " Id from " + temp_table + " where " + where + " " + order + "  )";
                cm.CommandText = "select top " + pageSize + " * from" + temp_table + " where " + where + " and id not in " + subtable + " " + order;
            }


            SqlDataReader dr = cm.ExecuteReader();
            List<Model.User> lst = new List<Model.User>();
            while (dr.Read())
            {
                Model.User user = new Model.User();
                user.LoginName = Convert.ToString(dr["LoginName"]);
                user.NickName = Convert.ToString(dr["NickName"]);
                user.PWD = Convert.ToString(dr["PWD"]);
                user.Role = Convert.ToInt16(dr["Role"]);
                user.Id = Convert.ToInt16(dr["Id"]);

                lst.Add(user);
            }
            dr.Close();
            co.Close();
            return lst;

        }
    }
}
