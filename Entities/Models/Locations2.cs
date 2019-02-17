using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.Models
{
    public partial class Locations2
    {
        [Key]
        public int Geonameid { get; set; }
        public string Name { get; set; }
        public string Asciiname { get; set; }
        public string Alternatenames { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string FeatureClass { get; set; }
        public string FeatureCode { get; set; }
        public string CountryCode { get; set; }
        public string Cc2 { get; set; }
        public string Admin1Code { get; set; }
        public string Admin2Code { get; set; }
        public string Admin3Code { get; set; }
        public string Admin4Code { get; set; }
        public int? Population { get; set; }
        public int? Elevation { get; set; }
        public int? Dem { get; set; }
        public string Timezone { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
