using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business.DTO;
using ServiceStack.Text;

namespace AIPS_2017.Controllers
{
    public class DashboardController : Controller
    {
        //GET: Dashboard
        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult SaveConfiguration(string ArrayOfObjects)
        {
            List<BoxDTO> boxes = (List<BoxDTO>)JsonSerializer.DeserializeFromString(ArrayOfObjects, typeof(List<BoxDTO>));
            return View();
        }

    }
}