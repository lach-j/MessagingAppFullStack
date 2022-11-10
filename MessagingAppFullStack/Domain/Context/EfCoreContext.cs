using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Security;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Domain.Context
{
    public class EfCoreContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // TODO: pull this from config
            optionsBuilder.UseSqlServer(
                @"Server=.\;Database=MessagingAppFullStack;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(p => new {p.Username})
                .IsUnique();
        }
    }
}