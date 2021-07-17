using System;

namespace API.Responses
{
    public class LocationBriefDto
    {
        public int LocationId { get; set; }
        public string LocationCode { get; set; }
        public string LicensePlate { get; set; }
        public string VehicleTypeName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
