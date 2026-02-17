import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryItem } from '../../models/gallery-item.model';
import { LazyImageComponent } from '../shared/lazy-image/lazy-image.component';

@Component({
  selector: 'app-design-card',
  standalone: true,
  imports: [CommonModule, LazyImageComponent],
  templateUrl: './design-card.component.html',
  styleUrl: './design-card.component.scss'
})
export class DesignCardComponent {
  @Input() item!: GalleryItem;
  @Output() view = new EventEmitter<void>();

  onView() {
    this.view.emit();
  }
}
