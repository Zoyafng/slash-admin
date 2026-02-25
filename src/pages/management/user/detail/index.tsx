import bannerImage from "@/assets/images/background/banner-1.png";
import { Icon } from "@/components/icon";
import { useUserInfo } from "@/store/userStore";
import { themeVars } from "@/theme/theme.css";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Text, Title } from "@/ui/typography";
import type { CSSProperties } from "react";
import BaseTab from "./base-tab";
import { useParams } from "@/routes/hooks";
import RecordTab from "./record-tab";


function UserProfile() {
	const { avatar, username } = useUserInfo();
	const userId = useParams().userId;



	const bgStyle: CSSProperties = {
		position: "absolute",
		inset: 0,
		background: `url(${bannerImage})`,
		backgroundSize: "cover",
		backgroundPosition: "50%",
		backgroundRepeat: "no-repeat",
	};

	const tabs = [
		{
			icon: <Icon icon="solar:user-id-bold" size={24} className="mr-2" />,
			title: "基本信息",
			content: <BaseTab />,
		},
		{
			icon: <Icon icon="solar:calendar-bold" size={24} className="mr-2" />,
			title: "答题记录",
			content: <RecordTab />,
		},
	];
	// TODO: 从API获取user详情数据
	const user = {
		id: userId,
		isAuth: true,
		name: "王艺淼",
		major: "信息工程",
		school: "中国科技大学",
		phone: "13800000000",
		createdAt: "2026-02-05",
		updatedAt: "2026-02-05",
		status: 0,
		avatar: avatar,
	};



	return (
		<Tabs defaultValue={tabs[0].title} className="w-full">
			<div className="relative flex flex-col justify-center items-center gap-4 p-4">
				<div style={bgStyle} className="h-full w-full z-1" />
				<div className="flex flex-col items-center justify-center gap-2 z-2">
					<Avatar className="h-24 w-24">
						<AvatarImage src={user.avatar} className="rounded-full" />
					</Avatar>
					<div className="flex flex-col justify-center items-center gap-2">
						<div className="flex items-center gap-2">
							<Title as="h5" className="text-xl">
								{user.name}
							</Title>
							<Icon icon="heroicons:check-badge-solid" size={20} color={themeVars.colors.palette.primary.default} />
						</div>
						<Text variant="body2">TS FullStack</Text>
					</div>
				</div>
				<TabsList className="z-5">
					{tabs.map((tab) => (
						<TabsTrigger key={tab.title} value={tab.title}>
							{tab.icon}
							{tab.title}
						</TabsTrigger>
					))}
				</TabsList>
			</div>

			{tabs.map((tab) => (
				<TabsContent key={tab.title} value={tab.title}>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
}

export default UserProfile;
