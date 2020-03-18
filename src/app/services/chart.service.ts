import { Injectable } from '@angular/core';

// external libs
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// interfaces
import { Company } from '@interfaces';

// data
import { default as chart_data } from '../../assets/storage/chart.json';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public getChartData(): Observable<Company[]> {
    return of(chart_data).pipe(
      map((items) => items.filter(company => !!company.monthRevenue))
    );
  }

}
