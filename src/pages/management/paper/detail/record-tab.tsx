import * as React from "react";
import { Icon } from "@/components/icon";
import { useParams } from "@/routes/hooks";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { cn } from "@/utils";
import { Button } from "@/ui/button";
import { Progress } from "@/ui/progress";
import { QuestionCategory } from "@/types/enum";
import { WrongQuestionsDialog } from "@/components/wrong-questions-dialog";
// 题目分类中文映射
const CATEGORY_LABEL: Record<string, string> = {
    [QuestionCategory.GENERAL_KNOWLEDGE]: "常识判断",
    [QuestionCategory.QUANTITATIVE_REASONING]: "数量关系",
    [QuestionCategory.VERBAL_ABILITY]: "言语理解",
    [QuestionCategory.LOGICAL_REASONING]: "逻辑推理",
    [QuestionCategory.DATA_ANALYSIS]: "资料分析",
};

// ─── 子表公用列配置 ────────────────────────────────────────────────────────────
function useSubColumns(
    handleViewWrongQuestions: (wq: any[], cat: string) => void
): ColumnsType<any> {
    return [
        {
            title: "题目类型",
            dataIndex: "category",
            width: 140,
            render: (category: QuestionCategory) => (
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted border text-foreground">
                    {CATEGORY_LABEL[category] ?? category}
                </span>
            ),
        },
        {
            title: "得分",
            dataIndex: "score",
            width: 80,
            align: "center",
            render: (score: number) => (
                <span className="text-sm font-semibold">{score}</span>
            ),
        },
        {
            title: "答对 / 已答",
            width: 110,
            align: "center",
            render: (_: any, record: any) => (
                <span className="text-sm">
                    <span className="font-medium text-green-600">{record.correctCount}</span>
                    <span className="text-muted-foreground"> / {record.answeredCount}</span>
                </span>
            ),
        },
        {
            title: "完成率",
            dataIndex: "completionRate",
            width: 160,
            render: (text: string) => {
                const percent = parseInt(text.replace('%', ''));
                let color: 'primary' | 'destructive' | 'warning' = 'primary';
                if (percent < 60) color = 'destructive';
                else if (percent < 100) color = 'warning';
                return <Progress value={percent} color={color} showValue />;
            },
        },
        {
            title: "正确率",
            dataIndex: "accuracy",
            width: 160,
            render: (text: string) => {
                const percent = parseInt(text.replace('%', ''));
                let color: 'primary' | 'destructive' | 'warning' = 'primary';
                if (percent < 60) color = 'destructive';
                else if (percent < 100) color = 'warning';
                return <Progress value={percent} color={color} showValue />;
            },
        },
        {
            title: "错题记录",
            dataIndex: "wrongQuestions",
            width: 120,
            align: "center",
            render: (text: any, record: any) => {
                const count = Array.isArray(text) ? text.length : 0;
                return count > 0 ? (
                    <Button
                        variant="link" size="sm"
                        className="h-auto p-0 text-xs gap-1"
                        style={{ textDecoration: "none" }}
                        onClick={() => handleViewWrongQuestions(text, record.category)}
                    >
                        <span className="text-red-500">查看错题</span>
                    </Button>
                ) : (
                    <span className="text-xs text-green-500 flex items-center justify-center gap-1">
                        <Icon icon="mingcute:check-circle-fill" size={13} />
                        全部正确
                    </span>
                );
            },
        },
    ];
}

// ─── 通用 Ant Table 透明样式覆盖 ──────────────────────────────────────────────
const antTransparent = [
    "[&_.ant-table]:!bg-transparent",
    "[&_.ant-table-container]:!border-0",
    "[&_.ant-table-container]:!rounded-none",
    "[&_.ant-table-tbody>tr>td]:!border-b-0",
    "[&_.ant-table-tbody>tr:last-child>td]:!border-b-0",
    "[&_.ant-table-thead>tr>th]:!text-xs",
    "[&_.ant-table-thead>tr>th]:!font-medium",
    "[&_.ant-table-thead>tr>th]:!text-muted-foreground",
].join(" ");

// ─── 通用展开图标 ──────────────────────────────────────────────────────────────
function ExpandIcon({ expanded, onExpand, record }: any) {
    return (
        <button
            onClick={(e) => onExpand(record, e)}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-muted transition-colors"
        >
            <Icon
                icon="eva:arrow-ios-forward-fill"
                size={14}
                className={cn(
                    "text-muted-foreground transition-transform duration-200",
                    { "rotate-90": expanded }
                )}
            />
        </button>
    );
}

