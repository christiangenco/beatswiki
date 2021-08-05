import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  formatISO9075,
  format,
  formatDistanceToNow,
  isPast,
  parseISO,
  setYear,
  setMonth,
  setDay,
  getYear,
  getMonth,
  getDay,
} from "date-fns";

import Head from "next/head";
import Shell from "../components/Shell";

import { beatsToDate, dateToBeats, localTimezone, gcalLink } from "../utils";

import { P, Highlight, Showcase } from "../components/html";

export default function TimePage({}) {
  const router = useRouter();
  let { time, title } = router.query;

  if (time && !time.includes("@")) time = "@" + time;
  let [date, beatsString] = (time || "@0").split("@");

  const beats = beatsString
    ? parseFloat(beatsString.replace(/[^0-9.]/, ""))
    : 0;
  const pageTitle = `${time} in Swatch® .beats`;

  let localTime = beatsToDate(beats);
  if (date) {
    date = parseISO(date);
    localTime = setYear(localTime, getYear(date));
    localTime = setMonth(localTime, getMonth(date));
    localTime = setDay(localTime, getDay(date));
  }

  return (
    <div>
      <Head>
        <title>{pageTitle} | Beats.wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell title={pageTitle}>
        <P>
          {time} in Swatch® .Beat Internet Time translated to your local
          timezone of {localTimezone()} is:
        </P>
        <Showcase>{format(localTime, "h:mm:ss a")}</Showcase>
        {isPast(localTime) && (
          <P>That was {formatDistanceToNow(localTime)} ago.</P>
        )}
        {!isPast(localTime) && (
          <P>That's in {formatDistanceToNow(localTime)}.</P>
        )}
        <P>
          <a
            className="mt-6 px-2 py-3 rounded bg-blue-500 text-white hover:bg-blue-600"
            href={gcalLink({
              title: title || "Event",
              time: localTime,
              details: `<a href="https://beats.wiki/${time}">@${beats}</a> in .Beats time.`,
              zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })}
            target="_blank"
          >
            Add to Google Calendar
          </a>
        </P>
      </Shell>
    </div>
  );
}
