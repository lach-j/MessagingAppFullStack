﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Domain.Models;

[Index(nameof(Email), IsUnique = true)]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Email { get; set; }

    [JsonIgnore]
    public string Password { get; set; }

    public virtual ICollection<Role> Roles { get; set; }
    [JsonIgnore]
    public ICollection<MessageGroup> MessageGroups { get; set; }
}