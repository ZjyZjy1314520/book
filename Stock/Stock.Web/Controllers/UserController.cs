using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Stock.Web.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Add()
        {
            return View();
        }
        public ActionResult AddSave(Model.User model)
        {
            BLL.User userBll = new BLL.User();
            int result = userBll.Add(model);
            ViewBag.result = result;
            return View(); 
        }
        public ActionResult List()
        {
            BLL.User userlist = new BLL.User();
            List<Model.User> lst = userlist.GetAllList();
            ViewBag.lst = lst;
            return View();
        }
    }
}