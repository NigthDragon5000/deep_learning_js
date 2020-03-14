
const webcamElement = document.getElementById('webcam');

let net;

async function app() {


  console.log('Loading mobilenet..');

  net = await tf.loadLayersModel('model/model.json');
  console.log('Successfully loaded model');

  // Create an object from Tensorflow.js data API which could capture image 
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);

  while (true) 
  {

    const img = await webcam.capture();

    let tensor = tf.image.resizeBilinear(img, [48, 48]);

    //print(tensor.shape)

    //img = tf.image.rgb_to_grayscale(img)

    tensor = tensor.mean(2)

    //console.log('shape:', img.shape)

    tensor = tensor.reshape([1,48,48,1])

    /*
    let tensor = tf.browser.fromPixels(img, 1)
		//.resizeNearestNeighbor([224, 224]) // change the image size
		.resizeNearestNeighbor([48, 48]) // change the image size
		.expandDims()
		.toFloat()
    .reverse(-1); // RGB -> BGR
    */
    console.log('tensor shape:', tensor.shape);

    //let tensor = tf.browser.fromPixels(img)
    //.resizeNearestNeighbor([224, 224])
    //.toFloat()
    //.expandDims();

    //tensor=await tf.fromPixels(img).resizeBilinear([48,48]

// More pre-processing to be added here later

    let predictions = await net.predict(tensor).data();

    console.log(predictions);

    let top5 = Array.from(predictions)
    .map(function (p,i) {
        return {
            probability: p,
            className: IMAGENET_CLASSES[i]
        };
    }).sort(function (a, b) {
        return b.probability - a.probability;
    }).slice(0, 5);

    console.log(top5);

    document.getElementById('console').innerText = `
          prediction: ${top5[0].className}\n
          probability: ${top5[0].probability}
        `;

    img.dispose();
    tensor.dispose();
    //predictions.dispose();

    //img=await tf.fromPixels(img).resizeBilinear([48,48])

        /*

        const result = await net.classify(img);

        //const result = await net.predict(img);

        console.log(result);

        document.getElementById('console').innerText = `
          prediction: ${result[0].className}\n
          probability: ${result[0].probability}
        `;
        // Dispose the tensor to release the memory.
        img.dispose();

        // Give some breathing room by waiting for the next animation frame to
        // fire.

        */
    await tf.nextFrame();

    //break;
  }
}


app();
