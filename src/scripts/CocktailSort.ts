import {
    endTiming,
    flush,
    get,
    isGreater, isGreaterOrEquals, isLesser,
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
    await cocktailSort();
    running = false;
};

export async function cocktailSort() {
    let swapped = true;
    let start = 0;
    let end = size - 1;

    while (swapped) {
        swapped = false;

        for (let i = start; isLesser(i, end); i++) {
            await startTiming();
            let curr = get(i);
            let next = get(i + 1);

            if (isGreater(curr, next)) {
                swap(i, i + 1);
                swapped = true;
            }
            await endTiming();
            await reload();
        }
        await startTiming();

        if (!swapped) {
            break;
        }

        swapped = false;
        end--;
        await endTiming();

        for (let i = end - 1; isGreaterOrEquals(i, start); i--) {
            await startTiming();
            let curr = get(i);
            let next = get(i + 1);

            if (isGreater(curr, next)) {
                swap(i, i + 1);
                swapped = true;
            }
            await endTiming();
            await reload();
        }
        await startTiming();
        start++;
        await endTiming();

    }
    await flush();
}