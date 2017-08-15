using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.DTO;
using Database;

namespace Business.DataAccess
{
    public static class UserPlans
    {
        public static int Create(UserPlanDTO upCreate)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                UserPlan up = new UserPlan()
                {
                    UserId = upCreate.UserId,
                    PlanId = upCreate.PlanId
                };

                db.UserPlans.InsertOnSubmit(up);
                db.SubmitChanges();

                return up.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static UserPlanDTO Read(int upId)
        {
            UserPlanDTO upRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from up in db.UserPlans
                     where up.Id == upId
                     select up).Single();

                upRead = new UserPlanDTO()
                {
                    Id = find.Id,
                    UserId = find.UserId,
                    PlanId = find.PlanId
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return upRead;
        }

        public static UserPlanDTO ReadPlanId(int planId)
        {
            UserPlanDTO upRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from up in db.UserPlans
                     where up.PlanId == planId
                     select up).First();

                upRead = new UserPlanDTO()
                {
                    Id = find.Id,
                    UserId = find.UserId,
                    PlanId = find.PlanId
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return upRead;
        }

        public static List<UserPlanDTO> ReadAll()
        {
            List<UserPlanDTO> ups = new List<UserPlanDTO>(); ;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from up in db.UserPlans
                     select up);

                foreach (UserPlan up in find)
                {
                    UserPlanDTO upRead = new UserPlanDTO()
                    {
                        Id = up.Id,
                        UserId = up.UserId,
                        PlanId = up.PlanId
                    };

                    ups.Add(upRead);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return ups;
        }

        public static void Update(UserPlanDTO updateUP)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from up in db.UserPlans
                     where up.Id == updateUP.Id
                     select up).Single();

                find.UserId = updateUP.UserId;
                find.PlanId = updateUP.PlanId;

                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void Delete(int upId)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from up in db.UserPlans
                     where up.Id == upId
                     select up).Single();

                db.UserPlans.DeleteOnSubmit(find);
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static List<UserDTO> JoinedUsers(int planId)
        {
            List<UserDTO> users = new List<UserDTO>(); ;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from up in db.UserPlans
                     where up.PlanId == planId
                     select up.UserId);

                foreach (int userId in find)
                {
                    UserDTO user = Users.Read(userId);

                    users.Add(user);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return users;
        }

    }
}
