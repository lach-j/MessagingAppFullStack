using System.ComponentModel.DataAnnotations;

namespace MessagingAppFullStack.Requests;

public class NewUserRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(8)]
    [RegularExpression(
        @"^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*`~])(?=.*\d).+$",
        ErrorMessage =
            "Password must contain at least one lowercase character, one uppercase character, one digit, and one special character !@#$%^&*`~")]
    public string Password { get; set; }

    [Compare(nameof(Password))]
    [Required]
    public string ConfirmPassword { get; set; }
}