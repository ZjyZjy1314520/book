using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
namespace Stock.Web.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// 主页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Main()
        {
            if (Session["LoginIn"] == null)
            {
                return Redirect("/home/login");
            }
            ViewBag.lst = Session["LoginIn"];
            return View();

        }
        public ActionResult Index()
        {
            if (Session["LoginIn"] == null)
            {
                return Redirect("/home/login");
            }
            ViewBag.lst = Session["LoginIn"];
            return View();

        }
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult LoginCheck(string username, string password)
        {
            SqlConnection co = new SqlConnection();
            co.ConnectionString = ConfigurationManager.ConnectionStrings["sqlconnection"].ToString();
            co.Open();

            SqlCommand cm = new SqlCommand();
            cm.CommandText = "select PWD from t_base_user where LoginName = '" + username + "'";
            cm.Connection = co;
            string pwd = "";
            SqlDataReader dr = cm.ExecuteReader();
            while (dr.Read())
            {
                pwd = Convert.ToString(dr["PWD"]);
            }
            dr.Close();
            co.Close();
            if (pwd == password)
            {
                Session["LoginIn"] = username;
                return Json(new { code = 1, message = "登录成功" });
            }
            else
                return Json(new { code = 0, message = "登录失败" });
        }
    }
}