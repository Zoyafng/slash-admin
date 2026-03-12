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

// 题型标签映射
const QUESTION_TYPE_LABEL: Record<string, string> = {
    [QuestionTypeEnum.SINGLE_CHOICE]: "单选题",
    [QuestionTypeEnum.MULTIPLE_CHOICE]: "多选题",
    [QuestionTypeEnum.SHORT_ANSWER]: "简答题",
}

// 选项字母标签
const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"]

export default function ExamTab() {
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
                            { "id": "fe32a4b3-94a0-4ab8-b194-7612a0a51953", "content": "我国共有分属汉藏、阿尔泰、南亚、南岛、印欧五大语系的包括汉语在内130余种语言", "isCorrect": false },
                            { "id": "10e88bdc-e75d-4ea4-b7a6-8c84abc2f6a5", "content": '周代"雅言"、秦代"书同文"、汉代"通语"、宋元"正音"、明清"官话"体现的是我国通用语言文字传统', "isCorrect": false },
                            { "id": "671c40f6-3a77-4e9b-b179-cfbadf9d8851", "content": "我国各民族在历史上曾经创造过众多文字种类，大多数民族语言都有与之相适应的文字，这些文字具有通用性", "isCorrect": true },
                            { "id": "7b0717b1-bbca-4159-bc75-2950d6c33a29", "content": '甲骨文已成功申报"世界记忆名录"，这是中华语言文明走向国际社会的实证', "isCorrect": false }
                        ],
                        "score": 5,
                        "answerAnalysis": `解析\n本题考查人文常识。\nA项正确，中国民族语言，按语言谱系分类法，大体上分别属于汉藏、阿尔泰、南亚、南岛、印欧五大语系。其中，汉语属于汉藏语系，而其他少数民族语言则分属不同的语系。据统计，中国境内共有130多种语言。\nB项正确，中国历史上一直有通用语言文字的传统，这些通用语言在不同时期有不同的名称：周代"雅言"、秦代"书同文"、汉代"通语"、宋元"正音"、明清"官话"。这些不同历史时期的通用语言文字，反映了我国在语言规范化、标准化方面的不断努力和传承，体现了中华民族对语言文字统一和规范的重视，反映了我国通用语言文字的传统。\nC项错误，我国各民族在历史上确实创造过多种文字，但并不是大多数民族语言都有与之相适应的文字，而且这些文字并不都具有通用性。\nD项正确，2017年11月24日，甲骨文成功入选《世界记忆名录》。\n本题为选非题，故正确答案为C。`
                    },
                    {
                        "id": "6bbcf5c6-9adb-46aa-8187-57d70fa055a0",
                        "type": "single_choice",
                        "content": "我国语言文字博大精深，源远流长，是中华文化的重要载体。关于我国语言文字，下列说法不正确的是：",
                        "options": [
                            { "id": "fe32a4b3-94a0-4ab8-b194-7612a0a51953", "content": "我国共有分属汉藏、阿尔泰、南亚、南岛、印欧五大语系的包括汉语在内130余种语言", "isCorrect": false },
                            { "id": "10e88bdc-e75d-4ea4-b7a6-8c84abc2f6a5", "content": '周代"雅言"、秦代"书同文"、汉代"通语"、宋元"正音"、明清"官话"体现的是我国通用语言文字传统', "isCorrect": false },
                            { "id": "671c40f6-3a77-4e9b-b179-cfbadf9d8851", "content": "我国各民族在历史上曾经创造过众多文字种类，大多数民族语言都有与之相适应的文字，这些文字具有通用性", "isCorrect": true },
                            { "id": "7b0717b1-bbca-4159-bc75-2950d6c33a29", "content": '甲骨文已成功申报"世界记忆名录"，这是中华语言文明走向国际社会的实证', "isCorrect": false }
                        ],
                        "score": 5,
                        "answerAnalysis": `解析\n本题考查人文常识。\nA项正确，中国民族语言，按语言谱系分类法，大体上分别属于汉藏、阿尔泰、南亚、南岛、印欧五大语系。其中，汉语属于汉藏语系，而其他少数民族语言则分属不同的语系。据统计，中国境内共有130多种语言。\nB项正确，中国历史上一直有通用语言文字的传统，这些通用语言在不同时期有不同的名称：周代"雅言"、秦代"书同文"、汉代"通语"、宋元"正音"、明清"官话"。这些不同历史时期的通用语言文字，反映了我国在语言规范化、标准化方面的不断努力和传承，体现了中华民族对语言文字统一和规范的重视，反映了我国通用语言文字的传统。\nC项错误，我国各民族在历史上确实创造过多种文字，但并不是大多数民族语言都有与之相适应的文字，而且这些文字并不都具有通用性。\nD项正确，2017年11月24日，甲骨文成功入选《世界记忆名录》。\n本题为选非题，故正确答案为C。`
                    }]
                },
                { id: crypto.randomUUID(), category: QuestionCategory.QUANTITATIVE_REASONING, name: "数量关系", questions: [] },
                { id: crypto.randomUUID(), category: QuestionCategory.VERBAL_ABILITY, name: "言语理解", questions: [] },
                { id: crypto.randomUUID(), category: QuestionCategory.LOGICAL_REASONING, name: "逻辑推理", questions: [] }
            ]
        }
    })

    const { watch, setValue, handleSubmit } = formMethods
    const [activeCategory, setActiveCategory] = React.useState<QuestionCategory[]>([...Object.values(QuestionCategory)])
    const [expandedAnalysis, setExpandedAnalysis] = React.useState<Set<string>>(new Set())
    const categories = watch("categories")

    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [currentCategoryId, setCurrentCategoryId] = React.useState<string>("")
    const [editingQuestion, setEditingQuestion] = React.useState<QuestionType | null>(null)

    const openAddQuestionDialog = (categoryId: string) => {
        setCurrentCategoryId(categoryId)
        setEditingQuestion(null)
        setIsDialogOpen(true)
    }

    const openEditQuestionDialog = (categoryId: string, question: QuestionType) => {
        setCurrentCategoryId(categoryId)
        setEditingQuestion({ ...question })
        setIsDialogOpen(true)
    }

    const saveQuestion = (questionData: QuestionType) => {
        const updatedCategories = [...categories]
        const categoryIndex = updatedCategories.findIndex(cat => cat.id === currentCategoryId)
        if (categoryIndex === -1) return
        if (editingQuestion) {
            const questionIndex = updatedCategories[categoryIndex].questions.findIndex(q => q.id === editingQuestion.id)
            if (questionIndex !== -1) updatedCategories[categoryIndex].questions[questionIndex] = questionData
        } else {
            updatedCategories[categoryIndex].questions.push(questionData)
        }
        setValue("categories", updatedCategories)
        setIsDialogOpen(false)
    }

    const removeQuestion = (categoryId: string, questionId: string) => {
        const updatedCategories = [...categories]
        const categoryIndex = updatedCategories.findIndex(cat => cat.id === categoryId)
        if (categoryIndex === -1) return
        updatedCategories[categoryIndex].questions = updatedCategories[categoryIndex].questions.filter(q => q.id !== questionId)
        setValue("categories", updatedCategories)
    }

    const toggleAnalysis = (questionId: string) => {
        setExpandedAnalysis(prev => {
            const next = new Set(prev)
            next.has(questionId) ? next.delete(questionId) : next.add(questionId)
            return next
        })
    }

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data)
    }

    return (
        <div className="space-y-4">
            <Form {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* 顶部操作栏 */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-muted-foreground">
                            共 {categories.reduce((acc, c) => acc + c.questions.length, 0)} 题 ·{" "}
                            {categories.reduce((acc, c) => acc + c.questions.reduce((s, q) => s + (q.score ?? 0), 0), 0)} 分
                        </div>
                        <Button type="submit" size="sm">
                            <Icon icon="mingcute:save-2-fill" size={15} className="mr-1.5" />
                            保存试卷
                        </Button>
                    </div>

                    {/* 分类列表 */}
                    <div className="space-y-3">
                        {categories.map((category) => {
                            const isOpen = activeCategory.includes(category.category)
                            const questionCount = category.questions.length
                            const totalScore = category.questions.reduce((s, q) => s + (q.score ?? 0), 0)

                            return (
                                <Collapsible key={category.id} open={isOpen}>
                                    {/* 分类 Header */}
                                    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted/50 border border-border/60">
                                        <CollapsibleTrigger asChild>
                                            <button
                                                type="button"
                                                className="flex items-center gap-2.5 flex-1 text-left"
                                                onClick={() =>
                                                    setActiveCategory(prev =>
                                                        prev.includes(category.category)
                                                            ? prev.filter(c => c !== category.category)
                                                            : [...prev, category.category]
                                                    )
                                                }
                                            >
                                                <Icon
                                                    icon="eva:arrow-ios-forward-fill"
                                                    className={cn(
                                                        "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
                                                        { "rotate-90": isOpen }
                                                    )}
                                                />
                                                <span className="font-medium text-sm">{category.name}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {questionCount} 题 · {totalScore} 分
                                                </span>
                                            </button>
                                        </CollapsibleTrigger>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openAddQuestionDialog(category.id)}
                                        >
                                            <Icon icon="mingcute:add-fill" size={13} className="mr-1" />
                                            添加题目
                                        </Button>
                                    </div>

                                    {/* 题目列表 */}
                                    <CollapsibleContent>
                                        <div className="mt-2 space-y-3">
                                            {category.questions.length === 0 && (
                                                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground text-sm border border-dashed rounded-lg">
                                                    <Icon icon="solar:document-add-linear" size={28} className="mb-2 opacity-40" />
                                                    暂无题目，点击「添加题目」开始录入
                                                </div>
                                            )}

                                            {category.questions.map((question, questionIndex) => {
                                                const isAnalysisOpen = expandedAnalysis.has(question.id)
                                                return (
                                                    <div
                                                        key={question.id}
                                                        className="rounded-lg border bg-card overflow-hidden"
                                                    >
                                                        {/* 题目 Header */}
                                                        <div className="flex items-center justify-between px-5 py-3 border-b bg-muted/20">
                                                            <div className="flex items-center gap-2.5">
                                                                {/* 序号徽章 */}
                                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                                                                    {questionIndex + 1}
                                                                </span>
                                                                {/* 题型 */}
                                                                <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium border">
                                                                    {QUESTION_TYPE_LABEL[question.type] ?? question.type}
                                                                </span>
                                                                {/* 分值 */}
                                                                <span className="text-xs text-muted-foreground">
                                                                    {question.score} 分
                                                                </span>
                                                            </div>
                                                            {/* 操作按钮 */}
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-7 px-2.5 text-xs"
                                                                    onClick={() => openEditQuestionDialog(category.id, question)}
                                                                >
                                                                    <Icon icon="mingcute:edit-2-line" size={13} className="mr-1" />
                                                                    编辑
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-7 px-2.5 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                    onClick={() => removeQuestion(category.id, question.id)}
                                                                >
                                                                    <Icon icon="mingcute:delete-2-line" size={13} className="mr-1" />
                                                                    删除
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        {/* 题目内容区 */}
                                                        <div className="px-5 py-4 space-y-4">
                                                            {/* 题干 */}
                                                            <p className="text-sm leading-relaxed text-foreground">
                                                                {question.content || "无内容"}
                                                            </p>

                                                            {/* 题目图片 */}
                                                            {question.imageUrl && (
                                                                <div className="rounded-md border overflow-hidden w-fit">
                                                                    <img src={question.imageUrl} alt="题目图片" className="max-h-40 object-contain" />
                                                                </div>
                                                            )}

                                                            {/* 选项列表 */}
                                                            {(question.type === QuestionTypeEnum.SINGLE_CHOICE || question.type === QuestionTypeEnum.MULTIPLE_CHOICE) && (
                                                                <div className="space-y-1.5">
                                                                    {question.options?.map((option: Option, optionIndex: number) => (
                                                                        <div
                                                                            key={option.id}
                                                                            className={cn(
                                                                                "flex items-start gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                                                                                option.isCorrect
                                                                                    ? "bg-green-50 border border-green-200 text-green-900"
                                                                                    : "bg-muted/30 border border-transparent"
                                                                            )}
                                                                        >
                                                                            {/* 选项字母 */}
                                                                            <span className={cn(
                                                                                "w-5 h-5 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5",
                                                                                option.isCorrect
                                                                                    ? "bg-green-500 text-white"
                                                                                    : "bg-muted-foreground/20 text-muted-foreground"
                                                                            )}>
                                                                                {OPTION_LABELS[optionIndex]}
                                                                            </span>
                                                                            <span className="flex-1 leading-relaxed">{option.content}</span>
                                                                            {option.isCorrect && (
                                                                                <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-green-600">
                                                                                    <Icon icon="mingcute:check-circle-fill" size={14} />
                                                                                    正确答案
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* 答案解析 - 可折叠 */}
                                                            {(question.answerAnalysis || question.answerAnalysisImageUrl) && (
                                                                <div className="border rounded-md overflow-hidden">
                                                                    <button
                                                                        type="button"
                                                                        className="w-full flex items-center justify-between px-3 py-2 bg-amber-50 hover:bg-amber-100 transition-colors text-sm"
                                                                        onClick={() => toggleAnalysis(question.id)}
                                                                    >
                                                                        <span className="flex items-center gap-1.5 font-medium text-amber-700">
                                                                            <Icon icon="solar:lightbulb-bold" size={15} />
                                                                            答案解析
                                                                        </span>
                                                                        <Icon
                                                                            icon="eva:arrow-ios-forward-fill"
                                                                            size={15}
                                                                            className={cn(
                                                                                "text-amber-500 transition-transform duration-200",
                                                                                { "rotate-90": isAnalysisOpen }
                                                                            )}
                                                                        />
                                                                    </button>
                                                                    {isAnalysisOpen && (
                                                                        <div className="px-4 py-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-amber-50/40">
                                                                            {question.answerAnalysis}
                                                                            {question.answerAnalysisImageUrl && (
                                                                                <div className="mt-2 rounded border overflow-hidden w-fit">
                                                                                    <img src={question.answerAnalysisImageUrl} alt="解析图片" className="max-h-40 object-contain" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            )
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
        </div>
    )
}