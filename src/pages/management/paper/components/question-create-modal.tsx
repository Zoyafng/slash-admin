import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog"
import { FormItem, FormLabel, FormControl } from "@/ui/form"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"

// 题目类型
export enum QuestionType {
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
  SHORT_ANSWER = "short_answer"
}

// 选项数据结构
export interface Option {
  id: string
  content: string
  imageUrl?: string
  isCorrect?: boolean
}

// 题目数据结构
export interface Question {
  id: string
  type: QuestionType
  content: string
  imageUrl?: string
  options?: Option[]
  score?: number
  correctOption?: number
  answerAnalysis?: string
  answerAnalysisImageUrl?: string
}

// 组件 props 接口
export interface QuestionCreateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (question: Question) => void
  editingQuestion?: Question | null
  categoryName?: string
}

export default function QuestionCreateModal({
  open,
  onOpenChange,
  onSave,
  editingQuestion = null,
  categoryName = ""
}: QuestionCreateModalProps) {
  const [questionData, setQuestionData] = React.useState<Question>(
    editingQuestion || {
      id: crypto.randomUUID(),
      type: QuestionType.SINGLE_CHOICE,
      content: "",
      options: [
        { id: crypto.randomUUID(), content: "", isCorrect: false },
        { id: crypto.randomUUID(), content: "", isCorrect: false }
      ],
      score: 5,
      answerAnalysis: ""
    }
  )

  // 处理题目类型变化
  const handleTypeChange = (value: string) => {
    const newType = value as QuestionType
    setQuestionData(prev => ({
      ...prev,
      type: newType,
      options: (newType === QuestionType.SINGLE_CHOICE || newType === QuestionType.MULTIPLE_CHOICE) ?
        (prev.options || [{ id: crypto.randomUUID(), content: "", isCorrect: false }, { id: crypto.randomUUID(), content: "", isCorrect: false }]) :
        undefined
    }))
  }

  // 处理选项内容变化
  const handleOptionChange = (optionIndex: number, content: string) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.map((opt, idx) =>
        idx === optionIndex ? { ...opt, content } : opt
      )
    }))
  }

  // 处理选项图片上传
  const handleOptionImageUpload = (optionIndex: number) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.map((opt, idx) =>
        idx === optionIndex ? { ...opt, imageUrl: `https://example.com/image-${crypto.randomUUID()}.jpg` } : opt
      )
    }))
  }

  // 处理正确选项变化（单选题）
  const handleCorrectOptionChange = (optionIndex: number) => {
    setQuestionData(prev => ({
      ...prev,
      correctOption: optionIndex
    }))
  }

  // 处理正确选项变化（多选题）
  const handleMultipleCorrectOptionChange = (optionIndex: number, isCorrect: boolean) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.map((opt, idx) =>
        idx === optionIndex ? { ...opt, isCorrect } : opt
      )
    }))
  }

  // 添加选项
  const addOption = () => {
    setQuestionData(prev => ({
      ...prev,
      options: [
        ...(prev.options || []),
        { id: crypto.randomUUID(), content: "", isCorrect: false }
      ]
    }))
  }

  // 删除选项
  const removeOption = (optionIndex: number) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.filter((_, idx) => idx !== optionIndex)
    }))
  }

  // 处理保存
  const handleSave = () => {
    onSave(questionData)
    onOpenChange(false)
  }

  // 处理题目内容变化
  const handleContentChange = (content: string) => {
    setQuestionData(prev => ({
      ...prev,
      content
    }))
  }

  // 处理题目图片上传
  const handleImageUpload = () => {
    setQuestionData(prev => ({
      ...prev,
      imageUrl: `https://example.com/image-${crypto.randomUUID()}.jpg`
    }))
  }

  // 处理分值变化
  const handleScoreChange = (score: number) => {
    setQuestionData(prev => ({
      ...prev,
      score
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingQuestion ? "编辑题目" : "添加题目"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            在 {categoryName} 分类中{editingQuestion ? "编辑" : "添加"}题目
          </p>

          {/* 题目创建/编辑表单 */}
          <div className="space-y-6">
            {/* 题目类型选择 */}
            <FormItem>
              <FormLabel>题目类型</FormLabel>
              <FormControl>
                <Select
                  value={questionData.type}
                  onValueChange={handleTypeChange}
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
                    value={questionData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="min-h-[100px]"
                  />
                </FormControl>
                {questionData.imageUrl && (
                  <div className="mt-2 p-2 border rounded">
                    <img
                      src={questionData.imageUrl}
                      alt="题目图片"
                      className="max-h-40 object-contain"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleImageUpload}
                >
                  上传题目图片
                </Button>

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
                  value={questionData.score || 5}
                  onChange={(e) => handleScoreChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
            </FormItem>



            {/* 选项（单选题和多选题） */}
            {(questionData.type === QuestionType.SINGLE_CHOICE || questionData.type === QuestionType.MULTIPLE_CHOICE) && (
              <div className="space-y-4">
                <h4 className="font-medium">选项</h4>
                {(questionData.options || []).map((option, optionIndex) => (
                  <div key={option.id} className="space-y-2 p-4 border rounded">
                    <div className="flex justify-between items-center">
                      <FormItem>
                        <FormLabel>
                          选项 {String.fromCharCode(65 + optionIndex)}
                          {(questionData.type === QuestionType.SINGLE_CHOICE && questionData.correctOption === optionIndex) && " (正确选项)"}
                          {(questionData.type === QuestionType.MULTIPLE_CHOICE && option.isCorrect) && " (正确选项)"}
                        </FormLabel>
                      </FormItem>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => removeOption(optionIndex)}
                      >
                        删除选项
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="请输入选项内容"
                        value={option.content}
                        onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                      />
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
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOptionImageUpload(optionIndex)}
                      >
                        上传选项图片
                      </Button>
                      {questionData.type === QuestionType.SINGLE_CHOICE && (
                        <FormItem className="flex items-center space-x-2">
                          <input
                            type="radio"
                            checked={questionData.correctOption === optionIndex}
                            onChange={() => handleCorrectOptionChange(optionIndex)}
                          />
                          <FormLabel className="mb-0">正确选项</FormLabel>
                        </FormItem>
                      )}
                      {questionData.type === QuestionType.MULTIPLE_CHOICE && (
                        <FormItem className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={option.isCorrect || false}
                            onChange={(e) => handleMultipleCorrectOptionChange(optionIndex, e.target.checked)}
                          />
                          <FormLabel className="mb-0">正确选项</FormLabel>
                        </FormItem>
                      )}
                    </div>

                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={addOption}
                >
                  添加选项
                </Button>
              </div>
            )}

            {/* 答案解析 */}
            <FormItem>
              <FormLabel>答案解析</FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Textarea
                    placeholder="请输入答案解析"
                    value={questionData.answerAnalysis || ""}
                    onChange={(e) => setQuestionData(prev => ({
                      ...prev,
                      answerAnalysis: e.target.value
                    }))}
                    className="min-h-[100px]"
                  />
                </FormControl>
                {questionData.answerAnalysisImageUrl && (
                  <div className="mt-2 p-2 border rounded">
                    <img
                      src={questionData.answerAnalysisImageUrl}
                      alt="解析图片"
                      className="max-h-40 object-contain"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setQuestionData(prev => ({
                    ...prev,
                    answerAnalysisImageUrl: `https://example.com/image-${crypto.randomUUID()}.jpg`
                  }))}
                >
                  上传解析图片
                </Button>

              </div>
            </FormItem>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              className="flex-1"
              onClick={handleSave}
            >
              保存题目
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
