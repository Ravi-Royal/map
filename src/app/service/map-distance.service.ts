import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapDistanceService {

  constructor(private http: HttpClient) { }

  getCity(location = "chennai") {
    return this.http.get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.8f08b52a102189642396f4bb5228b660&q=${location}&limit=5`)
  }
  // getLatandLan(location = "chennai") {
  //   return this.http.get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.8f08b52a102189642396f4bb5228b660&q=${location}&limit=1`)
  // }
}
