import { Icon } from "@/components/icon";
import { useParams, useRouter } from "@/routes/hooks";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { BasicStatus } from "#/enum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import ExamTab from "./exam-tab";
import RecordTab from "./record-tab";

const tabs = [
	// {
	// 	icon: <Icon icon="mingcute:profile-fill" size={24} className="mr-2" />,
	// 	key: "base",
	// 	title: "基础信息",
	// 	content: <PaperBaseTab />,
	// },
	{
		icon: <Icon icon="mingcute:profile-fill" size={24} className="mr-2" />,
		key: "question",
		title: "试题信息",
		content: <ExamTab />,
	},
	{
		icon: <Icon icon="solar:clipboard-bold" size={24} className="mr-2" />,
		key: "record",
		title: "答题记录",
		content: <RecordTab />,
	},
];

export default function PaperDetailPage() {
	const paperId = useParams().paperId;
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
		updatedAt: "2026-02-05",
	};

	const handleBack = () => {
		push("/paper");
	};

	return (
		<>
			{/* Header */}
			<div className="flex flex-col gap-2 pb-1">
				{/* 第一行：返回 + 操作按钮 */}
				<div className="flex items-center justify-between">
					<Button variant="ghost" size="sm" onClick={handleBack}>
						<Icon icon="mingcute:arrow-left-fill" size={16} />
						返回
					</Button>
					<div className="flex gap-2">
						<Button variant="danger">删除</Button>
					</div>
				</div>

				{/* 第二行：套卷名称 + 状态 + 描述 */}
				<div className="flex flex-col gap-1 px-1">
					<div className="flex items-center gap-2">
						<span className="text-xl font-semibold">{paper.name}</span>
						<Badge variant={paper.status === BasicStatus.DISABLE ? "error" : "success"}>
							{paper.status === BasicStatus.DISABLE ? "禁用" : "启用"}
						</Badge>
					</div>
					{paper.description && (
						<span className="text-sm text-text-secondary">{paper.description}</span>
					)}
				</div>
			</div>

			{/* Tabs */}
			<Tabs defaultValue="question" className="w-full">
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