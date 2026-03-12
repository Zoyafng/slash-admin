import * as React from "react";
import { Icon } from "@/components/icon";
import { useParams } from "@/routes/hooks";
import { Card, CardContent } from "@/ui/card";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { cn } from "@/utils";
import { Button } from "@/ui/button";
import { Progress } from "@/ui/progress";
import { QuestionCategory } from "@/types/enum";
import { WrongQuestionsDialog } from "@/components/wrong-questions-dialog";



export default function RecordTab() {
    useParams(); // 保留参数获取，以备后续使用
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedWrongQuestions, setSelectedWrongQuestions] = React.useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = React.useState<string>("");

    // 处理查看错题按钮点击
    const handleViewWrongQuestions = (wrongQuestions: any[], category: string) => {
        setSelectedWrongQuestions(wrongQuestions);
        setCurrentCategory(category);
        setDialogOpen(true); // 打开对话框
    };

    // TODO: 从API获取paper详情数据

    const columns: ColumnsType<any> = [
        {
            title: "试卷名称",
            dataIndex: "paperName",
            fixed: "left",
            width: 200,
        },
        {
            title: "试卷 ID",
            dataIndex: "paperId",
            width: 200
        },
        {
            title: "考试 ID",
            dataIndex: "examId",
            width: 200
        },
        {
            title: "完成率",
            dataIndex: "completionRate",
            width: 200
        },
        {
            title: "分数",
            dataIndex: "score",
            width: 200
        },
        {
            title: "正确率",
            dataIndex: "accuracy",
            width: 200
        },
        {
            title: "排名",
            dataIndex: "rank",
            width: 200
        },
        {
            title: "总人数",
            dataIndex: "total",
            width: 200
        },
        {
            title: "提交时间",
            dataIndex: "submitTime",
            width: 200
        },
        {
            title: "考试用时",
            fixed: 'right',
            dataIndex: "examTime",
            width: 200
        }
    ]


    // 子表格列配置
    const subColumns: ColumnsType<any> = [
        {
            title: "题目类型",
            dataIndex: "category",
            width: 180,
            render: (category: QuestionCategory) => {
                return category
            }
        },
        {
            title: "得分",
            dataIndex: "score",
            width: 100,
        },
        {
            title: "答对试题",
            dataIndex: "correctCount",
            width: 100,
        },
        {
            title: "已答试题",
            dataIndex: "answeredCount",
            width: 100,
        },
        {
            title: "完成率",
            dataIndex: "completionRate",
            width: 150,
            render: (text: string) => {
                // 提取百分比值
                const percent = parseInt(text.replace('%', ''));
                console.log(percent, "percent")
                // 根据百分比值确定颜色
                let color: 'primary' | 'destructive' | 'warning' = 'primary';
                if (percent < 60) {
                    color = 'destructive';
                } else if (percent < 100) {
                    color = 'warning';
                }
                return <Progress value={percent} color={color} showValue />;
            },
        },
        {
            title: "正确率",
            dataIndex: "accuracy",
            width: 150,
            render: (text: string) => {
                // 提取百分比值
                const percent = parseInt(text.replace('%', ''));
                console.log(percent, "percent")

                // 根据百分比值确定颜色
                let color: 'primary' | 'destructive' | 'warning' = 'primary';
                if (percent < 60) {
                    color = 'destructive';
                } else if (percent < 100) {
                    color = 'warning';
                }
                console.log(percent, "percent", color)
                return <Progress value={percent} color={color} showValue />;
            },
        },
        {
            title: "错题记录",
            dataIndex: "wrongQuestions",
            width: 200,
            render: (text: any, record: any) => {
                return (
                    <Button
                        variant="link"
                        style={{
                            textDecoration: "none"
                        }}
                        onClick={() => handleViewWrongQuestions(text, record.category)}
                    >
                        查看错题
                    </Button>
                );
            },
        },
    ];

    // 模拟数据
    const mockData = [
        {
            id: 1,
            paperId: "P001",
            paperName: "2026年春季信息工程类试卷",
            examId: "E001",
            createdAt: "2026-02-01 10:00",
            score: 85,
            completionRate: "100%",
            accuracy: "85%",
            rank: 5,
            total: 100,
            submitTime: "2026-02-01 11:30",
            examTime: "90分钟",
            subData: [
                {
                    id: 11,
                    score: 85,
                    correctCount: 17,
                    answeredCount: 20,
                    completionRate: "10%",
                    accuracy: "85%",
                    category: QuestionCategory.GENERAL_KNOWLEDGE,
                    wrongQuestions: [
                        {
                            questionId: "Q001",
                            questionContent: "下列哪个不是JavaScript的数据类型？",
                        },
                        {
                            questionId: "Q005",
                            questionContent: "React中useState钩子的作用是什么？",
                        },
                        {
                            questionId: "Q010",
                            questionContent: "TypeScript中interface和type的区别是什么？",
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            paperId: "P002",
            paperName: "2026年春季信息工程类试卷",
            examId: "E002",
            createdAt: "2026-02-05 14:00",
            score: 92,
            accuracy: "92%",
            rank: 2,
            total: 100,
            submitTime: "2026-02-05 15:30",
            examTime: "90分钟",
            subData: [
                {
                    id: 21,
                    score: 92,
                    correctCount: 23,
                    answeredCount: 25,
                    completionRate: "100%",
                    accuracy: "92%",
                    wrongQuestions: [
                        {
                            questionId: "Q003",
                            questionContent: "CSS中flex布局的主要属性有哪些？",
                        },
                        {
                            questionId: "Q015",
                            questionContent: "Node.js中的事件循环机制是怎样的？",
                        },
                    ],
                },
            ],
        },
    ];



    return (
        <>
            <Card className="border-null">
                <CardContent>
                    <Table
                        rowKey="id"
                        size="small"
                        scroll={{ x: "max-content" }}
                        pagination={false}
                        columns={columns}
                        dataSource={mockData}
                        expandable={{
                            expandIcon: ({ expanded, onExpand, record }) => {
                                return <div onClick={(e) => onExpand(record, e)}>
                                    <Icon icon="local:ic-right-arrow" size="16" className={cn({
                                        "rotate-90": expanded,
                                        "transition-transform": "0.3s",
                                        "transform-origin": "center",
                                        cursor: "pointer",
                                    })} />
                                </div>
                            },
                            expandedRowRender: (record: any) => (
                                <Table
                                    size="small"
                                    columns={subColumns}
                                    dataSource={record.subData}
                                    pagination={false}
                                    rowKey="id"
                                />
                            ),
                        }}
                    />
                </CardContent>
            </Card>

            {/* 错题查看对话框 */}
            <WrongQuestionsDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                wrongQuestions={selectedWrongQuestions}
                category={currentCategory}
            />
        </>
    );
}