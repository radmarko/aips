using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AIPS_2017.Models;

namespace AIPS_2017.Controllers
{
    public class HomeController : Controller
    {

        Dictionary<int, Queue<int>> Rooms = new Dictionary<int, Queue<int>>();

        public ActionResult AddUserToRoom(int SceneId, int UserId)
        {
            if (Rooms.ContainsKey(SceneId))
                Rooms[SceneId].Enqueue(UserId);
            else
            {
                Queue<int> queue = new Queue<int>();
                queue.Enqueue(UserId);
                Rooms.Add(SceneId, queue);
            }
            return null;
        }

        public ActionResult ChangeMaster(int SceneId)
        {
            if (Rooms.ContainsKey(SceneId))
            {
                int MasterId = Rooms[SceneId].Dequeue();
                Rooms[SceneId].Enqueue(MasterId);
            }
            return null;
        }

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

        public ActionResult CheckPlan(int planId)
        {
            return null;
        }

        public ActionResult DeletePlan(int planId, HomeModel model)
        {
            model.DeletePlan(planId);
            return View("~/Views/Home/Admin.cshtml", model);
        }
    }
}