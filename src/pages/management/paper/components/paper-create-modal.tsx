import { useForm } from "react-hook-form"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Button } from "@/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"

// 定义表单数据接口
type PaperFormData = {
	name: string
	type: string
	description: string
}

// 定义组件 props 接口
type PaperCreateModalProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (data: PaperFormData) => void
}

// 试卷类型选项
const paperTypes = [
	{ value: "exam", label: "考试" },
	{ value: "practice", label: "练习" },
	{ value: "quiz", label: "测验" },
]

export default function PaperCreateModal({ open, onOpenChange, onSubmit }: PaperCreateModalProps) {
	const form = useForm<PaperFormData>({
		defaultValues: {
			name: "",
			type: "exam",
			description: "",
		},
	})

	const handleSubmit = (data: PaperFormData) => {
		onSubmit(data)
		onOpenChange(false)
		form.reset()
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>创建试卷</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<div className="space-y-4 py-4">
						{/* 试卷名称 */}
						<FormField
							control={form.control}
							name="name"
							rules={{
								required: "请输入试卷名称",
								minLength: {
									value: 2,
									message: "试卷名称至少需要 2 个字符",
								},
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>试卷名称</FormLabel>
									<FormControl>
										<Input {...field} placeholder="请输入试卷名称" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* 试卷类型 */}
						<FormField
							control={form.control}
							name="type"
							rules={{
								required: "请选择试卷类型",
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>试卷类型</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{paperTypes.map((opt) => (
													<SelectItem key={opt.value} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* 试卷描述 */}
						<FormField
							control={form.control}
							name="description"
							rules={{
								maxLength: {
									value: 500,
									message: "试卷描述最多 500 个字符",
								},
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>试卷描述</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="请输入试卷描述"
											className="min-h-[100px]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-end space-x-2">
						<Button
							type="button"
							variant="secondary"
							onClick={() => onOpenChange(false)}
						>
							取消
						</Button>
						<Button type="button" onClick={form.handleSubmit(handleSubmit)}>创建试卷</Button>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
