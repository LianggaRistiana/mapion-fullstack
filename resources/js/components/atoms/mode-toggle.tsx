import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/providers/theme-provider"

interface props {
  iconOnly?: boolean
}

export function ModeToggle({ iconOnly = true }: props) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={iconOnly ? "" : "w-full justify-start"} size={iconOnly ? "icon" : "default"}>
          <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
          <Moon className="w-[1.2rem] h-[1.2rem] hidden dark:block" />
          {
            !iconOnly &&
            <span className="text-sm font-medium">Toggle theme</span>
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="backdrop-blur-lg bg-background/80">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
