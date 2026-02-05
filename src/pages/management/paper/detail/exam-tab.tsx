import * as React from "react"
import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl } from "@/ui/form"
import { Button } from "@/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import QuestionCreateModal, { Question as QuestionType, QuestionType as QuestionTypeEnum, Option } from "../components/question-create-modal"

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
                    <CardTitle>试卷题目管理</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...formMethods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* 分类列表 */}
                            <div className="space-y-8">
                                {categories.map((category, categoryIndex) => (
                                    <div key={category.id} className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-semibold">{category.name}</h3>
                                            <Button
                                                type="button"
                                                onClick={() => openAddQuestionDialog(categoryIndex)}
                                            >
                                                添加题目
                                            </Button>

                                        </div>

                                        {/* 题目列表 */}
                                        <div className="space-y-6">
                                            {
                                                category.questions.map((question, questionIndex) => (
                                                    <Card key={question.id} className="border">
                                                        <CardHeader className="pb-2">
                                                            <div className="flex justify-between items-center">
                                                                <CardTitle className="text-lg">
                                                                    题目 {questionIndex + 1}
                                                                </CardTitle>
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
                                                            {/* 题目类型显示 */}
                                                            <FormItem>
                                                                <FormLabel>题目类型</FormLabel>
                                                                <FormControl>
                                                                    <div className="px-3 py-2 border rounded-md bg-muted">
                                                                        {question.type === QuestionTypeEnum.SINGLE_CHOICE && "单选题"}
                                                                        {question.type === QuestionTypeEnum.MULTIPLE_CHOICE && "多选题"}
                                                                        {question.type === QuestionTypeEnum.SHORT_ANSWER && "简答题"}
                                                                    </div>
                                                                </FormControl>
                                                            </FormItem>

                                                            {/* 题目内容 */}
                                                            <FormItem>
                                                                <FormLabel>题目内容</FormLabel>
                                                                <div className="space-y-2">
                                                                    <FormControl>
                                                                        <div className="px-3 py-2 border rounded-md">
                                                                            {question.content || "无内容"}
                                                                        </div>
                                                                    </FormControl>
                                                                    {question.imageUrl && (
                                                                        <div className="mt-2 p-2 border rounded">
                                                                            <img
                                                                                src={question.imageUrl}
                                                                                alt="题目图片"
                                                                                className="max-h-40 object-contain"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </FormItem>

                                                            {/* 题目分值 */}
                                                            <FormItem>
                                                                <FormLabel>分值</FormLabel>
                                                                <FormControl>
                                                                    <div className="px-3 py-2 border rounded-md bg-muted">
                                                                        {question.score} 分
                                                                    </div>
                                                                </FormControl>
                                                            </FormItem>

                                                            {/* 选项（单选题和多选题） */}
                                                            {(question.type === QuestionTypeEnum.SINGLE_CHOICE || question.type === QuestionTypeEnum.MULTIPLE_CHOICE) && (
                                                                <div className="space-y-4">
                                                                    <h4 className="font-medium">选项</h4>
                                                                    {question.options?.map((option: Option, optionIndex: number) => (
                                                                        <div key={option.id} className="space-y-2 p-4 border rounded">
                                                                            <div className="flex justify-between items-center">
                                                                                <FormItem>
                                                                                    <FormLabel>
                                                                                        选项 {String.fromCharCode(65 + optionIndex)}
                                                                                        {(question.type === QuestionTypeEnum.SINGLE_CHOICE && question.correctOption === optionIndex) && " (正确选项)"}
                                                                                        {(question.type === QuestionTypeEnum.MULTIPLE_CHOICE && option.isCorrect) && " (正确选项)"}
                                                                                    </FormLabel>
                                                                                </FormItem>
                                                                            </div>
                                                                            <FormControl>
                                                                                <div className="px-3 py-2 border rounded-md">
                                                                                    {option.content}
                                                                                </div>
                                                                            </FormControl>
                                                                            {option.imageUrl && (
                                                                                <div className="mt-2 p-2 border rounded">
                                                                                    <img
                                                                                        src={option.imageUrl}
                                                                                        alt={`选项 ${String.fromCharCode(65 + optionIndex)} 图片`}
                                                                                        className="max-h-32 object-contain"
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 题目创建弹窗 */}
                            <QuestionCreateModal
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                                onSave={saveQuestion}
                                editingQuestion={editingQuestion}
                                categoryName={categories[currentCategoryIndex]?.name}
                            />
                            {/* 提交按钮 */}
                            <Button type="submit">
                                保存试卷
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div >
    )
}

