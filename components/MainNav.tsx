import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

export default async function MainNav() {
  const session = await auth();
  
  const isAdmin = (session?.user && session?.user.role === 'ADMIN');

  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Home</NavigationMenuItem>
          {isAdmin && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/models" className={cn(navigationMenuTriggerStyle(), 'w-full justify-start')}>
                  Models
                </NavigationMenuLink>
                <NavigationMenuLink href="/airports" className={cn(navigationMenuTriggerStyle(), 'w-full justify-start')}>
                  Airports
                </NavigationMenuLink>
                <NavigationMenuLink href="/manufacturers" className={cn(navigationMenuTriggerStyle(), 'w-full justify-start')}>
                  Manufacturers
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}