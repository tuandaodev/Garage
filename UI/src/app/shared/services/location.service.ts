import { HttpClient } from '@angular/common/http';
import { CheckInResultModel, CheckOutResultModel } from '../models/location.model';

export class LocationService {

    public constructor(private http: HttpClient, private apiUrl: string) {}

    public getBriefLocations(params?: any) {
        const url = `${this.apiUrl}/Locations`;
        return this.http.get<any>(url, { params });
    }

    public getLevels() {
        const url = `${this.apiUrl}/Locations/get-levels`;
        return this.http.get<number[]>(url);
    }

    public createLocation(data: any) {
        const url = `${this.apiUrl}/Locations`;
        return this.http.post<any>(url, data);
    }

    public checkin(data: any) {
        const url = `${this.apiUrl}/Locations/checkin`;
        return this.http.post<CheckInResultModel>(url, data);
    }

    public checkout(data: any) {
        const url = `${this.apiUrl}/Locations/checkout`;
        return this.http.post<CheckOutResultModel>(url, data);
    }

    public deleteLevel(levelId: number) {
        const url = `${this.apiUrl}/Locations/level/${levelId}`;
        return this.http.delete<any>(url);
    }
}
