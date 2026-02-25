import { Icon } from "@/components/icon";
import { usePathname, useRouter } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useState, useReducer } from "react";
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




const USER_LIST:any[] = [
    {
        id: 1,
        isAuth: true,
        name: "王艺淼",
        major: "信息工程",
        phone: "13800000000",
    },
]

export default function UsersPage() {
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
            title: "用户名",
            dataIndex: "name",
            width: 300,
            render: (name, record) => {
                return (
                    <NavLink className="text-sm" to={`${pathname}/${record.id}`}>{name}</NavLink>
                );
            },
        },
        {
            title:"专业",
            dataIndex: "major",
            width: 300,
        },
        {
            title:"手机号",
            dataIndex: "phone",
            width: 300,
        },
   
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
                                <div>详情</div>
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
                        dataSource={USER_LIST}
                    />
                </CardContent>
            </Card>
        </>
    );
}
