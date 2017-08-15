using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.DTO;
using Database;

namespace Business.DataAccess
{
    public static class Plans
    {
        public static int Create(PlanDTO planCreate)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                Plan plan = new Plan()
                {
                    UserId = planCreate.UserId,
                    Name = planCreate.Name
                };

                db.Plans.InsertOnSubmit(plan);
                db.SubmitChanges();

                return plan.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static PlanDTO Read(int planId)
        {
            PlanDTO planRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from plan in db.Plans
                     where plan.Id == planId
                     select plan).FirstOrDefault();

                planRead = new PlanDTO()
                {
                    Id = find.Id,
                    UserId = find.UserId,
                    Name = find.Name
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return planRead;
        }

        public static List<PlanDTO> ReadAll()
        {
            List<PlanDTO> plans = new List<PlanDTO>(); ;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from plan in db.Plans
                     select plan);

                foreach (Plan plan in find)
                {
                    PlanDTO planRead = new PlanDTO()
                    {
                        Id = plan.Id,
                        UserId = plan.UserId,
                        Name = plan.Name
                    };

                    plans.Add(planRead);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return plans;
        }

        public static void Update(PlanDTO updatePlan)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from plan in db.Plans
                     where plan.Id == updatePlan.Id
                     select plan).FirstOrDefault();

                find.UserId = updatePlan.UserId;
                find.Name = updatePlan.Name;

                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void Delete(int planId)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from plan in db.Plans
                     where plan.Id == planId
                     select plan).Single();

                db.Plans.DeleteOnSubmit(find);
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static Dictionary<int, Queue<int>> CreateRooms()
        {
            Dictionary<int, Queue<int>> Rooms = new Dictionary<int, Queue<int>>();

            try
            {
                databaseDataContext db = new databaseDataContext();

                var plans =
                    (from p in db.Plans
                     select p);

                foreach (Plan plan in plans)
                {
                    Queue<int> queue = new Queue<int>();
                    queue.Enqueue(plan.UserId); //master

                    foreach (UserDTO user in UserPlans.JoinedUsers(plan.Id))
                    {
                        queue.Enqueue(user.Id);
                    }

                    Rooms.Add(plan.Id, queue);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return Rooms;
        }

        public static void ChangeMaster(int planId)
        {
            PlanDTO plan = Plans.Read(planId);
            UserPlanDTO userPlan = UserPlans.ReadPlanId(planId);

            UserPlanDTO newUserPlan = new UserPlanDTO()
            {
                UserId = plan.UserId,
                PlanId = plan.Id
            };

            PlanDTO updatePlan = new PlanDTO()
            {
                Id = planId,
                UserId = userPlan.UserId,
                Name = plan.Name
            };

            Plans.Update(updatePlan);
            UserPlans.Delete(userPlan.Id);
            UserPlans.Create(newUserPlan);

        }

    }
}
