import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProgressionDetail } from './progression-detail';

describe('ProgressionDetail', () => {
  let component: ProgressionDetail;
  let fixture: ComponentFixture<ProgressionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressionDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressionDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
