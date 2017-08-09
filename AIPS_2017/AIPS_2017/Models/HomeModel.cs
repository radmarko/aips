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

        public HomeModel()
        {

        }

        public HomeModel(int UserId, string Status, string Name)
        {
            this.UserId = UserId;
            this.Status = Status;
            this.Name = Name;
        }

        public List<PlanDTO> SviPlanovi()
        {
            return Plans.ReadAll();
        }

        public string UsernameUserPlan(int planId)
        {
            PlanDTO plan = Plans.Read(planId);
            return Users.Read(plan.UserId).UserName;
        }

        public void DeletePlan(int planId)
        {
            Plans.Delete(planId);
        }

    }
}