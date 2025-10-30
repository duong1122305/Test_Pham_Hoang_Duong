using Microsoft.AspNetCore.Mvc;
using TEST.Application.Services;
using TEST.Data;

namespace TEST.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly UserServices _userServices;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userServices.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userServices.GetById(id);

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            try
            {
                if(await _userServices.Create(user))
                {
                    return Ok("User created successfully.");
                }

                return BadRequest("Failed to create user.");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, User user)
        {
            try
            {
                if (await _userServices.Update(id, user))
                {
                    return Ok("User updated successfully.");
                }
                return BadRequest("Failed to update user.");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if(await _userServices.Delete(id)) return Ok("User deleted successfully.");

                return BadRequest("Failed to delete user.");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
