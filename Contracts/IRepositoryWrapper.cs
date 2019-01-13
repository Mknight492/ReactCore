using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IFriendRepository  Friends {get;}
        ILocationsRepository Locations { get; }
        int UnitOfWorkComplete();
        void Dispose();
    }
}
