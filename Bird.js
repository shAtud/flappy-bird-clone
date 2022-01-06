
class Bird{
    constructor(x,y){
        this.x = x;
        this.y = y;
       
        this.vy = 0;
        this.ay = 1;
        this.size = 50;
        this.routationAngle = 0;
        this.assets = ['/bird.png']
        this.loadedAssets = [];
        Promise.all(this.loadAssets(this.assets)).then(images=>this.loadedAssets = images);
        this.input();
      
        

    }
    loadAssets(assets){
      
        return assets.map(url=>{
            return new Promise((resolve , reject)=>{
                let img = new Image();  
             
                img.addEventListener('load',()=>{
                    resolve(img)
                })
               
              
                
                img.src = url;
              
            })
        })
    }
    draw(ctx){
        const {x,y,size} = this;
        ctx.beginPath();
        ctx.save()
        ctx.translate(x,y);
        ctx.rotate(this.routationAngle*0.8)
        if(this.loadedAssets[0]) ctx.drawImage(this.loadedAssets[0],-size/2,-size/2,size,size)
        ctx.restore()
    }
    collesionDetection(){
        const {x,y,size}  = this;
        if(y+size> height){ 
            this.y = height-size/2
            this.routationAngle*=Math.PI;
            this.vy = 0;
        
        }
        if(y<=0) {
            this.vy*=-0.5;
          
        }
    }
    update(){   
        this.collesionDetection();
      
        if(this.vy >=0) this.routationAngle = Math.PI/2
        else this.routationAngle = -Math.PI/2;
        this.vy += this.ay;
        this.y += this.vy;
    }
    input(){
            window.addEventListener('keydown',e=>{
                if(e.key===' '){
                    this.vy-=15  ;
                }
            })
    }c 
}