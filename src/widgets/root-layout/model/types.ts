export type NavItem = {
  label: string;
  path: string;
  children?: Omit<NavItem[], "children">;
}

export type NavLinkItemProps = {
  className: ({ isActive }: {
    isActive?: boolean | undefined;
  }) => string;
  field: NavItem
}