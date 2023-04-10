import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from '../../models/subscription';

@Component({
  selector: 'app-subscription-manager',
  templateUrl: './subscription-manager.component.html',
  styleUrls: ['./subscription-manager.component.scss']
})
export class SubscriptionManagerComponent implements OnInit {
  subscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getSubscription();
  }

  getSubscription(): void {
    this.dataService.getSubscription().subscribe((subscription: Subscription) => {
      this.subscription = subscription;
    });
  }

  isActive(): boolean {
    return (this.subscription?.status === 'active' || this.subscription?.status === 'trialing') && !this.subscription?.cancel_at_period_end;
  }

  isCancelled(): boolean {
    return this.subscription?.cancel_at_period_end;
  }

  subscribe(): void {
    this.dataService.goToCheckout().subscribe();
  }

  resubscribe(): void {
    this.dataService.resubscribe().subscribe(() => {
      this.getSubscription();
    });
  }

  cancelSubscription(): void {
    this.dataService.cancelSubscription().subscribe(() => {
      this.getSubscription();
    });
  }

  updateSubscription(): void {
    this.dataService.goToUpdateSubscription().subscribe(({ url }) => {
      window.location.href = url;
    });
  }
}
