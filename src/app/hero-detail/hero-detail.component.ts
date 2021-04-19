import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Horse} from '../horse';
import { HorseService } from '../horse.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input () horse: Horse;
  hero: Hero;
  showHorses: boolean = false;
  selectedHorse: Horse;

  constructor(
    private route: ActivatedRoute,
    private horseService: HorseService,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  showAssignHorse(): void{
    this.showHorses = !this.showHorses;
  }

    // Selected horse is being assigned to a hero 
    onHorseSelectedHandler(horse: Horse): void {
    this.selectedHorse = horse;
    this.hero.horse = horse;
    this.save();
    horse.hero = true;
    this.horseService.updateHorse(horse).subscribe();
    console.log(horse);
  }
}

