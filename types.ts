export enum AppStage {
  ENVELOPE = 'ENVELOPE',
  LETTER = 'LETTER',
  CERTIFICATE = 'CERTIFICATE'
}

export interface FloatingItem {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  scale: number;
  type: 'heart' | 'flower' | 'coin';
}