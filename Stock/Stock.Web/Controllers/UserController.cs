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
            return View("List2");
        }
        public JsonResult GetList()
        {
            BLL.User bllUser = new BLL.User();
            List<Model.User> lst = bllUser.GetAllList();
            return Json(lst);

        }
        public JsonResult getlistByPage(int pageSize, int pageNumber, int role, string sortName, string sortOrder, int Id = -1, string search = "", string loginName = "", string nickName = "")
        {
            BLL.User bllUser = new BLL.User();
            List<Model.User> lst = bllUser.GetlistByPage(Id, pageSize, pageNumber, role, search, sortName, sortOrder, loginName, nickName);
            int totalcount = bllUser.GetCount();
            var result = new { rows = lst, total = totalcount };
            return Json(result);

        }
    }
}