function CardNestedExpand({
    record,
    subColumns,
}: {
    record: any;
    subColumns: ColumnsType<any>;
}) {
    return (
        <div>
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                {/* 子表内置 header */}
                {/* <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b">
                    <Icon icon="solar:list-bold" size={13} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">分类明细</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                        {record.subData?.length} 个分类
                    </span>
                </div> */}
                <Table
                    size="small"
                    columns={subColumns}
                    dataSource={record.subData}
                    pagination={false}
                    rowKey="id"
                    className={cn(
                        antTransparent,
                        "[&_.ant-table-thead>tr>th]:!bg-transparent",
                        "[&_.ant-table]:!m-[unset]"
                    )}
                />
            </div>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// 主组件
// ═════════════════════════════════════════════════════════════════════════════

export default function RecordTab() {
    useParams();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedWrongQuestions, setSelectedWrongQuestions] = React.useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = React.useState<string>("");

    const handleViewWrongQuestions = (wrongQuestions: any[], category: string) => {
        setSelectedWrongQuestions(wrongQuestions);
        setCurrentCategory(category);
        setDialogOpen(true);
    };

    const subColumns = useSubColumns(handleViewWrongQuestions);

    const columns: ColumnsType<any> = [
        {
            title: "学生姓名",
            dataIndex: "paperName",
            fixed: "left",
            width: 200,
            render: (name: string) => (
                <span className="font-medium text-sm">{name}</span>
            ),
        },
        {
            title: "分数",
            dataIndex: "score",
            width: 80,
            align: "center",
            render: (score: number) => (
                <span className={cn(
                    "text-sm font-semibold",
                    score >= 90 ? "text-green-600" : score >= 60 ? "text-amber-600" : "text-red-500"
                )}>{score}</span>
            ),
        },
        {
            title: "正确率",
            dataIndex: "accuracy",
            width: 80,
            align: "center",
            render: (val: string) => (
                <span className="text-sm text-muted-foreground">{val}</span>
            ),
        },
        {
            title: "排名",
            dataIndex: "rank",
            width: 80,
            align: "center",
            render: (rank: number, record: any) => (
                <span className="text-sm">
                    <span className="font-medium">{rank}</span>
                    <span className="text-muted-foreground"> / {record.total}</span>
                </span>
            ),
        },
        {
            title: "提交时间",
            dataIndex: "submitTime",
            width: 160,
            render: (val: string) => (
                <span className="text-sm text-muted-foreground">{val}</span>
            ),
        },
        {
            title: "考试用时",
            dataIndex: "examTime",
            fixed: "right",
            width: 100,
            align: "center",
            render: (val: string) => (
                <span className="text-sm text-muted-foreground">{val}</span>
            ),
        },
    ];

    const mockData = [
        {
            id: 1, paperId: "P001", paperName: "2026年春季信息工程类试卷",
            examId: "E001", createdAt: "2026-02-01 10:00",
            score: 85, completionRate: "100%", accuracy: "85%",
            rank: 5, total: 100, submitTime: "2026-02-01 11:30", examTime: "90分钟",
            subData: [{
                id: 11, score: 85, correctCount: 17, answeredCount: 20,
                completionRate: "10%", accuracy: "85%",
                category: QuestionCategory.GENERAL_KNOWLEDGE,
                wrongQuestions: [
                    { questionId: "Q001", questionContent: "下列哪个不是JavaScript的数据类型？" },
                    { questionId: "Q005", questionContent: "React中useState钩子的作用是什么？" },
                    { questionId: "Q010", questionContent: "TypeScript中interface和type的区别是什么？" },
                ],
            }],
        },
        {
            id: 2, paperId: "P002", paperName: "2026年春季信息工程类试卷",
            examId: "E002", createdAt: "2026-02-05 14:00",
            score: 92, accuracy: "92%", rank: 2, total: 100,
            submitTime: "2026-02-05 15:30", examTime: "90分钟",
            subData: [{
                id: 21, score: 92, correctCount: 23, answeredCount: 25,
                completionRate: "100%", accuracy: "92%",
                category: QuestionCategory.QUANTITATIVE_REASONING,
                wrongQuestions: [
                    { questionId: "Q003", questionContent: "CSS中flex布局的主要属性有哪些？" },
                    { questionId: "Q015", questionContent: "Node.js中的事件循环机制是怎样的？" },
                ],
            }],
        },
    ];


    return (
        <>
            <Card className="border-null gap-2">
                <CardHeader>

                </CardHeader>
                <CardContent className="pt-0">
                    <Table
                        rowKey="id"
                        size="small"
                        scroll={{ x: "max-content" }}
                        pagination={false}
                        columns={columns}
                        dataSource={mockData}
                        expandable={{
                            expandIcon: (props) => <ExpandIcon {...props} />,
                            expandedRowRender: (record) => <CardNestedExpand record={record} subColumns={subColumns} />,
                        }}

                    />
                </CardContent>
            </Card>

            <WrongQuestionsDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                wrongQuestions={selectedWrongQuestions}
                category={currentCategory}
            />
        </>
    );
}