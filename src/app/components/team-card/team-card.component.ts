import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../models/team-member.model';
import { LazyImageComponent } from '../shared/lazy-image/lazy-image.component';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, LazyImageComponent],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss'
})
export class TeamCardComponent {
  @Input() member!: TeamMember;
}
