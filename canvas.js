var canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500;
const {width,height} = canvas;
ctx = canvas.getContext('2d');
const FPS = 20;
let score = 0;
document.getElementById('score').innerHTML = score


const bird = new Bird(200,50)
const pipe = new Pipe(100)
const pipes = [];
const  N = 10;
let start = Date.now();    
const animate = ()=>{
    const then = Date.now();
    if(Date.now() - start >3000){
        start = Date.now();
        pipes.push(new Pipe(width))
    }
    ctx.clearRect(0,0,width,height);
     bird.update();
     bird.draw(ctx);
     if(bird.y >=height -bird.size/2){
        alert(' you lose :(');
        window.location.reload()
     }
     for(let i=0;i<pipes.length;i++){
        const p = pipes[i];
        if(p.hits(bird)){
             
            alert(' you lose :(');
            window.location.reload()
            break;
            
          
        }
      
     
    }
     for(let i= pipes.length-1;i>0;i--){
         const p = pipes[i];
       
         if( p.x +  p.width <0){
             pipes.splice(i,1);
             score++;
             document.getElementById('score').innerHTML = score

         }
     }
     pipes.forEach(p=>{
        
         p.update();
         p.draw(ctx);
     })
    

    
    setTimeout(()=>{
            requestAnimationFrame(animate);
    },1000/FPS);
}

animate();