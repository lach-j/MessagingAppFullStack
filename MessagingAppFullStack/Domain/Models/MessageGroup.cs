
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MessagingAppFullStack.Domain.Models;

public class MessageGroup
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public ICollection<Message> Messages { get; set; }
    public ICollection<User> ActiveUsers { get; set; }
    public string GroupName { get; set; }
}