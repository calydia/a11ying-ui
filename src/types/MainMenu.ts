export interface MainMenu {
  firstLevel: Array<{
    element: string;
    iconClass?: string;
    button?: string;
    mainPath?: string;
    menuPath?: string;
    menuLink?: {
      relationTo?: string;
      value: { title: string; pageUrl: string };
    };
    secondLevel?: MainMenuItem[];
    thirdLevel?: MainMenuItem[];
  }>;
}

export interface MainMenuItem {
  element: string;
  iconClass?: string;
  button?: string;
  mainPath?: string;
  menuPath?: string;
  menuLink?: {
    relationTo?: string;
    value: { title: string; pageUrl: string };
  };
  secondLevel?: MainMenuItem[];
  thirdLevel?: MainMenuItem[];
}
