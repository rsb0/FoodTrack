using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Running",
                        Category = "Running",
                        Description = "Running for 1 hour flat terrain",
                        Date = DateTime.Now.AddMonths(-2)
                    },
                    new Activity
                    {
                        Title = "Light jog",
                        Category = "Running",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "light jogging for 30 minutes",
                    },
                    new Activity
                    {
                        Title = "Upper body strenght workout",
                        Category = "Strength",
                        Description = "Bench press 10x3 reps at 70kg\nBicep curls 10x3 reps at 10kg\nPullups 10x3 reps",
                        Date = DateTime.Now.AddMonths(1)
                    }
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();
            };

            if (!context.Foods.Any())
            {
                var foods = new List<Food>
                {
                    new Food
                    {
                        Name = "Oats",
                        Brand = "AXA",
                        calories = 370F,
                        protein = 12F,
                        fat = 7F,
                        sugar = 1.2F,
                        starch = 58.8F,
                        fiber = 8.5F
                    },
                    new Food
                    {
                        Name = "Peanut Butter",
                        Brand = "Green Choice",
                        calories = 589F,
                        protein = 25.6F,
                        fat = 48.9F,
                        sugar = 4.7F,
                        starch = 2.9F,
                        fiber = 8.4F
                    }
                };

                context.Foods.AddRange(foods);
                context.SaveChanges();
            };
        }
    }
}