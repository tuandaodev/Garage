import { HttpClient } from '@angular/common/http';

export class VehicleService {
    
    public constructor(private http: HttpClient, private apiUrl: string) {}

    public getVehicleTypes() {
        const url = `${this.apiUrl}/VehicleTypes`;
        return this.http.get<any>(url);
    }
}
