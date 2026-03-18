import brandLogo from "@/assets/images/common/logo.png";
import { cn } from "@/utils";

type AppNameLogoProps = {
	className?: string;
	imgClassName?: string;
	alt?: string;
};

export default function AppNameLogo({ className, imgClassName, alt = "匠欣教育" }: AppNameLogoProps) {
	return (
		<span className={cn("inline-flex items-center", className)}>
			<img src={brandLogo} alt={alt} className={cn("h-8 w-auto shrink-0 object-contain", imgClassName)} />
		</span>
	);
}
