using System;

namespace Domain
{
    public class Food
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public double calories { get; set; }
        public double protein { get; set; }
        public double fat { get; set; }
        public double sugar { get; set; }
        public double starch { get; set; }
        public double fiber { get; set; }
    }

}