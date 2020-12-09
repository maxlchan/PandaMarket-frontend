export const stopBothVideoAndAudio = (stream) => {
  if (!stream) return;

  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live') {
      track.stop();
    }
  });
};
