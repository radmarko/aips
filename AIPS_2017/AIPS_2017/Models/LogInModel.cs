using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Business.DTO;
using Business.DataAccess;

namespace AIPS_2017.Models
{
    public class LogInModel
    {
        [Required(ErrorMessage = "Field can't be empty")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public int FromDatabase(string username, string password)
        {
            int val = Users.ReadLogIn(username, password);

            //if (Users.Read(val).Status == "user")
            //    HttpContext.Current.Session["status"] = "user";
            //else
            //    HttpContext.Current.Session["status"] = "admin";

            //HttpContext.Current.Session["name"] = Users.Read(val).FirstName;
            //HttpContext.Current.Session["id"] = val;

            return val;
        }

        public UserDTO LoggedUser(int userId)
        {
            return Users.Read(userId);
        }

    }
}