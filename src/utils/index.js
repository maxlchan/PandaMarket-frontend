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
  const year = String(dateObj.getFullYear());
  const month = String(dateObj.getMonth() + 1);
  const date = String(dateObj.getDate());
  const hour = String(dateObj.getHours());

  const formattedMonth = month.length > 1 ? month : `0${month}`;
  const formattedDate = date.length > 1 ? date : `0${date}`;
  const formattedHour = hour.length > 1 ? hour : `0${hour}`;

  return `${year}년 ${formattedMonth}월 ${formattedDate}일 ${formattedHour}시`;
};

export const checkIsKeywordIn = (keyword, target) => {
  const targetsForCheck = Object.values(target);

  for (let i = 0; i < targetsForCheck.length; i++) {
    const target = targetsForCheck[i];

    if (target.includes(keyword)) return true;
  }

  return false;
};

export const convertUnitToNumber = (value) => {
  const removeComma = value.split(',').join('');
  const convertUnitToNumber = Number(removeComma);

  return convertUnitToNumber;
};

export const checkIsBigger = (source, target) => {
  return convertUnitToNumber(source) > convertUnitToNumber(target);
};

export const unitizedValue = (value) => {
  const filterdNumber = convertUnitToNumber(value);
  if (!filterdNumber) return;

  return new Intl.NumberFormat().format(filterdNumber);
};

export const checkIsOverOneHour = (target) => {
  const currentTime = new Date().getTime();
  const targetTime = target.getTime();
  const oneHour = 60 * 60 * 1000;

  console.log(targetTime - currentTime > oneHour);

  return targetTime - currentTime > oneHour;
};
