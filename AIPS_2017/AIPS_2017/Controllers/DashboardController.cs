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

        Dictionary<int, Queue<int>> Rooms = new Dictionary<int, Queue<int>>();

        public void AddUserToRoom(int SceneId, int UserId)
        {
            if (Rooms.ContainsKey(SceneId))
                Rooms[SceneId].Enqueue(UserId);
            else
            {
                Queue<int> queue = new Queue<int>();
                queue.Enqueue(UserId);
                Rooms.Add(SceneId, queue);
            }
        }

        public void ChangeMaster(int SceneId)
        {
            if (Rooms.ContainsKey(SceneId))
            {
                int MasterId = Rooms[SceneId].Dequeue();
                Rooms[SceneId].Enqueue(MasterId);
            }
        }
        //GET: Dashboard
        public ActionResult Dashboard()
        {
            return View();
        }


        public ActionResult SaveConfiguration(string ArrayOfObjects, int planID)
        {
            HomeModel homeModel = new HomeModel();
            homeModel.SaveConfiguration(ArrayOfObjects, planID);
            return Json(new { success = 1 }, JsonRequestBehavior.AllowGet);
        }

    }
}