﻿using System.ComponentModel.DataAnnotations;

namespace MessagingAppFullStack.Requests;

public class TokenRequest
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}