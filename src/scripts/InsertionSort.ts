import {
  endTiming,
  flush,
  get,
  isGreater,
  reload,
  set,
  size,
  startSort,
  startTiming,
  swap,
} from "./Visualizer";

const playBtn = document.getElementById("play")!;

let running = false;
playBtn.onclick = async () => {
    if(running) {
        return;
    }
    running = true;
  await startSort();
  await insertionSort();
  running = false;
};

async function insertionSort() {
  for (let i = 0; i < size; i++) {
    await startTiming();
    let currVal = get(i);
    let j = i - 1;
    let k;

    await endTiming();

    while (true) {
      if (j >= 0) {
        await startTiming();
        k = get(j);

        if (isGreater(k, currVal)) {
          set(j + 1, k);
          j--;
          await endTiming();
          await reload();
          continue;
        }
        await endTiming();
          await reload();

        break;
      }
          await reload();

      break;
    }
    await startTiming();

    set(j + 1, currVal);

    await endTiming();
          await reload();

  }
  await flush();
}
