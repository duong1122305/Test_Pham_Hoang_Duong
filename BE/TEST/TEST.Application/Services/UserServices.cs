using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TEST.Data;

namespace TEST.Application.Services
{
    public class UserServices
    {
        private readonly UserDbContext _context;

        public UserServices(UserDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await Task.FromResult(_context.Users.ToList());
        }

        public async Task<bool> Create(User user)
        {
            try
            {
                if (user == null) return false;

                await _context.Users.AddAsync(user);
                if(await _context.SaveChangesAsync() > 0)
                {
                    return true;
                }

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> Update(int id, User user)
        {
            try
            {
                var find = await _context.Users.FindAsync(id);
                if (find == null) return false;

                find.Name = user.Name;
                find.Dob = user.Dob;
                find.Email = user.Email;
                find.Phone = user.Phone;
                find.Address = user.Address;

                _context.Users.Update(find);
                if (await _context.SaveChangesAsync() > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var find = await _context.Users.FindAsync(id);
                if (find == null) return false;
                _context.Users.Remove(find);
                if (await _context.SaveChangesAsync() > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<User> GetById(int id)
        {
            try
            {
                var find = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

                if (find == null) return new User();

                return find;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
