export type RootLayoutNavLink = {
  label: string;
  icon?: React.ReactElement;
  to?: string;
  children?: RootLayoutNavLink[];
}