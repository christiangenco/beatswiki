import { zonedTimeToUtc, utcToZonedTime, format, toDate } from "date-fns-tz";

import {
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  differenceInSeconds,
  formatISO,
  parseISO,
  addSeconds,
  startOfDay,
} from "date-fns";

export function localTimezone() {
  return new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
}

function localTimezoneOffset() {
  return new Date().toString().match(/([\+-][0-9]+)/)[1];
}

export function beatsToDate(beats) {
  let totalSeconds = beats * 86.4;
  // const timeZone = "+01:00";
  // totalSeconds += 60 * 60; // +01:00 time zone

  const now = new Date();
  const midnight = startOfDay(now);

  const date = addSeconds(midnight, totalSeconds);
  const bmtDate = zonedTimeToUtc(date, "+01:00");

  const localTimezone = localTimezoneOffset();
  const localDate = utcToZonedTime(bmtDate, localTimezone);

  return localDate;
}

export function dateToBeats(date) {
  // const midnight = toDate("2020-10-11T0:00:00+01:00");

  // const secs = differenceInSeconds(date, midnight);
  // const beats1 = secs / 86.4;

  const timeZone = "+01:00";
  const bmtDate = utcToZonedTime(date, timeZone);

  const hours = getHours(bmtDate);
  const minutes = getMinutes(bmtDate);
  const seconds = getSeconds(bmtDate);
  const miliseconds = getMilliseconds(bmtDate);
  const totalSeconds =
    miliseconds / 1000 + seconds + minutes * 60 + hours * 3600;
  const beats = (totalSeconds / 86.4).toFixed(2);

  return { beats, isoDate: formatISO(bmtDate, { representation: "date" }) };

  // return (
  //   <pre>
  //     {JSON.stringify(
  //       { date, midnight, secs, beats, bmtDate, beats2 },
  //       null,
  //       2
  //     )}
  //   </pre>
  // );
  // return <pre>{JSON.stringify({ zonedDate }, null, 2)}</pre>;
}
