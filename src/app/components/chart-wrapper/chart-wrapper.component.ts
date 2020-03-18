import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// external libs
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable, of } from 'rxjs';

// services
import { ChartService } from '@service';

// models
import { CompanyChart } from '@models';

// enums
import { Category } from '../../enums';

// interfaces
import { ChartCompany, ChartForm, Company } from '@interfaces';

// data
import { default as categories } from '../../../assets/storage/categories.json';
import { default as company } from '../../../assets/storage/company.json';

@Component({
  selector: 'app-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWrapperComponent implements OnInit, OnDestroy {

  public companiesList$: Observable<Company[]>;
  public companies$: Observable<ChartCompany[]>;
  public originCompanies$: Observable<ChartCompany[]>;
  public categories$: Observable<string[]> = of(categories);

  public form: FormGroup = this.buildForm();
  public selectedCompany: ChartCompany;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private chartService: ChartService,
  ) {
    this.initChartData();
  }

  public ngOnInit(): void {
    this.formListener();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private formListener(): void {
    const changed$ = this.form.valueChanges.pipe(takeUntil(this.destroy$));
    changed$.subscribe((form) => this.filterByObject(form));
  }

  private filterByObject(form: ChartForm): void {
    this.companies$ = this.originCompanies$
      .pipe(
        map(list => list.filter(v =>
          Object.keys(form).every(key => this.filterItem(form, key, v)))
        ),
        tap(data => this.setCurrentCompany(data))
      );
  }

  private filterItem(form: ChartForm, key: string, item: ChartCompany): boolean {
    return this.isDefaultValue(form, key) ? item[key] === form[key] : true;
  }

  private setCurrentCompany(companies: ChartCompany[]): void {
    this.selectedCompany = (this.form.get('name').value !== Category.allOccurrences) ? companies[0] : null;
  }

  private isDefaultValue(form: ChartForm, key: string): boolean {
    return (form[key] !== Category.allOccurrences) && (form[key] !== Category.allCategories);
  }

  private initChartData(): void {
    this.companies$ = this.chartService.getChartData()
      .pipe(
        tap((companies) => this.companiesList$ = of([company, ...companies])),
        map((list: Company[]) => list.map(item => new CompanyChart(item))),
        tap(origin => this.originCompanies$ = of(origin)),
      );
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      category: new FormControl(Category.allOccurrences),
      name: new FormControl(Category.allOccurrences)
    });
  }

}
