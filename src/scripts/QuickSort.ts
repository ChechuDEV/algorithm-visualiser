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
    await quickSort();
    running = false;
};

export async function quickSort() {
    await sort(0, size - 1);
    await flush();
}

async function sort(low: number, high: number) {
    if (isLesser(low, high)) {
        let pi = await partition(low, high);

        await sort(low, pi - 1);
        await sort(pi + 1, high);
    }
}

async function partition(low: number, high: number) {
    await startTiming();
    let pivot = get(high);
    let i = low - 1;

    await endTiming()
    for (let j = low; isLesser(j, high); j++) {
        await startTiming();
        let curr = get(j);

        if (isLesser(curr, pivot)) {
            i++;
            swap(i, j);
        }

        await endTiming();
        await reload();
    }

    swap(i + 1, high);
    return i + 1;
}