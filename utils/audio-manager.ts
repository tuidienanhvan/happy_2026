// Simple Audio Manager using Web Audio API
// Generates sounds procedurally without external audio files

type SoundType =
    | 'click'      // Button clicks
    | 'open'       // Envelope opening
    | 'whoosh'     // Letter sliding out
    | 'flip'       // Card flip
    | 'success'    // Success celebration
    | 'firework'   // Firework explosion
    | 'sparkle';   // Magical sparkle

class AudioManager {
    private context: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private unlocked = false;
    private musicAudio: HTMLAudioElement | null = null;
    private isMusicPlaying = false;

    constructor() {
        // AudioContext will be created on first user interaction
    }

    // Unlock audio on first user interaction (required for iOS)
    async unlock(): Promise<void> {
        if (this.unlocked) return;

        try {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.connect(this.context.destination);
            this.masterGain.gain.value = 0.8; // Master volume (increased)

            // Resume context (required for some browsers)
            await this.context.resume();
            this.unlocked = true;
        } catch (err) {
            console.warn('[AudioManager] Failed to unlock audio:', err);
        }
    }

    // Play a sound effect
    playSound(type: SoundType): void {
        if (!this.context || !this.masterGain || !this.unlocked) return;

        try {
            switch (type) {
                case 'click':
                    this.playClick();
                    break;
                case 'open':
                    this.playOpen();
                    break;
                case 'whoosh':
                    this.playWhoosh();
                    break;
                case 'flip':
                    this.playFlip();
                    break;
                case 'success':
                    this.playSuccess();
                    break;
                case 'firework':
                    this.playFirework();
                    break;
                case 'sparkle':
                    this.playSparkle();
                    break;
            }
        } catch (err) {
            console.warn('[AudioManager] Error playing sound:', err);
        }
    }

    // UI Click sound (short beep)
    private playClick(): void {
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.frequency.value = 800;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.6, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.1);
    }

    // Envelope opening sound (creaky paper)
    private playOpen(): void {
        if (!this.context || !this.masterGain) return;

        const noise = this.context.createBufferSource();
        const buffer = this.context.createBuffer(1, this.context.sampleRate * 0.3, this.context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1;
        }

        noise.buffer = buffer;

        const filter = this.context.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        const gain = this.context.createGain();
        gain.gain.setValueAtTime(0.5, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(this.context.currentTime);
        noise.stop(this.context.currentTime + 0.3);
    }

    // Letter sliding whoosh
    private playWhoosh(): void {
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.context.currentTime + 0.4);

        gain.gain.setValueAtTime(0.5, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.4);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.4);
    }

    // Card flip sound
    private playFlip(): void {
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.context.currentTime + 0.2);

        gain.gain.setValueAtTime(0.6, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.2);
    }

    // Success celebration (ascending chime)
    private playSuccess(): void {
        if (!this.context || !this.masterGain) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const now = this.context.currentTime;

        notes.forEach((freq, i) => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();

            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const startTime = now + (i * 0.15);
            gain.gain.setValueAtTime(0.6, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }

    // Firework explosion (burst)
    private playFirework(): void {
        if (!this.context || !this.masterGain) return;

        // White noise burst
        const noise = this.context.createBufferSource();
        const buffer = this.context.createBuffer(1, this.context.sampleRate * 0.5, this.context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        noise.buffer = buffer;

        const filter = this.context.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;

        const gain = this.context.createGain();
        gain.gain.setValueAtTime(0.7, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(this.context.currentTime);
        noise.stop(this.context.currentTime + 0.5);

        // Add sparkle tones
        [1200, 1600, 2000].forEach((freq, i) => {
            const osc = this.context!.createOscillator();
            const oscGain = this.context!.createGain();

            osc.connect(oscGain);
            oscGain.connect(this.masterGain!);

            osc.type = 'sine';
            osc.frequency.value = freq;

            const startTime = this.context!.currentTime + (i * 0.05);
            oscGain.gain.setValueAtTime(0.5, startTime);
            oscGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }

    // Sparkle sound (high pitched twinkle)
    private playSparkle(): void {
        if (!this.context || !this.masterGain) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2000, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(3000, this.context.currentTime + 0.1);

        gain.gain.setValueAtTime(0.4, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.1);
    }

    // Play background music from file
    playMusic(volume: number = 0.5): void {
        try {
            if (!this.musicAudio) {
                this.musicAudio = new Audio('/song.mp3');
                this.musicAudio.loop = true;
                this.musicAudio.volume = volume;
                this.musicAudio.preload = 'auto';
            }

            if (!this.isMusicPlaying) {
                this.musicAudio.play().catch(err => {
                    console.warn('[AudioManager] Failed to play music:', err);
                });
                this.isMusicPlaying = true;
            }
        } catch (err) {
            console.warn('[AudioManager] Error playing music:', err);
        }
    }

    // Pause music
    pauseMusic(): void {
        if (this.musicAudio && this.isMusicPlaying) {
            this.musicAudio.pause();
            this.isMusicPlaying = false;
        }
    }

    // Stop and reset music
    stopMusic(): void {
        if (this.musicAudio) {
            this.musicAudio.pause();
            this.musicAudio.currentTime = 0;
            this.isMusicPlaying = false;
        }
    }

    // Toggle music play/pause
    toggleMusic(): boolean {
        if (this.isMusicPlaying) {
            this.pauseMusic();
            return false;
        } else {
            this.playMusic();
            return true;
        }
    }

    // Check if music is playing
    isMusicCurrentlyPlaying(): boolean {
        return this.isMusicPlaying;
    }
}

// Export singleton instance
export const audioManager = new AudioManager();
export const playSound = (type: SoundType) => audioManager.playSound(type);
