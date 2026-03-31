# Doudian (抖店)

**Mode**: 🔐 Browser · **Domain**: `douhuo.jinritemai.com` / `compass.jinritemai.com`

## Commands

| Command | Description |
|---------|-------------|
| `opencli doudian cat3` | 获取全部3级类目 |
| `opencli doudian cat4` | 获取全部4级类目 |
| `opencli doudian douyin_hot` | 抖音热门榜单 |
| `opencli doudian ecom_hot` | 电商热搜词 |
| `opencli doudian goodscomments` | 获取货品评论 |
| `opencli doudian goodsdetail` | 查询货品详情 |
| `opencli doudian goodslist` | 获取源头好货列表 |
| `opencli doudian productrank` | 商品榜单 |
| `opencli doudian salesdata` | 商品销售数据 |
| `opencli doudian searchrank` | 行业搜索排行 |
| `opencli doudian weeklysales` | 运营周报数据 |

## Usage Examples

### 商品榜单

```bash
# 热销榜单 (默认)
opencli doudian productrank --rankType hotsale

# 直播榜单
opencli doudian productrank --rankType live

# 搜索榜单
opencli doudian productrank --rankType search

# 卡券榜单
opencli doudian productrank --rankType card

# 短视频榜单
opencli doudian productrank --rankType video

# 实时热门榜单
opencli doudian productrank --rankType realtime

# 达人榜单
opencli doudian productrank --rankType author

# 指定类目和日期范围
opencli doudian productrank --rankType hotsale --categoryId 38944,20188 --beginDate "2026/03/23 00:00:00" --endDate "2026/03/29 00:00:00"

# JSON 输出
opencli doudian productrank --rankType hotsale -f json | head -100
```

### 货品详情与评论

```bash
# 查询货品详情
opencli doudian goodsdetail --spuId 7521307167140610304

# 获取货品评论
opencli doudian goodscomments --productId 7521307167140610304

# 仅好评
opencli doudian goodscomments --productId 7521307167140610304 --commentLevel 1

# 指定页码
opencli doudian goodscomments --productId 7521307167140610304 --pageNo 2 --pageSize 20
```

### 热搜与搜索

```bash
# 电商热搜词
opencli doudian ecom_hot --cateId 20188

# 按增速排序
opencli doudian ecom_hot --cateId 20188 --rankType 2

# 抖音热门榜单
opencli doudian douyin_hot

# 指定行业
opencli doudian douyin_hot --industryId 8

# 行业搜索排行
opencli doudian searchrank --cateId 20188
```

### 销售数据与周报

```bash
# 商品销售数据
opencli doudian salesdata --productId 3808027704817746186

# 指定日期范围
opencli doudian salesdata --productId 3808027704817746186 --beginDate "2026/03/23 00:00:00" --endDate "2026/03/29 00:00:00"

# 运营周报
opencli doudian weeklysales
```

### 类目查询

```bash
# 获取3级类目
opencli doudian cat3

# 获取4级类目
opencli doudian cat4 --industryId 8
```

### 源头好货列表

```bash
# 获取源头好货列表
opencli doudian goodslist

# 指定页码和每页数量
opencli doudian goodslist --page 2 --pageSize 20

# 按供货价筛选
opencli doudian goodslist --supplyPriceMin 10 --supplyPriceMax 50

# 按好评率筛选
opencli doudian goodslist --goodCommentRatioMin 0.98

# 按48H发货率筛选
opencli doudian goodslist --deliverRatio48hMin 0.95

# 按销量筛选
opencli doudian goodslist --salesInfoCountMin 100

# 指定类目
opencli doudian goodslist --firstCids "38944"

# 多个类目
opencli doudian goodslist --firstCids "38944,38945"

# 仅包邮商品
opencli doudian goodslist --freightType 1

# 支持7天无理由退货
opencli doudian goodslist --supply7DayReturn 1
```

## Parameters

### productrank

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--rankType` | hotsale | 榜单类型: hotsale(热销)/live(直播)/search(搜索)/card(卡券)/video(短视频)/realtime(实时)/author(达人) |
| `--pageNo` | 1 | 页码 |
| `--pageSize` | 20 | 每页数量 |
| `--dateType` | 21 | 日期类型(1=实时，20=近1天，21=近7天，23=近30天) |
| `--beginDate` | 上周 | 开始日期(YYYY/MM/DD HH:mm:ss) |
| `--endDate` | 上周 | 结束日期(YYYY/MM/DD HH:mm:ss) |
| `--industryId` | 8 | 行业ID(8=生鲜) |
| `--categoryId` | 38944 | 类目ID(如水果=38944,20188) |
| `--brandType` | -1 | 品牌类型(-1=不限 0=无品牌 1=有品牌) |
| `--priceBin` | 不限 | 价格区间 |
| `--activityId` | | 活动ID |
| `--searchType` | 2 | 搜索类型(仅hotsale) |
| `--liveType` | 0 | 直播类型(仅hotsale/live) |

### goodsdetail

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--spuId` | (必需) | 商品SPU ID |

