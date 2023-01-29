using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Domain.Models;

[Index(nameof(Username), IsUnique = true)]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }


    public string Username { get; set; }

    [JsonIgnore]
    public string Password { get; set; }

    public virtual ICollection<Role> Roles { get; set; }
    public ICollection<MessageGroup> MessageGroups { get; set; }
}