using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using MessagingAppFullStack.Security;

namespace MessagingAppFullStack.Domain.Models;

[Table(nameof(Permission))]
public class Permission
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Required]
    public PermissionType Name { get; set; }

    public string Description { get; set; }

    [JsonIgnore]
    public ICollection<Role> Roles { get; set; }
}