import { zeroFreq } from "./SoundMaker";
import { size, swap, reload, flush, startTiming, endTiming } from "./Visualizer";

const shuffleBtn: HTMLElement =
  document.getElementById("shuffle")!;

shuffleBtn.onclick = async () => {

    for(let i = 0; i < size; i++) {
        startTiming();
        let rndIdx = Math.trunc(Math.random() * size - 1);
        swap(rndIdx, i);
        endTiming();
        await reload();
    }
    await flush();
}