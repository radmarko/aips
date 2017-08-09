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
        //dodavanje objekata
        public void DrawBoard(int getParameter)
        {            
            Clients.Others.drawBoard(getParameter); //daska
        }

        public void DrawBox(int getParameter)
        {           
            Clients.Others.drawBox(getParameter); //kutija
        }

        public void DrawDrawer(int getParameter)
        {           
            Clients.Others.DrawDrawer(getParameter); //fioka
        }

        public void DrawDoor(int getParameter)
        {           
            Clients.Others.drawDoor(getParameter); //vrata
        }

        //manevracije objektima
        public void MouseDownObject(int x, int y, int getParameter)
        {
            Clients.Others.mouseDownObject(x, y, getParameter);
        }

        public void MouseMoveObject(int x, int y, int getParameter)
        {
            Clients.Others.mouseMoveObject(x, y, getParameter);
        }

        public void MouseUpObject(int x, int y, int getParameter)
        {
            Clients.Others.mouseUpObject(x, y, getParameter);
        }

        public void AddRoom(string id, string name)
        {
            PlanDTO plan = new PlanDTO()
            {
                UserId = Int32.Parse(id)
            };

            int planId = Plans.Create(plan);

            Clients.All.addRoom(planId, name);
        }

    }
}