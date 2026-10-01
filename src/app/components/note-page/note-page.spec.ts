import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotePage } from './note-page';

describe('NotePage', () => {
  let component: NotePage;
  let fixture: ComponentFixture<NotePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
