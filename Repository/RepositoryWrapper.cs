using Contracts;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private ApplicationDbContext _repoContext;
        public IFriendRepository Friends { get; private set; }
        public ILocationsRepository Locations { get; private set; }

        public RepositoryWrapper(ApplicationDbContext repositoryContext)
        {
            _repoContext = repositoryContext;
            Friends = new FriendRepository(repositoryContext);
            Locations = new LocationsRepository(repositoryContext);


        }



        public int UnitOfWorkComplete()
        {
            return _repoContext.SaveChanges();
        }

        public void Dispose()
        {
            _repoContext.Dispose();
        }



    }
}
