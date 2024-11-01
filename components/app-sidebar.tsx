"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
}

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
    
  )
}