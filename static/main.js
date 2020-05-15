

        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    
        // the link to your model provided by Teachable Machine export panel
        //const URL = "https://teachablemachine.withgoogle.com/models/EpRGlKYQ/";
        //const URL = "https://teachablemachine.withgoogle.com/models/sOKDkEYqq/"; // Modelo conmigo parado
        const URL =  "https://teachablemachine.withgoogle.com/models/7SSGXaIyC/" ; 

        let model, webcam, labelContainer, maxPredictions;
        let arr=["Golpe","Bloqueo"];
        const sleep = m => new Promise(r => setTimeout(r, m))
        let esperado;
        let puntaje = 0 ;
        let tiempo = 100;
        let can = document.getElementById("mycanvas");
        let ctx = can.getContext("2d");
        let im = document.getElementById("my");
        let vin = document.getElementById("ny");
        let lives = 4 ; 
        let music = document.getElementById("myAudio"); 
        let stadium = document.getElementById("stadium"); 
        let boton = document.getElementById("boton");
        let developer = document.getElementById("developer");


        function show_hide() {
                var x = document.getElementById("myDIV");
                if (x.style.display === "none") {
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                }
            }


        // Select in a random way the fight pose
        async function aleatory() {
                
    
                if (tiempo == 0 ) {
                let prop = arr[Math.floor(Math.random() * arr.length)];
                console.log(prop)

                    if (prop=="Golpe") {
                        ctx.drawImage(vin, 0, 0, can.width, can.height);
                    }
                    else if (prop=="Bloqueo") {
                        ctx.drawImage(im, 0, 0, can.width, can.height);
                    }
                    else {

                    };

                if (puntaje <= 5){
                var msg = new SpeechSynthesisUtterance(prop);
                window.speechSynthesis.speak(msg);
                }
                else if (puntaje == 6){
                var msg = new SpeechSynthesisUtterance('Puedes solo');
                window.speechSynthesis.speak(msg);
                }
                else {};

                //await sleep(3000);
                esperado = prop;
                    if (puntaje <=5){
                        tiempo = 50;
                    }
                    else if (puntaje <=10){
                        tiempo = 45;
                    }
                    else if (puntaje <=15){
                        tiempo = 40;
                    }
                    else if (puntaje <=20){
                        tiempo = 35;
                    }
                    else  {
                        tiempo = 30;
    
                    };

                return prop
                }
            }
    
        // Load the image model and setup the webcam
        async function init() {

            boton.style.display = "none"
            inline.style.display = "none"
            developer.style.display = "none"

            music.volume = 0.2;
            music.play(); // Activating music

            stadium.volume = 0.2;
            stadium.play(); // Activating music

            show_hide();

            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
    
            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
    
            // Convenience function to setup a webcam
            const flip = true; // whether to flip the webcam
            webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
            window.requestAnimationFrame(loop);
    
            // append elements to the DOM
            document.getElementById("webcam-container").appendChild(webcam.canvas);
            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions; i++) { // and class labels
                labelContainer.appendChild(document.createElement("div"));
            }
        }
    
        async function loop() {      
            await aleatory();

            // Setting the variable for fps
            let lastLoop = new Date();

            webcam.update(); // update the webcam frame

            await predict();

            // For calculate fps 
            let thisLoop = new Date();
            let fps = 1000 / (thisLoop - lastLoop);
            let timeBetween = thisLoop - lastLoop;
        //    console.log('Frames per second are: ' + fps+' and time between is: '+timeBetween);
            document.getElementById('timeBetween').innerText = `  ${timeBetween} `

            window.requestAnimationFrame(loop);
        }
    
        // run the webcam image through the image model
        async function predict() {
            
            //result=aleatory()
            //await sleep(3000)
            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
            let max=0;
            for (let i = 0; i < maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
                if (prediction[i].probability.toFixed(2)  > max){
                    max=prediction[i].probability.toFixed(2);
                };

            };
            
            // showing the better outcome
            for (let i = 0; i < maxPredictions; i++) {
                if (max ==prediction[i].probability.toFixed(2)){
                    document.getElementById('console').innerText = `
                    prediction: ${prediction[i].className}
        `           ;

                        // check if is correct the pose 
                        if (prediction[i].className==esperado && tiempo ==1) {
                       // console.log('correcto');
                        puntaje = puntaje +1 ;
                        document.getElementById('puntaje').innerText = `
                        score: ${puntaje}
            `           ;

                        //var msg2 = new SpeechSynthesisUtterance('Good');
                        //window.speechSynthesis.speak(msg2);
                        
                        }         
                        else if (prediction[i].className!=esperado && tiempo ==1){
                        //var msg2 = new SpeechSynthesisUtterance('Bad');
                        //window.speechSynthesis.speak(msg2);     
                       // console.log('Bad') 

                        lives = lives -1 ; 

                        document.getElementById('lives').innerText = `
                        LIVES: ${lives}
            `           ;

                         document.getElementById('puntaje').innerText = `
                        score: ${puntaje}
            `           ;
                         
                           if (lives ==0 ){

                            var msg = new SpeechSynthesisUtterance('game over');
                            window.speechSynthesis.speak(msg);

                             alert("GAME OVER!");

                             window.location.reload(false);
 
                           }
                           else {
                           // pass !!
                           }; 

                        }

                        else {
                            //empty
                        };

                };


            };
            
            if (lives == 4 & tiempo == 30){
                       var msg = new SpeechSynthesisUtterance('start');
                       window.speechSynthesis.speak(msg);
                       show_hide();
                      }
            tiempo = tiempo - 1
          //  console.log(tiempo)
        }