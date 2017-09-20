import { HeroService } from './hero.service';
import 'rxjs/add/operator/switchMap';
import { Component,Input,OnInit } from '@angular/core';
import { Hero } from './hero';
import {Location } from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector:'hero-detail',
    templateUrl: './hero-detail.component.html'
})  

export  class HeroDetailComponent implements OnInit
{
 hero:Hero;
constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location:Location){}
    ngOnInit(): void {
        this.route.paramMap
          .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
          .subscribe(hero => this.hero = hero);
      }
      goBack(): void {
        this.location.back();
      }
      save(): void{
          this.heroService.update(this.hero).then(() => this.goBack());
      }
}


