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
        //public static Dictionary<int, Queue<int>> Rooms = Plans.CreateRooms();

        public void ChangeMaster(int planId, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[planId].ElementAt(0);

            if (userId == masterId)
            {
                if (Rooms.ListOfRooms.ContainsKey(planId))
                {
                    int MasterId = Rooms.ListOfRooms[planId].Dequeue();
                    Rooms.ListOfRooms[planId].Enqueue(MasterId);
                }

                //promena u bazi
                Plans.ChangeMaster(planId);

                //novi master
                masterId = Rooms.ListOfRooms[planId].ElementAt(0);
                UserDTO master = Users.Read(masterId);

                Clients.All.changeMaster(planId, master.FirstName, master.LastName);
            }
     
        }

        //dodavanje objekata
        public void DrawBoard(int getParameter, int brojPregrada, bool vertikalno, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.drawBoard(getParameter, brojPregrada, vertikalno); //daska
            }
            
        }

        public void DrawBox(int getParameter, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.drawBox(getParameter); //kutija
            }
            
        }

        public void DrawDrawer(int getParameter, bool[] niz, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.drawDrawer(getParameter, niz); //fioka
            }
            
        }

        public void DrawDoor(int getParameter, bool[] niz, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.drawDoor(getParameter, niz); //vrata
            }
            
        }

        public void DeleteBox(int getParameter, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.deleteBox(getParameter);
            }
            
        }

        public void ChangeTexture(int getParameter, int num, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.changeTexture(getParameter, num);
            }
            
        }

        public void UpdateBox(int getParameter, float width, float height, float depth, float thickness, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.updateBox(getParameter, width, height, depth, thickness);
            }
            
        }


        //manevracije objektima
        public void MouseDownObject(float x, float y, int getParameter, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.mouseDownObject(x, y, getParameter);
            }
            
        }

        public void MouseMoveObject(float x, float y, int getParameter, int userId/*, bool presecanje*/)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId/* && presecanje == false*/)
            {
                Clients.All.mouseMoveObject(x, y, getParameter);
            }
            
        }

        public void MouseUpObject(float x, float y, int getParameter, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();
            int masterId = Rooms.ListOfRooms[getParameter].ElementAt(0);

            if (userId == masterId)
            {
                Clients.All.mouseUpObject(x, y, getParameter);
            }
            
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

        public void AddUserToRoom(int SceneId, int UserId)
        {
            Singleton Rooms = Singleton.GetInstance();

            if (Rooms.ListOfRooms.ContainsKey(SceneId))
                Rooms.ListOfRooms[SceneId].Enqueue(UserId);
            else
            {
                Queue<int> queue = new Queue<int>();
                queue.Enqueue(UserId);
                Rooms.ListOfRooms.Add(SceneId, queue);
            }
        }

        public void Join(int planId, int userId, int masterId)
        {
            Singleton Rooms = Singleton.GetInstance();

            if (userId == masterId)
                MasterClick(planId, Rooms.ListOfRooms[planId], masterId);
            else
                JoinedUserClick(masterId, planId, userId);
        }

        public void MasterClick(int planId, Queue<int> queue, int masterId)
        {
            int[] niz = queue.ToArray();
            Clients.All.toDashboard(planId, niz, masterId);
        }

        public void JoinedUserClick(int masterId, int planId, int userId)
        {
            Singleton Rooms = Singleton.GetInstance();

            if (!Rooms.ListOfRooms[planId].Contains(userId))
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
}