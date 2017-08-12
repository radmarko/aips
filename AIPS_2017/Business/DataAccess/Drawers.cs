using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.DTO;
using Database;

namespace Business.DataAccess
{
    public static class Drawers
    {
        public static int Create(DrawerDTO drawerCreate)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                Drawer drawer = new Drawer()
                {
                    BoxId = drawerCreate.BoxId,
                    Width = drawerCreate.Width,
                    Height = drawerCreate.Height,
                    Depth = drawerCreate.Depth,
                    BoardThickness = drawerCreate.BoardThickness,
                    PositionX = drawerCreate.PositionX,
                    PositionY = drawerCreate.PositionY,
                    PositionZ = drawerCreate.PositionZ,
                    Name = drawerCreate.Name,
                    Texture = drawerCreate.Texture,
                    pregrada = drawerCreate.pregrada
                };

                db.Drawers.InsertOnSubmit(drawer);
                db.SubmitChanges();

                return drawer.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static DrawerDTO Read(int drawerId)
        {
            DrawerDTO drawerRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from drawer in db.Drawers
                     where drawer.Id == drawerId
                     select drawer).Single();

                drawerRead = new DrawerDTO()
                {
                    Id = find.Id,
                    BoxId = find.BoxId,
                    Width = find.Width,
                    Height = find.Height,
                    Depth = find.Depth,
                    BoardThickness = find.BoardThickness,
                    PositionX = find.PositionX,
                    PositionY = find.PositionY,
                    PositionZ = find.PositionZ,
                    Name = find.Name,
                    Texture = find.Texture,
                    pregrada = find.pregrada
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return drawerRead;
        }

        public static void Update(DrawerDTO updateDrawer)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from drawer in db.Drawers
                     where drawer.Id == updateDrawer.Id
                     select drawer).Single();

                find.BoxId = updateDrawer.BoxId;
                find.Width = updateDrawer.Width;
                find.Height = updateDrawer.Height;
                find.Depth = updateDrawer.Depth;
                find.BoardThickness = updateDrawer.BoardThickness;
                find.PositionX = updateDrawer.PositionX;
                find.PositionY = updateDrawer.PositionY;
                find.PositionZ = updateDrawer.PositionZ;
                find.Name = updateDrawer.Name;
                find.Texture = updateDrawer.Texture;
                find.pregrada = updateDrawer.pregrada;

                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void Delete(int drawerId)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from drawer in db.Drawers
                     where drawer.Id == drawerId
                     select drawer).Single();

                db.Drawers.DeleteOnSubmit(find);
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static List<DrawerDTO> DrawersInBox(int boxId)
        {
            List<DrawerDTO> drawers = new List<DrawerDTO>();

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from drawer in db.Drawers
                     where drawer.BoxId == boxId
                     select drawer);

                foreach (var d in find)
                {
                    DrawerDTO drawerRead = new DrawerDTO()
                    {
                        Id = d.Id,
                        BoxId = d.BoxId,
                        Width = d.Width,
                        Height = d.Height,
                        Depth = d.Depth,
                        BoardThickness = d.BoardThickness,
                        PositionX = d.PositionX,
                        PositionY = d.PositionY,
                        PositionZ = d.PositionZ,
                        Name = d.Name,
                        Texture = d.Texture,
                        pregrada = d.pregrada
                    };

                    drawers.Add(drawerRead);
                }                
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return drawers;
        }
    }
}
