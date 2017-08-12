using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AIPS_2017.Models;
using Business.DTO;

namespace AIPS_2017.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Home(int UserId, string Status, string Name)
        {
            HomeModel model = new HomeModel(UserId, Status, Name);
            return View(model);
        }

        public ActionResult Admin(int UserId, string Status, string Name)
        {
            HomeModel model = new HomeModel(UserId, Status, Name);
            return View(model);
        }

        public ActionResult CheckPlan(int planId, HomeModel model)
        {
            model.PlanId = planId;
            return View("~/Views/Home/SceneReconstruction.cshtml", model);
        }

        public ActionResult GetObjects(int planId, HomeModel model)
        {
            List<ObjectDTO> objects = model.SceneReconstruction(planId);
            return Json(new { objects = objects }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeletePlan(int planId, HomeModel model)
        {
            model.DeletePlan(planId);
            return View("~/Views/Home/Admin.cshtml", model);
        }
    }
}