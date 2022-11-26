using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Security;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Domain.Context
{
    public class EfCoreContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageGroup> MessageGroups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // TODO: pull this from config
            optionsBuilder.UseSqlServer(
                @"Server=.\;Database=MessagingAppFullStack;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Permission>()
                .Property(e => e.Name)
                .HasConversion(
                    v => v.ToString(),
                    v => (PermissionType)Enum.Parse(typeof(PermissionType), v));
            
            modelBuilder.Entity<User>()
                .HasIndex(p => new {p.Username})
                .IsUnique();

            modelBuilder.Entity<Role>()
                .HasData(
                    new Role
                    {
                        Id = 1L,
                        Name = "StandardUser"
                    });

            modelBuilder.Entity<Permission>()
                .HasData(
                    new Permission
                    {
                        Id = 1L,
                        Name = PermissionType.ViewOwn,
                        Description = "Can view own documents"
                    },
                    new Permission
                    {
                        Id = 2L,
                        Name = PermissionType.EditOwn,
                        Description = "Can edit own documents"
                    },
                    new Permission
                    {
                        Id = 3L,
                        Name = PermissionType.DeleteOwn,
                        Description = "Can delete own documents"
                    }
                );

            modelBuilder.Entity<Role>()
                .HasMany(r => r.Permissions)
                .WithMany(p => p.Roles)
                .UsingEntity(
                    j => j.HasData(
                        new {PermissionsId = 1L, RolesId = 1L},
                        new {PermissionsId = 2L, RolesId = 1L},
                        new {PermissionsId = 3L, RolesId = 1L}));
        }
    }
}