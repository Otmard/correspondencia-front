import { Component, inject, OnInit } from '@angular/core';
import { HojasRutaService } from '../../core/services/hojas-ruta.service';
import { BuzonHojaRuta, HojaRuta } from '../../core/models/hojaRuta';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { list } from '@angular/fire/storage';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { Auth, getAuth } from '@angular/fire/auth';
import { PadNumberPipe } from '../../core/pipe/pad-number.pipe';
@Component({
  selector: 'app-entrante',
  standalone: true,
  imports: [
    PadNumberPipe,
    JsonPipe,
    DataViewModule,
    ButtonModule,
    TagModule,
    NgClass,
    DatePipe,
  ],
  templateUrl: './entrante.component.html',
  styleUrl: './entrante.component.css',
})
export class EntranteComponent implements OnInit {
  recibiryDerivar(_t12: any) {
    throw new Error('Method not implemented.');
  }
  recibir(hojaRuta: BuzonHojaRuta) {
    this.hojasRutaService
      .recibir(hojaRuta.id, this.currentUser!.uid)
      .subscribe((res) => {
        console.log(res);
        this.loadBuzon();
      });
  }
  currentUser = getAuth().currentUser;
  hojasRutaService = inject(HojasRutaService);
  buzon: BuzonHojaRuta[] = [];
  layout: 'list' | 'grid' = 'list';

  ngOnInit() {
    this.loadBuzon();
  }
  loadBuzon() {
    this.hojasRutaService
      .getBuzon(this.currentUser?.uid!)
      .subscribe((res: BuzonHojaRuta[]) => {
        this.buzon = res;
      });
  }
}
