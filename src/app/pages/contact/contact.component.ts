import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroComponent } from '../../components/hero/hero.component';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeroComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  protected readonly env = environment;
  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;

  // Service options for checkboxes
  services = [
    { id: 'venue', label: 'Venue Booking', icon: 'bi-building' },
    { id: 'catering', label: 'Catering', icon: 'bi-cup-hot' },
    { id: 'decoration', label: 'Decoration', icon: 'bi-flower1' },
    { id: 'photography', label: 'Photography', icon: 'bi-camera' },
    { id: 'entertainment', label: 'Entertainment', icon: 'bi-music-note' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email], // Optional but validated if provided
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      eventType: [''],
      eventDate: ['', Validators.required],
      eventVenue: [''],
      guestCount: [''],
      budgetRange: [''],
      services: this.fb.group({
        venue: [false],
        catering: [false],
        decoration: [false],
        photography: [false],
        entertainment: [false]
      }),
      message: ['']
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.submitStatus = null;

    try {
      const formValue = this.contactForm.value;

      // Get selected services
      const selectedServices = Object.keys(formValue.services)
        .filter(key => formValue.services[key])
        .map(key => this.services.find(s => s.id === key)?.label)
        .join(', ');

      // Prepare email template parameters
      const templateParams = {
        from_name: formValue.name,
        from_email: formValue.email,
        phone: formValue.phone,
        event_type: formValue.eventType,
        event_date: formValue.eventDate || 'Not specified',
        guest_count: formValue.guestCount || 'Not specified',
        budget_range: formValue.budgetRange || 'Not specified',
        services: selectedServices || 'None selected',
        message: formValue.message,
        to_email: environment.contact.email
      };

      // Send email via EmailJS
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams,
        environment.emailjs.publicKey
      );

      // Prepare WhatsApp message
      const whatsappMessage = this.formatWhatsAppMessage(formValue, selectedServices);

      // Open WhatsApp in new tab
      const whatsappUrl = `https://wa.me/${environment.whatsapp.phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      this.submitStatus = 'success';
      this.contactForm.reset();
    } catch (error) {
      this.submitStatus = 'error';
      console.error('Submission error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private formatWhatsAppMessage(formData: any, selectedServices: string): string {
    return `*New Event Inquiry - The Planning Paradise*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}

*Event Details:*
• Type: ${formData.eventType}
• Date: ${formData.eventDate || 'Not specified'}
• Guest Count: ${formData.guestCount || 'Not specified'}
• Budget Range: ${formData.budgetRange || 'Not specified'}

*Services Needed:*
${selectedServices || 'None selected'}

*Message:*
${formData.message}`;
  }
}
