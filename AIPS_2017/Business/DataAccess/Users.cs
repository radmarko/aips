using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.DTO;
using Database;

namespace Business.DataAccess
{
    public static class Users
    {
        public static int Create(UserDTO userCreate)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                User user = new User()
                {
                    FirstName = userCreate.FirstName,
                    LastName = userCreate.LastName,
                    UserName = userCreate.UserName,
                    Password = userCreate.Password,
                    Status = userCreate.Status
                };

                db.Users.InsertOnSubmit(user);
                db.SubmitChanges();

                return user.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static UserDTO Read(int userId)
        {
            UserDTO userRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from user in db.Users
                     where user.Id == userId
                     select user).Single();

                userRead = new UserDTO()
                {
                    Id = find.Id,
                    FirstName = find.FirstName,
                    LastName = find.LastName,
                    UserName = find.UserName,
                    Password = find.Password,
                    Status = find.Status
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return userRead;
        }

        public static int ReadLogIn(string username, string password)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from user in db.Users
                     where user.UserName == username && user.Password == password
                     select user).Single();
                if (find != null)
                    return find.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static void Update(UserDTO updateUser)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from user in db.Users
                     where user.Id == updateUser.Id
                     select user).Single();

                find.FirstName = updateUser.FirstName;
                find.LastName = updateUser.LastName;
                find.UserName = updateUser.UserName;
                find.Password = updateUser.Password;
                find.Status = updateUser.Status;

                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void Delete(int userId)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from user in db.Users
                     where user.Id == userId
                     select user).Single();

                db.Users.DeleteOnSubmit(find);
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
