using System;

namespace Domain
{
    public class Food
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public float calories { get; set; }
        public float protein { get; set; }
        public float fat { get; set; }
        public float sugar { get; set; }
        public float starch { get; set; }
        public float fiber { get; set; }
    }

}