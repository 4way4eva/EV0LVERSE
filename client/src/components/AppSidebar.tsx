import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Coins,
  Droplet,
  Users,
  Image,
  Shield,
  Scroll,
  FileText,
  Globe2,
  Swords,
  Lock,
  Building2,
  Flame,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const menuItems = [
  {
    title: "Core",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
    ],
  },
  {
    title: "Command & Control",
    items: [
      {
        title: "Overscale Matrix",
        url: "/overscale-matrix",
        icon: Globe2,
      },
      {
        title: "War Codex Theater",
        url: "/war-codex",
        icon: Swords,
      },
      {
        title: "Hidden Societies",
        url: "/hidden-societies",
        icon: Lock,
      },
      {
        title: "Mall Command",
        url: "/mall-command",
        icon: Building2,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Ceremonial Protocols",
        url: "/ceremonial",
        icon: Flame,
      },
      {
        title: "Market Intelligence",
        url: "/market-intelligence",
        icon: TrendingUp,
      },
      {
        title: "ENFT Story Mode",
        url: "/story-mode",
        icon: BookOpen,
      },
    ],
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🦁</div>
          <div>
            <h2 className="font-ceremonial text-lg font-bold tracking-wide">
              BLEULION
            </h2>
            <p className="text-xs text-muted-foreground">
              Treasury Command
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      data-testid={`sidebar-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
