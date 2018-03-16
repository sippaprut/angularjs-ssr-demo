import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];


  constructor(private heroservice: HeroService ) { }

  getHeroes(): void {
    this.heroservice.getHeroes().subscribe(heroes => this.heroes = heroes );
  }

  delete(hero: Hero): void {
    this.heroservice.deleteHero(hero).subscribe((response) => {
      this.heroes = this.heroes.filter( h => h !== hero);
    });
  }

  onAdded(hero: Hero): void {
    this.heroes.push(hero);
  }

  ngOnInit() {
    this.getHeroes();
  }

}
