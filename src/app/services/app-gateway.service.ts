import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpActionEnum} from '../view-models/http-action.enum';

@Injectable({
  providedIn: 'root'
})
export class AppGatewayService {

  constructor(private http: HttpClient) { }

  public async call(path: string, body: any, httpAction: HttpActionEnum): Promise<any>{
    switch (httpAction){
      case HttpActionEnum.GET:
        return this.http.get(path).toPromise();
      case HttpActionEnum.POST:
        return this.http.post(path, JSON.stringify(body)).toPromise();
      case HttpActionEnum.PUT:
        return this.http.put(path, JSON.stringify(body)).toPromise();
      case HttpActionEnum.DELETE:
        return this.http.delete(path).toPromise();
      default:
        throw new Error('Unknown HTTP action');
    }
  }
}
