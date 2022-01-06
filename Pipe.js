class Pipe{
    constructor(x){
        this.x = x;
        this.vx = 5;
        this.width = 50;
        this.space = 30;
        this.min_h = 100;
        this.bottom_h = Math.random()*(height/2-this.space-this.min_h)+this.min_h;
        this.top_h = Math.random()*(height/2-this.space-this.min_h)+this.min_h; 

        this.assets = ['/pipe.png']
        this.loadedAssets = [];
        Promise.all(this.loadAssets(this.assets)).then(images=>this.loadedAssets = images);

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
    hits(bird){
        const p = this;
        if(bird.x >= p.x && bird.x <= p.x+p.width){
            if(bird.y >= height - p.bottom_h) return true

            if(bird.y <= p.top_h) return true;

        }
        return false;
    }
    draw(ctx){
        const {top_h,bottom_h,x,width} = this;
        ctx.beginPath();
        if(this.loadedAssets[0]) ctx.drawImage(this.loadedAssets[0],x,height - bottom_h,width,bottom_h)
        ctx.save()
         ctx.translate(x+width,0);
        
         ctx.rotate(Math.PI)
        if(this.loadedAssets[0]) ctx.drawImage(this.loadedAssets[0],0,-top_h,width,top_h)
        ctx.restore()
        
    }
    update(){
        this.x -= this.vx;
    }
}