import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SlicePipe } from '@angular/common';
import * as _ from 'underscore';
import { FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { PagerService } from '../services/index';
import { MyService } from '../services/app.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})


export class ShopComponent implements OnInit {

  showLoader = true;
  email:string;
  arr: string[];/*= ['Card title 1','Card title 2', 'Card title 3',
                  'Card title 4', 'Card title 5', 'Card title 6',
                  'Card title 7', 'Card title 8', 'Card title 9',
                  'Card title 10', 'Card title  11', 'Card title 12',
                  'Card title 13', 'Card title 14', 'Card title 15', 
                  'Card title 16', 'Card title 17', 'Card title 18',
                  'Card title 19', 'Card title 20', 'Card title 21'];*/
  constructor(private http: Http, private pagerService: PagerService, private service: MyService) { }
  
      // array of all items to be paged
      private allItems: any[];
  
      // pager object
      pager: any = {};
  
      // paged items
      pagedItems: any[];
  
      ngOnInit() {
        this.service.getShopData().subscribe(data => this.load(data));      
      }
      load(data): any {
        this.showLoader = false;
        if(data['status'] == 'success'){
          //console.log(data['records']);
          this.allItems = data['records'];
          //console.log(this.allItems[0]['img']);
          this.setPage(1);
        }else{
          alert('error');
        }
      }
      setPage(page: number) {
          if (page < 1 || page > this.pager.totalPages) {
              return;
          }
  
          // get pager object from service
          this.pager = this.pagerService.getPager(this.allItems.length, page);
  
          // get current page of items
          this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }

      /*onNavigate(id){
        window.open(this.getDimensionsByFilter(id)[0]['article_url'], "_blank");
      }
      getDimensionsByFilter(id){
        return this.allItems.filter(x => x.id === id);
      }*/
      
}
