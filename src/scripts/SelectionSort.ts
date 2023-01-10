import { endTiming, flush, get, isLesser, reload, size, startSort, startTiming, swap } from "./Visualizer";

const playBtn = document.getElementById("play")!;
let running = false;
playBtn.onclick = async ()=> {
    if(running) {
        return;
    }
    running = true;
  await startSort();
  await selectionSort();
  running = false;
}

export async function selectionSort() {
    for(let i = 0; i < size; i++) {
        await startTiming();

        let minIndex = i;
        let currIndex = get(i);
        let minIndexData = currIndex;

        await endTiming();

        for(let j = i + 1; j < size; j++) {
            await startTiming();
            let value = get(j);
            if(isLesser(value, minIndexData)) {
                minIndex = j;
                minIndexData = value;
            }

            await endTiming();
            await reload();
        }

        await startTiming();
        swap(minIndex, i);
        await endTiming();

        await reload();
    }

        await flush();

}