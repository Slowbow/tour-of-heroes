import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Horse } from '../horse';
import { HorseService } from '../horse.service';
import { HorsesComponent } from '../horses/horses.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  horses: Horse;

  constructor(private heroService: HeroService, private horseService: HorseService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  //It would remove horse object from the hero and add it back to Horses list
  //UI element needs to be touched-up
  unassign(hero: Hero): void {
    //Add horse back to horses list 
    // this.horseService.addHorse({ this.horse.name, this.horse.color } as Horse)
    //     .subscribe(horse => {
    //       this.horses.push(horse);
    //     });
    // }    
    hero.horse = {} as any;
    this.heroService.updateHero(hero).subscribe();
  }
}
