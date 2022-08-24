﻿using System.ComponentModel.DataAnnotations;

namespace api.DataModel
{
    public class CreateClientRequest
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }
    }
}
