import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PianoDiagram } from './piano-diagram';

describe('PianoDiagram', () => {
  let component: PianoDiagram;
  let fixture: ComponentFixture<PianoDiagram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PianoDiagram],
    }).compileComponents();

    fixture = TestBed.createComponent(PianoDiagram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
