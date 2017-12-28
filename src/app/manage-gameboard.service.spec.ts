import { TestBed, inject } from '@angular/core/testing';

import { ManageGameboardService } from './manage-gameboard.service';

describe('ManageGameboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageGameboardService]
    });
  });

  it('should be created', inject([ManageGameboardService], (service: ManageGameboardService) => {
    expect(service).toBeTruthy();
  }));
});
