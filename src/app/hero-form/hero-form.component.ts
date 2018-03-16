import { Component, OnInit , EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  @Output() onAdded = new EventEmitter<Hero>();

  hero : Hero ;

  constructor( private heroservice: HeroService ) { }

  ngOnInit() {
    this.reset();
  }

  save() : void {
    this.heroservice.addHero(this.hero).subscribe(hero => {
        this.onAdded.emit(hero);
        this.reset();
    });
  }

  reset() : void {
    this.hero = {
      _id : "" ,
      name : "" ,
      no : 0
    };
  }

}
