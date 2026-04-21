
export type InterviewTopic = 'HR' | 'Technical' | 'General';

export type InterviewState = 'idle' | 'starting' | 'in_progress' | 'generating_report' | 'report_ready' | 'error';

export interface TranscriptMessage {
  speaker: 'user' | 'ai';
  text: string;
}
