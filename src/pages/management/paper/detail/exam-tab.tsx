import { useForm } from "react-hook-form"
import { Form, FormItem, FormLabel, FormControl } from "@/ui/form"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"

// 题目类型
enum QuestionType {
    SINGLE_CHOICE = "single_choice",
    MULTIPLE_CHOICE = "multiple_choice",
    SHORT_ANSWER = "short_answer"
}

// 题目数据结构
interface Question {
    id: string
    type: QuestionType
    content: string
    imageUrl?: string
    options?: Option[]
    score?: number
    correctOption?: number
}

// 选项数据结构
interface Option {
    id: string
    content: string
    imageUrl?: string
    isCorrect?: boolean
}

// 表单数据结构
interface FormData {
    questions: Question[]
}

export default function ExamTab() {
    // 初始化表单
    const formMethods = useForm<FormData>({
        defaultValues: {
            questions: []
        }
    })

    const { register, watch, setValue, handleSubmit } = formMethods

    // 监听题目变化
    const questions = watch("questions")

    // 添加新题目
    const addQuestion = () => {
        const newQuestion: Question = {
            id: crypto.randomUUID(),
            type: QuestionType.SINGLE_CHOICE,
            content: "",
            options: [
                {
                    id: crypto.randomUUID(),
                    content: "",
                    isCorrect: false
                },
                {
                    id: crypto.randomUUID(),
                    content: "",
                    isCorrect: false
                }
            ],
            score: 5
        }

        setValue("questions", [...questions, newQuestion])
    }

    // 删除题目
    const removeQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_: Question, i: number) => i !== index)
        setValue("questions", updatedQuestions)
    }

    // 添加选项
    const addOption = (questionIndex: number) => {
        const updatedQuestions = [...questions]
        const question = updatedQuestions[questionIndex]

        if (question.options) {
            question.options.push({
                id: crypto.randomUUID(),
                content: "",
                isCorrect: false
            })
            setValue("questions", updatedQuestions)
        }
    }

    // 删除选项
    const removeOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questions]
        const question = updatedQuestions[questionIndex]

        if (question.options) {
            question.options = question.options.filter((_: Option, i: number) => i !== optionIndex)
            setValue("questions", updatedQuestions)
        }
    }

    // 切换题目类型
    const changeQuestionType = (questionIndex: number, type: QuestionType) => {
        const updatedQuestions = [...questions]
        const question = updatedQuestions[questionIndex]

        question.type = type

        // 根据题目类型初始化选项
        if (type === QuestionType.SINGLE_CHOICE || type === QuestionType.MULTIPLE_CHOICE) {
            if (!question.options || question.options.length === 0) {
                question.options = [
                    {
                        id: crypto.randomUUID(),
                        content: "",
                        isCorrect: false
                    },
                    {
                        id: crypto.randomUUID(),
                        content: "",
                        isCorrect: false
                    }
                ]
            }
        } else {
            // 简答题不需要选项
            question.options = undefined
        }

        setValue("questions", updatedQuestions)
    }

    // 处理图片上传（这里只是模拟实现，实际需要调用上传接口）
    const handleImageUpload = (questionIndex: number, isOption: boolean, optionIndex?: number) => {
        // 模拟图片上传，实际项目中需要实现真实的上传逻辑
        const imageUrl = `https://example.com/image-${crypto.randomUUID()}.jpg`

        const updatedQuestions = [...questions]
        const question = updatedQuestions[questionIndex]

        if (isOption && optionIndex !== undefined && question.options) {
            question.options[optionIndex].imageUrl = imageUrl
        } else {
            question.imageUrl = imageUrl
        }

        setValue("questions", updatedQuestions)
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
                            {/* 题目列表 */}
                            <div className="space-y-8">
                                {questions.map((question: Question, questionIndex: number) => (
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
                                                        onClick={() => removeQuestion(questionIndex)}
                                                    >
                                                        删除题目
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {/* 题目类型选择 */}
                                            <FormItem>
                                                <FormLabel>题目类型</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={question.type}
                                                        onValueChange={(value) => changeQuestionType(questionIndex, value as QuestionType)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="选择题目类型" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={QuestionType.SINGLE_CHOICE}>
                                                                单选题
                                                            </SelectItem>
                                                            <SelectItem value={QuestionType.MULTIPLE_CHOICE}>
                                                                多选题
                                                            </SelectItem>
                                                            <SelectItem value={QuestionType.SHORT_ANSWER}>
                                                                简答题
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>

                                            {/* 题目内容 */}
                                            <FormItem>
                                                <FormLabel>题目内容</FormLabel>
                                                <div className="space-y-2">
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="请输入题目内容"
                                                            {...register(`questions.${questionIndex}.content`, {
                                                                required: "题目内容不能为空"
                                                            })}
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handleImageUpload(questionIndex, false)}
                                                    >
                                                        上传题目图片
                                                    </Button>
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
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        {...register(`questions.${questionIndex}.score`, {
                                                            required: "分值不能为空",
                                                            min: {
                                                                value: 0,
                                                                message: "分值不能为负数"
                                                            }
                                                        })}
                                                    />
                                                </FormControl>
                                            </FormItem>

                                            {/* 选项（单选题和多选题） */}
                                            {(question.type === QuestionType.SINGLE_CHOICE || question.type === QuestionType.MULTIPLE_CHOICE) && (
                                                <div className="space-y-4">
                                                    <h4 className="font-medium">选项</h4>
                                                    {question.options?.map((option: Option, optionIndex: number) => (
                                                        <div key={option.id} className="space-y-2 p-4 border rounded">
                                                            <div className="flex justify-between items-center">
                                                                <FormItem>
                                                                    <FormLabel>选项 {String.fromCharCode(65 + optionIndex)}</FormLabel>
                                                                </FormItem>
                                                                <Button
                                                                    type="button"
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={() => removeOption(questionIndex, optionIndex)}
                                                                >
                                                                    删除选项
                                                                </Button>
                                                            </div>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="请输入选项内容"
                                                                    {...register(`questions.${questionIndex}.options.${optionIndex}.content`, {
                                                                        required: "选项内容不能为空"
                                                                    })}
                                                                />
                                                            </FormControl>
                                                            <div className="flex space-x-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    onClick={() => handleImageUpload(questionIndex, true, optionIndex)}
                                                                >
                                                                    上传选项图片
                                                                </Button>
                                                                {question.type === QuestionType.SINGLE_CHOICE && (
                                                                    <FormItem className="flex items-center space-x-2">
                                                                        <input
                                                                            type="radio"
                                                                            {...register(`questions.${questionIndex}.correctOption`, {
                                                                                required: "请选择正确选项"
                                                                            })}
                                                                            value={optionIndex}
                                                                        />
                                                                        <FormLabel className="mb-0">正确选项</FormLabel>
                                                                    </FormItem>
                                                                )}
                                                                {question.type === QuestionType.MULTIPLE_CHOICE && (
                                                                    <FormItem className="flex items-center space-x-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            {...register(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)}
                                                                        />
                                                                        <FormLabel className="mb-0">正确选项</FormLabel>
                                                                    </FormItem>
                                                                )}
                                                            </div>
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
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={() => addOption(questionIndex)}
                                                    >
                                                        添加选项
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* 添加题目按钮 */}
                            <Button type="button" onClick={addQuestion}>
                                添加题目
                            </Button>

                            {/* 提交按钮 */}
                            <Button type="submit">
                                保存试卷
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

