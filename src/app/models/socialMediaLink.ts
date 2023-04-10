export enum LinkType {
  Facebook,
  Twitter,
  Github,
  Linkedin
}

export class SocialMediaLink {
  id: string;
  type: LinkType;
  link: string;
}
