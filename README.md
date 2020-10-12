# COVID-19-Info-System
某高校地理信息系统开发实习项目

## 2020.10.12 33：04

### modified by Daisy

1. 创建用于更新数据的java类 updateData,在执行py文件后通过调用相应函数接口可以实现数据的更新，目前只写了疫情数据的
2. 删除了无用的service和servlet
3. 加入get_formatted_epidemicData.py（放在scriptPath），用于更新疫情数据，调用方式为py/python xxx.py argv[1] argv[2]，这两个参数已经写入json文件

## 2020.10.12 20:19

### modified by Miodeat

1. 修改了python脚本文件的存放位置
2. 尝试兼容信息更新模块python脚本

## 2020.10.09 16 :59

### modified by Miodeat

1. 修复了ExecScript类的一些bug
2. 添加了用于测试调用python脚本的线程类TestThread
3. 添加了后端启动时自动运行的服务类InitService
4. 添加了储存要执行的python脚本的路径与参数的配置文件(.js)
5. 添加了用于测试python脚本调用的test.py文件
6. TestThread类已经能成功调用python脚本了

## 2020.10.09 22:39

### modified by Miodeat

1. 添加了后台执行脚本的抽象类ExecScript

## 2020.10.10

### modified by dinghy

1. CR数据库数据展示
2. 小修小改，直接读取md文件参与排版布局

## 2020.10.07 10:10

### modified by Miodeat

1. 国家统计图可以根据选择动态改变了

## 2020.10.06 9：42

### modified by Daisy

1. 完成国家时间序列数据获取的条件查询。查询条件为country

## 2020.10.05 21:15

### modified by Miodeat

1. 国家树列表的更新时间已经可以动态改变了
2. 更新时间区域布局调整

## 2020.10.05 20:40

### modified by Miodeat

1. 为country cases添加了标题和国家选择下拉框
2. 现在可以通过选择国家选择下拉框更新国家地图了
3. 国家地图现在可以进行缩放了
4. 调整了世界地图的显示范围
5. dataExhibition布局调整

## 2020.10.04 15:50

### modified by Miodeat

1. 完成country cases 展示模块标签导航栏
2. 完成country cases 展示模块地图
3. 完整country cases 展示模块柱状统计图
4. 解决了窗口缩放时tab标签会被覆盖的问题
5. 重构了BasicEpControl中有关世界地图的代码，提升复用性和简洁性
6. 重构了dataExhibition.css并将其拆分，使css文件夹分文件标准更加清晰

## 2020.10.03 20.40

### modified by Daisy

1. 完成疫情数据的数据库插入

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


