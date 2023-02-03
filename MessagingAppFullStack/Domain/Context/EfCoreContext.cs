using MessagingAppFullStack.Configuration;
using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MessagingAppFullStack.Domain.Context
{
    public class EfCoreContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageGroup> MessageGroups { get; set; }
        
        public EfCoreContext(DbContextOptions<EfCoreContext> options): base(options)
        {
        }

        private static void ApplyDateTimeUtcConverters(ModelBuilder modelBuilder)
        {
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
                v => v.HasValue ? v.Value.ToUniversalTime() : v,
                v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (entityType.IsKeyless)
                {
                    continue;
                }

                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(dateTimeConverter);
                    }
                    else if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(nullableDateTimeConverter);
                    }
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ApplyDateTimeUtcConverters(modelBuilder);
            
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