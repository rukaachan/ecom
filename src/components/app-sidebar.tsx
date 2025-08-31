"use client";

import {
  Archive,
  AudioWaveform,
  Building,
  Command,
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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: Archive,
    },
    {
      title: "Location",
      url: "/dashboard/locations",
      icon: MapPin,
    },
    {
      title: "Brands",
      url: "/dashboard/brands",
      icon: Building,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
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
