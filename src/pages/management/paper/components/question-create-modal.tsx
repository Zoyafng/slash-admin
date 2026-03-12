import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog"
import { FormItem, FormLabel, FormControl } from "@/ui/form"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Icon } from "@/components/icon"
import { cn } from "@/utils"
import { useEffect } from "react"

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
  answerAnalysis?: string
  answerAnalysisImageUrl?: string
}

export interface QuestionCreateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (question: Question) => void
  editingQuestion?: Question | null
  categoryName?: string
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"]

const initQuestion: Question = {
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

export default function QuestionCreateModal({
  open,
  onOpenChange,
  onSave,
  editingQuestion = null,
  categoryName = ""
}: QuestionCreateModalProps) {
  const [questionData, setQuestionData] = React.useState<Question>(
    editingQuestion || initQuestion
  )

  const handleTypeChange = (value: string) => {
    const newType = value as QuestionType
    setQuestionData(prev => ({
      ...prev,
      type: newType,
      options: (newType === QuestionType.SINGLE_CHOICE || newType === QuestionType.MULTIPLE_CHOICE)
        ? (prev.options || [
          { id: crypto.randomUUID(), content: "", isCorrect: false },
          { id: crypto.randomUUID(), content: "", isCorrect: false }
        ])
        : undefined
    }))
  }

  const handleOptionChange = (optionIndex: number, content: string) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.map((opt, idx) => idx === optionIndex ? { ...opt, content } : opt)
    }))
  }

  const handleOptionImageUpload = (optionIndex: number) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.map((opt, idx) =>
        idx === optionIndex ? { ...opt, imageUrl: `https://example.com/image-${crypto.randomUUID()}.jpg` } : opt
      )
    }))
  }

  const handleOptionCorrectnessChange = (optionIndex: number, isCorrect: boolean) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.map((opt, idx) => {
        if (prev.type === QuestionType.SINGLE_CHOICE) {
          return { ...opt, isCorrect: idx === optionIndex }
        } else {
          return { ...opt, isCorrect: idx === optionIndex ? isCorrect : opt.isCorrect }
        }
      })
    }))
  }

  const addOption = () => {
    setQuestionData(prev => ({
      ...prev,
      options: [...(prev.options || []), { id: crypto.randomUUID(), content: "", isCorrect: false }]
    }))
  }

  const removeOption = (optionIndex: number) => {
    setQuestionData(prev => ({
      ...prev,
      options: prev.options?.filter((_, idx) => idx !== optionIndex)
    }))
  }

  const handleSave = () => {
    onSave(questionData)
    onOpenChange(false)
  }

  const handleContentChange = (content: string) => {
    setQuestionData(prev => ({ ...prev, content }))
  }

  const handleImageUpload = () => {
    setQuestionData(prev => ({
      ...prev,
      imageUrl: `https://example.com/image-${crypto.randomUUID()}.jpg`
    }))
  }

  const handleScoreChange = (score: number) => {
    setQuestionData(prev => ({ ...prev, score }))
  }

  useEffect(() => {
    if (open) {
      setQuestionData(editingQuestion || initQuestion)
    }
    return () => { setQuestionData(initQuestion) }
  }, [open])

  const isChoiceType =
    questionData.type === QuestionType.SINGLE_CHOICE ||
    questionData.type === QuestionType.MULTIPLE_CHOICE

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[88vh] overflow-hidden flex flex-col p-0">

        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-base font-semibold">
                {editingQuestion ? "编辑题目" : "添加题目"}
              </DialogTitle>
              {categoryName && (
                <p className="text-xs text-muted-foreground mt-0.5">分类：{categoryName}</p>
              )}
            </div>

            {/* 题型选择 + 分值 —— 收在 header 右侧，轻量呈现 */}
            <div className="flex items-center gap-2 mr-6">
              <Select value={questionData.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="h-8 text-xs w-28 border-dashed">
                  <SelectValue placeholder="题目类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={QuestionType.SINGLE_CHOICE}>单选题</SelectItem>
                  <SelectItem value={QuestionType.MULTIPLE_CHOICE}>多选题</SelectItem>
                  <SelectItem value={QuestionType.SHORT_ANSWER}>简答题</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 h-8 px-2.5 rounded-md border border-dashed text-xs text-muted-foreground">
                <Icon icon="solar:star-bold" size={12} className="text-amber-400 shrink-0" />
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={questionData.score ?? 5}
                  onChange={(e) => handleScoreChange(parseFloat(e.target.value) || 0)}
                  className="border-0 p-0 h-auto w-9 text-xs focus-visible:ring-0 text-center"
                />
                <span>分</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* ── 滚动内容区 ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* 题目内容 */}
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium">
              题目内容
              <span className="text-destructive ml-0.5">*</span>
            </FormLabel>
            <Textarea
              placeholder="请输入题目内容…"
              value={questionData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="min-h-[96px] resize-none text-sm"
            />
            {questionData.imageUrl && (
              <div className="rounded-md border overflow-hidden w-fit">
                <img src={questionData.imageUrl} alt="题目图片" className="max-h-36 object-contain" />
              </div>
            )}
            <button
              type="button"
              onClick={handleImageUpload}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon icon="solar:upload-linear" size={13} />
              上传题目图片
            </button>
          </div>

          {/* 选项区 */}
          {isChoiceType && (
            <div className="space-y-3">
              <FormLabel className="text-sm font-medium flex items-center gap-2">
                选项
                <span className="text-xs text-muted-foreground font-normal">
                  {questionData.type === QuestionType.SINGLE_CHOICE
                    ? "点击字母圆圈标记正确答案"
                    : "点击字母圆圈勾选所有正确答案"}
                </span>
              </FormLabel>

              <div className="space-y-2">
                {(questionData.options || []).map((option, optionIndex) => (
                  <div
                    key={option.id}
                    className={cn(
                      "group flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-colors",
                      option.isCorrect
                        ? "border-green-300 bg-green-50/70"
                        : "border-border bg-muted/20 hover:bg-muted/40"
                    )}
                  >
                    {/* 字母按钮，点击设置正确答案 */}
                    <button
                      type="button"
                      title={option.isCorrect ? "取消正确答案" : "设为正确答案"}
                      className={cn(
                        "w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 mt-1.5 transition-colors",
                        option.isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground hover:bg-green-100 hover:text-green-600"
                      )}
                      onClick={() =>
                        handleOptionCorrectnessChange(
                          optionIndex,
                          questionData.type === QuestionType.SINGLE_CHOICE ? true : !option.isCorrect
                        )
                      }
                    >
                      {option.isCorrect
                        ? <Icon icon="mingcute:check-fill" size={11} />
                        : OPTION_LABELS[optionIndex]
                      }
                    </button>

                    {/* 输入区 */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <Input
                        placeholder={`选项 ${OPTION_LABELS[optionIndex]}…`}
                        value={option.content}
                        onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                        className="h-8 text-sm border-0 bg-transparent px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                      />
                      {option.imageUrl && (
                        <div className="rounded border overflow-hidden w-fit">
                          <img
                            src={option.imageUrl}
                            alt={`选项 ${OPTION_LABELS[optionIndex]} 图片`}
                            className="max-h-24 object-contain"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOptionImageUpload(optionIndex)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Icon icon="solar:upload-linear" size={11} />
                        上传图片
                      </button>
                    </div>

                    {/* 删除按钮，hover 才显示 */}
                    <button
                      type="button"
                      onClick={() => removeOption(optionIndex)}
                      className="h-6 w-6 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0 flex items-center justify-center"
                    >
                      <Icon icon="mingcute:close-fill" size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* 添加选项 */}
              <button
                type="button"
                onClick={addOption}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                <Icon icon="mingcute:add-fill" size={14} />
                添加选项
              </button>
            </div>
          )}

          {/* 答案解析 */}
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-muted-foreground">
              答案解析
              <span className="text-xs font-normal">（选填）</span>
            </FormLabel>
            <Textarea
              placeholder="请输入答案解析…"
              value={questionData.answerAnalysis || ""}
              onChange={(e) =>
                setQuestionData(prev => ({ ...prev, answerAnalysis: e.target.value }))
              }
              className="min-h-[80px] resize-none text-sm bg-amber-50/50 border-amber-100 focus-visible:ring-amber-200"
            />
            {questionData.answerAnalysisImageUrl && (
              <div className="rounded-md border overflow-hidden w-fit">
                <img src={questionData.answerAnalysisImageUrl} alt="解析图片" className="max-h-36 object-contain" />
              </div>
            )}
            <button
              type="button"
              onClick={() =>
                setQuestionData(prev => ({
                  ...prev,
                  answerAnalysisImageUrl: `https://example.com/image-${crypto.randomUUID()}.jpg`
                }))
              }
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon icon="solar:upload-linear" size={13} />
              上传解析图片
            </button>
          </div>
        </div>

        {/* ── 底部操作栏 ── */}
        <div className="px-6 py-4 border-t bg-muted/20 flex items-center justify-end gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
          >
            保存题目
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}