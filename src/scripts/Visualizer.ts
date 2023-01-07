import { freq, wakeUp, zeroFreq } from "./SoundMaker";

const elementSlider: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("elements")!
);
const elementsQuantity: HTMLElement =
  document.getElementById("elements-quantity")!;

const algorithmWindow: HTMLElement = document.getElementById("alg-window")!;

const speedSlider: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("speed-slider")!
);

const speedDisplay: HTMLElement = document.getElementById("speed-factor")!;

interface IColors {
  value: number;
  action: string;
}

let bars: number[];

export let size = 100;

let colors: IColors[] = new Array(size).fill({ value: 0, action: "set" });

elementSlider.onmouseup = () => {
  let val: number = elementSlider.valueAsNumber;

  let trunc = Math.round(val / 9) * 9;

  elementSlider.valueAsNumber = trunc;
};

speedSlider.oninput = () => {
  let val: number = speedSlider.valueAsNumber;

  let finalVal =  (val / 10)**2;

  speedDisplay.innerHTML = `x${finalVal.toFixed(2).replace(/.0{0,2}$/, "")} Speed`;

  minTimes = Math.trunc(size * finalVal / 100) ;


};

elementSlider.oninput = async () => {
  let val: number = elementSlider.valueAsNumber;

  let trunc = Math.round(val / 9) + 1;
  let bigVal = trunc * 100;
  let px = 500 / bigVal;

  elementsQuantity.innerHTML = bigVal + " elements";

  algorithmWindow.style.setProperty("--elements", px + "px");

  if (bigVal > 500) {
    elementsQuantity.style.color = "red";
  } else {
    elementsQuantity.style.color = "white";
  }
  size = bigVal;
  colors = new Array(size).fill({ value: 0, action: "set" });
  await init();
};

async function init() {
  bars = [0];
  for (let i = 0; i < size; i++) {
    bars[i] = i;
  }
  times = 0;
  await reload();
}

export async function startSort() {
  await wakeUp();
  sets = 0;
  gets = 0;
  swaps = 0;
  comparisons = 0;
  time = 0;
  iterationStart = window.performance.now();
  startTime = window.performance.now();
}

let times = 0;
let startTime = 0;

let minTimes = Math.trunc(size / 100);


export async function reload() {
  if (times != 0) {
    for (let i = 0; i < size; i++) {
      if (colors[i].value > 0) {
        colors[i].value--;
      }
    }
    times--;
    return;
  }

  updateText();
  algorithmWindow.innerHTML = "";

  for (let i = 0; i < size; i++) {
    let bar: HTMLElement = <HTMLElement>algorithmWindow.children.item(i);
    if (bar == null) {
      bar = document.createElement("div");
      algorithmWindow.appendChild(bar);
    }
    if (algorithmWindow.children.length > size) {
      for (let j = size; j < algorithmWindow.children.length; j++) {
        algorithmWindow.children.item(j)?.remove();
      }
    }
    bar.classList.add("bar");
    let value = bars[i];
    let height = (value * 100) / size;
    bar.style.setProperty("--height", height + "%");

    if (colors[i].value > 0) {
      let r = 255;
      let g = 255;
      let b = 255;
      if (colors[i].action == "set") {
        (g -= colors[i].value * 25), 5;
        (b -= colors[i].value * 25), 5;
      } else if (colors[i].action == "get") {
        (r -= colors[i].value * 25), 5;
        (b -= colors[i].value * 25), 5;
      } else if (colors[i].action == "swap") {
        (r -= colors[i].value * 25), 5;
        (g -= colors[i].value * 25), 5;
      }

      bar.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      colors[i].value--;
    }
  }
  await delay(0.1);
  times = minTimes;
}

const opsElem = document.getElementById("operations")!;
const swapsElem = document.getElementById("swaps")!;
const setsElem = document.getElementById("sets")!;
const getsElem = document.getElementById("gets")!;
const compsElem = document.getElementById("comparisons")!;
const realTimeElem = document.getElementById("real-time")!;
const visualTimeElem = document.getElementById("visual-time")!;
const opsPerMsElem = document.getElementById("ops-per-ms")!;
const compsPerMsElem = document.getElementById("comps-per-ms")!;

async function updateText() {
  let operations = sets + gets + swaps + comparisons;
  opsElem.textContent = operations.toString();

  swapsElem.textContent = swaps.toString();
  setsElem.textContent = sets.toString();
  getsElem.textContent = gets.toString();
  compsElem.textContent = comparisons.toString();
  realTimeElem.textContent = Math.trunc(time).toString();

  let visualTime = Math.trunc((window.performance.now() - startTime) * 0.001);
  visualTimeElem.textContent = visualTime.toString();

  let opsPerMs = Math.trunc(operations / time);
  opsPerMsElem.textContent = opsPerMs.toString();

  let compsPerMs = Math.trunc(comparisons / time);
  compsPerMsElem.textContent = compsPerMs.toString();
}

export async function flush() {
  zeroFreq();
  for (let i = 0; i < 10; i++) {
    times = 0;

    await reload();
  }
}

/**
 * OPERATIONS
 */

let sets = 0;

export function set(index: number, num: number) {
  sets++;
  bars[index] = num;
  colors[index] = { value: 10, action: "set" };
  freq(num);
}

let gets = 0;

export function get(index: number) {
  gets++;
  freq(bars[index]);
  colors[index] = { value: 10, action: "get" };
  return bars[index];
}

let swaps = 0;

export function swap(index1: number, index2: number) {
  swaps++;
  let temp = bars[index1];
  bars[index1] = bars[index2];
  bars[index2] = temp;
  colors[index1] = { value: 10, action: "swap" };
  colors[index2] = { value: 10, action: "swap" };
  freq(bars[index1]);
  freq(bars[index2]);
}

let comparisons = 0;

export function isLesser(num1: number, num2: number) {
  comparisons++;
  return num1 < num2;
}

export function isLesserOrEquals(num1: number, num2: number) {
  comparisons++;
  return num1 <= num2;
}

export function isGreater(num1: number, num2: number) {
  comparisons++;
  return num1 > num2;
}

export function isGreaterOrEquals(num1: number, num2: number) {
  comparisons++;
  return num1 >= num2;
}

export function isEqual(num1: number, num2: number) {
  comparisons++;
  return num1 == num2;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let iterationStart: number;
export function startTiming() {
  console.time("sort");
  iterationStart = window.performance.now();
}
let time: number = 0;
export function endTiming() {
  time += window.performance.now() - iterationStart;
}

init();

export {};
