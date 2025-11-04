import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [],
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.scss',
})
export class VideoModalComponent {
  @Output() closed = new EventEmitter<void>();
  close() {
    this.closed.emit();
  }
}
