import { NgBusinessHoursDaySettings } from '../components/business-hours/business-hours-day-settings.model';

export class BusinessHour {
  id?: number;
  order?: number;
  from: string;
  to: string;
  open: boolean;
  userId?: number;

  constructor(businessHourSetting: NgBusinessHoursDaySettings) {
    this.from = businessHourSetting.from;
    this.to = businessHourSetting.to;
    this.open = businessHourSetting.open;
  }
}
