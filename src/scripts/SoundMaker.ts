const soundBtn = document.getElementById("sound")!;
let state = false;

let audioCtx: AudioContext | undefined;
let oscillator: OscillatorNode;
let oscillator2: OscillatorNode;

soundBtn.onclick = () => {
  state = !state;
  if (state) {
    soundBtn.textContent = "🔈";
    audioCtx = new AudioContext();

    oscillator = new OscillatorNode(audioCtx, {
      type: "triangle",
      frequency: 0, // Value in Herz
    });

    oscillator2 = new OscillatorNode(audioCtx, {
      type: "triangle",
      frequency: 0, // Value in Herz
    });

    const gainNode = new GainNode(audioCtx, { gain: 0.2 });

    oscillator.connect(gainNode);
    oscillator2.connect(gainNode);

    gainNode.connect(audioCtx.destination);

    oscillator.start(0);
    oscillator2.start(0);
    sleep();

  } else {
    soundBtn.textContent = "🔇";
    audioCtx?.close();
    audioCtx = void 0;
  }
};

let one = false;

export async function wakeUp() {
    if(audioCtx?.state === "suspended") {
    await audioCtx.resume();
  }
}

function sleep() {
  audioCtx?.suspend();

}

export function freq(freq: number) {
  if (!state) {
    return;
  }
  wakeUp();
  if (one) {
    oscillator.frequency.value = freq;
  } else {
    oscillator2.frequency.value = freq;
  }
  one = !one;
}

export function zeroFreq() {
  if (!state) {
    return;
  }
  sleep();
  oscillator.frequency.value = 0;
  oscillator2.frequency.value = 0;
}

let frequency: number = 0;

export function scheduleFreq(freq: number) {
    frequency = freq;
}

export function release() {
    freq(frequency);
}

export {};
