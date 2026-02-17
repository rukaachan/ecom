"use client";

import {
  Archive,
  Building,
  GalleryVerticalEnd,
  Home,
  MapPin,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";
import type * as React from "react";
import { FormLogout } from "@/app/(admin)/dashboard/(index)/_components/form-logout";
import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "E-Commerce Admin",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: Archive,
    },
    {
      title: "Brands",
      url: "/dashboard/brands",
      icon: Building,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: User,
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: MapPin,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <FormLogout />
      {/*<SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>*/}
      <SidebarRail />
    </Sidebar>
  );
}
