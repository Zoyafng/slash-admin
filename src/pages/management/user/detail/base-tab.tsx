import { useParams } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Card, CardContent } from "@/ui/card";
import { BasicStatus } from "#/enum";


export default function UserBaseTab() {
    const userId = useParams().userId;
    // TODO: 从API获取paper详情数据
    const paper = {
        id: userId,
        isAuth: true,
        name: "王艺淼",
        major: "信息工程",
        school: "中国科技大学",
        phone: "13800000000",
        createdAt: "2026-02-05",
        updatedAt: "2026-02-05",
        status:0
    };


    return (
        <Card className="border-null">
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="text-sm text-text-secondary">用户 ID</div>
                            <div className="font-medium">{paper.id}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-text-secondary">用户名</div>
                            <div className="font-medium">{paper.name}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-text-secondary">是否授权</div>
                            <Badge variant={paper.status === BasicStatus.DISABLE ? "error" : "success"}>
                                {paper.status === BasicStatus.DISABLE ? "禁用" : "启用"}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-text-secondary">手机号</div>
                            <div className="font-medium">{paper.phone} 题</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-text-secondary">注册时间</div>
                            <div className="font-medium">{paper.createdAt}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-text-secondary">学校</div>
                            <div className="font-medium">{paper.school}</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-text-secondary">专业</div>
                            <div className="font-medium">{paper.major}</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}