using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AIPS_2017.Models;

namespace AIPS_2017.Controllers
{
    public class RegistrationController : Controller
    {
        // GET: Registration
        public ActionResult Registration()
        {
            RegistrationModel model = new RegistrationModel();
            return View(model);
        }

        public ActionResult LogIn(RegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                int id;
                id = model.ToDatabase();
                if (id != -1)
                    return View("~/Views/LogIn/LogIn.cshtml");

            }

            return View("~/Views/Registration/Registration.cshtml", model);
        }

    }
}