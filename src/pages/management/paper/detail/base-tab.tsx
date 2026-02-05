import { useParams } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Card, CardContent } from "@/ui/card";
import { BasicStatus } from "#/enum";


export default function PaperBaseTab() {
    const { paperId } = useParams<{ paperId: string }>();
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


    return (
        <Card className="border-null">
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