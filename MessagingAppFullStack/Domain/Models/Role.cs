using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MessagingAppFullStack.Domain.Models;

public class Role
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key] public long Id { get; set; }

    [Required] public string Name { get; set; }

    public ICollection<Permission> Permissions { get; set; }

    [JsonIgnore]
    public ICollection<User> Users { get; set; }
}