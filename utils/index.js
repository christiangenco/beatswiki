import { zonedTimeToUtc, utcToZonedTime, format, toDate } from "date-fns-tz";

import {
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  differenceInSeconds,
  formatISO,
} from "date-fns";

export function beatsToDate(beats) {}

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
