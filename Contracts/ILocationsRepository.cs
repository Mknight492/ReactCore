using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface ILocationsRepository: IRepositoryBase<Locations>
    {
        IEnumerable<Locations> GetLocationsBySearchTerm(string searchTerm, int LocationsToReturn);
    }
}
