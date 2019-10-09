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
    }
}
