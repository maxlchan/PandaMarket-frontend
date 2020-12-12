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

export const makeStringToNumber = (value) => {
  const removeComma = value.split(',').join('');
  const makeStringToNumber = Number(removeComma);

  return makeStringToNumber;
};

export const unitizedValue = (value) => {
  const filterdNumber = makeStringToNumber(value);
  if (!filterdNumber) return;

  return new Intl.NumberFormat().format(filterdNumber);
};

export const checkIsOverOneHour = (target) => {
  const currentHour = new Date().getTime();
  const targetHour = target.getTime();
  const oneHour = 3600000;
  return targetHour - currentHour > oneHour;
};
