using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MessagingAppFullStack.Domain.Models;

public class Message
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public User User { get; set; }
    public string Content { get; set; }
    public DateTime Timestamp { get; set; }
    [JsonIgnore]
    public MessageGroup MessageGroup { get; set; }
}