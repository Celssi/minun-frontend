import {SocialMediaLink} from './socialMediaLink';
import {WorkHistory} from './workHistory';
import {Education} from './education';

export class User {
  id: string;
  accountType: string;
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  email: string;
  phone: string;
  token: string;
  active: boolean;
  theme: string;
  image: string;
  description: string;
  location: string;
  website: string;
  languages: string;
  specialSkills: string;
  handle: string;

  socialMediaLinks: SocialMediaLink[];
  workHistories: WorkHistory[];
  educations: Education[];

  constructor() {
    this.active = true;
  }
}
