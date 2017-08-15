using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AIPS_2017.Models;

namespace AIPS_2017.Controllers
{
    public class DashboardController : Controller
    {
        //GET: Dashboard
        //public ActionResult Dashboard()
        //{
        //    return View();
        //}

        public ActionResult Dashboard(int id, int UserId, string Status, string Name)
        {
            HomeModel model = new HomeModel(UserId, Status, Name);
            return View(model);
        }


        public ActionResult SaveConfiguration(string ArrayOfObjects, int planID)
        {
            HomeModel homeModel = new HomeModel();
            homeModel.SaveConfiguration(ArrayOfObjects, planID);
            return Json(new { success = 1 }, JsonRequestBehavior.AllowGet);
        }

    }
}