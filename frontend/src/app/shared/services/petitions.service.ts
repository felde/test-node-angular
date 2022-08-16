import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoints } from '../constants/endpoints';

@Injectable({
    providedIn: 'root',
})
export class PetitionsService {
    private httpConfig: any = {};
    constructor(private _http: HttpClient) { }
    private async resetconfig() {
        this.httpConfig = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                token: localStorage.getItem('userSession') ?? '',
            }),
            data: '',
            body: '',
            async: false,
            params: '',
        };
    }
    public doPetition<T>(
        apiAccess: string,
        bodyData: any = null,
        queryParams: any = null
    ): Observable<any> {
        let api: any =
            endpoints.filter((f) => f.petition == apiAccess).length > 0
                ? endpoints.filter((f) => f.petition == apiAccess)[0]
                : null;
        let endpoint: string = '';
        if (api) {
            this.resetconfig();
            if (queryParams != null) {
                Object.keys(queryParams).forEach((e) => {
                    endpoint = api?.url.replace(`:${e}`, queryParams[e]);
                });
            } else endpoint = api?.url;
            if (bodyData != null) this.httpConfig.body = bodyData;
            return this._http.request<T>(
                api.type,
                environment.urlBase + endpoint,
                this.httpConfig
            );
        } else return of({ msg: 'error', code: 500, data: null });
    }
}