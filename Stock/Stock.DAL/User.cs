using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
namespace Stock.DAL
{
    public class User
    {
        public int Add(Model.User model)
        {
            //把数据存入数据库
            //ado.net插入数据库
            SqlConnection co = new SqlConnection();
            co.ConnectionString = "server=10.132.239.3;database=16211160141;uid=sa;pwd=Jsj123456";
            co.Open();

            SqlCommand cm = new SqlCommand();
            cm.CommandText = "insert into Stock (LoginName,PWD,NickName,Role) values (@LoginName,@PWD,@NickName,@Role)";
            cm.Parameters.AddWithValue("@LoginName", model.LoginName);
            cm.Parameters.AddWithValue("@PWD", model.PWD);
            cm.Parameters.AddWithValue("@NickName", model.NickName);
            cm.Parameters.AddWithValue("@Role", model.Role);

            cm.Connection = co;
            int result = cm.ExecuteNonQuery();
            co.Close();
            return result;

        }
    }
}
