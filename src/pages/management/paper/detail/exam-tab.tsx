import * as React from "react"
import { useForm } from "react-hook-form"
import { Form } from "@/ui/form"
import { Button } from "@/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import QuestionCreateModal, { Question as QuestionType, QuestionType as QuestionTypeEnum, Option } from "../components/question-create-modal"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import { cn } from "@/utils"
import { Icon } from "@/components/icon"
import { QuestionCategory } from "@/types/enum"



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
                    questions: [{
                        "id": "6bbcf5c6-9adb-46aa-8187-57d70fa055a0",
                        "type": "single_choice",
                        "content": "我国语言文字博大精深，源远流长，是中华文化的重要载体。关于我国语言文字，下列说法不正确的是：",
                        "options": [
                            {
                                "id": "fe32a4b3-94a0-4ab8-b194-7612a0a51953",
                                "content": "我国共有分属汉藏、阿尔泰、南亚、南岛、印欧五大语系的包括汉语在内130余种语言",
                                "isCorrect": false
                            },
                            {
                                "id": "10e88bdc-e75d-4ea4-b7a6-8c84abc2f6a5",
                                "content": "周代“雅言”、秦代“书同文”、汉代“通语”、宋元“正音”、明清“官话”体现的是我国通用语言文字传统",
                                "isCorrect": false
                            },
                            {
                                "id": "671c40f6-3a77-4e9b-b179-cfbadf9d8851",
                                "content": "我国各民族在历史上曾经创造过众多文字种类，大多数民族语言都有与之相适应的文字，这些文字具有通用性",
                                "isCorrect": true
                            },
                            {
                                "id": "7b0717b1-bbca-4159-bc75-2950d6c33a29",
                                "content": "甲骨文已成功申报“世界记忆名录”，这是中华语言文明走向国际社会的实证",
                                "isCorrect": false
                            }
                        ],
                        "score": 5,
                        "answerAnalysis": "解析\n本题考查人文常识。\nA项正确，中国民族语言，按语言谱系分类法，大体上分别属于汉藏、阿尔泰、南亚、南岛、印欧五大语系。其中，汉语属于汉藏语系，而其他少数民族语言则分属不同的语系。据统计，中国境内共有130多种语言。\nB项正确，中国历史上一直有通用语言文字的传统，这些通用语言在不同时期有不同的名称：周代“雅言”、秦代“书同文”、汉代“通语”、宋元“正音”、明清“官话”。这些不同历史时期的通用语言文字，反映了我国在语言规范化、标准化方面的不断努力和传承，体现了中华民族对语言文字统一和规范的重视，反映了我国通用语言文字的传统。\nC项错误，我国各民族在历史上确实创造过多种文字，但并不是大多数民族语言都有与之相适应的文字，而且这些文字并不都具有通用性。许多少数民族语言在历史上并没有发展出独立的文字系统，或者其文字系统并未广泛使用。同时，不同民族的文字系统之间并不具有通用性，它们各自服务于特定的语言和文化群体。\nD项正确，2017年11月24日，甲骨文成功入选《世界记忆名录》，成为了世界文化交流与传承的重要桥梁。甲骨文作为我国目前已知最早的成体系的文字形式，承载着殷商时期大量的政治、经济、文化等信息。它成功入选，无疑是中华语言文明走向国际社会，被世界认可和重视的有力实证。\n本题为选非题，故正确答案为C。"
                    }]
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
    console.log(categories, "categories")

    // 模态框状态
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [currentCategoryId, setCurrentCategoryId] = React.useState<string>("")
    const [editingQuestion, setEditingQuestion] = React.useState<QuestionType | null>(null)

    // 打开添加题目模态框
    const openAddQuestionDialog = (categoryId: string) => {
        setCurrentCategoryId(categoryId)
        setEditingQuestion(null)
        setIsDialogOpen(true)
    }

    // 打开编辑题目模态框
    const openEditQuestionDialog = (categoryId: string, question: QuestionType) => {
        setCurrentCategoryId(categoryId)
        setEditingQuestion({ ...question })
        setIsDialogOpen(true)
    }

    // 保存题目到指定分类
    const saveQuestion = (questionData: QuestionType) => {
        console.log(questionData, "questionData")
        const updatedCategories = [...categories]

        // 找到当前分类
        const categoryIndex = updatedCategories.findIndex(cat => cat.id === currentCategoryId)
        if (categoryIndex === -1) return

        if (editingQuestion) {
            // 编辑现有题目
            const questionIndex = updatedCategories[categoryIndex].questions.findIndex(q => q.id === editingQuestion.id)
            if (questionIndex !== -1) {
                updatedCategories[categoryIndex].questions[questionIndex] = questionData
            }
        } else {
            // 添加新题目
            updatedCategories[categoryIndex].questions.push(questionData)
        }

        setValue("categories", updatedCategories)
        setIsDialogOpen(false)
    }

    // 删除指定分类中的题目
    const removeQuestion = (categoryId: string, questionId: string) => {
        const updatedCategories = [...categories]
        const categoryIndex = updatedCategories.findIndex(cat => cat.id === categoryId)
        if (categoryIndex === -1) return
        updatedCategories[categoryIndex].questions = updatedCategories[categoryIndex].questions.filter(q => q.id !== questionId)
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
                                                onClick={() => openAddQuestionDialog(category.id)}
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
                                                                                onClick={() => openEditQuestionDialog(category.id, question)}
                                                                            >
                                                                                编辑题目
                                                                            </Button>
                                                                            <Button
                                                                                type="button"
                                                                                variant="danger"
                                                                                size="sm"
                                                                                onClick={() => removeQuestion(category.id, question.id)}
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
                                categoryName={categories.find(cat => cat.id === currentCategoryId)?.name}
                            />

                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div >
    )
}

