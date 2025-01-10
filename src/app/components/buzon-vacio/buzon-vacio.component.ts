import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-buzon-vacio',
  standalone: true,
  imports: [],
  templateUrl: './buzon-vacio.component.html',
  styleUrl: './buzon-vacio.component.css'
})
export class BuzonVacioComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Retrasar la animación 1 segundo
    setTimeout(() => {
      const svgElement = this.el.nativeElement.querySelector('svg');
      this.renderer.addClass(svgElement, 'animated'); // Agregar clase con Renderer2
    }, 500);
  }
}
