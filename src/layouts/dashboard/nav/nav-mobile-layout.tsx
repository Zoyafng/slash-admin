import { Icon } from "@/components/icon";
import { NavVertical } from "@/components/nav";
import type { NavProps } from "@/components/nav/types";
import AppNameLogo from "@/components/app-name-logo";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";

export function NavMobileLayout({ data }: NavProps) {
	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<Icon icon="local:ic-menu" size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="[&>button]:hidden px-2 w-[280px]">
				<div className="flex gap-2 px-2 h-[var(--layout-header-height)] items-center">
					<AppNameLogo imgClassName="h-8" />
				</div>
				<ScrollArea className="h-full">
					<NavVertical data={data} />
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
