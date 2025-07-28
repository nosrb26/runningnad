// src/types/coinbase-onchainkit-minikit.d.ts

declare module '@coinbase/onchainkit/minikit' {
  import { FrameConfig, FrameMetadata } from '@coinbase/onchainkit/dist/types';
  /** La fonction utilitaire pour générer le JSON que Warpcast attend */
  export function getFrameMetadata(config: FrameConfig): FrameMetadata;

  /** La classe builder, si tu préfères cette API */
  export class OnchainKitFrame {
    static build(config: FrameConfig): FrameMetadata;
  }
}
