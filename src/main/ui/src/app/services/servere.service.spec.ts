import { TestBed, inject } from '@angular/core/testing';

import { ServereService } from './servere.service';

describe('ServereService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServereService]
    });
  });

  it('should be created', inject([ServereService], (service: ServereService) => {
    expect(service).toBeTruthy();
  }));
});
