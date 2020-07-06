import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargoPage } from './cargo.page';

describe('CargoPage', () => {
  let component: CargoPage;
  let fixture: ComponentFixture<CargoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
