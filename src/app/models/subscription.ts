export interface Subscription {
  id: string;
  current_period_end: number;
  customer: string;
  status: string;
  cancel_at_period_end: boolean;
}
