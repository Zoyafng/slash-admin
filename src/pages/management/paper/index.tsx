// import { USER_LIST } from "@/_mock/assets";
import { Icon } from "@/components/icon";
import { usePathname, useRouter } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Role_Old, UserInfo } from "#/entity";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useState, useReducer } from "react";
import PaperCreateModal from "./components/paper-create-modal";
import { cn } from "@/utils";
import { Switch } from "@/ui/switch";
import { NavLink } from "react-router";


const initState = {
	filter: {
	},
	pagination: {
		current: 1,
		pageSize: 10,
	},
}

const reducer = (state: typeof initState, action: { type: string; payload: any }) => {
	switch (action.type) {
		case "filter":
			return {
				...state,
				filter: action.payload,
			};
		case "pagination":
			return {
				...state,
				pagination: action.payload,
			};
		default:
			return state;
	}
};



const USERS: UserInfo[] = [];

const paperMock = [
	{
		id: 1,
		isPublic: true,
		name: "套卷1",
	},
]

export default function PaperPage() {
	const { push } = useRouter();
	const pathname = usePathname();

	const [state, dispatch] = useReducer(reducer, initState);
	const [modalOpen, setModalOpen] = useState(false);

	// 处理表单提交
	const createSubmitHandle = (data: any) => {
		// 这里可以添加创建试卷的逻辑
		console.log('创建试卷：', data);
	};



	const columns: ColumnsType<any> = [
		{
			title: "套卷名称",
			dataIndex: "name",
			width: 300,
			render: (name, record) => {
				return (
					<NavLink className="text-sm" to={`${pathname}/${record.id}`}>{name}</NavLink>
				);
			},
		},
		{
			title: (
				<div>
					<DropdownMenu>
						<div className="flex items-center justify-between">
							<div>
								是否开启
							</div>
							<DropdownMenuTrigger asChild>
								<div className={cn("w-6 h-6 flex items-center justify-center hover:text-primary cursor-pointer", { "text-primary": state.filter.isPublic !== undefined })}>
									{state.filter.isPublic !== undefined ? (
										<Icon icon="solar:filter-bold" size={16} />
									) : (
										<Icon icon="solar:filter-linear" size={16} />
									)}
								</div>
							</DropdownMenuTrigger>
						</div>
						<DropdownMenuContent>
							<DropdownMenuItem asChild onClick={() => dispatch({ type: "filter", payload: { ...state.filter, isPublic: true } })}>
								<div>开启</div>
							</DropdownMenuItem>
							<DropdownMenuItem asChild onClick={() => dispatch({ type: "filter", payload: { ...state.filter, isPublic: false } })}>
								<div>关闭</div>
							</DropdownMenuItem>
							<DropdownMenuItem asChild onClick={() => dispatch({ type: "filter", payload: { ...state.filter, isPublic: undefined } })}>
								<div>重置</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
			dataIndex: "isPublic",
			align: "center",
			width: 120,
			render: (isPublic) => (
				<Switch checked={isPublic} />
			),
		},
		// {
		// 	title: "Role",
		// 	dataIndex: "role",
		// 	align: "center",
		// 	width: 120,
		// 	render: (role: Role_Old) => <Badge variant="info">{role.name}</Badge>,
		// },
		// {
		// 	title: "Status",
		// 	dataIndex: "status",
		// 	align: "center",
		// 	width: 120,
		// 	render: (status) => (
		// 		<Badge variant={status === BasicStatus.DISABLE ? "error" : "success"}>
		// 			{status === BasicStatus.DISABLE ? "Disable" : "Enable"}
		// 		</Badge>
		// 	),
		// },
		{
			title: "操作",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className={"w-6 h-6 flex items-center justify-center rounded-md hover:bg-action-hover cursor-pointer"}>
								<Icon icon="icon-park-outline:more" size={16} />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem asChild className="h-8" onClick={() => dispatch({ type: "filter", payload: { ...state.filter, isPublic: true } })}>
								<div>删除</div>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="h-8" onClick={() => dispatch({ type: "filter", payload: { ...state.filter, isPublic: false } })}>
								<div>关闭</div>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="h-8" onClick={() => dispatch({ type: "filter", payload: { ...state.filter, isPublic: undefined } })}>
								<div>重置</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
		},
	];

	return (
		<>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>试卷列表</div>
						<Button onClick={() => setModalOpen(true)}>新建试卷</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table
						rowKey="id"
						size="small"
						scroll={{ x: "max-content" }}
						pagination={false}
						columns={columns}
						dataSource={paperMock}
					/>
				</CardContent>
			</Card>
			<PaperCreateModal
				open={modalOpen}
				onOpenChange={setModalOpen}
				onSubmit={createSubmitHandle}
			/>
		</>
	);
}
