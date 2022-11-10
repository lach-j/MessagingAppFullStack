using System.ComponentModel.DataAnnotations;
using MessagingAppFullStack.Security;

namespace MessagingAppFullStack.Requests;

public class NewPermissionRequest
{
    [Required]
    public PermissionType Name { get; set; }

    public string Description { get; set; }
}