using System;
using System.Collections.Generic;
using System.Text;
using Entities;
using Entities.Models;
using Contracts;

namespace Repository
{
    public class FriendRepository: RepositoryBase<Friend>, IFriendRepository
    {
        public FriendRepository(ApplicationDbContext applicationDbContext)
            : base(applicationDbContext)
        {

        }
    }
}
