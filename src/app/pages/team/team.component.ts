import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from '../../components/team-card/team-card.component';
import { TeamMember } from '../../models/team-member.model';
import { TEAM_MEMBERS } from '../../data/team.data';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TeamCardComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit, OnDestroy, AfterViewInit {
  team: TeamMember[] = TEAM_MEMBERS;

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  scrollInterval: any;
  scrollSpeed = 1; // Pixels per interval
  isPaused = false;
  progressPercent = 0; // Track progress for the progress bar

  // No duplication needed for 4 people
  displayTeam: TeamMember[] = this.team;

  scrollDirection = 1; // 1 for Forward, -1 for Backward

  ngOnInit() {
    // Logic initiated in AfterViewInit for DOM access
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.stopAutoScroll();

    this.scrollInterval = setInterval(() => {
      if (!this.isPaused && this.carouselTrack) {
        const track = this.carouselTrack.nativeElement;
        const maxScroll = track.scrollWidth - track.clientWidth;

        // Only scroll if there is content to scroll
        if (maxScroll <= 1) return;

        // Apply movement
        track.scrollLeft += this.scrollSpeed * this.scrollDirection;

        // Reverse direction at the edges with a buffer for fractional pixels
        if (this.scrollDirection === 1 && track.scrollLeft >= maxScroll - 1) {
          this.scrollDirection = -1;
        } else if (this.scrollDirection === -1 && track.scrollLeft <= 1) {
          this.scrollDirection = 1;
        }

        // Update progress bar based on total scrollable distance
        this.progressPercent = (track.scrollLeft / maxScroll) * 100;
      }
    }, 20); // ~50fps
  }

  stopAutoScroll() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }

  onMouseEnter() {
    this.isPaused = true;
  }

  onMouseLeave() {
    this.isPaused = false;
  }
}
