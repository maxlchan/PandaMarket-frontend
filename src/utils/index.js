export const stopBothVideoAndAudio = (stream) => {
  if (!stream) return;

  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live') {
      track.stop();
    }
  });
};

export const generateDateToText = (dateString) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const date = dateObj.getDate();
  const hour = dateObj.getHours();

  return `${year}년 ${month}월 ${date}일 ${hour}시`;
};

export const checkIsKeywordIn = (keyword, target) => {
  const targetsForCheck = Object.values(target);

  for (let i = 0; i < targetsForCheck.length; i++) {
    const target = targetsForCheck[i];

    if (target.includes(keyword)) return true;
  }

  return false;
};
