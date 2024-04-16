// TensorFlow
const tf = require("@tensorflow/tfjs-node");
const coco_ssd = require("@tensorflow-models/coco-ssd");

// Server
const express = require("express");
const busboy = require("busboy");
const { config } = require("dotenv");
config();

// 初始化 TensorFlow MODEL
let model = undefined;
(async () => {
    model = await coco_ssd.load({
        base: "mobilenet_v1",
    });
})();

const app = express();
const PORT = process.env.PORT || 8008;
app.post("/predict", (req, res) => {
    if (!model) {
        res.status(500).send("TensorFlow MODEL 未加载");
    }
    // 创建一个BusBoy实例
    const bb = busboy({ headers: req.headers });
    bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
        const buffer = [];
        file.on("data", (data) => {
            buffer.push(data);
        });
        file.on("end", async () => {
            // 运行目标检测
            const image = tf.node.decodeImage(Buffer.concat(buffer));
            const predictions = await model.detect(image, 3, 0.25);
            res.json(predictions);
        }).on("error",(error)=>{
            res.json({
                code:-1,
                msg:"无法识别"
            })
        });
    });
    req.pipe(bb);
});
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});