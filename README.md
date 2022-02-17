## 简介
* 整个富文本编辑器在[slatejs](https://github.com/ianstormtaylor/slate)基础上开发，完全支持富文本、图片、表格(支持合并、拆分单元格)、视频、横线等常用功能
* 支持自定义扩展组件，详细可以参考slatejs官方文档
* 开箱即用，操作简单。json存储富文本。欢迎使用、点赞、提交分支

## install 安装

```shell
npm install slatejsx
```

## demo 在线示例

[http://seditor.open.heyphp.com](http://seditor.open.heyphp.com)

![ ](https://raw.githubusercontent.com/slatejsx/slatejsx/main/1645111861967.jpg)

## usage 用法

``` jsx
import SEditoxr from 'slatejsx';
import 'slatejsx/dist/index.css';
import { useState } from 'react';

const config = [
  {
   "type": "paragraph",
   "title": "h1",
   "children": [
    {
     "text": ""
    }
   ]
  }
]

const [value, setValue] = useState(config)

// 上传图片的回调，示例中将图片转为base64写入json，如果需要存到云存储可以改写此方法
const onUploadImage = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
      const url = reader.result;
      callback(url)
  });

  reader.readAsDataURL(file);
}

function App() {
  return (
    <SEditor
      value={value}
      plugins={[]}
      readOnly={false}
      param={{ onUploadImage }}
      onChange={v=>setValue(v)}
    />
  );
}

export default App; 
```

## props 参数说明
|参数|类型|说明|
|:--|--|--:|
|value|array|参考slatejs官方文档，初始化可以使用示例中的结构体|
|onChange|function|数据变化时候的回调，可以参考上文示例|
|plugins|array|额外的插件，如果需要新增新的编辑器功能，可以通过这个参数传入|
|readOnly|boolean|只读，如果为true，则没有工具栏且不可编辑|
|param|{}|额外参数，参数会写入到useSlate()的实体上|

## 相关链接

### 使用依赖

* slatejs [https://github.com/ianstormtaylor/slate](https://github.com/ianstormtaylor/slate)
* antd [https://ant.design/components/overview-cn](https://ant.design/components/overview-cn)

### 作者

* 小猪猴
  * github: [https://github.com/zhangjiajiacjq](https://github.com/zhangjiajiacjq)
  * 博客: [http://blog.heyphp.com](http://blog.heyphp.com)
* amwyygyuge
  * github: [https://github.com/amwyygyuge](https://github.com/amwyygyuge)
  