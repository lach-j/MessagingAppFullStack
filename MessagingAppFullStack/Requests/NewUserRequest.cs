using System.ComponentModel.DataAnnotations;

namespace MessagingAppFullStack.Requests;

public class NewUserRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(8)]
    public string Password { get; set; }

    [Compare(nameof(Password))]
    [Required]
    public string ConfirmPassword { get; set; }
}