
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MessagingAppFullStack.Domain.Models;

public class MessageGroup
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    [JsonIgnore]
    public ICollection<Message> Messages { get; set; }
    public ICollection<User> ActiveUsers { get; set; }
    public string GroupName { get; set; }
}