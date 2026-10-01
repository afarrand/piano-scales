import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProgressionsList } from './progressions-list';

describe('ProgressionsList', () => {
  let component: ProgressionsList;
  let fixture: ComponentFixture<ProgressionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressionsList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressionsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
