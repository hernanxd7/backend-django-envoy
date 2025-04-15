import { TestBed } from '@angular/core/testing';

import { ResearchPapersService } from './research-papers.service';

describe('ResearchPapersService', () => {
  let service: ResearchPapersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchPapersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
