import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contador-animado',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './contador-animado.component.html',
  styleUrl: './contador-animado.component.css',
})
export class ContadorAnimadoComponent implements OnInit {
  @ViewChild('contadorElemento') contadorElemento: ElementRef | undefined;
  contador: number = 0;
  @Input() cantidad = 0;
  duracionTotal: number = 50; // Duración total en milisegundos (3 segundos)
  pasos: number = 50; // Número de pasos (ajustable para suavidad)

  ngOnInit() {
    this.iniciarContador();
  }

  iniciarContador(): void {
    const incremento = this.cantidad / this.pasos;
    const intervalo = this.duracionTotal / this.pasos;
    let pasoActual = 0;

    // Función recursiva que actualiza el contador con requestAnimationFrame
    const actualizarContador = () => {
      if (pasoActual < this.pasos) {
        if (this.contadorElemento) {
          // Aplicamos la clase 'incrementando' mientras el número sube
          this.contadorElemento.nativeElement.classList.add('incrementando');
        }

        this.contador = incremento * pasoActual;

        pasoActual++;

        setTimeout(() => {
          requestAnimationFrame(actualizarContador);
        }, intervalo);
      } else {
        this.contador = this.cantidad;
        if (this.contadorElemento) {
          // Aplicamos la clase 'finalizado' cuando el contador ha llegado al valor final
          this.contadorElemento.nativeElement.classList.add('finalizado');
        }
      }
    };

    // Iniciar la animación
    actualizarContador();
  }
}
