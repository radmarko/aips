using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AIPS_2017.Models;

namespace AIPS_2017.Controllers
{
    public class LogInController : Controller
    {
        // GET: LogIn
        public ActionResult LogIn()
        {
            LogInModel model = new LogInModel();
            return View(model);
        }

        public ActionResult Home(LogInModel model)
        {
            if (ModelState.IsValid)
            {
                int id;
                id = model.FromDatabase(model.UserName, model.Password);
                if (id != -1)
                {
                    HomeModel homeModel = new HomeModel(id, model.LoggedUser(id).Status, model.LoggedUser(id).FirstName);

                    return View("~/Views/Home/Home.cshtml", homeModel);
                }
                else
                {
                    ViewBag.BadLogin = true;
                }
            }

            return View("~/Views/LogIn/LogIn.cshtml", model);
        }

        public ActionResult LogOut()
        {
            //if (Session["Id"] != null)
            //{
            //    Session["Id"] = null;
            //    Session["Username"] = null;
            //    Session["Status"] = null;
            //    Session["Ime"] = null;
            //    Session["Instruktor"] = null;
            //}

            return RedirectToAction("LogIn", "LogIn");
        }

    }
}