# Doudian (抖店)

**Mode**: 🔐 Browser · **Domain**: `douhuo.jinritemai.com`

## Commands

| Command | Description |
|---------|-------------|
| `opencli doudian goodsList` | 获取源头好货列表 |
| `opencli doudian industry_search_word_rank` | 获取行业搜索关键词排名 |

## Usage Examples

### 源头好货列表

```bash
# 获取源头好货列表
opencli doudian goodsList

# 指定页码和每页数量
opencli doudian goodsList --page 2 --pageSize 20

# 按供货价筛选
opencli doudian goodsList --supplyPriceMin 10 --supplyPriceMax 50

# 按好评率筛选
opencli doudian goodsList --goodCommentRatioMin 0.98

# 按48H发货率筛选
opencli doudian goodsList --deliverRatio48hMin 0.95

# 按销量筛选
opencli doudian goodsList --salesInfoCountMin 100

# 指定类目
opencli doudian goodsList --firstCids "38944"

# 多个类目
opencli doudian goodsList --firstCids "38944,38945"

# 仅包邮商品
opencli doudian goodsList --freightType 1

# 支持7天无理由退货
opencli doudian goodsList --supply7DayReturn 1

# JSON 输出
opencli doudian goodsList --page 1 --pageSize 10 -f json

# YAML 输出
opencli doudian goodsList -f yaml
```

### 行业搜索关键词排名

```bash
# 获取行业搜索词排名
opencli doudian industry_search_word_rank

# 指定数量
opencli doudian industry_search_word_rank --limit 20

# JSON 输出
opencli doudian industry_search_word_rank -f json
```

## Parameters

### goodsList

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

### industry_search_word_rank

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--limit` | 20 | 返回数量 |

## Prerequisites

- Chrome running and **logged into** `douhuo.jinritemai.com`
- [Browser Bridge extension](/guide/browser-bridge) installed

## Notes

- `goodsList` 返回原始 JSON 数据，包含完整的商品信息
- `industry_search_word_rank` 从抖店商家后台提取搜索词排名数据
