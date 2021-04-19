import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Horse } from '../horse';
import { HorseService } from '../horse.service';
import { ColorEvent } from 'ngx-color';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-horses',
  templateUrl: './horses.component.html',
  styleUrls: ['./horses.component.css']
})

export class HorsesComponent implements OnInit {
  horses: Horse[];
  selectedHorse: Horse;
  @Output() horseSelected: EventEmitter<Horse> = new EventEmitter();
  @Input() horseToDelete: Horse;
  constructor(private horseService: HorseService, private heroService: HeroService, public router: Router) { }
  ngOnInit(): void {
    this.getHorses();
  }

  getHorses(): void{
    this.horseService.getHorses()
    .subscribe(horses => this.horses = horses);
  }

  add(name: string, color: string): void {
    name = name.trim();
    if (!name) { return; }
    this.horseService.addHorse({ name, color } as Horse)
      .subscribe(horse => {
        this.horses.push(horse);
      });
  }

  delete(horse: Horse): void {
    this.horses = this.horses.filter(h => h !== horse);
    this.horseService.deleteHorse(horse.id).subscribe();
  }

  handleChange($event: ColorEvent) {
    console.log($event.color);
  }

  selectHorse(horse: Horse) {
    this.selectedHorse = horse;
    this.horseSelected.emit(horse);
  }
}
