using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Business.DTO;
using Business.DataAccess;

namespace AIPS_2017.Models
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "Field can't be empty")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Field can't be empty")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public int ToDatabase()
        {
            UserDTO user = new UserDTO()
            {
                FirstName = FirstName,
                LastName = LastName,
                UserName = UserName,
                Password = Password,
                Status = "user"
            };

            int val = Users.Create(user);
            return val;

        }

    }
}