import { useState, useEffect } from "react";
import Head from "next/head";
import Shell from "../components/Shell";

import { formatISO9075, format } from "date-fns";

import useInterval from "../hooks/useInterval";
import { beatsToDate, dateToBeats, localTimezone } from "../utils";

import { P, Highlight, Showcase } from "../components/html";

const secondsPerBeat = 86.4;

export default function Home() {
  const defaultTitle = ".Beat Swatch® Internet Time Wiki";
  const [title, setTitle] = useState(defaultTitle);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

  const [now, setNow] = useState(new Date());

  useInterval(() => {
    setNow(new Date());

    // not DRY
    const { beats } = dateToBeats(now);
    setTitle(`@${Math.floor(beats)}`);
  }, (secondsPerBeat * 1000) / 100);

  const { beats, isoDate } = dateToBeats(now);

  return (
    <div>
      <Head>
        <title>{title} | Beats.wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell title={defaultTitle}>
        {false && (
          <P>
            The way you tell time was broken with the invention of the internet.
            I'll show you what I mean.
          </P>
        )}
        <P>
          Right now in your local timezone—
          {localTimezone()}—it's{" "}
          <b>
            {format(now, "eeee, LLLL do yyyy")} at {format(now, "h:mm a")}
          </b>
          .
        </P>
        <P>
          Translated to Swatch®{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beats</span>{" "}
          time, right now it's <b>{isoDate}</b> at precisely:
        </P>
        <Showcase>@{beats}</Showcase>
        <P>
          Unlike your local time, its{" "}
          <span className="font-mono">
            {isoDate}@{beats}
          </span>{" "}
          all over the world right now. There are no confusing{" "}
          <Highlight>time zones</Highlight> or
          <Highlight>daylight savings time shifts</Highlight> to worry about.
        </P>
        <P>
          There are exactly 1,000{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beats</span> in a
          day, making each{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beat</span>{" "}
          precisely 1 minute and 26.4 seconds long.
        </P>
        <P>
          If you'd like to know how many{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beats</span> are
          in a year, just multiply 365 days by 1,000 beats/day to get 365,000{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beats</span>.
          Good luck figuring out how many <i>seconds</i> are in a year in your
          head.
        </P>
        <P>
          If you'd like to meet somebody at{" "}
          <span className="font-mono">@{beats}</span> who doesn't know about{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beats</span> yet,
          you can link them to{" "}
          <a
            className="text-blue-500 underline"
            href={`https://beats.wiki/${beats}`}
          >
            beats.wiki/{beats}
          </a>{" "}
          so they can see when <span className="font-mono">@{beats}</span> is in
          their local time.
        </P>
        <P>
          You can also link them to a precise day <i>and</i> time, like for a
          meeting:
        </P>
        <div className="flex justify-around rounded shadow px-4 py-4">
          <input
            value={date}
            onChange={e => setDate(e.target.value)}
            type="datetime-local"
          />
          <a
            className="text-blue-500 underline"
            href={`https://beats.wiki/${dateToBeats(date).fullBeats}`}
          >
            beats.wiki/{dateToBeats(date).fullBeats}
          </a>
        </div>
        <hr className="my-4" />
        <P>
          If you'd like to know more about{" "}
          <span className="bg-red-500 rounded text-white p-1">.Beats</span>,
          check out{" "}
          <a
            className="text-blue-500 underline"
            href="https://www.swatch.com/en_us/internet-time/"
          >
            the official Swatch Internet Time page
          </a>{" "}
          and{" "}
          <a
            className="text-blue-500 underline"
            href="https://en.wikipedia.org/wiki/Swatch_Internet_Time"
          >
            the Wikipedia page for Swatch Internet Time
          </a>
          . There's also a podcast about this system that I'm having trouble
          tracking down. I thought it was by{" "}
          <a
            className="text-blue-500 underline"
            href="https://gimletmedia.com/shows/reply-all"
          >
            Reply All
          </a>{" "}
          but I'm not seeing it there. If you find a podcast explaining internet
          time please lemme know{" "}
          <a
            className="text-blue-500 underline"
            href="https://twitter.com/cgenco"
          >
            @cgenco
          </a>{" "}
          and I'll add it to this page!
        </P>
      </Shell>
    </div>
  );
}
