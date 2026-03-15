export interface FooterMenu {
  navigationLinks: FooterMenuRaw[];
}

export interface FooterMenuRaw {
  iconClass: string;
  menuLink?: {
    value: {
      title: string;
      pageUrl: string;
    };
  };
}

export interface FooterMenuItem {
  iconClass: string;
  menuLink?: {
    title: string;
    pageUrl: string;
  };
}
