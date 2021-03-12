using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepsTask.Model
{
    public class Step
    {
        public int Id { get; set; }
        public string StepName { get; set; }

        public List<Item> Items { get; set; }
    }
}
