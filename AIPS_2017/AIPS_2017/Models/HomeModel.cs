using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Business.DTO;
using Business.DataAccess;

namespace AIPS_2017.Models
{
    public class HomeModel
    {
        public int UserId { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }

        public HomeModel(int UserId, string Status, string Name)
        {
            this.UserId = UserId;
            this.Status = Status;
            this.Name = Name;
        }
    }
}