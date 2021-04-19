import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Horse } from '../horse';
import { HorseService } from '../horse.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  horse: Horse;
  horseList: Horse[];
  realHorse: Horse;
  constructor(private heroService: HeroService, private horseService: HorseService) { }

  ngOnInit() {
    this.getHeroes();
    this.getHorses();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  getHorses(): void {
    this.horseService.getHorses()
      .subscribe(horseReal => this.horseList = horseReal);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero, horse?: Horse): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.horseList.forEach(realHorse => {
      if (realHorse.id === horse.id){
        realHorse.hero = false;
        this.horseService.updateHorse(realHorse).subscribe();
        console.log(realHorse);
      }
    });
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
