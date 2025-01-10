import { Component, inject, OnInit } from '@angular/core';
import { BuzonVacioComponent } from '../../components/buzon-vacio/buzon-vacio.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { BuzonHojaRuta, HojaRuta } from '../../core/models/hojaRuta';
import { PadNumberPipe } from '../../core/pipe/pad-number.pipe';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { HojasRutaService } from '../../core/services/hojas-ruta.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-enviado',
  standalone: true,
  imports: [
    PadNumberPipe,
    NgClass,
    BuzonVacioComponent,
    DataViewModule,
    ButtonModule,
    DatePipe,
    JsonPipe,
  ],
  templateUrl: './enviado.component.html',
  styleUrl: './enviado.component.css',
})
export class EnviadoComponent implements OnInit {
  hojasRutaService = inject(HojasRutaService);
  cancelar(_t12: HojaRuta) {
    throw new Error('Method not implemented.');
  }
  enviados: HojaRuta[] = [];
  layout: 'list' | 'grid' = 'list';
  currentUser = getAuth().currentUser;
  ngOnInit() {
    this.loadEnviados();
  }
  loadEnviados() {
    this.hojasRutaService
      .getDerivados(this.currentUser?.uid!)
      .subscribe((res: HojaRuta[]) => {
        this.enviados = res;
      });
  }
}
