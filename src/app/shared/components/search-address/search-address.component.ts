import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { config } from '../../../core/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';

@Component({
  selector: 'app-search-address',
  templateUrl: './search-address.component.html',
  styleUrls: ['./search-address.component.scss'],
})
export class SearchAddressComponent implements OnInit {
  @Output() fly: EventEmitter<any> = new EventEmitter<any>();
  items = {
  };
  valueSearch  = '';
  constructor(private apiMapbox: ApiMapboxService) { }

  ngOnInit() { }

  search(): void {
    this.apiMapbox.getSearch(this.valueSearch, {limit: 10}).subscribe(
      (response) => {
        this.items = response.body;
        document.getElementById('search-result').classList.add('hasItems');
      }, (error) => {
        this.items = {};
        document.getElementById('search-result').classList.remove('hasItems');
      }
    );
  }

  clickResultSearch(item: any): void {
    this.fly.emit(item);
    document.getElementById('search-result').classList.remove('hasItems');
    this.items = {};
  }

  focusFunction() {
    document.getElementById('search-form').classList.add('focus');
    this.search();
  }

  focusOutFunction() {
    document.getElementById('search-form').classList.remove('focus');
    document.getElementById('search-result').classList.remove('hasItems');
  }
}
