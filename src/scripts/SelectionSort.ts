import { zeroFreq } from "./SoundMaker";
import { endTiming, flush, get, isLesser, reload, size, startSort, startTiming, swap } from "./Visualizer";

const playBtn = document.getElementById("play")!;

playBtn.onclick = async ()=> {
    await startSort();
    await selectionSort();
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