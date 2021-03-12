using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepsTask.Model
{
    public class StepsContext : DbContext
    {
        public StepsContext(DbContextOptions<StepsContext> options)
            : base(options)
    {
    }

    public DbSet<Step> Steps { get; set; }
    public DbSet<Item> Items { get; set; }
}
}
