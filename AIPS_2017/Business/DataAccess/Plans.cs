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
                     select plan).Single();

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
                     select plan).Single();

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
    }
}
