using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock.BLL
{
    public class User
    {
        public int Add(Model.User model)
        {

            DAL.User userDal = new DAL.User();
            return userDal.Add(model);
            //记录日志
        }
        public List<Model.User> GetAllList(){
            DAL.User userDal = new DAL.User();
                return userDal.GetAllList();
         }
        public int GetCount()
        {
            DAL.User count = new DAL.User();
            return count.GetCount();
        }
        public List<Model.User> GetlistByPage(int Id, int pageSize, int pageNumber, int role, string search, string sortName, string sortOrder, string loginName, string nickName)
        {
            //记录日志
            DAL.User userDal = new DAL.User();
            return userDal.GetlistByPage(Id, pageSize, pageNumber, role, search, sortName, sortOrder, loginName, nickName);

        }
        
    }
}
