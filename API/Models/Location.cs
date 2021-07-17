using System;

#nullable disable

namespace API.Models
{
    public partial class Location
    {
        public int LocationId { get; set; }
        public string LocationCode { get; set; }
        public string LicensePlate { get; set; }
        public int? VehicleTypeId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Level { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
