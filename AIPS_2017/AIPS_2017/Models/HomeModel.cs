using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Business.DTO;
using Business.DataAccess;
using ServiceStack.Text;

namespace AIPS_2017.Models
{
    public class HomeModel
    {
        public int UserId { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }

        public HomeModel()
        {

        }

        public HomeModel(int UserId, string Status, string Name)
        {
            this.UserId = UserId;
            this.Status = Status;
            this.Name = Name;
        }

        public List<PlanDTO> SviPlanovi()
        {
            return Plans.ReadAll();
        }

        public string UsernameUserPlan(int planId)
        {
            PlanDTO plan = Plans.Read(planId);
            return Users.Read(plan.UserId).UserName;
        }

        public void DeletePlan(int planId)
        {
            Plans.Delete(planId);
        }

        public void SaveConfiguration(string ArrayOfObjects, int planId)
        {
            //List<ObjectDTO> objects = (List<ObjectDTO>)JsonSerializer.DeserializeFromString(ArrayOfObjects, typeof(List<ObjectDTO>));
            ObjectDTO o = (ObjectDTO)JsonSerializer.DeserializeFromString(ArrayOfObjects, typeof(ObjectDTO));
            //foreach (ObjectDTO o in objects)
            //{


            //}

            BoxDTO box = new BoxDTO()
            {
                PlanId = planId,
                Width = o.Width,
                Height = o.Height,
                Depth = o.Depth,
                BoardThickness = o.BoardThickness,
                PositionX = o.PositionX,
                PositionY = o.PositionY,
                PositionZ = o.PositionZ,
                Name = o.Name,
                Texture = o.Texture,
                vertikalno = o.vertikalno,
                horizontalno = o.horizontalno,
                globalX = o.globalX,
                globalY = o.globalY,
                globalZ = o.globalZ
            };

            int boxId = Boxs.Create(box);

            foreach (BoardDTO b in o.childs)
            {
                BoardDTO board = new BoardDTO()
                {
                    BoxId = boxId,
                    Width = b.Width,
                    Height = b.Height,
                    Depth = b.Depth,
                    BoardThickness = b.BoardThickness,
                    PositionX = b.PositionX,
                    PositionY = b.PositionY,
                    PositionZ = b.PositionZ,
                    Name = b.Name,
                    Texture = b.Texture
                };

                int boardId = Boards.Create(board);
            }

            List<int> pozicije = new List<int>();
            if (o.pozicije_fioka != null)
            {
                for (int i = 0; i < o.childs.Count + 1; i++)
                    if (o.pozicije_fioka[i] == true)
                        pozicije.Add(i);
            }

            int k = 0;

            foreach (DrawerDTO d in o.nizFioka)
            {
                DrawerDTO drawer = new DrawerDTO()
                {
                    BoxId = boxId,
                    Width = d.Width,
                    Height = d.Height,
                    Depth = d.Depth,
                    BoardThickness = d.BoardThickness,
                    PositionX = d.PositionX,
                    PositionY = d.PositionY,
                    PositionZ = d.PositionZ,
                    Name = d.Name,
                    Texture = d.Texture,
                    pregrada = pozicije[k]
                };

                int drawerId = Drawers.Create(drawer);
                k++;
            }

            pozicije = new List<int>();
            if (o.pozicije_vrata != null)
            {
                for (int i = 0; i < o.childs.Count + 1; i++)
                    if (o.pozicije_vrata[i] == true)
                        pozicije.Add(i);
            }

            k = 0;

            foreach (DoorDTO d in o.nizVrata)
            {
                DoorDTO door = new DoorDTO()
                {
                    BoxId = boxId,
                    Width = d.Width,
                    Height = d.Height,
                    Depth = d.Depth,
                    PositionX = d.PositionX,
                    PositionY = d.PositionY,
                    PositionZ = d.PositionZ,
                    Name = d.Name,
                    Texture = d.Texture,
                    pregrada = pozicije[k]
                };

                int doorId = Doors.Create(door);
                k++;
            }
        }

    }
}