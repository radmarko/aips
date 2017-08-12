using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.DTO;
using Database;

namespace Business.DataAccess
{
    public static class Boxs
    {
        public static int Create(BoxDTO boxCreate)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                Box box = new Box()
                {
                    PlanId = boxCreate.PlanId,
                    Width = boxCreate.Width,
                    Height = boxCreate.Height,
                    Depth = boxCreate.Height,
                    BoardThickness = boxCreate.BoardThickness,
                    PositionX = boxCreate.PositionX,
                    PositionY = boxCreate.PositionY,
                    PositionZ = boxCreate.PositionZ,
                    Name = boxCreate.Name,
                    Texture = boxCreate.Texture,
                    vertikalno = boxCreate.vertikalno,
                    horizontalno = boxCreate.horizontalno,
                    globalX = boxCreate.globalX,
                    globalY = boxCreate.globalY,
                    globalZ = boxCreate.globalZ
                };

                db.Boxes.InsertOnSubmit(box);
                db.SubmitChanges();

                return box.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static BoxDTO Read(int boxId)
        {
            BoxDTO boxRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from box in db.Boxes
                     where box.Id == boxId
                     select box).Single();

                boxRead = new BoxDTO()
                {
                    Id = find.Id,
                    PlanId = find.PlanId,
                    Width = find.Width,
                    Height = find.Height,
                    Depth = find.Depth,
                    BoardThickness = find.BoardThickness,
                    PositionX = find.PositionX,
                    PositionY = find.PositionY,
                    PositionZ = find.PositionZ,
                    Name = find.Name,
                    Texture = find.Texture,
                    vertikalno = find.vertikalno,
                    horizontalno = find.horizontalno,
                    globalX = find.globalX,
                    globalY = find.globalY,
                    globalZ = find.globalZ
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return boxRead;
        }

        public static void Update(BoxDTO updateBox)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from box in db.Boxes
                     where box.Id == updateBox.Id
                     select box).Single();

                find.PlanId = updateBox.PlanId;
                find.Width = updateBox.Width;
                find.Height = updateBox.Height;
                find.Depth = updateBox.Depth;
                find.BoardThickness = updateBox.BoardThickness;
                find.PositionX = updateBox.PositionX;
                find.PositionY = updateBox.PositionY;
                find.PositionZ = updateBox.PositionZ;
                find.Name = updateBox.Name;
                find.Texture = updateBox.Texture;
                find.vertikalno = updateBox.vertikalno;
                find.horizontalno = updateBox.horizontalno;
                find.globalX = updateBox.globalX;
                find.globalY = updateBox.globalY;
                find.globalZ = updateBox.globalZ;

                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void Delete(int boxId)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from box in db.Boxes
                     where box.Id == boxId
                     select box).Single();

                db.Boxes.DeleteOnSubmit(find);
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static List<BoxDTO> BoxesInPlan(int planId)
        {
            List<BoxDTO> boxes = new List<BoxDTO>();

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from box in db.Boxes
                     where box.PlanId == planId
                     select box);

                foreach (var f in find)
                {
                    BoxDTO boxRead = new BoxDTO()
                    {
                        Id = f.Id,
                        PlanId = f.PlanId,
                        Width = f.Width,
                        Height = f.Height,
                        Depth = f.Depth,
                        BoardThickness = f.BoardThickness,
                        PositionX = f.PositionX,
                        PositionY = f.PositionY,
                        PositionZ = f.PositionZ,
                        Name = f.Name,
                        Texture = f.Texture,
                        vertikalno = f.vertikalno,
                        horizontalno = f.horizontalno,
                        globalX = f.globalX,
                        globalY = f.globalY,
                        globalZ = f.globalZ
                    };

                    boxes.Add(boxRead);
                }               
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return boxes;
        }

    }
}
