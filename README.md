# 环境
- node > 12
- dev环境 v12.19.0

# 描述
使用 TensorFlow 和 Express.js 实现AI图像识别

# 开始
```
npm i

or

yarn
```

## 依赖
```
npm install @tensorflow-models/coco-ssd @tensorflow/tfjs-node express dotenv busboy --save
```

# 调试
使用Postman post请求：http://localhost:8008/predict
参数image，类型File，上传一张图片

返回：
``` 
[
    {
        "bbox": [
            258.85168075561523,
            106.97694540023804,
            1633.216495513916,
            769.5937013626099
        ],
        "class": "dog",
        "score": 0.9752472043037415
    }
]

```