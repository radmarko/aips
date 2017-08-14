using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Business.DTO;
using Business.DataAccess;

namespace AIPS_2017.Hubs
{
    public class ServerHub : Hub
    {
        public static Dictionary<int, Queue<int>> Rooms = new Dictionary<int, Queue<int>>();

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

        //dodavanje objekata
        public void DrawBoard(int getParameter, int brojPregrada, bool vertikalno)
        {
            Clients.Others.drawBoard(getParameter, brojPregrada, vertikalno); //daska
        }

        public void DrawBox(int getParameter)
        {
            Clients.Others.drawBox(getParameter); //kutija
        }

        public void DrawDrawer(int getParameter, bool[] niz)
        {
            Clients.Others.drawDrawer(getParameter, niz); //fioka
        }

        public void DrawDoor(int getParameter, bool[] niz)
        {
            Clients.Others.drawDoor(getParameter, niz); //vrata
        }
        
        public void DeleteBox(int getParameter)
        {
            Clients.Others.deleteBox(getParameter); 
        }

        //manevracije objektima
        public void MouseDownObject(float x, float y, int getParameter)
        {
            Clients.Others.mouseDownObject(x, y, getParameter);
        }

        public void MouseMoveObject(float x, float y, int getParameter)
        {
            Clients.Others.mouseMoveObject(x, y, getParameter);
        }

        public void MouseUpObject(float x, float y, int getParameter)
        {
            Clients.Others.mouseUpObject(x, y, getParameter);
        }

        public void AddRoom(int userId, string name)
        {
            PlanDTO plan = new PlanDTO()
            {
                UserId = userId,
                Name = name
            };

            int planId = Plans.Create(plan);
            AddUserToRoom(planId, userId); //dodavanje u dictionary

            UserDTO user = Users.Read(userId);

            Clients.All.addRoom(planId, name, user.FirstName, user.LastName, user.Id);
        }

        public void Join(int planId, int userId, int masterId)
        {
            if (userId == masterId)
                MasterClick(planId, Rooms[planId]);
            else
                JoinedUserClick(masterId, planId, userId);
        }

        public void MasterClick(int planId, Queue<int> queue)
        {
            int[] niz = queue.ToArray();
            Clients.All.toDashboard(planId, niz);
        }

        public void JoinedUserClick(int masterId, int planId, int userId)
        {
            //dodati usera u bazu
            UserPlanDTO userplan = new UserPlanDTO()
            {
                UserId = userId,
                PlanId = planId
            };
            int userplanId = UserPlans.Create(userplan);
            UserDTO user = Users.Read(userId);

            AddUserToRoom(planId, userId); //dodavanje u dictionary

            Clients.All.joinRoom(planId, user.FirstName, user.LastName);
        }

    }
}