import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

interface WrongQuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wrongQuestions: any[];
  category: string;
}

// ─── Mock 数据 ────────────────────────────────────────────────────────────────

interface RangeTable {
  headers: string[];
  rows: string[][];
}

interface Question {
  id: number;
  content: string;
  material?: {
    title: string;
    table: RangeTable;
  } | null;
  options: { label: string; text: string }[];
  correctAnswer: string;
  studentAnswer: string;
  explanation: string;
}

interface QuestionGroup {
  category: string;
  questions: Question[];
}

const numberRangeMaterial = {
  title: "数字区间定位",
  table: {
    headers: ["A", "B", "C", "D", "E"],
    rows: [
      ["13569`14342", "12527`13342", "4538`5216", "22652`22937", "5962`6353"],
      ["2964`3868", "59676`60424", "41474`42107", "14347`14560", "32427`33350"],
    ],
  },
};

const questionMock: QuestionGroup[] = [
  {
    category: "知觉速度与准确性",
    questions: [
      {
        id: 1,
        content: "14434",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "D",
        studentAnswer: "D",
        explanation: "14434 落在 D 列第二行区间 14347~14560 内，故选 D。",
      },
      {
        id: 2,
        content: "13000",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "13000 落在 B 列第一行区间 12527~13342 内，故选 B。",
      },
      {
        id: 3,
        content: "5100",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "5100 落在 C 列第一行区间 4538~5216 内，故选 C。",
      },
      {
        id: 4,
        content: "22800",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "D",
        studentAnswer: "D",
        explanation: "22800 落在 D 列第一行区间 22652~22937 内，故选 D。",
      },
      {
        id: 5,
        content: "6200",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "E",
        studentAnswer: "C",
        explanation: "6200 落在 E 列第一行区间 5962~6353 内，故选 E。",
      },
      {
        id: 6,
        content: "3500",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "3500 落在 A 列第二行区间 2964~3868 内，故选 A。",
      },
      {
        id: 7,
        content: "60000",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "60000 落在 B 列第二行区间 59676~60424 内，故选 B。",
      },
      {
        id: 8,
        content: "41800",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "C",
        studentAnswer: "D",
        explanation: "41800 落在 C 列第二行区间 41474~42107 内，故选 C。",
      },
      {
        id: 9,
        content: "33000",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "E",
        studentAnswer: "E",
        explanation: "33000 落在 E 列第二行区间 32427~33350 内，故选 E。",
      },
      {
        id: 10,
        content: "13800",
        material: numberRangeMaterial,
        options: [
          { label: "A", text: "A" },
          { label: "B", text: "B" },
          { label: "C", text: "C" },
          { label: "D", text: "D" },
          { label: "E", text: "E" },
        ],
        correctAnswer: "A",
        studentAnswer: "B",
        explanation: "13800 落在 A 列第一行区间 13569~14342 内，故选 A。",
      },
    ],
  },
  {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  }, {
    category: "政治理论",
    questions: [
      {
        id: 61,
        content: "马克思主义哲学认为，物质的唯一特性是（　）。",
        material: null,
        options: [
          { label: "A", text: "运动性" },
          { label: "B", text: "客观实在性" },
          { label: "C", text: "可知性" },
          { label: "D", text: "永恒性" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "物质的唯一特性是客观实在性，即物质独立于人的意识之外并能被人的意识所反映。",
      },
      {
        id: 62,
        content: "下列关于意识的说法，正确的是（　）。",
        material: null,
        options: [
          { label: "A", text: "意识是大脑的分泌物" },
          { label: "B", text: "意识是客观世界的主观映像" },
          { label: "C", text: "意识与物质没有区别" },
          { label: "D", text: "意识先于物质而存在" },
        ],
        correctAnswer: "B",
        studentAnswer: "D",
        explanation: "意识是人脑对客观世界的主观映像，既有客观来源，又以主观形式存在。",
      },
      {
        id: 63,
        content: "唯物辩证法的总特征是（　）。",
        material: null,
        options: [
          { label: "A", text: "联系和发展的观点" },
          { label: "B", text: "矛盾的观点" },
          { label: "C", text: "否定之否定的观点" },
          { label: "D", text: "质量互变的观点" },
        ],
        correctAnswer: "A",
        studentAnswer: "A",
        explanation: "联系和发展的观点是唯物辩证法的总特征，矛盾规律是其实质与核心。",
      },
      {
        id: 64,
        content: "社会主义核心价值观在国家层面的价值目标包括（　）。",
        material: null,
        options: [
          { label: "A", text: "富强、民主、文明、和谐" },
          { label: "B", text: "自由、平等、公正、法治" },
          { label: "C", text: "爱国、敬业、诚信、友善" },
          { label: "D", text: "创新、协调、绿色、开放" },
        ],
        correctAnswer: "A",
        studentAnswer: "C",
        explanation: "社会主义核心价值观国家层面为：富强、民主、文明、和谐；社会层面为：自由、平等、公正、法治；个人层面为：爱国、敬业、诚信、友善。",
      },
      {
        id: 65,
        content: "中国共产党的根本宗旨是（　）。",
        material: null,
        options: [
          { label: "A", text: "实现共产主义" },
          { label: "B", text: "全心全意为人民服务" },
          { label: "C", text: "坚持党的领导" },
          { label: "D", text: "维护社会稳定" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "全心全意为人民服务是中国共产党的根本宗旨，也是党的一切行动的出发点和落脚点。",
      },
      {
        id: 66,
        content: "我国现阶段的主要矛盾是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民日益增长的物质文化需要同落后的社会生产之间的矛盾" },
          { label: "B", text: "人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾" },
          { label: "C", text: "先进生产力与落后生产关系之间的矛盾" },
          { label: "D", text: "社会主义与资本主义之间的矛盾" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "党的十九大报告指出，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。",
      },
      {
        id: 67,
        content: "下列属于上层建筑的是（　）。",
        material: null,
        options: [
          { label: "A", text: "生产工具" },
          { label: "B", text: "国家政权" },
          { label: "C", text: "经济基础" },
          { label: "D", text: "自然环境" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "上层建筑包括政治上层建筑（国家政权、法律制度等）和观念上层建筑（政治、法律思想等），国家政权属于政治上层建筑。",
      },
      {
        id: 68,
        content: "实践是检验真理的唯一标准，其根本原因在于（　）。",
        material: null,
        options: [
          { label: "A", text: "实践是主观见之于客观的活动" },
          { label: "B", text: "实践具有直接现实性" },
          { label: "C", text: "实践是人类最基本的活动" },
          { label: "D", text: "实践是社会历史的活动" },
        ],
        correctAnswer: "B",
        studentAnswer: "A",
        explanation: "实践具有直接现实性，能够把主观认识与客观实际联系起来加以比较、对照，因此实践是检验真理的唯一标准。",
      },
      {
        id: 69,
        content: "我国的国体是（　）。",
        material: null,
        options: [
          { label: "A", text: "人民代表大会制度" },
          { label: "B", text: "人民民主专政" },
          { label: "C", text: "中国共产党领导的多党合作制度" },
          { label: "D", text: "民族区域自治制度" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "国体是国家的阶级本质，我国的国体是人民民主专政；政体是国家政权的组织形式，我国政体是人民代表大会制度。",
      },
      {
        id: 70,
        content: "新民主主义革命的性质是（　）。",
        material: null,
        options: [
          { label: "A", text: "社会主义革命" },
          { label: "B", text: "资产阶级民主革命" },
          { label: "C", text: "无产阶级领导的资产阶级民主革命" },
          { label: "D", text: "民族民主革命" },
        ],
        correctAnswer: "C",
        studentAnswer: "C",
        explanation: "新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义、封建主义和官僚资本主义的资产阶级民主革命。",
      },
      {
        id: 71,
        content: "党的思想路线的核心是（　）。",
        material: null,
        options: [
          { label: "A", text: "一切从实际出发" },
          { label: "B", text: "实事求是" },
          { label: "C", text: "理论联系实际" },
          { label: "D", text: "在实践中检验和发展真理" },
        ],
        correctAnswer: "B",
        studentAnswer: "B",
        explanation: "实事求是是党的思想路线的核心，也是马克思主义中国化理论成果的精髓。",
      },
      {
        id: 72,
        content: "中国特色社会主义进入新时代，我国发展的历史方位是（　）。",
        material: null,
        options: [
          { label: "A", text: "全面建成小康社会决胜阶段" },
          { label: "B", text: "实现中华民族伟大复兴的关键时期" },
          { label: "C", text: "社会主义初级阶段" },
          { label: "D", text: "改革开放深化阶段" },
        ],
        correctAnswer: "B",
        studentAnswer: "C",
        explanation: "党的十九大报告指出，中国特色社会主义进入新时代，这是我国发展新的历史方位，是实现中华民族伟大复兴的关键时期。",
      },
    ],
  },
];

// ─── 题目选择区 ───────────────────────────────────────────────────────────────

interface QuestionSelectorProps {
  groups: QuestionGroup[];
  currentId: number;
  onSelect: (id: number) => void;
}

function QuestionSelector({ groups, currentId, onSelect }: QuestionSelectorProps) {
  const getButtonStyle = (q: Question) => {
    const isActive = q.id === currentId;
    const isWrong = q.correctAnswer !== q.studentAnswer;

    if (isActive) {
      return "bg-[#2d4e8a] text-white border-[#2d4e8a] font-semibold shadow";
    }
    if (isWrong) {
      return "border-red-400 text-red-500 hover:bg-red-50";
    }
    return "border-[#b2ddd4] text-[#3a7a6e] hover:bg-[#e8f5f2]";
  };

  return (
    <div className="w-full overflow-y-auto h-full px-4 py-5">
      <p className="text-lg font-medium text-gray-700 mb-4">题目列表</p>
      {groups.map((group) => (
        <div key={group.category} className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">{group.category}</p>
          <div className="grid grid-cols-5 gap-2">
            {group.questions.map((q) => (
              <button
                key={q.id}
                onClick={() => onSelect(q.id)}
                className={`
                  w-8 h-8 text-xs rounded border transition-all duration-150
                  ${getButtonStyle(q)}
                `}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 题目渲染区 ───────────────────────────────────────────────────────────────

interface QuestionViewProps {
  question: Question;
}

function QuestionView({ question }: QuestionViewProps) {
  const isCorrect = question.correctAnswer === question.studentAnswer;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* 素材表格 */}
      {question.material && (
        <div className="mb-5">
          <p className="text-sm text-gray-500 mb-2">材料：{question.material.title}</p>
          <table className="border-collapse text-sm text-center">
            <thead>
              <tr>
                {question.material.table.headers.map((h) => (
                  <th
                    key={h}
                    className="border border-gray-300 px-6 py-2 font-medium bg-gray-50"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {question.material.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-gray-300 px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 题号 + 题干 */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-1">{question.id}.</p>
        <p className="text-base text-gray-800">{question.content}</p>
      </div>

      {/* 选项 */}
      <div className="space-y-2 mb-6">
        {question.options.map((opt) => {
          const isStudentChoice = opt.label === question.studentAnswer;
          const isCorrectChoice = opt.label === question.correctAnswer;

          let circleClass =
            "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium shrink-0";
          let rowClass = "flex items-center gap-3 text-sm";

          if (isStudentChoice && isCorrect) {
            circleClass += " bg-[#2d9e7e] border-[#2d9e7e] text-white";
          } else if (isStudentChoice && !isCorrect) {
            circleClass += " bg-red-500 border-red-500 text-white";
          } else if (isCorrectChoice && !isCorrect) {
            circleClass += " bg-[#2d9e7e] border-[#2d9e7e] text-white";
          } else {
            circleClass += " border-gray-300 text-gray-500";
          }

          return (
            <div key={opt.label} className={rowClass}>
              <span className={circleClass}>{opt.label}</span>
              <span className="text-gray-700">{opt.text}</span>
            </div>
          );
        })}
      </div>

      {/* 分隔线 */}
      <hr className="my-6 border-t border-1 border-dashed" />
      {/* 答案信息 */}
      <div className="flex gap-6 text-sm font-medium mb-4">
        <span>
          正确答案：
          <span className="text-[#2d4e8a] ml-1">{question.correctAnswer}</span>
        </span>
        <span>
          学生答案：
          <span
            className={`ml-1 ${isCorrect ? "text-[#2d4e8a]" : "text-red-500"}`}
          >
            {question.studentAnswer}
          </span>
        </span>
      </div>

      {/* 解析 */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">解析：</p>
        <p className="text-sm text-gray-600 leading-relaxed">{question.explanation}</p>
      </div>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────

export function WrongQuestionsDialog({
  open,
  onOpenChange,
  wrongQuestions,
  category,
}: WrongQuestionsDialogProps) {
  const groups: QuestionGroup[] = questionMock;

  const allQuestions = groups.flatMap((g) => g.questions);
  const [currentId, setCurrentId] = useState<number>(allQuestions[0]?.id ?? 1);
  const currentQuestion = allQuestions.find((q) => q.id === currentId) ?? allQuestions[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[100vw] h-[100vh] max-w-[100vw] rounded-none sm:max-w-[100vw] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>答题记录 - {category}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden bg-gray-50">
          {/* 题目选择区 */}
          <div className=" shrink-0 bg-gray-50  overflow-y-auto">
            <QuestionSelector
              groups={groups}
              currentId={currentId}
              onSelect={setCurrentId}
            />
          </div>

          {/* 题目渲染区 */}
          <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-sm m-4 ml-0">
            {currentQuestion && <QuestionView question={currentQuestion} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}