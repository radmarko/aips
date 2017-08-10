using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.DTO;
using Database;

namespace Business.DataAccess
{
    public static class Doors
    {
        public static int Create(DoorDTO doorCreate)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                Door door = new Door()
                {
                    BoxId = doorCreate.BoxId,
                    Width = doorCreate.Width,
                    Height = doorCreate.Height,
                    Depth = doorCreate.Depth,
                    PositionX = doorCreate.PositionX,
                    PositionY = doorCreate.PositionY,
                    PositionZ = doorCreate.PositionZ,
                    Name = doorCreate.Name,
                    Texture = doorCreate.Texture,
                    pregrada = doorCreate.pregrada
                };

                db.Doors.InsertOnSubmit(door);
                db.SubmitChanges();

                return door.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static DoorDTO Read(int doorId)
        {
            DoorDTO doorRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from door in db.Doors
                     where door.Id == doorId
                     select door).Single();

                doorRead = new DoorDTO()
                {
                    Id = find.Id,
                    BoxId = find.BoxId,
                    Width = find.Width,
                    Height = find.Height,
                    Depth = find.Depth,
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

            return doorRead;
        }

        public static void Update(DoorDTO updateDoor)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from door in db.Doors
                     where door.Id == updateDoor.Id
                     select door).Single();

                find.BoxId = updateDoor.BoxId;
                find.Width = updateDoor.Width;
                find.Height = updateDoor.Height;
                find.Depth = updateDoor.Depth;
                find.PositionX = updateDoor.PositionX;
                find.PositionY = updateDoor.PositionY;
                find.PositionZ = updateDoor.PositionZ;
                find.Name = updateDoor.Name;
                find.Texture = updateDoor.Texture;
                find.pregrada = updateDoor.pregrada;

                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void Delete(int doorId)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from door in db.Doors
                     where door.Id == doorId
                     select door).Single();

                db.Doors.DeleteOnSubmit(find);
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
