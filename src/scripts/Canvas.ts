const canvas = <HTMLCanvasElement>document.getElementById("graph")!;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;


let oldX = 0;
let oldY = 0;

ctx.beginPath();
ctx.moveTo(0, 300);
for (let i = 0; i < 360 / 3; i++) {
	let x = i * 3;
	let y = x * Math.log10(x);

	let grad = (oldY - y) / (oldX - x);

	ctx.lineTo(x, 300 - (grad * 30));

	oldX = x;
	oldY = y;
}
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.strokeStyle = "red";
for (let i = 0; i < 360; i++) {
	let x = i;
	let y = x * x;

	ctx.lineTo(x, 300 - y);

	oldX = x;
	oldY = y;
}
ctx.stroke();
ctx.closePath();

export {};
