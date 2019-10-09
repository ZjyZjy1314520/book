using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock.Model
{
    public class User
    {
        public int Id { get; set; }
        public String LoginName { get; set; }

        public String PWD { get; set; }

        public String NickName { get; set; }

        public int Role { get; set; }

    }
}
