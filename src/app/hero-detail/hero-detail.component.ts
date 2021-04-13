import { Component, Input, OnInit } from '@angular/core';
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

  assignHorse(): void{
    this.showHorses = !this.showHorses;
  }

  onHorseSelectedHandler(horse: Horse): void {
    this.selectedHorse = horse;
    this.hero.horse = horse;
    this.save();
    //TO DO: remove horse from the list of horses
  }

}
