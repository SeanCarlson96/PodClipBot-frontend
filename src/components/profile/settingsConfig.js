const SETTINGS_CONFIG = {
    subtitlesToggle: {
      label: 'Enable Subtitles',
      order: 1,
      type: 'boolean',
    },
    font: {
      label: 'Font',
      order: 2,
      type: 'select',
    },
    fontSize: {
      label: 'Font Size',
      order: 3,
      type: 'number',
      min: 5,
      max: 22,
    },
    subtitleColor: {
      label: 'Subtitle Color',
      order: 4,
      type: 'color',
    },
    subtitleBackgroundToggle: {
      label: 'Enable Subtitle Background',
      order: 5,
      type: 'boolean',
    },
    subtitleBackgroundColor: {
      label: 'Subtitle Background Color',
      order: 6,
      type: 'color',
    },
    strokeWidth: {
      label: 'Stroke Width',
      order: 7,
      type: 'number',
      min: 0,
      max: 10,
    },
    strokeColor: {
      label: 'Stroke Color',
      order: 8,
      type: 'color',
    },
    subtitlePositionHorizontal: {
      label: 'Subtitle Horizontal Position',
      order: 9,
      type: 'select',
    },
    subtitlePositionVertical: {
      label: 'Subtitle Vertical Position %',
      order: 10,
      type: 'number',
      min: 0,
      max: 100,
    },
    subtitleSegmentLength: {
      label: 'Subtitle Segment Length',
      order: 11,
      type: 'number',
      min: 5,
      max: 15,
    },
    diarizationToggle: {
      label: 'Enable Diarization',
      order: 12,
      type: 'boolean',
    },
    secondSpeakerColor: {
      label: 'Second Speaker Color',
      order: 13,
      type: 'color',
    },
    thirdSpeakerColor: {
      label: 'Third Speaker Color',
      order: 14,
      type: 'color',
    },
    fourthSpeakerColor: {
      label: 'Fourth Speaker Color',
      order: 15,
      type: 'color',
    },
    fifthSpeakerColor: {
      label: 'Fifth Speaker Color',
      order: 16,
      type: 'color',
    },
    musicToggle: {
      label: 'Enable Music',
      order: 17,
      type: 'boolean',
    },
    volume: {
      label: 'Volume',
      order: 18,
      type: 'number',
      min: 0,
      max: 100,
    },
    musicChoice: {
      label: 'Music Choice',
      order: 19,
      type: 'select',
    },
    musicFadeToggle: {
      label: 'Enable Music Fade',
      order: 20,
      type: 'boolean',
    },
    musicDuration: {
      label: 'Music Duration %',
      order: 21,
      type: 'number',
      min: 0,
      max: 100,
    },
    watermarkToggle: {
      label: 'Enable Watermark',
      order: 22,
      type: 'boolean',
    },
    watermarkPositionHorizontal: {
      label: 'Watermark Horizontal Position',
      order: 23,
      type: 'select',
    },
    watermarkPositionVertical: {
      label: 'Watermark Vertical Position %',
      order: 24,
      type: 'number',
      min: 0,
      max: 100,
    },
    watermarkSize: {
      label: 'Watermark Height in px',
      order: 25,
      type: 'number',
      min: 0,
      max: 500,
    },
    watermarkOpacity: {
      label: 'Watermark Opacity %',
      order: 26,
      type: 'number',
      min: 0,
      max: 100,
    },
    watermarkDuration: {
      label: 'Watermark Duration %',
      order: 27,
      type: 'number',
      min: 0,
      max: 100,
    },
  };
  
  export default SETTINGS_CONFIG;
  