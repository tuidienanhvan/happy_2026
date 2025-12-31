export enum AppStage {
  ENVELOPE = 'ENVELOPE',
  APOLOGY = 'APOLOGY',
  CELEBRATION = 'CELEBRATION'
}

export interface FloatingItem {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  scale: number;
  type: 'heart' | 'flower' | 'coin';
}