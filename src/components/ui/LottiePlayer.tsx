import { DotLottieReact, setWasmUrl } from '@lottiefiles/dotlottie-react';
import wasmUrl from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url';

// Serve the player engine from our own bundle instead of a third-party CDN.
setWasmUrl(wasmUrl);

export interface LottiePlayerProps {
  src: string;
  autoplay: boolean;
  loop: boolean;
  speed: number;
}

/** Split into its own chunk: the player only downloads when the first animation nears the viewport. */
export default function LottiePlayer(props: LottiePlayerProps) {
  return <DotLottieReact {...props} style={{ width: '100%', height: '100%' }} />;
}
