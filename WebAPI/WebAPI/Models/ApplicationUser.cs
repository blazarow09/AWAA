using Microsoft.AspNetCore.Identity;

namespace WebAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        //Adding own properties to Identity model.
        public string FullName { get; set; }
    }
}