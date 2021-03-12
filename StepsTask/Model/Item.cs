using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepsTask.Model
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int StepId { get; set; }
        //public Step Step { get; set; }
    }
}
