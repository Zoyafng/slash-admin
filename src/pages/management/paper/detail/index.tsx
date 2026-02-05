import { Icon } from "@/components/icon";
import { useParams, useRouter } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { BasicStatus } from "#/enum";

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
		<Card>
			<CardHeader>
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
						套卷详情
					</div>
					<div className="flex gap-2">
						<Button>编辑</Button>
						<Button variant="ghost">删除</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<div className="text-sm text-text-secondary">套卷ID</div>
							<div className="font-medium">{paper.id}</div>
						</div>
						<div className="space-y-2">
							<div className="text-sm text-text-secondary">套卷名称</div>
							<div className="font-medium">{paper.name}</div>
						</div>
						<div className="space-y-2">
							<div className="text-sm text-text-secondary">状态</div>
							<Badge variant={paper.status === BasicStatus.DISABLE ? "error" : "success"}>
								{paper.status === BasicStatus.DISABLE ? "禁用" : "启用"}
							</Badge>
						</div>
						<div className="space-y-2">
							<div className="text-sm text-text-secondary">题目数量</div>
							<div className="font-medium">{paper.totalQuestions} 题</div>
						</div>
						<div className="space-y-2">
							<div className="text-sm text-text-secondary">考试时长</div>
							<div className="font-medium">{paper.timeLimit} 分钟</div>
						</div>
						<div className="space-y-2">
							<div className="text-sm text-text-secondary">创建时间</div>
							<div className="font-medium">{paper.createdAt}</div>
						</div>
						<div className="space-y-2">
							<div className="text-sm text-text-secondary">更新时间</div>
							<div className="font-medium">{paper.updatedAt}</div>
						</div>
					</div>
					<div className="space-y-2">
						<div className="text-sm text-text-secondary">套卷描述</div>
						<div className="p-4 border rounded-md">{paper.description}</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}