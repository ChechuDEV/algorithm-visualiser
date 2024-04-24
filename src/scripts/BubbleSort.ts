import {
    endTiming,
    flush,
    get,
    isGreater, isLesser,
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
    if (running) {
        return;
    }
    running = true;
    await startSort();
    await bubbleSort();
    running = false;
};

export async function bubbleSort() {
    for (let i = 0; isLesser(i, size); i++) {
        await startTiming();
        let swapped = false;
        await endTiming();

        for (let j = 0; isLesser(j, size - i - 1); j++) {
            await startTiming();
            let curr = get(j);
            let next = get(j + 1);

            if (isGreater(curr, next)) {
                swap(j, j + 1);
                swapped = true;
            }

            await endTiming();
            await reload();
        }

        if (!swapped) {
            break;
        }
    }

    await flush();
}