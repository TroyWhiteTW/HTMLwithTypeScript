let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const shape_array: Array<iShape> = new Array<iShape>();
const gameLoop = () => {
    requestAnimationFrame(gameLoop);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1280, 720);

    for (let item of shape_array) {
        item.draw();
        item.x++;
    }
};

interface iShape {
    draw(): void;

    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

class cRectangle implements iShape {
    public color: string = 'blue';
    public lineWidth: number = 5;
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;

    constructor(x: number, y: number, width: number, height: number, color: string = 'blue', line_width: number = 2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = line_width;
    }

    public draw(): void {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.restore();
    }
}

class Circle implements iShape {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 10;
    public lineWidth: number = 2;
    public color: string = 'red';

    constructor(x: number, y: number, radius: number, color: string = 'red', line_width: number = 2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lineWidth = line_width;
        this.color = color;
    }

    public draw(): void {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
}

class cPoint {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class cAsteroid implements iShape {
    public color: string = 'white';
    public lineWidth: number = 5;
    public x: number = 0;
    public y: number = 0;
    public size: number = 20;
    public rotation: number = 0;
    public pointList: Array<cPoint> = new Array<cPoint>();

    constructor(x: number, y: number, size: number, color: string = 'white', line_width: number = 2) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.pointList.push(new cPoint(0, 3 * size));
        this.pointList.push(new cPoint(-1 * size, 2 * size));
        this.pointList.push(new cPoint(-2 * size, 2 * size));
        this.pointList.push(new cPoint(-3.5 * size, size));
        this.pointList.push(new cPoint(-3 * size, size));
        this.pointList.push(new cPoint(-4 * size, 0));
        this.pointList.push(new cPoint(-1 * size, -3 * size));
        this.pointList.push(new cPoint(2 * size, -4 * size));
        this.pointList.push(new cPoint(2 * size, -3 * size));
        this.pointList.push(new cPoint(4 * size, -2 * size));
        this.pointList.push(new cPoint(4 * size, size));
        this.pointList.push(new cPoint(3 * size, 2 * size));

        this.color = color;
        this.lineWidth = line_width;
    }

    public draw(): void {
        this.rotation += 0.02;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);

        for (let item of this.pointList) {
            ctx.lineTo(item.x, item.y);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}

class cSpaceShip implements iShape {
    public color: string = 'white';
    public lineWidth: number = 5;
    public x: number = 0;
    public y: number = 0;
    public size: number = 20;
    public pointList: Array<cPoint> = new Array<cPoint>();

    constructor(x: number, y: number, size: number, color: string = 'white', lime_width: number = 2) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.pointList.push(new cPoint(3 * size, 0));
        this.pointList.push(new cPoint(-2 * size, -2 * size));
        this.pointList.push(new cPoint(-1 * size, 0));
        this.pointList.push(new cPoint(-2 * size, 2 * size));
        this.color = color;
        this.lineWidth = lime_width;
    }

    public draw(): void {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.lineTo(this.x + this.pointList[this.pointList.length - 1].x, this.y + this.pointList[this.pointList.length - 1].y);

        for (let item of this.pointList) {
            ctx.lineTo(this.x + item.x, this.y + item.y);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext('2d');

    shape_array.push(new Circle(500, 500, 50));
    shape_array.push(new Circle(70, 500, 20, 'pink', 4));
    shape_array.push(new cRectangle(200, 200, 200, 100));
    shape_array.push(new cRectangle(900, 300, 150, 30, 'purple'));
    shape_array.push(new cAsteroid(850, 600, 20));
    shape_array.push(new cSpaceShip(200, 450, 20));

    gameLoop();
};