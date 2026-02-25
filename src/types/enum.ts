export enum BasicStatus {
	DISABLE = 0,
	ENABLE = 1,
}

export enum ResultStatus {
	SUCCESS = 0,
	ERROR = -1,
	TIMEOUT = 401,
}

export enum StorageEnum {
	UserInfo = "userInfo",
	UserToken = "userToken",
	Settings = "settings",
	I18N = "i18nextLng",
}

export enum ThemeMode {
	Light = "light",
	Dark = "dark",
}

export enum ThemeLayout {
	Vertical = "vertical",
	Horizontal = "horizontal",
	Mini = "mini",
}

export enum ThemeColorPresets {
	Default = "default",
	Cyan = "cyan",
	Purple = "purple",
	Blue = "blue",
	Orange = "orange",
	Red = "red",
}

export enum LocalEnum {
	en_US = "en_US",
	zh_CN = "zh_CN",
}

export enum MultiTabOperation {
	FULLSCREEN = "fullscreen",
	REFRESH = "refresh",
	CLOSE = "close",
	CLOSEOTHERS = "closeOthers",
	CLOSEALL = "closeAll",
	CLOSELEFT = "closeLeft",
	CLOSERIGHT = "closeRight",
}

export enum PermissionType {
	GROUP = 0,
	CATALOGUE = 1,
	MENU = 2,
	COMPONENT = 3,
}

export enum HtmlDataAttribute {
	ColorPalette = "data-color-palette",
	ThemeMode = "data-theme-mode",
}



// 题型分类
export enum QuestionCategory {
    GENERAL_KNOWLEDGE = "general_knowledge",
    QUANTITATIVE_REASONING = "quantitative_reasoning",
    VERBAL_ABILITY = "verbal_ability",
    LOGICAL_REASONING = "logical_reasoning"
}