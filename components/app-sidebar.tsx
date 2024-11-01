"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

<<<<<<< HEAD
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
=======
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
>>>>>>> f24a7036b69f45640ac0573815df45a25a67a431
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

let  role= "admin"
  // role="etudiant"
  // role= "prof"
 
 
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Etudiants",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      
    },
    {
      title: "Professeur",
      url: "/dashboard/admin/professeur",
      icon: Bot,
      
    },
    {
      title: "Struture des classes",
      url: "#",
      icon: BookOpen,
      
    },
    {
      title: "Bulletin",
      url: "#",
      icon: Settings2,
    },
  ],
  navProf: [
    {
      title: "Etudiants et notes",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
  ],
  navEtudiant: [
    {
      title: "Mes notes",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
          }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
<<<<<<< HEAD
}
=======
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
>>>>>>> f24a7036b69f45640ac0573815df45a25a67a431

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {role==="prof" && <NavMain items={data.navProf} />}
        {role==="admin" && <NavMain items={data.navMain} />}
        {role==="etudiant" && <NavMain items={data.navEtudiant} />}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
<<<<<<< HEAD
    
  )
}
=======
  );
}
>>>>>>> f24a7036b69f45640ac0573815df45a25a67a431
