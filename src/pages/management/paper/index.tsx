// import { USER_LIST } from "@/_mock/assets";
import { Icon } from "@/components/icon";
import { usePathname, useRouter } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Role_Old, UserInfo } from "#/entity";
import { BasicStatus } from "#/enum";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useReducer } from "react";
import { cn } from "@/utils";


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

export default function PaperPage() {
	const { push } = useRouter();
	const pathname = usePathname();

	const [state, dispatch] = useReducer(reducer, initState);



	const columns: ColumnsType<any> = [
		{
			title: "套卷名称",
			dataIndex: "name",
			width: 300,
			render: (_, record) => {
				return (
					<div className="flex">
						<img
							alt=""
							src={record.avatar}
							className="h-10 w-10 rounded-full"
						/>
						<div className="ml-2 flex flex-col">
							<span className="text-sm">{record.username}</span>
							<span className="text-xs text-text-secondary">
								{record.email}
							</span>
						</div>
					</div>
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
								<div className={cn("w-6 h-6 flex items-center justify-center hover:text-primary", { "text-primary": state.filter.isPublic !== undefined })}>
									{state.filter.isPublic !== undefined ? (
										<Icon icon="solar:filter-bold" size={16} />
									) : (
										<Icon icon="solar:filter-linear" size={16} />
									)}
								</div>
							</DropdownMenuTrigger>
						</div>
						<DropdownMenuContent className="w-56">
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
				<Badge variant={isPublic ? "success" : "error"}>
					{isPublic ? "公开" : "不公开"}
				</Badge>
			),
		},
		{
			title: "Role",
			dataIndex: "role",
			align: "center",
			width: 120,
			render: (role: Role_Old) => <Badge variant="info">{role.name}</Badge>,
		},
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			width: 120,
			render: (status) => (
				<Badge variant={status === BasicStatus.DISABLE ? "error" : "success"}>
					{status === BasicStatus.DISABLE ? "Disable" : "Enable"}
				</Badge>
			),
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray-500">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => {
							push(`${pathname}/${record.id}`);
						}}
					>
						<Icon icon="mdi:card-account-details" size={18} />
					</Button>
					<Button variant="ghost" size="icon" onClick={() => { }}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant="ghost" size="icon">
						<Icon
							icon="mingcute:delete-2-fill"
							size={18}
							className="text-error!"
						/>
					</Button>
				</div>
			),
		},
	];

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>试卷列表</div>
					<Button onClick={() => { }}>新建试卷</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey="id"
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={USERS}
				/>
			</CardContent>
		</Card>
	);
}
