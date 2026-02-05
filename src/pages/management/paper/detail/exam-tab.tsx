import * as React from "react"
import { useForm } from "react-hook-form"
import { Form } from "@/ui/form"
import { Button } from "@/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import QuestionCreateModal, { Question as QuestionType, QuestionType as QuestionTypeEnum, Option } from "../components/question-create-modal"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import { cn } from "@/utils"
import { Icon } from "@/components/icon"

// 题型分类
enum QuestionCategory {
    GENERAL_KNOWLEDGE = "general_knowledge",
    QUANTITATIVE_REASONING = "quantitative_reasoning",
    VERBAL_ABILITY = "verbal_ability",
    LOGICAL_REASONING = "logical_reasoning"
}

// 题型分类数据结构
interface QuestionCategoryData {
    id: string
    category: QuestionCategory
    name: string
    questions: QuestionType[]
}

// 表单数据结构
interface FormData {
    categories: QuestionCategoryData[]
}

export default function ExamTab() {
    // 初始化表单
    const formMethods = useForm<FormData>({
        defaultValues: {
            categories: [
                {
                    id: crypto.randomUUID(),
                    category: QuestionCategory.GENERAL_KNOWLEDGE,
                    name: "常识判断",
                    questions: []
                },
                {
                    id: crypto.randomUUID(),
                    category: QuestionCategory.QUANTITATIVE_REASONING,
                    name: "数量关系",
                    questions: []
                },
                {
                    id: crypto.randomUUID(),
                    category: QuestionCategory.VERBAL_ABILITY,
                    name: "言语理解",
                    questions: []
                },
                {
                    id: crypto.randomUUID(),
                    category: QuestionCategory.LOGICAL_REASONING,
                    name: "逻辑推理",
                    questions: []
                }
            ]
        }
    })

    const { watch, setValue, handleSubmit } = formMethods

    // 初始化时默认显示所有分类
    const [activeCategory, setActiveCategory] = React.useState<QuestionCategory[]>([...Object.values(QuestionCategory)])

    // 监听分类变化
    const categories = watch("categories")

    // 模态框状态
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState<number>(0)
    const [editingQuestion, setEditingQuestion] = React.useState<QuestionType | null>(null)
    const [editingQuestionIndex, setEditingQuestionIndex] = React.useState<number | null>(null)

    // 打开添加题目模态框
    const openAddQuestionDialog = (categoryIndex: number) => {
        setCurrentCategoryIndex(categoryIndex)
        setEditingQuestion(null)
        setEditingQuestionIndex(null)
        setIsDialogOpen(true)
    }

    // 打开编辑题目模态框
    const openEditQuestionDialog = (categoryIndex: number, questionIndex: number) => {
        setCurrentCategoryIndex(categoryIndex)
        setEditingQuestion({ ...categories[categoryIndex].questions[questionIndex] })
        setEditingQuestionIndex(questionIndex)
        setIsDialogOpen(true)
    }

    // 保存题目到指定分类
    const saveQuestion = (questionData: QuestionType) => {
        const updatedCategories = [...categories]

        if (editingQuestionIndex !== null) {
            // 编辑现有题目
            updatedCategories[currentCategoryIndex].questions[editingQuestionIndex] = questionData
        } else {
            // 添加新题目
            updatedCategories[currentCategoryIndex].questions.push(questionData)
        }

        setValue("categories", updatedCategories)
        setIsDialogOpen(false)
    }

    // 删除指定分类中的题目
    const removeQuestion = (categoryIndex: number, questionIndex: number) => {
        const updatedCategories = [...categories]
        updatedCategories[categoryIndex].questions = updatedCategories[categoryIndex].questions.filter((_: QuestionType, i: number) => i !== questionIndex)
        setValue("categories", updatedCategories)
    }



    // 提交表单
    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data)
        // 实际项目中需要调用 API 保存数据
    }


    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>试卷题目管理</CardTitle>
                        {/* 提交按钮 */}
                        <Button type="submit">
                            保存试卷
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...formMethods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* 分类列表 */}
                            <div className="space-y-8">
                                {categories.map((category, categoryIndex) => {
                                    const isOpen = activeCategory.includes(category.category)
                                    return <Collapsible open={isOpen}>
                                        <div className="flex justify-between items-center">
                                            <CollapsibleTrigger asChild>
                                                <div
                                                    className={cn(
                                                        "group w-full inline-flex items-center justify-start relative gap-2 cursor-pointer pt-4 pr-2 pb-2 pl-3 transition-all duration-300 ease-in-out",
                                                        "hover:pl-4",
                                                    )}
                                                    onClick={() => {
                                                        setActiveCategory(prev => prev.includes(category.category) ? prev.filter(c => c !== category.category) : [...prev, category.category])
                                                    }}
                                                >
                                                    <Icon
                                                        icon="eva:arrow-ios-forward-fill"
                                                        className={cn(
                                                            "absolute left-[-4px] h-4 w-4 inline-flex shrink-0 transition-all duration-300 ease-in-out",
                                                            "opacity-0 group-hover:opacity-100",
                                                            {
                                                                "rotate-90": isOpen,
                                                            },
                                                        )}
                                                    />
                                                    <span
                                                        className={cn(
                                                            "text-lg font-medium transition-all duration-300 ease-in-out text-text-disabled",
                                                            "hover:text-text-primary",
                                                        )}
                                                    >
                                                        {category.name}
                                                    </span>
                                                </div>
                                            </CollapsibleTrigger>
                                            <Button
                                                type="button"
                                                onClick={() => openAddQuestionDialog(categoryIndex)}
                                            >
                                                添加题目
                                            </Button>

                                        </div>
                                        <CollapsibleContent>
                                            <div key={category.id} className="space-y-4">
                                                {/* 题目列表 */}
                                                <div className="space-y-6">
                                                    {
                                                        category.questions.map((question, questionIndex) => (
                                                            <Card key={question.id} className="border gap-4">
                                                                <CardHeader className="pb-0">
                                                                    <div className="flex justify-between items-start">
                                                                        <div>
                                                                            <CardTitle className="text-lg">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div>题目 ID {questionIndex + 1}</div>
                                                                                    <div className="text-sm text-muted-foreground">
                                                                                        {question.type === QuestionTypeEnum.SINGLE_CHOICE && "单选题"}
                                                                                        {question.type === QuestionTypeEnum.MULTIPLE_CHOICE && "多选题"}
                                                                                        {question.type === QuestionTypeEnum.SHORT_ANSWER && "简答题"}
                                                                                        <span className="ml-2">({question.score} 分)</span>
                                                                                    </div>
                                                                                </div>
                                                                            </CardTitle>
                                                                        </div>
                                                                        <div className="flex space-x-2">
                                                                            <Button
                                                                                type="button"
                                                                                variant="secondary"
                                                                                size="sm"
                                                                                onClick={() => openEditQuestionDialog(categoryIndex, questionIndex)}
                                                                            >
                                                                                编辑题目
                                                                            </Button>
                                                                            <Button
                                                                                type="button"
                                                                                variant="secondary"
                                                                                size="sm"
                                                                                onClick={() => removeQuestion(categoryIndex, questionIndex)}
                                                                            >
                                                                                删除题目
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                    {/* 题目内容 */}
                                                                    <div className="space-y-3">
                                                                        <div className="prose max-w-none">
                                                                            {question.content || "无内容"}
                                                                        </div>
                                                                        {question.imageUrl && (
                                                                            <div className="mt-3 p-3 border rounded">
                                                                                <img
                                                                                    src={question.imageUrl}
                                                                                    alt="题目图片"
                                                                                    className="max-h-40 object-contain"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {/* 选项（单选题和多选题） */}
                                                                    {(question.type === QuestionTypeEnum.SINGLE_CHOICE || question.type === QuestionTypeEnum.MULTIPLE_CHOICE) && (
                                                                        <div className="space-y-3">
                                                                            <div className="space-y-2">
                                                                                {question.options?.map((option: Option, optionIndex: number) => (
                                                                                    <div key={option.id} className="flex items-center space-x-3 p-3 ">

                                                                                        <input
                                                                                            type="radio"
                                                                                            disabled
                                                                                        />
                                                                                        <div>{option.content}</div>
                                                                                        {option.imageUrl && (
                                                                                            <div className="mt-1 p-2 border rounded">
                                                                                                <img
                                                                                                    src={option.imageUrl}
                                                                                                    alt={`选项 ${String.fromCharCode(65 + optionIndex)} 图片`}
                                                                                                    className="max-h-24 object-contain"
                                                                                                />
                                                                                            </div>
                                                                                        )}

                                                                                        {(option.isCorrect) && (
                                                                                            <div className=" inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                                                                正确选项
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* 答案解析 */}
                                                                    {(question.answerAnalysis || question.answerAnalysisImageUrl) && (
                                                                        <div className="space-y-3 mt-4">
                                                                            <h4 className="font-medium">答案解析</h4>
                                                                            {question.answerAnalysis && (
                                                                                <div className="prose max-w-none">
                                                                                    {question.answerAnalysis}
                                                                                </div>
                                                                            )}
                                                                            {question.answerAnalysisImageUrl && (
                                                                                <div className="mt-2 p-2 border rounded">
                                                                                    <img
                                                                                        src={question.answerAnalysisImageUrl}
                                                                                        alt="解析图片"
                                                                                        className="max-h-40 object-contain"
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </CardContent>
                                                            </Card>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                })}
                            </div>
                            {/* 题目创建弹窗 */}
                            <QuestionCreateModal
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                                onSave={saveQuestion}
                                editingQuestion={editingQuestion}
                                categoryName={categories[currentCategoryIndex]?.name}
                            />

                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div >
    )
}

