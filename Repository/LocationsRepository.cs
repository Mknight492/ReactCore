using System;
using System.Collections.Generic;
using System.Text;
using Entities;
using Entities.Models;
using Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Repository
{
    public class LocationsRepository : RepositoryBase<Locations>, ILocationsRepository
    {
        public ApplicationDbContext _db;

        public LocationsRepository(ApplicationDbContext applicationDbContext)
            : base(applicationDbContext)
        {
            _db = applicationDbContext;
        }
        public IEnumerable<Locations> GetLocationsBySearchTerm(string searchTerm, int LocationsToReturn = 10)
        {
            return  _db.Locations
                      .AsNoTracking()
                       .Where(L => L.Name
                                    .StartsWith(searchTerm))
                      .Take(10)
                      .ToList();

            //LocationsStartingWithTerm = LocationsStartingWithTerm.Where(L => HasTwoDecimalPlace(L.Latitude) && HasTwoDecimalPlace(L.Longitude)).ToList();

           
            //if (LocationsStartingWithTerm.Any())
            //{
            //    return LocationsStartingWithTerm;
            //}

            //return  _db.Locations
            //            .AsNoTracking()
            //            .Where(L => L.Name.ToLower()
            //            .StartsWith(searchTerm.ToLower()) && HasTwoDecimalPlace(L.Latitude) && HasTwoDecimalPlace(L.Longitude))
            //            .Take(LocationsToReturn)
            //            .ToList();

        }





        public bool HasTwoDecimalPlace(double number)
        {
            if ((number * 10) % 1 == 0)
            {
                return false;
            }

            return true;
        }
    }
}