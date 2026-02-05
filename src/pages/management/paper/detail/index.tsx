import { Icon } from "@/components/icon";
import { useParams, useRouter } from "@/routes/hooks";
import { Button } from "@/ui/button";
import { BasicStatus } from "#/enum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import PaperBaseTab from "./base-tab";
import ExamTab from "./exam-tab";

const tabs = [
	{
		icon: <Icon icon="mingcute:profile-fill" size={24} className="mr-2" />,
		key: "base",
		title: "基础信息",
		content: <PaperBaseTab />,
	},
	{
		icon: <Icon icon="solar:clipboard-bold" size={24} className="mr-2" />,
		key: "question",
		title: "试题信息",
		content: <ExamTab />
	},
	{
		icon: <Icon icon="solar:calendar-bold" size={24} className="mr-2" />,
		key: "record",
		title: "答题记录",
		content: <div>Projects Tab</div>,
	},
	// {
	// 	icon: <Icon icon="mingcute:profile-fill" size={24} className="mr-2" />,
	// 	title: "Connections",
	// 	content: <div>Connections Tab</div>,
	// },
];

export default function PaperDetailPage() {
	const { paperId } = useParams<{ paperId: string }>();
	const { push } = useRouter();

	// TODO: 从API获取paper详情数据
	const paper = {
		id: paperId,
		name: "示例套卷",
		description: "这是一个示例套卷，包含多种类型的题目",
		status: BasicStatus.ENABLE,
		totalQuestions: 50,
		timeLimit: 120,
		createdAt: "2026-02-05",
		updatedAt: "2026-02-05"
	};

	const handleBack = () => {
		push("/paper");
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleBack}
						className="mr-2"
					>
						<Icon icon="mingcute:arrow-left-fill" size={16} />
						返回
					</Button>
				</div>
				<div className="flex gap-2">
					<Button variant="danger">删除</Button>
				</div>
			</div>
			<Tabs defaultValue={"base"} className="w-full">
				<div className="relative flex flex-col justify-center items-center gap-4 p-4">
					<TabsList className="z-5">
						{tabs.map((tab) => (
							<TabsTrigger key={tab.key} value={tab.key}>
								{tab.icon}
								{tab.title}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				{tabs.map((tab) => (
					<TabsContent key={tab.key} value={tab.key}>
						{tab.content}
					</TabsContent>
				))}

			</Tabs>
		</>
	);
}