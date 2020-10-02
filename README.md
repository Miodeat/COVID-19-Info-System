# COVID-19-Info-System
某高校地理信息系统开发实习项目

## 2020.10.02 18:00

### modified by Miodeat

1. displayboard 样式调整

## 2020.10.02 10:46

### modified by Daisy

1. 已经将地图数据和Tree的结果分开返回了。地图数据是getEpidemicInfoServelt。Tree 是getTreeDataServlet
2. 基本完成数据插入接口设计，除了数组类型的数据设置暂时还没写，其他的数据类型都是支持的了，并且已经做了测试。


## 2020.09.29  21：44
### modified by Daisy
1. 完成疫情数据的时间序列返回
2. web.xml文件也已经改啦
## 2020.09.29 10:37

### modified by Miodeat

1. dataExhibition 网格式布局调整
2. basic epidemic map 散点图式样调整
3. basic epidemic map 标签导航栏式样调整
4. basic epidemic map 世界地图式样调整


## 2020.09.29 3:18

### modified by Miodeat

1. 基础疫情展示模块的世界地图可视化已经完成了；
2. 通过标签导航栏选择世界地图可视化内容的功能已经完成了；
3. 重构了部分css文件；
4. 修改了IViewer接口，现在drawMap函数可以传入处理数据的匿名函数了；
5. 主页面到集体理性页面的跳转已经可以正常工作了；

## 2020.09.28

### modified by Dinghy
1. 集体理性模块主体上传
2. 文本展示:支持Markdown格式与html进行排版转换,规范文本显示
3. echart地图展示(目前使用测试数据),支持toolbar,支持图例,支持时间轴(颜色排版未修改)
4. 细小修改,添加网页icon
5. 细小修改,标题字体规范化显示

## 2020.09.27

### modified by Daisy

1. 修改数据库连接方式


## 2020.09.27
### modified by Daisy
1. 完成数据库中最新日期疫情数据，不同国家、全球累计信息的获取

## 2020.09.26 11:30

### modified by Miodeat

1. 预留了地图与统计图展示div
2. 完成了展示板及其布局


## 2020.09.26

### modified by Daisy
1. 移动lib文件夹至WEB-INF下面。必须要这样做，不然后端引用包会出错。

## 2020.09.26 
### modified by Daisy
1. 完成后端数据库连接关闭
2. 完成数据库查询接口设计。现在可以获取疫情数据了。
## 2020.09.26

### modified by Miodeat

1. 完成了全球案例的树状展示，包括标题、树状列表、更新时间提示和分割线；

## 2020.09.25

### modified by Miodeat

1. 修改了menubar的布局，现在分享按钮处于menuButtonGroup内了；
2. menubar 的 icon 现在会随着窗口大小的变化进行放缩了；
3. 添加了basic epidemic page 的标题；

## 2020.09.24

### modified by Miodeat

1. 完成了menubar的编写和动态布局
2. 完成了js可视化接口


