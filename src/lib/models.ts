import { VideoResult, QueryResult, MediaFormat } from 'pully-core';

export interface PullyOptions {
  preset?: string;
  template?: (result: VideoResult) => string;
  dir?: string;
  verify?: (info: FormatInfo) => boolean | Promise<boolean>;
  additionalPresets?: Array<Preset>;
}

export interface DownloadOptions {
  url?: string;
  preset?: string;
  dir?: string;
  template?: string | ((result: VideoResult) => string);
  info?: (info: FormatInfo, cancel: (msg?: string) => void) => void;
  progress?: (data: ProgressData) => void;
}

export interface DownloadConfig {
  url: string;
  preset?: Preset;
  dir?: string;
  template?: (result: VideoResult) => string;
  info?: (info: FormatInfo, cancel: (msg: string) => void) => void;
  progress?: (data: ProgressData) => void;
}

export interface DownloadResults {
  path?: string;
  format: FormatInfo;
  duration: number;
}
export interface Preset {
  name: string;
  outputFormat?: string;
  maxFps?: number;
  maxResolution?: number;
  maxAudioBitrate?: number;
  videoFilters?: Array<(format: MediaFormat, preset: Preset) => boolean>;
  videoSort?: Array<(a: MediaFormat, b: MediaFormat) => number>;
  audioFilters?: Array<(format: MediaFormat, preset: Preset) => boolean>;
  audioSort?: Array<(a: MediaFormat, b: MediaFormat) => number>;
}

export interface FormatInfo {
  data: QueryResult;
  video?: MediaFormat;
  audio: MediaFormat;
  downloadSize: number;
  path: string;
}

export interface ProgressData {
  /**
   * Current number of bytes that have been downloaded.
   */
  downloadedBytes?: number;

  /**
   * The total bytes that must be downloaded.
   */
  totalBytes?: number;

  /**
   * Current ratio of downloaded bytes, ranges from 0 to 1.
   */
  progress?: number;

  /**
   * Current percentage complete, ranges from 0 to 100 with two decimals of precision.
   */
  percent?: number;

  /**
   * The current estimated transfer rate, calculated with a rolling window.
   */
  bytesPerSecond?: number;

  /**
   * Human readable download speed with units (ranges from B/s up to GB/s).
   */
  downloadSpeed?: string;

  /**
   * Number of elapsed milliseconds.
   */
  elapsed?: number;

  /**
   * Display of time elapsed.
   */
  elapsedStr?: string;

  /**
   * Estimated milliseconds to completion.
   */
  eta?: number;

  /**
   * Display of estimated milliseconds to completion.
   */
  etaStr?: string;

  /**
   * True if we do not know the total bytes (and as such the progress).
   */
  indeterminate?: boolean;
}