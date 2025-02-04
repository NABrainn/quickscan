import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { LoadingService } from 'app/scanner/core/loading.service';


@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent {

  private el = viewChild('progress', {'read': ElementRef})
  private loadingService = inject(LoadingService);
  isLoading = computed(() => this.loadingService.isLoading());

  ngOnInit() {
    this.el()?.nativeElement.style
    console.log('loading...')
  }

  ngOnDestroy() {
    console.log('loading complete.')
  }
}
