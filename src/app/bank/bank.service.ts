import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService implements Resolve<any> {
  routeParam: any;
  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.routeParam = route.params
    if (this.routeParam.id) {
      if (this.routeParam.id !== 'new') {
        return this.getDataById(this.routeParam.id);
      }
      return this.initialData();
    } else {
      return this.getDataList();
    }
  }

  private authorizationHeader() {
    let token = environment.production ? window.localStorage.getItem(`token@${environment.appName}`) : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXNtZW1iZXIiOiJ3YWl0YXBwcm92ZSIsImZpcnN0bmFtZSI6InR5IiwibGFzdG5hbWUiOiItIiwiZW1haWwiOiJ0eUBnbWFpbC5jb20iLCJwcm9maWxlSW1hZ2VVUkwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2hmbHZsYXYwNC9pbWFnZS91cGxvYWQvdjE0ODc4MzQxODcvZzNod3lpZWI3ZGw3dWdkZ2ozdGIucG5nIiwicm9sZXMiOlsidXNlciJdLCJfaWQiOiI1ZDVkMmZlYzExZTM0MzAwMTJhMTc1MGMiLCJ1c2VybmFtZSI6InR5QGdtYWlsLmNvbSIsInJlZjEiOiItIiwicmVtYXJrcmVqZWN0dGVhbSI6W10sImhpc3RvcnlhYm91dHRlYW0iOltdLCJjcmVhdGVkIjoiMjAxOS0wOC0yMVQxMTo1MDowNC41MDNaIiwicHJvdmlkZXIiOiJsb2NhbCIsImRpc3BsYXluYW1lIjoidHkgLSIsIl9fdiI6MCwibG9naW5Ub2tlbiI6IiJ9.7i-dIE_2U4s-cdhWMLIDNcbFCtcmo5GKPKz5bDeUkqs";

    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return headers;
  }

  getDataList() {
    return this.http.get('http://localhost:3000/api/banks', { headers: this.authorizationHeader() })
  }

  initialData() {
    let body;
    return body = {
      name: "",
      image: "https://icon-library.com/images/add-picture-icon/add-picture-icon-14.jpg",
      separatetype: null,
      separatechar: "",
      rows: [
        {
          fields: [
            {
              fieldname: "",
              fieldtype: "",
              fieldlength: null,
              defaultvalue: "",
              seq: 1,
              example: ""
            }
          ]
        }
      ],
      encryptcmd: "",
      uploadcmd: "",
      maxamount: 200
    }
  }

  getDataById(id): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.get('http://localhost:3000/api/banks/' + id, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        resolve(res.data);
      })
    })
  }
}