### goodscomments

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--productId` | (必需) | 商品ID |
| `--pageNo` | 1 | 页码 |
| `--pageSize` | 10 | 每页数量 |
| `--commentLevel` | 1,2,3 | 评价等级(1=好评 2=中评 3=差评),多个用逗号分隔 |
| `--needSummery` | true | 是否需要汇总 |

### ecom_hot

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--pageNo` | 1 | 页码 |
| `--pageSize` | 10 | 每页数量 |
| `--rankType` | 1 | 排行榜类型(1=热度高 2=增速快 3=竞争小 100=看后搜热词) |
| `--searchIntent` | 0 | 搜索意图(0=全部 1=搜商品 2=搜内容 3=搜用户) |
| `--dateType` | 21 | 日期类型(1=实时，20=近1天，21=近7天，23=近30天) |
| `--beginDate` | 上周 | 开始日期 |
| `--endDate` | 上周 | 结束日期 |
| `--industryId` | 8 | 行业ID(8=生鲜) |
| `--cateId` | (必需) | 类目ID(如水果=20188) |
| `--indexSelected` | 详见默认值 | 指标列表 |

### douyin_hot

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--pageNo` | 1 | 页码 |
| `--pageSize` | 10 | 每页数量 |
| `--sortField` | hot_value | 排序字段 |
| `--isAsc` | false | 是否升序 |
| `--hotLevel` | 0 | 热点等级(1=S级 2=A级 3=B级 0=全部) |
| `--rankType` | 1 | 排行榜类型 |
| `--cateIds` | 0 | 类目ID(0=全部) |
| `--industryId` | 0 | 行业ID(0=全行业) |

### salesdata

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--productId` | (必需) | 商品ID |
| `--dateType` | 21 | 日期类型(21=自定义) |
| `--beginDate` | 上周 | 开始日期 |
| `--endDate` | 昨天 | 结束日期 |
| `--userType` | 0 | 用户类型(0=全部) |
| `--saleType` | 0 | 支付方式(0=全部) |
| `--contentType` | 0 | 内容类型(0=全部) |
| `--terminalType` | 0 | 终端类型(0=全部) |

### searchrank

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--pageNo` | 1 | 页码 |
| `--pageSize` | 5 | 每页数量 |
| `--dateType` | 21 | 日期类型(1=实时，20=近1天，21=近7天，23=近30天) |
| `--beginDate` | 上周 | 开始日期 |
| `--endDate` | 上周 | 结束日期 |
| `--industryId` | 8 | 行业ID(8=生鲜) |
| `--cateId` | (必需) | 类目ID(如水果=20188) |
| `--isActivity` | false | 是否活动 |

### weeklysales

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--dateType` | 21 | 日期类型(1=实时，20=近1天，21=近7天，23=近30天) |
| `--beginDate` | 上周 | 开始日期 |
| `--endDate` | 上周 | 结束日期 |

### cat3

| Parameter | Default | Description |
|-----------|---------|-------------|
| (无参数) | - | 获取全部3级类目 |

### cat4

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--industryId` | 8 | 行业ID |

### goodslist

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--page` | 1 | 页码 |
| `--pageSize` | 10 | 每页数量 |
| `--supplyPriceMin` | 1 | 供货价最小值(元) |
| `--supplyPriceMax` | 100 | 供货价最大值(元) |
| `--firstCids` | 38944 | 一级类目ID,多个用逗号分隔 |
| `--salesInfoCountMin` | 1 | 近30天销量最小值 |
| `--salesInfoCountMax` | 1000000 | 近30天销量最大值 |
| `--goodCommentRatioMin` | 0 | 好评率最小值(0-1) |
| `--deliverRatio48hMin` | 0 | 48H发货率最小值(0-1) |
| `--freightType` | 0 | 运费类型(0-全部 1-包邮 2-不支持包邮) |
| `--supply7DayReturn` | 0 | 是否支持7天无理由退货(0-不限 1-支持) |
| `--itemReturnRateMax` | 1 | 商品退货率上限(0-1) |

## Prerequisites

- Chrome running and **logged into** `douhuo.jinritemai.com` / `compass.jinritemai.com`
- [Browser Bridge extension](/guide/browser-bridge) installed

## Notes

- 所有适配器使用 `browser: true + strategy: cookie` 认证
- 日期参数支持自定义格式 `YYYY/MM/DD HH:mm:ss`
- 默认日期会自动计算（上周/昨天）
- 返回原始 JSON 数据，包含完整的响应信息
